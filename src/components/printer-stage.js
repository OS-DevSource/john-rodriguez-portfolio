"use client";

import { useEffect, useRef } from "react";

const LIMIT = (32 * Math.PI) / 180;
const TILT = (9 * Math.PI) / 180;
const clamp = (value, bound) => Math.max(-bound, Math.min(value, bound));

export function PrinterStage({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const figure = root.current;
    const stage = figure.querySelector(".press-stage");
    const canvas = figure.querySelector("canvas");
    const ticket = figure.querySelector("details");
    const key = ticket.querySelector("summary");
    const poster = stage.querySelector("picture img");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const { signal } = controller;
    const on = (target, type, handler, options = {}) =>
      target.addEventListener(type, handler, { ...options, signal });
    let renderer,
      starting,
      visible = false,
      drag,
      movedKey = false;
    let yaw = 0,
      pitch = 0,
      travel = 0,
      pulse = null,
      frame = 0;

    function draw(now) {
      frame = 0;
      if (!renderer || !visible || document.hidden) return;
      if (pulse !== null) {
        const t = Math.min(1, (now - pulse) / 170);
        travel = motion.matches ? 0 : 0.095 * Math.sin(Math.PI * t);
        if (t === 1 || motion.matches) pulse = null;
      }
      const [x, y] = renderer.draw(yaw, pitch, ticket.open, travel);
      stage.style.setProperty("--key-x", x + "%");
      stage.style.setProperty("--key-y", y + "%");
      // At the exact rest position the original photographic render is canonical.
      figure.toggleAttribute("data-turned", !!(yaw || pitch || travel));
      canvas.setAttribute(
        "aria-valuenow",
        String(Math.round((yaw * 180) / Math.PI)),
      );
      if (pulse !== null) schedule();
    }
    function schedule() {
      if (visible && !document.hidden && !frame && renderer)
        frame = requestAnimationFrame(draw);
    }
    function fallback() {
      cancelAnimationFrame(frame);
      frame = 0;
      renderer = null;
      canvas.tabIndex = -1;
      canvas.setAttribute("aria-hidden", "true");
      figure.removeAttribute("data-ready");
      figure.removeAttribute("data-turned");
      figure.removeAttribute("data-dragging");
      stage.style.removeProperty("--key-x");
      stage.style.removeProperty("--key-y");
      if (document.activeElement === canvas) key.focus({ preventScroll: true });
    }
    function start() {
      if (starting || signal.aborted) return;
      starting = true;
      import("@/lib/printer/scene")
        .then(({ createPrinter }) => {
          signal.throwIfAborted();
          return createPrinter(canvas, poster, signal);
        })
        .then((scene) => {
          if (signal.aborted || !canvas.isConnected) return;
          renderer = scene;
          figure.setAttribute("data-ready", "");
          canvas.tabIndex = 0;
          canvas.removeAttribute("aria-hidden");
          if (ticket.open)
            scene.prepareInvoice().then(schedule).catch(fallback);
          schedule();
        })
        .catch(() => {
          if (!signal.aborted) fallback();
        });
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
        schedule();
      } else {
        pulse = null;
        travel = 0;
      }
    });
    observer.observe(figure);
    const resize = new ResizeObserver(schedule);
    resize.observe(stage);
    on(canvas, "webglcontextlost", () => {
      fallback();
      controller.abort();
    });
    on(document, "visibilitychange", schedule);
    on(stage, "pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      movedKey = false;
      start();
      if (!renderer) return;
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        yaw,
        pitch,
        active: false,
        key: key.contains(event.target),
      };
    });
    on(stage, "pointermove", (event) => {
      if (!drag || event.pointerId !== drag.id || !renderer) return;
      const dx = event.clientX - drag.x,
        dy = event.clientY - drag.y;
      if (!drag.active) {
        if (Math.hypot(dx, dy) < 5) return;
        if (event.pointerType === "touch" && Math.abs(dy) > Math.abs(dx)) {
          drag = null;
          return;
        }
        drag.active = true;
        stage.setPointerCapture(event.pointerId);
        figure.setAttribute("data-dragging", "");
        movedKey = drag.key;
      }
      yaw = clamp(drag.yaw - (dx * 2.15) / stage.clientWidth, LIMIT);
      pitch = clamp(drag.pitch + (dy * 0.8) / stage.clientHeight, TILT);
      schedule();
    });
    function endDrag(event) {
      if (event.pointerId !== drag?.id) return;
      if (stage.hasPointerCapture(event.pointerId))
        stage.releasePointerCapture(event.pointerId);
      drag = null;
      figure.removeAttribute("data-dragging");
    }
    on(window, "pointerup", endDrag);
    on(window, "pointercancel", endDrag);
    on(stage, "lostpointercapture", endDrag);
    on(key, "click", (event) => {
      if (movedKey && event.detail !== 0) event.preventDefault();
      movedKey = false;
    });
    on(canvas, "keydown", (event) => {
      if (!renderer) return;
      switch (event.key) {
        case "ArrowLeft":
          yaw = clamp(yaw - 0.12, LIMIT);
          break;
        case "ArrowRight":
          yaw = clamp(yaw + 0.12, LIMIT);
          break;
        case "ArrowUp":
          pitch = clamp(pitch + 0.06, TILT);
          break;
        case "ArrowDown":
          pitch = clamp(pitch - 0.06, TILT);
          break;
        case "Home":
          yaw = 0;
          pitch = 0;
          break;
        case "Enter":
        case " ":
          ticket.open = !ticket.open;
          break;
        default:
          return;
      }
      event.preventDefault();
      schedule();
    });
    on(ticket, "toggle", () => {
      if (!renderer) return;
      if (!motion.matches && visible) pulse = performance.now();
      if (ticket.open) renderer.prepareInvoice().then(schedule).catch(fallback);
      schedule();
    });
    return () => {
      observer.disconnect();
      resize.disconnect();
      controller.abort();
      fallback();
    };
  }, []);

  return (
    <figure ref={root} className="ticket-press">
      {children}
    </figure>
  );
}
