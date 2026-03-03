"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ControlRoomBackgroundProps = {
  reducedMotion: boolean;
  className?: string;
};

type FieldParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const SWEEP_SPEED_PX_PER_SEC = 104;
const SWEEP_WRAP_PADDING_PX = 140;
const MAX_FRAME_DT_SEC = 0.05;
const AFTERGLOW_STEP_PX = 6;
const AFTERGLOW_CYCLE_RETENTION = 0.24;
const AFTERGLOW_FLOOR = 0.2;
const AFTERGLOW_INJECT_RADIUS = 4;
const AFTERGLOW_INJECT_PEAK = 1;

export function ControlRoomBackground({ reducedMotion, className }: ControlRoomBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasCanvas2D] = useState(() => {
    if (typeof document === "undefined") return true;
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("2d"));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) {
      canvas.style.display = "none";
      return;
    }

    canvas.style.display = "block";

    const particles: FieldParticle[] = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0009,
      vy: (Math.random() - 0.5) * 0.0009,
    }));

    let rafId = 0;
    let lastFrame = 0;
    let scrollY = 0;
    let width = 0;
    let height = 0;
    let lastDrawTimestampRef = 0;
    let sweepYRef = -SWEEP_WRAP_PADDING_PX;
    let afterglowRows = 0;
    let afterglowField = new Float32Array(0);

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const normalizeGlow = (value: number) => clamp((value - AFTERGLOW_FLOOR) / (1.2 - AFTERGLOW_FLOOR), 0, 1);

    const sampleAfterglowAtY = (y: number) => {
      if (afterglowRows <= 0 || height <= 0) return AFTERGLOW_FLOOR;
      const clampedY = clamp(y, 0, height);
      const row = clampedY / AFTERGLOW_STEP_PX;
      const low = Math.floor(row);
      const high = Math.min(afterglowRows - 1, low + 1);
      const t = row - low;
      const lowValue = afterglowField[Math.min(afterglowRows - 1, Math.max(0, low))] ?? AFTERGLOW_FLOOR;
      const highValue = afterglowField[Math.min(afterglowRows - 1, Math.max(0, high))] ?? AFTERGLOW_FLOOR;
      return lowValue + (highValue - lowValue) * t;
    };

    const resetAfterglowField = (sweepY: number, staticMode: boolean) => {
      for (let i = 0; i < afterglowRows; i += 1) {
        afterglowField[i] = AFTERGLOW_FLOOR;
      }

      if (!staticMode) {
        const sweepRow = Math.round(sweepY / AFTERGLOW_STEP_PX);
        for (let offset = -AFTERGLOW_INJECT_RADIUS * 2; offset <= AFTERGLOW_INJECT_RADIUS * 2; offset += 1) {
          const row = sweepRow + offset;
          if (row < 0 || row >= afterglowRows) continue;
          const normalized = Math.abs(offset) / (AFTERGLOW_INJECT_RADIUS * 2);
          const falloff = 1 - normalized * normalized;
          afterglowField[row] = Math.min(1.2, AFTERGLOW_FLOOR + Math.max(0, falloff) * 0.46);
        }
        return;
      }

      const staticTrailRange = Math.max(1, Math.ceil((height * 0.86) / AFTERGLOW_STEP_PX));
      for (let i = 0; i < afterglowRows; i += 1) {
        const y = i * AFTERGLOW_STEP_PX;
        const lineDistance = Math.abs(y - sweepY);
        const linePeak = Math.exp(-(lineDistance * lineDistance) / (2 * 56 * 56)) * 0.31;
        const trailDistance = Math.max(0, sweepY - y);
        const trailNormalized = clamp(trailDistance / (staticTrailRange * AFTERGLOW_STEP_PX), 0, 1);
        const trailPeak = Math.pow(1 - trailNormalized, 1.65) * 0.23;
        afterglowField[i] = Math.min(1.18, AFTERGLOW_FLOOR + linePeak + trailPeak);
      }
    };

    const applyAfterglowDecayAndInject = (dtSec: number, sweepY: number) => {
      if (afterglowRows <= 0 || height <= 0) return;

      const cycleDurationSec = Math.max(
        (height + SWEEP_WRAP_PADDING_PX * 2) / SWEEP_SPEED_PX_PER_SEC,
        Number.EPSILON,
      );
      const decay = Math.pow(AFTERGLOW_CYCLE_RETENTION, dtSec / cycleDurationSec);

      for (let i = 0; i < afterglowRows; i += 1) {
        afterglowField[i] = Math.max(AFTERGLOW_FLOOR, afterglowField[i] * decay);
      }

      const sweepRow = Math.round(sweepY / AFTERGLOW_STEP_PX);
      for (let offset = -AFTERGLOW_INJECT_RADIUS; offset <= AFTERGLOW_INJECT_RADIUS; offset += 1) {
        const row = sweepRow + offset;
        if (row < 0 || row >= afterglowRows) continue;
        const normalized = Math.abs(offset) / AFTERGLOW_INJECT_RADIUS;
        const falloff = 1 - normalized * normalized;
        const nextValue = AFTERGLOW_FLOOR + AFTERGLOW_INJECT_PEAK * Math.max(0, falloff);
        afterglowField[row] = Math.max(afterglowField[row], Math.min(1.28, nextValue));
      }

      const trailingRows = AFTERGLOW_INJECT_RADIUS * 6;
      for (let offset = 1; offset <= trailingRows; offset += 1) {
        const row = sweepRow - offset;
        if (row < 0) break;
        const normalized = offset / trailingRows;
        const falloff = 1 - normalized;
        const trailValue = AFTERGLOW_FLOOR + Math.pow(Math.max(0, falloff), 2) * 0.46;
        afterglowField[row] = Math.max(afterglowField[row], Math.min(1.2, trailValue));
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sweepYRef = reducedMotion ? height * 0.32 : -SWEEP_WRAP_PADDING_PX;
      afterglowRows = Math.max(1, Math.ceil(height / AFTERGLOW_STEP_PX) + 2);
      afterglowField = new Float32Array(afterglowRows);
      resetAfterglowField(sweepYRef, reducedMotion);
      lastDrawTimestampRef = 0;
      draw(performance.now());
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    const draw = (timestamp: number) => {
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#03040a";
      context.fillRect(0, 0, width, height);

      const dtSec = reducedMotion
        ? 0
        : Math.min(Math.max((timestamp - lastDrawTimestampRef) / 1000, 0), MAX_FRAME_DT_SEC);

      if (reducedMotion) {
        sweepYRef = height * 0.32;
      } else {
        sweepYRef += SWEEP_SPEED_PX_PER_SEC * dtSec;
        if (sweepYRef > height + SWEEP_WRAP_PADDING_PX) {
          sweepYRef = -SWEEP_WRAP_PADDING_PX;
        }
        applyAfterglowDecayAndInject(dtSec, sweepYRef);
      }
      lastDrawTimestampRef = timestamp;

      let afterglowAverage = AFTERGLOW_FLOOR;
      if (afterglowRows > 0) {
        let sum = 0;
        for (let i = 0; i < afterglowRows; i += 1) {
          sum += afterglowField[i];
        }
        afterglowAverage = sum / afterglowRows;
      }
      const afterglowAverageStrength = normalizeGlow(afterglowAverage);

      const parallax = reducedMotion ? 0 : (scrollY % 220) * 0.16;
      const gridSpacing = 56;
      const verticalAlpha = 0.011 + Math.pow(afterglowAverageStrength, 0.75) * 0.12;

      context.strokeStyle = `rgba(102, 215, 255, ${verticalAlpha.toFixed(4)})`;
      context.lineWidth = 1;
      context.beginPath();
      for (let x = 0; x < width + gridSpacing; x += gridSpacing) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      context.stroke();

      for (let y = -gridSpacing; y < height + gridSpacing; y += gridSpacing) {
        const lineY = y + parallax;
        const lineGlow = sampleAfterglowAtY(lineY);
        const lineStrength = normalizeGlow(lineGlow);
        const lineAlpha = 0.0075 + Math.pow(lineStrength, 0.72) * 0.205;
        context.strokeStyle = `rgba(102, 215, 255, ${lineAlpha.toFixed(4)})`;
        context.beginPath();
        context.moveTo(0, lineY);
        context.lineTo(width, lineY);
        context.stroke();
      }

      const sweepJitter = reducedMotion ? 0 : Math.sin(timestamp * 0.0042) * 0.82;
      const sweepY = Math.round((sweepYRef + sweepJitter) * 2) / 2;

      const drawSweepLayer = ({
        centerY,
        thickness,
        alpha,
        amplitude,
        frequency,
        speed,
        phase,
        tint = "88, 217, 255",
      }: {
        centerY: number;
        thickness: number;
        alpha: number;
        amplitude: number;
        frequency: number;
        speed: number;
        phase: number;
        tint?: string;
      }) => {
        const half = thickness / 2;
        const step = 2;

        for (let y = centerY - half; y <= centerY + half; y += step) {
          if (y < -2 || y > height + 2) continue;
          const normalized = 1 - Math.min(Math.abs(y - centerY) / half, 1);
          const intensity = Math.pow(normalized, 1.55);
          const xOffset = reducedMotion
            ? 0
            : Math.sin(y * frequency + timestamp * speed + phase) * amplitude;
          const sampleGlow = sampleAfterglowAtY(y);
          const sampleStrength = normalizeGlow(sampleGlow);
          const localAlpha = alpha * intensity * (0.68 + Math.pow(sampleStrength, 0.78) * 0.86);
          context.fillStyle = `rgba(${tint}, ${localAlpha.toFixed(4)})`;
          context.fillRect(-Math.abs(xOffset), y, width + Math.abs(xOffset) * 2, step + 1);
        }
      };

      context.save();
      context.globalCompositeOperation = "lighter";

      drawSweepLayer({
        centerY: sweepY,
        thickness: 146,
        alpha: reducedMotion ? 0.024 : 0.052,
        amplitude: 1.6,
        frequency: 0.041,
        speed: 0.004,
        phase: 0.45,
      });
      drawSweepLayer({
        centerY: sweepY,
        thickness: 70,
        alpha: reducedMotion ? 0.038 : 0.084,
        amplitude: 0.9,
        frequency: 0.056,
        speed: 0.005,
        phase: 1.1,
      });
      drawSweepLayer({
        centerY: sweepY - 26,
        thickness: 110,
        alpha: reducedMotion ? 0.015 : 0.031,
        amplitude: 1.2,
        frequency: 0.034,
        speed: 0.003,
        phase: 2.2,
        tint: "140, 223, 255",
      });

      const trailingHeight = 250;
      for (let y = sweepY - trailingHeight; y < sweepY - 10; y += 2) {
        if (y < -4 || y > height + 4) continue;
        const distance = (sweepY - y) / trailingHeight;
        const trailStrength = 1 - distance;
        if (trailStrength <= 0) continue;
        const sampleGlow = sampleAfterglowAtY(y);
        const sampleStrength = normalizeGlow(sampleGlow);
        const alpha = (0.0018 + sampleStrength * 0.021) * Math.pow(trailStrength, 1.45);
        if (alpha <= 0.001) continue;
        context.fillStyle = `rgba(103, 222, 255, ${alpha.toFixed(4)})`;
        context.fillRect(-0.5, y, width + 1, 2.5);
      }

      context.restore();

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x <= 0 || particle.x >= 1) particle.vx *= -1;
          if (particle.y <= 0 || particle.y >= 1) particle.vy *= -1;
          particle.x = clamp(particle.x, 0, 1);
          particle.y = clamp(particle.y, 0, 1);
        }

        const px = particle.x * width;
        const py = particle.y * height;
        const glow = sampleAfterglowAtY(py);
        const alpha = 0.34 + glow * 0.36;
        context.beginPath();
        context.fillStyle = `rgba(162, 233, 255, ${alpha.toFixed(4)})`;
        context.arc(px, py, 1.4, 0, Math.PI * 2);
        context.fill();
      });
    };

    const loop = (timestamp: number) => {
      if (!reducedMotion && timestamp - lastFrame < 33) {
        rafId = window.requestAnimationFrame(loop);
        return;
      }

      lastFrame = timestamp;
      draw(timestamp);
      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    resize();
    onScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reducedMotion) {
      draw(0);
    } else {
      rafId = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <div className={cn("absolute inset-0 control-room-grid", hasCanvas2D ? "opacity-28" : "opacity-100")} />
      <div className={cn("absolute inset-0 control-room-noise", hasCanvas2D ? "opacity-22" : "opacity-55")} />
      <div className={cn("absolute inset-0 crt-soft-lines", hasCanvas2D ? "opacity-16" : "opacity-30")} />
      <div className={cn("absolute inset-0 crt-phosphor", hasCanvas2D ? "opacity-14" : "opacity-24")} />
      <div className={cn("absolute inset-0 crt-digital-mask", hasCanvas2D ? "opacity-[0.08]" : "opacity-[0.13]")} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(72,187,255,0.14),transparent_44%),radial-gradient(circle_at_82%_18%,rgba(166,79,255,0.12),transparent_48%),radial-gradient(circle_at_50%_85%,rgba(255,54,190,0.08),transparent_42%)]",
          hasCanvas2D ? "opacity-65" : "opacity-100",
        )}
      />
      <div className={cn("absolute inset-0 crt-curvature", hasCanvas2D ? "opacity-26" : "opacity-35")} />
      <div className="absolute inset-0 vignette-layer" />
    </div>
  );
}
