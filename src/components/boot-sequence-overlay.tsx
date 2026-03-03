"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FastForward } from "lucide-react";

import { cn } from "@/lib/utils";

type BootSequenceOverlayProps = {
  identityName: string;
  identityTagline: string;
  onComplete: () => void;
  storageKey?: string;
  maxDurationMs?: number;
};

export function BootSequenceOverlay({
  identityName,
  identityTagline,
  onComplete,
  storageKey = "jr_portfolio_bootSeen_v1",
  maxDurationMs = 5600,
}: BootSequenceOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const completeRef = useRef(false);

  const finish = useCallback(
    (persist: boolean) => {
      if (completeRef.current) return;
      completeRef.current = true;

      if (persist && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, "1");
      }

      setProgress(100);
      setIsVisible(false);
      onComplete();
    },
    [onComplete, storageKey]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenBoot = window.localStorage.getItem(storageKey) === "1";
    let instantTimer = 0;

    if (prefersReducedMotion || hasSeenBoot) {
      instantTimer = window.setTimeout(() => finish(prefersReducedMotion), 0);
      return () => window.clearTimeout(instantTimer);
    }

    let rafId = 0;
    const start = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - start;
      const next = Math.min((elapsed / Math.max(maxDurationMs, 1000)) * 100, 100);
      setProgress(next);

      if (next >= 100) {
        finish(true);
        return;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (instantTimer) window.clearTimeout(instantTimer);
    };
  }, [finish, maxDurationMs, storageKey]);

  if (!isVisible) return null;

  const stageText =
    progress < 25
      ? "Initializing display bus"
      : progress < 50
        ? "Syncing control modules"
        : progress < 75
          ? "Calibrating signal pathways"
          : "Control room ready";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#03040a] text-white">
      <div className="pointer-events-none absolute inset-0 control-room-grid opacity-45" />
      <div className="pointer-events-none absolute inset-0 control-room-noise opacity-35" />
      <div className="pointer-events-none absolute inset-0 crt-scanlines opacity-40" />

      <div
        className="relative w-full max-w-2xl rounded-2xl border border-cyan-300/25 bg-[#060914]/90 p-6 sm:p-8"
        role="dialog"
        aria-label="Boot sequence"
      >
        <button
          type="button"
          onClick={() => finish(true)}
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-2 rounded-md border border-white/25 px-3 py-1.5",
            "text-xs font-semibold text-white transition hover:border-cyan-300/70 hover:text-cyan-100"
          )}
        >
          <FastForward className="h-3.5 w-3.5" />
          Skip
        </button>

        <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/80">Boot Sequence</div>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{identityName}</h1>
        <p className="mt-2 max-w-lg text-sm text-white/75">{identityTagline}</p>

        <div className="mt-6 rounded-lg border border-white/10 bg-black/40 p-4 text-sm">
          <div className="font-mono text-xs text-cyan-200/90">SYSTEM STATUS</div>
          <div className="mt-2 font-mono text-sm text-white/80">{stageText}</div>
          <div className="mt-1 font-mono text-xs text-white/55">BOOT_KEY: jr_portfolio_bootSeen_v1</div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-white/65">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-violet-400 transition-[width] duration-150"
              style={{ width: `${Math.max(progress, 2)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
