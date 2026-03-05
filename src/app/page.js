"use client";

/*
John Rodriguez - Portfolio Site (Product-grade UI v2)

How to use (Next.js App Router):
- Save as: app/page.jsx

How to use (Vite/CRA):
- Save as: src/App.jsx and render normally

Notes:
- Headshot is loaded from /public/headshot.jpg.
*/

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

const HEADSHOT_SRC = "/headshot.jpg";
const ICE_GLOW = "rgba(56, 189, 248, 0.26)";
const COPPER_GLOW = "rgba(249, 115, 22, 0.07)";
const SPOTLIGHT_SIZE_DESKTOP = 562;
const SPOTLIGHT_SIZE_COMPACT = 454;
const CURSOR_GLOW_LERP_FACTOR = 0.14;

const COPY = {
  name: "John Rodriguez",
  headline: "Systems builder | JS dev | Integrations",
  titleOneLine: "Systems builder | JS dev | Integrations",
  subhead:
    "I turn messy GTM handoffs into a reliable flow, with clear lifecycle rules and reporting teams can trust.",
  location: "Jarrell, TX (Central Time)",
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  replySla: "Typically replies within 24 hours on weekdays.",
};

const PROJECTS = [
  {
    title: "ScaleView",
    oneLiner: "Measure brand visibility in LLM answers using repeatable prompt sweeps.",
    bullets: [
      "Orchestrates prompt sweeps with consistent scoring and evidence capture.",
      "Produces audit-friendly reports that track visibility over time.",
    ],
    tags: ["Next.js", "Postgres", "Automation"],
    cta: { label: "GitHub", href: COPY.github },
  },
  {
    title: "AlphaCore",
    oneLiner: "Operations cockpit for workflows, reporting, and automation glue.",
    bullets: [
      "Standardized intake and structured data for clean execution.",
      "Dashboards for funnel health, SLAs, and accountability.",
    ],
    tags: ["React", "Dashboards", "Data models"],
    cta: { label: "GitHub", href: COPY.github },
  },
  {
    title: "Trinity Generator Quote Tool",
    oneLiner: "Guided sizing + quoting flow that reduces back-and-forth.",
    bullets: [
      "Questionnaire flow designed for accurate sizing and fast use.",
      "Consistent quote outputs and follow-up structure.",
    ],
    tags: ["Next.js", "Forms", "Pricing logic"],
    cta: { label: "GitHub", href: COPY.github },
  },
];

const TOKENS = {
  container: "mx-auto w-full max-w-6xl px-5 sm:px-8",
  sectionY: "py-12 sm:py-20",
  chapterBreak: "py-10 sm:py-12",

  eyebrow: "text-[11px] uppercase tracking-[0.22em]",
  h1: "text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-white",
  h2: "text-2xl sm:text-3xl font-bold text-white",
  h3: "text-lg font-semibold text-white",
  body: "text-[15px] leading-7 text-white/80",
  muted: "text-sm leading-6 text-white/60",

  card: "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur",
  cardInteractive:
    "transition hover:border-white/20 hover:bg-white/[0.04] focus-within:border-white/25",
  cardPad: "p-6",

  chip: "rounded-full border border-white/12 bg-transparent px-2.5 py-1 text-xs text-white/70",

  btnBase:
    "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition outline-none focus-visible:ring-2 focus-visible:ring-sky-400/75 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  btnPrimary:
    "bg-sky-500 text-black hover:bg-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]",
  btnSecondary:
    "border border-sky-400/55 bg-white/[0.02] text-white hover:border-sky-300/70 hover:bg-white/[0.04]",
  btnTertiary: "bg-transparent text-orange-300 hover:text-orange-200",
};

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

const ICONS = {
  arrow: (p) => (
    <svg {...p}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  ),
  mail: (p) => (
    <svg {...p}>
      <path d="M4 4h16v16H4z" />
      <path d="M4 6l8 6 8-6" />
    </svg>
  ),
  pin: (p) => (
    <svg {...p}>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <path d="M12 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    </svg>
  ),
  github: (p) => (
    <svg {...p}>
      <path d="M9 19c-4 1.5-4-2.5-5-3" />
      <path d="M14 22v-3.5c0-1 .4-1.5 1-2-3 0-6-1-6-5 0-1 .3-2 1-3-.1-.3-.4-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C19.9 3.2 21 3.5 21 3.5c.5 1.6.2 2.9.1 3.2.7 1 1 2 1 3 0 4-3 5-6 5 .6.5 1 1.4 1 2.8V22" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...p}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <path d="M2 9h4v12H2z" />
      <path d="M4 4a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  ),
};

