import Link from "next/link";

export const TOKENS = {
  container: "mx-auto w-full max-w-6xl px-4 sm:px-8",
  sectionY: "py-10 sm:py-20",
  chapterBreak: "py-7 sm:py-12",
  eyebrow: "text-[11px] uppercase tracking-[0.22em]",
  h1: "text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-white",
  h2: "text-2xl sm:text-3xl font-bold text-white",
  h3: "text-base sm:text-lg font-semibold text-white",
  body: "text-[15px] leading-[1.65] text-white/80 sm:leading-7",
  muted: "text-sm leading-[1.55] text-white/72 sm:leading-6",
  card: "rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur",
  cardInteractive:
    "transition hover:border-white/20 hover:bg-white/[0.04] focus-within:border-sky-300/50",
  cardPad: "p-5 sm:p-6",
  chip: "rounded-full border border-white/15 bg-transparent px-2.5 py-1 text-xs text-white/75",
  btnBase:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70",
  btnPrimary:
    "bg-sky-500 text-black hover:bg-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]",
  btnSecondary:
    "border border-sky-400/55 bg-white/[0.02] text-white hover:border-sky-300/70 hover:bg-white/[0.04]",
  btnTertiary: "bg-transparent text-orange-300 hover:text-orange-200",
};

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

const ICONS = {
  arrow: (props) => (
    <svg {...props}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  ),
  mail: (props) => (
    <svg {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M4 6l8 6 8-6" />
    </svg>
  ),
  pin: (props) => (
    <svg {...props}>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <path d="M12 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </svg>
  ),
  github: (props) => (
    <svg {...props}>
      <path d="M9 19c-4 1.5-4-2.5-5-3" />
      <path d="M14 22v-3.5c0-1 .4-1.5 1-2-3 0-6-1-6-5 0-1 .3-2 1-3-.1-.3-.4-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C19.9 3.2 21 3.5 21 3.5c.5 1.6.2 2.9.1 3.2.7 1 1 2 1 3 0 4-3 5-6 5 .6.5 1 1.4 1 2.8V22" />
    </svg>
  ),
  linkedin: (props) => (
    <svg {...props}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <path d="M2 9h4v12H2z" />
      <path d="M4 4a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  ),
  spark: (props) => (
    <svg {...props}>
      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" />
    </svg>
  ),
};

export function Icon({ name, className }) {
  const render = ICONS[name];

  if (!render) {
    return null;
  }

  return render({
    className: cx("inline-block", className),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  });
}

export function Card({ interactive = false, className, children }) {
  return (
    <div className={cx(TOKENS.card, interactive && TOKENS.cardInteractive, className)}>
      <div className={TOKENS.cardPad}>{children}</div>
    </div>
  );
}

export function Button({
  as = "button",
  href,
  variant = "primary",
  className,
  children,
  ...rest
}) {
  const styles = {
    primary: TOKENS.btnPrimary,
    secondary: TOKENS.btnSecondary,
    tertiary: TOKENS.btnTertiary,
  };

  const classes = cx(TOKENS.btnBase, styles[variant], className);

  if (as === "a" || href) {
    const isExternal = typeof href === "string" && /^[a-z]+:/i.test(href);
    const isDocument =
      typeof href === "string" && /\.(?:pdf|docx?|xlsx?|pptx?)(?:[?#]|$)/i.test(href);

    if (isExternal || isDocument) {
      return (
        <a
          href={href}
          target={/^https?:\/\//.test(href || "") ? rest.target ?? "_blank" : rest.target}
          rel={/^https?:\/\//.test(href || "") ? rest.rel ?? "noreferrer" : rest.rel}
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href || "#"} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={rest.type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}

export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          backgroundPosition: "-2px -2px",
          maskImage: "radial-gradient(circle at 18% 0%, black 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export function ChapterBreak() {
  return (
    <div className={TOKENS.chapterBreak}>
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/26 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/8 to-transparent blur-[1px]" />
      </div>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, tone = "ice", className, subtitleClassName }) {
  const toneClass = tone === "copper" ? "text-orange-300/70" : "text-sky-200/92";

  return (
    <div className={cx("mb-8 sm:mb-10", className)}>
      <div className={cx(TOKENS.eyebrow, toneClass)}>{eyebrow}</div>
      <h2 className={cx(TOKENS.h2, "mt-2")}>{title}</h2>
      {subtitle ? (
        <p className={cx(TOKENS.body, "mt-3 max-w-2xl", subtitleClassName)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
