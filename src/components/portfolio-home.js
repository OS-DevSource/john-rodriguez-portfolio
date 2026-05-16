"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  aboutContent,
  buildMailtoLink,
  heroContent,
  navigationItems,
  portfolioProjects,
  portfolioSite,
  strengths,
} from "@/lib/portfolio";

import { ContactForm } from "./contact-form";
import {
  AvailabilityPill,
  Backdrop,
  Button,
  Card,
  ChapterBreak,
  Icon,
  SectionTitle,
  TOKENS,
  cx,
} from "./portfolio-ui";

const HEADSHOT_SRC = "/headshot.jpg";
const ICE_GLOW = "rgba(56, 189, 248, 0.26)";
const COPPER_GLOW = "rgba(249, 115, 22, 0.07)";
const SPOTLIGHT_SIZE_DESKTOP = 562;
const SPOTLIGHT_SIZE_COMPACT = 454;
const CURSOR_GLOW_LERP_FACTOR = 0.14;
const SECTION_IDS = navigationItems.map((section) => section.id);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    if (!mediaQuery) {
      return undefined;
    }

    const handleChange = () => setReduced(Boolean(mediaQuery.matches));
    handleChange();
    mediaQuery.addEventListener?.("change", handleChange);

    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  return reduced;
}

function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "home");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    let animationFrameId = 0;

    const updateActiveSection = () => {
      const headerOffset = 260;
      const activeLine = window.scrollY + headerOffset;
      let nextActiveId = elements[0].id;

      elements.forEach((element) => {
        if (element.offsetTop <= activeLine) {
          nextActiveId = element.id;
        }
      });

      setActiveId(nextActiveId);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeId;
}

