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
  socialProofLabel,
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
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => (right.intersectionRatio || 0) - (left.intersectionRatio || 0));

        if (visibleEntries[0]?.target?.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
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
          <div className="text-base font-bold text-white md:truncate">{portfolioSite.name}</div>
          <div className="mt-1 text-sm text-white/70">{heroContent.headline}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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
        <div className="mt-4 grid gap-3">
          <Button type="button" onClick={onViewProjects} className="w-full">
            View case studies <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <div className="mt-3 text-sm leading-6 text-white/70">{heroContent.signal}</div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
        <span className="rounded-full border border-white/10 px-2.5 py-1">{portfolioSite.location}</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">
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
        "px-4 py-3"
      )}
    >
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => onGo("home")} className="flex items-center gap-3 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
            <span className="text-sm font-extrabold text-white">JR</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">{portfolioSite.name}</div>
            <div className="text-xs text-white/60">Portfolio</div>
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
                  "relative text-sm font-semibold transition",
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                )}
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
            className="h-52 w-full object-cover"
          />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-sky-100/85">
              Case study
            </span>
            <span className="rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
              {socialProofLabel}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-base font-bold text-white">{project.title}</div>
          <div className="mt-2 text-sm leading-6 text-sky-100/80">{project.tagline}</div>
          <p className="mt-3 text-sm leading-6 text-white/72">{project.summary}</p>
        </div>

        <div className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-orange-200/70">Problem</div>
            <p className="mt-1">{project.problem}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-orange-200/70">Solution</div>
            <p className="mt-1">{project.solution}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-orange-200/70">Role</div>
            <p className="mt-1">{project.role}</p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-orange-200/70">Current status</div>
            <p className="mt-1">{project.status}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className={TOKENS.chip}>
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={project.primaryCta.href} variant="primary" className="sm:flex-1">
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
  return (
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
          <div className="text-base font-bold text-white">{portfolioSite.name}</div>
          <div className="mt-1 text-sm text-white/70 md:truncate">{heroContent.headline}</div>
          <p className="mt-3 text-sm leading-6 text-white/68">{portfolioSite.replySla}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <a
          href={mailto}
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
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
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
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
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
          </span>
          <Icon name="arrow" className="h-4 w-4 flex-none text-white/60" />
        </a>
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

        <div className={cx("relative z-10", TOKENS.container)}>
          <header className="sticky top-0 z-50 -mx-5 px-5 py-3 sm:-mx-8 sm:px-8 sm:py-4">
            <Nav items={navigationItems} activeId={activeId} scrolled={scrolled} onGo={go} />
          </header>

          <main className={TOKENS.sectionY}>
            <section id="home" ref={homeRef} className="scroll-mt-28 max-md:-mt-2">
              <div className="relative">
                <div className="pointer-events-none absolute -left-10 -top-10 hidden h-[420px] w-[420px] rounded-full bg-sky-400/[0.20] blur-3xl md:block" />
                <div className="pointer-events-none absolute left-24 top-8 hidden h-[420px] w-[420px] rounded-full bg-orange-400/[0.05] blur-3xl md:block" />

                <div className="grid gap-10 max-md:gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                  <div className="min-w-0">
                    <div className={cx(TOKENS.eyebrow, "text-sky-200/92")}>{heroContent.eyebrow}</div>
                    <h1
                      className={cx(
                        TOKENS.h1,
                        "mt-3 max-w-3xl max-md:mt-2 max-md:max-w-full max-md:text-[clamp(2.2rem,11vw,3.25rem)] max-md:leading-[1.04] sm:text-[3.9rem]"
                      )}
                    >
                      Operator-builder for{" "}
                      <span className="bg-gradient-to-r from-sky-200 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.32)]">
                        GTM systems, web apps, and automation.
                      </span>
                    </h1>

                    <p className={cx(TOKENS.body, "mt-5 max-w-2xl max-md:mt-4 max-md:max-w-full")}>
                      {heroContent.summary}
                    </p>

                    <div className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/70">
                      I work where operating logic and product execution overlap: lifecycle rules,
                      intake design, integrations, dashboards, and the UI that makes the system usable.
                    </div>

                    <div className="mt-5 md:hidden">
                      <ProfileSummary
                        mailto={mailto}
                        variant="mobile"
                        showHeroCtas
                        onViewProjects={() => go("projects")}
                      />
                      <div className="mt-4">
                        <AvailabilityPill label={portfolioSite.availability} />
                      </div>
                    </div>

                    <div className="mt-7 hidden flex-wrap items-center gap-3 md:flex">
                      <Button type="button" onClick={() => go("projects")}>
                        View case studies <Icon name="arrow" className="h-4 w-4" />
                      </Button>
                      <Button href={mailto} variant="secondary">
                        <Icon name="mail" className="h-4 w-4" /> Email me
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Icon name="pin" className="h-4 w-4" /> {portfolioSite.location}
                      </div>
                    </div>
                  </div>

                  <div className="hidden min-w-0 md:block md:pt-2">
                    <ProfileSummary mailto={mailto} variant="desktop" />
                    <div className="mt-4">
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
              />

              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className={TOKENS.h3}>What you get</h3>
                  <ul className={cx("mt-4 space-y-3", TOKENS.body)}>
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
                  <div className={cx("mt-4 space-y-3", TOKENS.body)}>
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
                title="Selected work with clearer proof."
                subtitle="Each project shows the problem, the system response, the role I played, and the current state of the work without invented metrics."
                tone="ice"
              />

              <div className="grid gap-6 md:grid-cols-3">
                {portfolioProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>

            <ChapterBreak />

            <section id="strengths" className="scroll-mt-28">
              <SectionTitle
                eyebrow="STRENGTHS"
                title="Where I add leverage."
                subtitle="The value is not a long stack list. It is the ability to make the process, tooling, and reporting work as one system."
                tone="copper"
              />

              <div className="grid gap-6 md:grid-cols-3">
                {strengths.map((strength) => (
                  <Card key={strength.title} interactive className="h-full">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-200">
                          <Icon name="spark" className="h-5 w-5" />
                        </div>
                        <h3 className={TOKENS.h3}>{strength.title}</h3>
                      </div>
                      <p className={cx(TOKENS.body, "mt-4")}>{strength.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <ChapterBreak />

            <section id="contact" className="scroll-mt-28">
              <SectionTitle
                eyebrow="CONTACT"
                title="Send a quick note."
                subtitle={`${portfolioSite.replySla} Include the role, scope, and timeline and I will respond with next steps.`}
                tone="ice"
              />

              <div className="grid gap-6 md:grid-cols-2">
                <ContactLinksCard mailto={mailto} />
                <Card interactive className="min-w-0 w-full">
                  <ContactForm />
                </Card>
              </div>

              <footer className="mt-14 border-t border-white/10 pt-6 text-xs text-white/50">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    Copyright {new Date().getFullYear()} {portfolioSite.name}. Built with Next.js and
                    Tailwind.
                  </div>
                  <button type="button" onClick={() => go("home")} className="text-left transition hover:text-white">
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