function Icon({ name, className }) {
  const p = {
    className: cx("inline-block", className),
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const render = ICONS[name];
  return render ? render(p) : null;
}

function Card({ interactive = false, className, children }) {
  return (
    <div className={cx(TOKENS.card, interactive && TOKENS.cardInteractive, className)}>
      <div className={TOKENS.cardPad}>{children}</div>
    </div>
  );
}

function Button({ as = "button", href, variant = "primary", className, children, ...rest }) {
  const styles = {
    primary: TOKENS.btnPrimary,
    secondary: TOKENS.btnSecondary,
    tertiary: TOKENS.btnTertiary,
  };

  if (as === "a") {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
    const target = rest.target ?? (isExternal ? "_blank" : undefined);
    const rel = rest.rel ?? (isExternal ? "noreferrer" : undefined);
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cx(TOKENS.btnBase, styles[variant], className)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const type = rest.type ?? "button";
  return (
    <button
      type={type}
      className={cx(TOKENS.btnBase, styles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

function buildMailto({ email, subject, body }) {
  const s = encodeURIComponent(subject || "Portfolio inquiry");
  const b = encodeURIComponent(body || "Hey John,\n\n...");
  return `mailto:${email}?subject=${s}&body=${b}`;
}

function Backdrop() {
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

function ChapterBreak() {
  return (
    <div className={TOKENS.chapterBreak}>
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/26 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/08 to-transparent blur-[1px]" />
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, tone = "ice" }) {
  const toneClass = tone === "copper" ? "text-orange-300/70" : "text-sky-200/92";
  return (
    <div className="mb-10">
      <div className={cx(TOKENS.eyebrow, toneClass)}>{eyebrow}</div>
      <h2 className={cx(TOKENS.h2, "mt-2")}>{title}</h2>
      {subtitle ? <p className={cx(TOKENS.body, "mt-3 max-w-2xl")}>{subtitle}</p> : null}
    </div>
  );
}

function ProfileSummary({ mailto, showHeroCtas = false, onViewProjects }) {
  return (
    <Card interactive className="max-w-md border-white/8 bg-white/[0.02] max-md:max-w-full">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-sky-400/12 blur" />
          <Image
            src={HEADSHOT_SRC}
            alt="Headshot of John Rodriguez"
            width={72}
            height={72}
            sizes="72px"
            priority
            className="relative h-[72px] w-[72px] rounded-full border border-white/10 object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="text-base font-bold text-white md:truncate">{COPY.name}</div>
          <div className="mt-1 text-sm text-white/70">{COPY.titleOneLine}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          as="a"
          href={COPY.github}
          variant="secondary"
          className="h-9 border-sky-400/40 px-3 text-xs hover:border-sky-300/55"
        >
          <Icon name="github" className="h-4 w-4" /> GitHub
        </Button>
        <Button
          as="a"
          href={COPY.linkedin}
          variant="secondary"
          className="h-9 border-sky-400/40 px-3 text-xs hover:border-sky-300/55"
        >
          <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
        </Button>
        <Button
          as="a"
          href={mailto}
          variant="secondary"
          className="h-9 border-sky-400/40 px-3 text-xs hover:border-sky-300/55"
        >
          <Icon name="mail" className="h-4 w-4" /> Email
        </Button>
      </div>

      {showHeroCtas ? (
        <div className="mt-4 grid gap-3">
          <Button type="button" onClick={onViewProjects} className="w-full">
            View projects <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

function Nav({ items, activeId, scrolled, onGo }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10",
        scrolled ? "bg-black/70 backdrop-blur" : "bg-black/40 backdrop-blur",
        "px-4 py-3"
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onGo("home")}
          className="flex items-center gap-3 text-left"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
            <span className="text-sm font-extrabold text-white">JR</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">{COPY.name}</div>
            <div className="text-xs text-white/60">Portfolio</div>
          </div>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {items.map((it) => {
            const active = it.id === activeId;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onGo(it.id)}
                className={cx(
                  "relative text-sm font-semibold transition",
                  active ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {it.label}
                <span
                  className={cx(
                    "absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition",
                    active
                      ? "bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.55)]"
                      : "bg-transparent"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button as="a" href={COPY.github} variant="secondary" className="hidden sm:inline-flex">
            <Icon name="github" className="h-4 w-4" /> GitHub
          </Button>
          <Button as="a" href={COPY.linkedin} variant="secondary" className="hidden sm:inline-flex">
            <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sectionIds]);

  return activeId;
}

export default function PortfolioPage() {
  const rootRef = useRef(null);
  const homeRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "toolbox", label: "Toolbox" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const activeId = useActiveSection(sections.map((s) => s.id));

  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(SPOTLIGHT_SIZE_DESKTOP);
  const [heroGlowFactor, setHeroGlowFactor] = useState(1);
  const [glow, setGlow] = useState({ x: -9999, y: -9999, active: false });
  const glowTargetRef = useRef({ x: -9999, y: -9999, active: false });
  const enableCursorGlow = !reducedMotion && canHover;

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compactMq = window.matchMedia("(max-width: 640px)");

    const onHoverChange = () => setCanHover(Boolean(hoverMq.matches));
    const onViewportChange = () =>
      setSpotlightSize(compactMq.matches ? SPOTLIGHT_SIZE_COMPACT : SPOTLIGHT_SIZE_DESKTOP);

    onHoverChange();
    onViewportChange();

    hoverMq.addEventListener?.("change", onHoverChange);
    compactMq.addEventListener?.("change", onViewportChange);

    return () => {
      hoverMq.removeEventListener?.("change", onHoverChange);
      compactMq.removeEventListener?.("change", onViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!enableCursorGlow) {
      return;
    }

    let rafId = 0;
    const lerpFactor = CURSOR_GLOW_LERP_FACTOR;

    const animate = () => {
      const target = glowTargetRef.current;
      setGlow((prev) => {
        const nextX = prev.x + (target.x - prev.x) * lerpFactor;
        const nextY = prev.y + (target.y - prev.y) * lerpFactor;
        return {
          x: Number.isFinite(nextX) ? nextX : target.x,
          y: Number.isFinite(nextY) ? nextY : target.y,
          active: target.active,
        };
      });
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, [enableCursorGlow]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 8);

      const heroEl = homeRef.current;
      if (!heroEl) {
        setHeroGlowFactor(1);
        return;
      }

      const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
      const viewportHeight = window.innerHeight || 0;
      const fadeStart = heroBottom;
      const firstFadeEnd = heroBottom + viewportHeight * 0.35;
      const secondFadeEnd = heroBottom + viewportHeight * 0.8;

      if (scrollY <= fadeStart) {
        setHeroGlowFactor(1);
        return;
      }

      if (scrollY <= firstFadeEnd) {
        const progress = (scrollY - fadeStart) / Math.max(firstFadeEnd - fadeStart, 1);
        setHeroGlowFactor(1 - progress * 0.75);
        return;
      }

      if (scrollY <= secondFadeEnd) {
        const progress = (scrollY - firstFadeEnd) / Math.max(secondFadeEnd - firstFadeEnd, 1);
        setHeroGlowFactor(0.25 * (1 - progress));
        return;
      }

      setHeroGlowFactor(0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const mailto = buildMailto({
    email: COPY.email,
    subject: `Portfolio inquiry: ${COPY.name}`,
    body: "Hey John,\n\nI saw your portfolio and would like to connect about...\n\n- Context\n- Timeline\n- Best way to reach you\n\nThanks,\n",
  });

  const spotlightStyle = {
    backgroundImage: `radial-gradient(${spotlightSize}px circle at ${glow.x}px ${glow.y}px, ${ICE_GLOW} 0%, rgba(0,0,0,0) 60%), radial-gradient(${Math.round(spotlightSize * 0.62)}px circle at ${glow.x}px ${glow.y}px, ${COPPER_GLOW} 0%, rgba(0,0,0,0) 58%)`,
    opacity: glow.active ? 0.42 * heroGlowFactor : 0,
    transition: "opacity 220ms ease",
  };

  const handlePointerMove = (event) => {
    if (!enableCursorGlow || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    glowTargetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    glowTargetRef.current = { x: -9999, y: -9999, active: false };
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        ref={rootRef}
        className="relative overflow-x-clip"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <Backdrop />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-[72px] z-[2] block h-[620px] md:hidden"
          style={{
            backgroundImage:
              "radial-gradient(96% 74% at 14% 18%, rgba(56,189,248,0.23) 0%, rgba(56,189,248,0.12) 38%, rgba(56,189,248,0) 76%), radial-gradient(82% 62% at 84% 20%, rgba(249,115,22,0.11) 0%, rgba(249,115,22,0.05) 40%, rgba(249,115,22,0) 78%)",
            WebkitMaskImage:
              "radial-gradient(124% 94% at 50% 8%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.84) 56%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.06) 86%, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.84) 13%, rgba(0,0,0,0.84) 87%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(124% 94% at 50% 8%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.84) 56%, rgba(0,0,0,0.5) 72%, rgba(0,0,0,0.06) 86%, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.84) 13%, rgba(0,0,0,0.84) 87%, rgba(0,0,0,0) 100%)",
          }}
        />
        {enableCursorGlow ? (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={spotlightStyle} />
        ) : null}

        <div className={cx("relative z-10", TOKENS.container)}>
          <header className="sticky top-0 z-50 -mx-5 px-5 py-3 sm:-mx-8 sm:px-8 sm:py-4">
            <Nav items={sections} activeId={activeId} scrolled={scrolled} onGo={go} />
          </header>

          <main className={TOKENS.sectionY}>
            <section id="home" ref={homeRef} className="scroll-mt-28 max-md:-mt-2">
              <div className="relative">
                <div className="pointer-events-none absolute -left-10 -top-10 hidden h-[420px] w-[420px] rounded-full bg-sky-400/[0.20] blur-3xl md:block" />
                <div className="pointer-events-none absolute left-24 top-8 hidden h-[420px] w-[420px] rounded-full bg-orange-400/[0.05] blur-3xl md:block" />

                <div className="grid gap-10 max-md:gap-6 md:grid-cols-[1.35fr_0.65fr] md:items-start">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/70">
                      <span className="h-2 w-2 rounded-full bg-sky-400 ring-1 ring-sky-300/55 shadow-[0_0_16px_rgba(56,189,248,0.76)]" />
                      Central TX | Remote-ready
                    </div>

                    <h1
                      className={cx(
                        TOKENS.h1,
                        "mt-5 max-w-3xl max-md:mt-3 max-md:max-w-full max-md:text-[clamp(2.2rem,11vw,3.25rem)] max-md:leading-[1.04]"
                      )}
                    >
                      Design. Build. Automate.
                    </h1>

                    <p className={cx(TOKENS.body, "mt-5 max-w-2xl max-md:mt-4 max-md:max-w-full")}>{COPY.subhead}</p>

                    <div className="mt-5 md:hidden">
                      <ProfileSummary mailto={mailto} showHeroCtas onViewProjects={() => go("projects")} />
                    </div>

                    <div className="mt-7 hidden flex-wrap items-center gap-3 md:flex">
                      <Button onClick={() => go("projects")}>
                        View projects <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                      <Button as="a" href={mailto} variant="secondary">
                        <Icon name="mail" className="h-4 w-4" /> Email me
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Icon name="pin" className="h-4 w-4" /> {COPY.location}
                      </div>
                    </div>
                  </div>

                  <div className="hidden min-w-0 md:block md:pt-2">
                    <ProfileSummary mailto={mailto} />
                  </div>
                </div>
              </div>
            </section>

            <ChapterBreak />

            <section id="about" className="scroll-mt-28">
              <SectionTitle
                eyebrow="ABOUT"
                title="I build the operating system behind predictable execution."
                subtitle="When follow-up gaps happen, I blame the system, then I fix it: lifecycle design, routing logic, governance, automation, and reporting. I also write code and ship tools that teams actually adopt."
                tone="copper"
              />

              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className={TOKENS.h3}>What you get</h3>
                  <ul className={cx("mt-4 space-y-3", TOKENS.body)}>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                      <span>Clean workflows: intake to conversion tracking with clear ownership.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                      <span>Automation that saves time and improves data integrity.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                      <span>Dashboards that make pipeline health visible and actionable.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={TOKENS.h3}>How I work</h3>
                  <div className={cx("mt-4 space-y-3", TOKENS.body)}>
                    <div>Start with the problem, then the data model.</div>
                    <div>Make states explicit and test the edges.</div>
                    <div>Ship small, iterate fast, document decisions.</div>
                  </div>
                </div>
              </div>
            </section>

            <ChapterBreak />

            <section id="projects" className="scroll-mt-28">
              <SectionTitle
                eyebrow="PROJECTS"
                title="Shipped tools and prototypes"
                subtitle="Structured data, clean UX, and systems thinking. Each card is designed to be scannable in seconds."
                tone="ice"
              />

              <div className="grid gap-6 md:grid-cols-3">
                {PROJECTS.map((p) => (
                  <Card key={p.title} interactive className="h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-base font-bold text-white">{p.title}</div>
                        <div className="mt-2 text-sm leading-6 text-white/75">{p.oneLiner}</div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/70">
                      {p.bullets.slice(0, 2).map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-orange-300/68" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className={TOKENS.chip}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button as="a" href={p.cta.href} variant="secondary" className="w-full">
                        {p.cta.label} <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <ChapterBreak />

            <section id="toolbox" className="scroll-mt-28">
              <SectionTitle
                eyebrow="TOOLBOX"
                title="What I reach for"
                subtitle="Practical tools for building, shipping, and maintaining systems that hold up in real operations."
                tone="copper"
              />

              <div className="grid gap-10 md:grid-cols-3">
                <div>
                  <h3 className={TOKENS.h3}>Frontend</h3>
                  <p className={cx(TOKENS.body, "mt-3")}>JavaScript, React, Next.js, Tailwind, forms, design systems.</p>
                </div>
                <div>
                  <h3 className={TOKENS.h3}>Backend + data</h3>
                  <p className={cx(TOKENS.body, "mt-3")}>
                    Postgres, APIs, webhooks, data modeling, automation glue, dashboards.
                  </p>
                </div>
                <div>
                  <h3 className={TOKENS.h3}>Ops</h3>
                  <p className={cx(TOKENS.body, "mt-3")}>Lead lifecycle, routing, governance, SLAs, reporting, documentation.</p>
                </div>
              </div>
            </section>

            <ChapterBreak />

            <section id="contact" className="scroll-mt-28">
              <SectionTitle
                eyebrow="CONTACT"
                title="Send a quick note"
                subtitle={`${COPY.replySla} Include the role, scope, and timeline and I will respond fast with next steps.`}
                tone="ice"
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Card interactive className="min-w-0 w-full">
                  <div className="flex min-w-0 items-start gap-4">
                    <Image
                      src={HEADSHOT_SRC}
                      alt="Headshot of John Rodriguez"
                      width={64}
                      height={64}
                      sizes="64px"
                      className="h-16 w-16 rounded-full border border-white/10 object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-base font-bold text-white">{COPY.name}</div>
                      <div className="mt-1 text-sm text-white/70 md:truncate">{COPY.headline}</div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <a
                      href={mailto}
                      className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                        <Icon name="mail" className="h-4 w-4 flex-none" />
                        <span className="truncate">{COPY.email}</span>
                      </span>
                      <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
                    </a>

                    <a
                      href={COPY.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                        <Icon name="github" className="h-4 w-4" /> GitHub
                      </span>
                      <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
                    </a>

                    <a
                      href={COPY.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <span className="flex min-w-0 items-center gap-2 overflow-hidden">
                        <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
                      </span>
                      <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
                    </a>
                  </div>
                </Card>

                <Card interactive className="min-w-0 w-full">
                  <div className="text-base font-bold text-white">Message</div>
                  <p className={cx(TOKENS.muted, "mt-2")}>This opens your email client with the details prefilled.</p>

                  <form
                    className="mt-5 grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const name = String(fd.get("name") || "").trim();
                      const company = String(fd.get("company") || "").trim();
                      const message = String(fd.get("message") || "").trim();
                      const subject = `Portfolio inquiry${company ? ` - ${company}` : ""}`;
                      const body = `Name: ${name || "(no name)"}\nCompany: ${company || "(none)"}\n\n${message || ""}`;
                      window.location.href = buildMailto({ email: COPY.email, subject, body });
                    }}
                  >
                    <input
                      name="name"
                      placeholder="Your name"
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
                    />
                    <input
                      name="company"
                      placeholder="Company (optional)"
                      className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
                    />
                    <textarea
                      name="message"
                      placeholder="What are you trying to build or fix?"
                      rows={5}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/40 outline-none focus:border-sky-400/70"
                    />

                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <Button type="submit" className="w-full sm:w-auto">
                        Send <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                      <Button as="a" href={mailto} variant="tertiary" className="w-full sm:w-auto">
                        Open email
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              <footer className="mt-14 border-t border-white/10 pt-6 text-xs text-white/50">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    © {new Date().getFullYear()} {COPY.name}. Built with React + Tailwind.
                  </div>
                  <button
                    type="button"
                    onClick={() => go("home")}
                    className="text-left transition hover:text-white"
                  >
                    Back to top
                  </button>
                </div>
              </footer>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