function ProfileSummary({ mailto, showHeroCtas = false, onViewProjects, variant = "mobile" }) {
  const isDesktop = variant === "desktop";

  return (
    <Card
      interactive
      className={cx(
        "border-white/8 bg-white/[0.02] max-md:max-w-full",
        isDesktop ? "md:max-w-none" : "max-w-md"
      )}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className="relative flex-none rounded-full">
          <div className="absolute -inset-1 rounded-full bg-sky-400/12 blur" />
          <Image
            src={HEADSHOT_SRC}
            alt="John Rodriguez headshot"
            width={72}
            height={72}
            sizes="(min-width: 640px) 72px, 64px"
            priority={isDesktop}
            className="relative aspect-square h-16 w-16 rounded-full border border-white/10 object-cover sm:h-[72px] sm:w-[72px]"
          />
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-bold text-white md:truncate sm:text-base">{portfolioSite.name}</div>
          <div className="mt-1 text-sm text-white/70">{heroContent.profileTitle}</div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        <Button
          href={portfolioSite.github}
          variant="secondary"
          className="h-9 border-sky-400/40 px-3 text-xs hover:border-sky-300/55"
        >
          <Icon name="github" className="h-4 w-4" /> GitHub
        </Button>
        <Button
          href={portfolioSite.linkedin}
          variant="secondary"
          className="h-9 border-sky-400/40 px-3 text-xs hover:border-sky-300/55"
        >
          <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
        </Button>
        <Button
          href={mailto}
          variant={isDesktop ? "tertiary" : "secondary"}
          className={cx(
            "h-9 px-3 text-xs",
            isDesktop ? null : "border-sky-400/40 hover:border-sky-300/55"
          )}
        >
          <Icon name="mail" className="h-4 w-4" /> Email
        </Button>
      </div>

      {showHeroCtas ? (
        <div className="mt-3.5 grid gap-2.5">
          <Button type="button" onClick={onViewProjects} className="w-full">
            View case studies <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <div className="mt-2.5 text-sm leading-6 text-white/75">{heroContent.profileSignal}</div>
      <div className="mt-3.5 flex flex-wrap gap-2 text-xs text-white/70">
        <span className="rounded-full border border-white/15 px-2.5 py-1">{portfolioSite.location}</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1">
          {portfolioSite.timezoneLabel}
        </span>
      </div>
    </Card>
  );
}

function Nav({ items, activeId, scrolled, onGo }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10",
        scrolled ? "bg-black/70 backdrop-blur" : "bg-black/40 backdrop-blur",
        "px-3.5 py-2.5 sm:px-4 sm:py-3"
      )}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onGo("home")}
          className="flex items-center gap-2.5 rounded-xl text-left outline-none transition focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:gap-3"
          aria-label="Go to homepage hero"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] sm:h-10 sm:w-10">
            <span className="text-xs font-extrabold text-white sm:text-sm">JR</span>
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-white sm:text-sm">{portfolioSite.name}</div>
            <div className="text-[11px] text-white/70 sm:text-xs">Portfolio</div>
          </div>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onGo(item.id)}
                className={cx(
                  "relative rounded-md text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black",
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
                <span
                  className={cx(
                    "absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition",
                    isActive
                      ? "bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.55)]"
                      : "bg-transparent"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button href={portfolioSite.github} variant="secondary" className="hidden md:inline-flex">
            <Icon name="github" className="h-4 w-4" /> GitHub
          </Button>
          <Button href={portfolioSite.linkedin} variant="secondary" className="hidden md:inline-flex">
            <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const cardStack = project.cardStack || project.stack;

  return (
    <Card interactive className="h-full">
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="h-40 w-full object-cover sm:h-48"
          />
        </div>

        <div className="mt-4 sm:mt-5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-sky-200/80 sm:text-[11px]">
            Case study | {project.statusLabel}
          </div>
          <h3 className="mt-1 text-base font-bold text-white">{project.title}</h3>
          <p className="mt-1.5 min-h-6 text-sm leading-6 text-sky-100/80 sm:mt-2">
            {project.cardSummary}
          </p>
        </div>

        <div className="mt-3.5 grid gap-2 text-sm leading-6 text-white/72 sm:mt-4 sm:gap-2.5">
          <div className="min-h-[126px] rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="text-[10px] uppercase tracking-[0.16em] text-orange-200/70 sm:text-[11px] sm:tracking-[0.18em]">Problem</div>
            <p className="mt-1">{project.cardProblem}</p>
          </div>
          <div className="min-h-[126px] rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="text-[10px] uppercase tracking-[0.16em] text-orange-200/75 sm:text-[11px] sm:tracking-[0.18em]">System response</div>
            <p className="mt-1">{project.cardSolution}</p>
          </div>
          <div className="min-h-[126px] rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="text-[10px] uppercase tracking-[0.16em] text-orange-200/75 sm:text-[11px] sm:tracking-[0.18em]">Proof / status</div>
            <p className="mt-1">{project.cardMeta}</p>
          </div>
        </div>

        <div className="mt-3.5 flex min-h-[58px] flex-wrap content-start gap-1.5 sm:mt-4 sm:gap-2">
          {cardStack.map((item) => (
            <span key={item} className={TOKENS.chip}>
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-4 sm:flex-row sm:flex-wrap sm:gap-3 sm:pt-5">
          <Button
            href={project.primaryCta.href}
            variant="primary"
            className="sm:flex-1"
            aria-label={`Read the ${project.title} case study`}
          >
            {project.primaryCta.label} <Icon name="arrow" className="h-4 w-4" />
          </Button>
          {project.secondaryCta ? (
            <Button href={project.secondaryCta.href} variant="secondary" className="sm:flex-1">
              {project.secondaryCta.label} <Icon name="arrow" className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function ContactLinksCard({ mailto }) {
  const contactPrompts = [
    "Role or workflow you need help with",
    "Current tools, systems, or handoff pain",
    "Timeline, constraints, and what success looks like",
  ];

  return (
    <Card interactive className="min-w-0 w-full">
      <div className="flex min-w-0 items-start gap-3.5 sm:gap-4">
        <Image
          src={HEADSHOT_SRC}
          alt="John Rodriguez headshot"
          width={64}
          height={64}
          sizes="(min-width: 640px) 64px, 56px"
          className="h-14 w-14 rounded-full border border-white/10 object-cover sm:h-16 sm:w-16"
        />
        <div className="min-w-0">
          <div className="text-base font-bold text-white">{portfolioSite.name}</div>
          <div className="mt-1 text-sm text-white/70">{heroContent.profileTitle}</div>
        </div>
      </div>

      <div className="mt-3.5 grid gap-2.5 sm:mt-4 sm:gap-3">
        <a
          href={mailto}
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white/85 outline-none transition hover:border-white/20 hover:bg-white/[0.04] focus-visible:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-4"
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <Icon name="mail" className="h-4 w-4 flex-none" />
            <span className="truncate">{portfolioSite.email}</span>
          </span>
          <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
        </a>

        <a
          href={portfolioSite.github}
          target="_blank"
          rel="noreferrer"
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white/85 outline-none transition hover:border-white/20 hover:bg-white/[0.04] focus-visible:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-4"
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <Icon name="github" className="h-4 w-4" /> GitHub
          </span>
          <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
        </a>

        <a
          href={portfolioSite.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white/85 outline-none transition hover:border-white/20 hover:bg-white/[0.04] focus-visible:border-sky-300 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-4"
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
          </span>
          <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
        </a>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mt-6 sm:p-5">
        <h3 className="text-sm font-semibold text-white">What to include</h3>
        <ul className="mt-3 space-y-2.5 text-sm leading-6 text-white/74">
          {contactPrompts.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-white/74 sm:p-5">
        Good fits include GTM systems, RevOps workflows, internal tools,
        AI-assisted operations, lead flow, reporting, and handoff design.
      </div>
    </Card>
  );
}

export function PortfolioHome() {
  const rootRef = useRef(null);
  const homeRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const activeId = useActiveSection(SECTION_IDS);

  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState(SPOTLIGHT_SIZE_DESKTOP);
  const [heroGlowFactor, setHeroGlowFactor] = useState(1);
  const [glow, setGlow] = useState({ x: -9999, y: -9999, active: false });
  const glowTargetRef = useRef({ x: -9999, y: -9999, active: false });
  const enableCursorGlow = !reducedMotion && canHover;

  useEffect(() => {
    const hoverMediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const compactMediaQuery = window.matchMedia("(max-width: 640px)");

    const handleHoverChange = () => setCanHover(Boolean(hoverMediaQuery.matches));
    const handleViewportChange = () =>
      setSpotlightSize(compactMediaQuery.matches ? SPOTLIGHT_SIZE_COMPACT : SPOTLIGHT_SIZE_DESKTOP);

    handleHoverChange();
    handleViewportChange();

    hoverMediaQuery.addEventListener?.("change", handleHoverChange);
    compactMediaQuery.addEventListener?.("change", handleViewportChange);

    return () => {
      hoverMediaQuery.removeEventListener?.("change", handleHoverChange);
      compactMediaQuery.removeEventListener?.("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    if (!enableCursorGlow) {
      return undefined;
    }

    let animationFrameId = 0;

    const animate = () => {
      const target = glowTargetRef.current;

      setGlow((previous) => {
        const nextX = previous.x + (target.x - previous.x) * CURSOR_GLOW_LERP_FACTOR;
        const nextY = previous.y + (target.y - previous.y) * CURSOR_GLOW_LERP_FACTOR;

        return {
          x: Number.isFinite(nextX) ? nextX : target.x,
          y: Number.isFinite(nextY) ? nextY : target.y,
          active: target.active,
        };
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [enableCursorGlow]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 8);

      const heroElement = homeRef.current;

      if (!heroElement) {
        setHeroGlowFactor(1);
        return;
      }

      const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const spotlightStyle = {
    backgroundImage: `radial-gradient(${spotlightSize}px circle at ${glow.x}px ${glow.y}px, ${ICE_GLOW} 0%, rgba(0,0,0,0) 60%), radial-gradient(${Math.round(spotlightSize * 0.62)}px circle at ${glow.x}px ${glow.y}px, ${COPPER_GLOW} 0%, rgba(0,0,0,0) 58%)`,
    opacity: glow.active ? 0.42 * heroGlowFactor : 0,
    transition: "opacity 220ms ease",
  };

  const go = (id) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  const mailto = buildMailtoLink({
    subject: `Portfolio inquiry: ${portfolioSite.name}`,
    body:
      "Hey John,\n\nI saw your portfolio and would like to connect about...\n\n- Context\n- Timeline\n- Best way to reach me\n\nThanks,\n",
  });

  const handlePointerMove = (event) => {
    if (!enableCursorGlow || !rootRef.current) {
      return;
    }

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

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className={cx("relative z-10", TOKENS.container)}>
          <header className="sticky top-0 z-50 -mx-4 px-4 py-2.5 sm:-mx-8 sm:px-8 sm:py-4">
            <Nav items={navigationItems} activeId={activeId} scrolled={scrolled} onGo={go} />
          </header>

          <main id="main-content" className={TOKENS.sectionY} tabIndex={-1}>
            <section id="home" ref={homeRef} className="scroll-mt-28 max-md:-mt-2">
              <div className="relative">
                <div className="pointer-events-none absolute -left-10 -top-10 hidden h-[420px] w-[420px] rounded-full bg-sky-400/[0.20] blur-3xl md:block" />
                <div className="pointer-events-none absolute left-24 top-8 hidden h-[420px] w-[420px] rounded-full bg-orange-400/[0.05] blur-3xl md:block" />

                <div className="grid gap-10 max-md:gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                  <div className="min-w-0">
                    <div className={cx(TOKENS.eyebrow, "text-sky-200/92")}>{heroContent.eyebrow}</div>
                    <h1
                      className={cx(
                        TOKENS.h1,
                        "mt-3 max-w-3xl max-md:mt-2 max-md:max-w-full max-md:text-[clamp(2.2rem,11vw,3.25rem)] max-md:leading-[1.04] sm:text-[3.9rem]"
                      )}
                    >
                        {heroContent.headlineLead}{" "}
                      <span className="bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.32)]">
                        {heroContent.headlineAccent}
                      </span>
                    </h1>

                    <p className={cx(TOKENS.body, "mt-3.5 max-w-2xl max-md:max-w-full sm:mt-4")}>
                      {heroContent.summary}
                    </p>

                    <div className="mt-3.5 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/70 sm:mt-4 sm:py-3.5">
                      {heroContent.callout}
                    </div>

                    <div className="mt-4 md:hidden">
                      <div className="space-y-3">
                        <ProfileSummary
                          mailto={mailto}
                          variant="mobile"
                          showHeroCtas
                          onViewProjects={() => go("projects")}
                        />
                        <AvailabilityPill label={portfolioSite.availability} />
                      </div>
                    </div>

                    <div className="mt-6 hidden flex-wrap items-center gap-3 md:flex">
                      <Button type="button" onClick={() => go("projects")}>
                        View case studies <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                      <Button href={mailto} variant="secondary">
                        <Icon name="mail" className="h-4 w-4" /> Email me
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <Icon name="pin" className="h-4 w-4" /> {portfolioSite.location}
                      </div>
                    </div>
                  </div>

                  <div className="hidden min-w-0 md:block md:pt-1">
                    <div className="space-y-3">
                      <ProfileSummary mailto={mailto} variant="desktop" />
                      <AvailabilityPill label={portfolioSite.availability} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ChapterBreak />

            <section id="about" className="scroll-mt-28">
              <SectionTitle
                eyebrow="ABOUT"
                title={aboutContent.title}
                subtitle={aboutContent.subtitle}
                tone="copper"
                className="mb-10 sm:mb-12"
                subtitleClassName="max-w-[42rem]"
              />

              <div className="grid gap-8 sm:gap-9 md:grid-cols-2">
                <div>
                  <h3 className={TOKENS.h3}>What you get</h3>
                  <ul className={cx("mt-3 space-y-2.5 sm:mt-3.5 sm:space-y-3", TOKENS.body)}>
                    {aboutContent.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={TOKENS.h3}>How I work</h3>
                  <div className={cx("mt-3 space-y-2.5 sm:mt-3.5 sm:space-y-3", TOKENS.body)}>
                    {aboutContent.process.map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <ChapterBreak />

            <section id="projects" className="scroll-mt-28">
              <SectionTitle
                eyebrow="PROJECTS"
                title="Selected systems work."
                subtitle="AI workflow memory, field lead operations, and structured quoting tools built around real operating problems."
                tone="ice"
              />

              <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                {portfolioProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>

            <ChapterBreak />

            <section id="strengths" className="scroll-mt-28">
              <SectionTitle
                eyebrow="STRENGTHS"
                title="Operating strengths."
                subtitle="Where revenue workflow knowledge, automation, reporting, and practical product execution come together."
                tone="copper"
                className="mb-8 sm:mb-9"
              />

              <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
                {strengths.map((strength) => (
                  <Card key={strength.title} interactive className="h-full">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-200 sm:h-10 sm:w-10">
                          <Icon name="spark" className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight text-white">
                          {strength.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-[15px] leading-6 text-white/75 sm:mt-3.5">
                        {strength.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <ChapterBreak />

            <section id="contact" className="scroll-mt-28">
              <SectionTitle
                eyebrow="CONTACT"
                title="Start a conversation."
                subtitle={`${portfolioSite.replySla} Share the role, scope, and timeline for a faster reply.`}
                tone="ice"
                className="mb-8 sm:mb-9"
              />

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <ContactLinksCard mailto={mailto} />
                <Card interactive className="min-w-0 w-full">
                  <ContactForm />
                </Card>
              </div>

              <footer className="mt-12 border-t border-white/10 pt-5 text-xs text-white/65 sm:mt-14 sm:pt-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    Copyright {new Date().getFullYear()} {portfolioSite.name}. Built with Next.js and
                    Tailwind.
                  </div>
                  <button
                    type="button"
                    onClick={() => go("home")}
                    className="rounded-md text-left outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
