"use client";

import { useEffect, useRef } from "react";
import { createFeed, LENGTH } from "@/lib/printer/paper-feed";

const PRINT_TIME = 4100;

export function PrinterStage({ children }) {
  const figure = useRef(null);
  useEffect(() => {
    const root = figure.current;
    const canvas = root.querySelector("canvas");
    const button = root.querySelector("button");
    const fallback = root.querySelector("details");
    const status = root.querySelector('[role="status"]');
    if (
      !window.CanvasRenderingContext2D ||
      !window.IntersectionObserver ||
      fallback.open
    )
      return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let feed;
    let frame = 0;
    let start = 0;
    let printing = false;
    root.dataset.enhanced = "";

    function finish() {
      if (!printing) return;
      cancelAnimationFrame(frame);
      frame = 0;
      feed.draw(LENGTH);
      printing = false;
      root.dataset.phase = "printed";
      button.removeAttribute("aria-disabled");
      status.textContent =
        "Printed sample invoice 014. Sink trap repair. One elbow. Reviewed.";
    }
    function advance(now) {
      const t = Math.min(1, (now - start) / PRINT_TIME);
      if (t >= 1) {
        finish();
        return;
      }
      // A small, monotonic roller cadence. There is no timer between print jobs.
      const travel = LENGTH * (t - Math.sin(2 * Math.PI * 24 * t) * 0.0014);
      feed.draw(travel);
      frame = requestAnimationFrame(advance);
    }
    function staticInvoice() {
      cancelAnimationFrame(frame);
      printing = false;
      delete root.dataset.enhanced;
      fallback.open = true;
      if (document.activeElement === button)
        fallback.querySelector("summary").focus({ preventScroll: true });
    }
    function print() {
      if (printing) return;
      try {
        feed ??= createFeed(canvas);
        feed.reset();
      } catch {
        staticInvoice();
        return;
      }
      printing = true;
      root.dataset.phase = "printing";
      button.setAttribute("aria-disabled", "true");
      status.textContent = "Printing sample invoice.";
      if (motion.matches) {
        finish();
        return;
      }
      start = performance.now();
      frame = requestAnimationFrame(advance);
    }
    function visibility() {
      if (document.hidden) finish();
    }
    function motionChange() {
      if (motion.matches) finish();
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) finish();
    });
    observer.observe(root);
    button.addEventListener("click", print);
    canvas.addEventListener("contextlost", staticInvoice);
    motion.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      button.removeEventListener("click", print);
      canvas.removeEventListener("contextlost", staticInvoice);
      motion.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", visibility);
      delete root.dataset.enhanced;
    };
  }, []);

  return (
    <figure ref={figure} className="ticket-press">
      <div className="press-stage">
        {children}
        <canvas
          className="feed-paper"
          width="1120"
          height="800"
          aria-hidden="true"
        />
        <div className="fallback-paper" aria-hidden="true" />
      </div>
      <figcaption className="instrument-caption">
        <span className="instrument-label">
          Sample invoice <span className="ticket-number">/ 014</span>
        </span>
        <button className="print-action" type="button">
          <span className="key-target" aria-hidden="true" />
          <span className="caption-key" aria-hidden="true">
            ✓
          </span>
          <span className="print-idle">Print invoice</span>
          <span className="print-busy">Printing…</span>
          <span className="print-again">Reprint invoice</span>
        </button>
        <details className="print-fallback">
          <summary>
            <span className="key-target" aria-hidden="true" />
            <span className="caption-key" aria-hidden="true">
              ✓
            </span>{" "}
            <span className="fallback-idle">Print invoice</span>
            <span className="fallback-done">Close invoice</span>
          </summary>
          <p>
            Sample invoice 014
            <br />
            Sink trap repair
            <br />1 × elbow · Reviewed
          </p>
        </details>
        <span role="status" className="sr-only" />
      </figcaption>
    </figure>
  );
}
