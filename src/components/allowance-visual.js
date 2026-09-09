import Image from "next/image";

// Clip only the wallpaper around the original window. The source screenshots
// stay intact, including every label, control, and account reading.
function AppWindow({ src, alt, windowHeight, priority }) {
  const windowWidth = 722;

  return (
    <div
      className="relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
      style={{
        aspectRatio: `${windowWidth} / ${windowHeight}`,
        borderRadius: `4.5% / ${(32 / windowHeight) * 100}%`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={756}
        height={856}
        priority={priority}
        sizes="(min-width: 1024px) 260px, 45vw"
        className="absolute h-auto max-w-none"
        style={{
          width: `${(756 / windowWidth) * 100}%`,
          left: `${(-13 / windowWidth) * 100}%`,
          top: `${(-10 / windowHeight) * 100}%`,
        }}
      />
    </div>
  );
}

export function AllowanceVisual({ priority = false }) {
  return (
    <figure className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-[#071016] [container-type:inline-size]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,rgba(45,212,191,0.14),transparent_65%),linear-gradient(145deg,rgba(56,189,248,0.07),transparent_60%)]"
      />
      <div className="relative grid h-full grid-cols-[1.05fr_1fr] items-center gap-[5%] px-[6%] pb-[9%] pt-[5%]">
        <div>
          <p className="mb-3 text-[clamp(8px,2cqw,11px)] font-medium uppercase tracking-[0.18em] text-teal-100/65">Expanded</p>
          <AppWindow
            src="/projects/allowance-expanded.png"
            alt="Allowance expanded: 53% weekly capacity remaining, with both Spark usage windows at 100%."
            windowHeight={820}
            priority={priority}
          />
        </div>
        <div>
          <p className="mb-3 text-[clamp(8px,2cqw,11px)] font-medium uppercase tracking-[0.18em] text-teal-100/65">Compact</p>
          <AppWindow
            src="/projects/allowance-compact.png"
            alt="Allowance compact: the same 53% weekly reading, with details collapsed and the window pinned."
            windowHeight={413}
            priority={priority}
          />
          <p className="mt-4 max-w-[15em] text-[clamp(9px,2.3cqw,13px)] leading-relaxed text-white/55">
            A quick check, with room for the details.
          </p>
        </div>
      </div>
      <figcaption className="absolute inset-x-[6%] bottom-[4%] text-[clamp(10px,2.1cqw,12px)] text-white/70">
        Actual app captures · September 9, 2026
      </figcaption>
    </figure>
  );
}
