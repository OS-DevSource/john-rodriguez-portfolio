"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Boxes,
  Braces,
  Command as CommandIcon,
  Database,
  Mail,
  MapPin,
  Workflow,
} from "lucide-react";

import { BootSequenceOverlay } from "@/components/boot-sequence-overlay";
import { CommandPalette } from "@/components/command-palette";
import { ControlRoomBackground } from "@/components/control-room-background";
import { ProjectsArcade } from "@/components/projects-arcade";
import { projects } from "@/lib/projects";
import { controlRoomSections } from "@/lib/sections";
import { cn } from "@/lib/utils";

const HEADSHOT_SRC = "/headshot.jpg";
const STICKY_TOP_PX = 12;
const ACTIVE_SECTION_BUFFER_PX = 10;
const NAV_LOCK_RELEASE_PX = 24;
const NAV_LOCK_TIMEOUT_MS = 1200;
const BELOW_PROBE_PENALTY_PX = 18;

const COPY = {
  name: "John Rodriguez",
  headline:
    "Sales & Marketing Director (Central TX) | GTM Systems + Web Dev (JS) + Automation",
  titleOneLine: "GTM systems builder + web dev (JS) + automation",
  signal: "Strategy + implementation. I ship systems teams actually adopt.",
  subhead:
    "I build revenue systems people actually use: lifecycle design, routing, governance, automation, and reporting. Also shipping web apps with clean UX and reliable data models.",
  location: "Jarrell, TX (Central Time)",
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  replySla: "Typically replies within 24 hours on weekdays.",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(Boolean(mediaQuery.matches));
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function scrollToId(id, reducedMotion, offsetPx = 0) {
  const target = document.getElementById(id);
  if (!target) return null;
  const targetTop = window.scrollY + target.getBoundingClientRect().top - offsetPx;
  const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  const clampedTop = Math.min(Math.max(targetTop, 0), maxY);
  window.scrollTo({
    top: clampedTop,
    behavior: reducedMotion ? "auto" : "smooth",
  });
  return { targetTop, clampedTop, maxY };
}

function buildMailto({ email, subject, body }) {
  const encodedSubject = encodeURIComponent(subject || "Portfolio inquiry");
  const encodedBody = encodeURIComponent(body || "Hey John,\n\n...");
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

function SectionShell({ id, title, subtitle, children, tone = "cyan" }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="module-surface p-5 sm:p-7">
        <div
          className={cn(
            "mb-5 text-[11px] uppercase tracking-[0.22em]",
            tone === "violet" ? "text-violet-200/80" : "text-cyan-200/80"
          )}
        >
          {id}
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionIds = useMemo(() => controlRoomSections.map((section) => section.id), []);
  const headerRef = useRef(null);
  const navLockRef = useRef(null);
  const [bootComplete, setBootComplete] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(120);
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "home");

  const mailto = buildMailto({
    email: COPY.email,
    subject: `Portfolio inquiry: ${COPY.name}`,
    body:
      "Hey John,\n\nI saw your portfolio and would like to connect about...\n\n- Context\n- Timeline\n- Best way to reach you\n\nThanks,\n",
  });

  useEffect(() => {
    const measureHeader = () => {
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const nextOffset = Math.round(headerHeight + STICKY_TOP_PX + ACTIVE_SECTION_BUFFER_PX);
      setHeaderOffset((prev) => (prev === nextOffset ? prev : nextOffset));
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const probeY = headerOffset + ACTIVE_SECTION_BUFFER_PX;
      const lock = navLockRef.current;

      if (lock) {
        const deltaFromLockedY = Math.abs(window.scrollY - lock.lockedScrollY);
        const lockAgeMs = performance.now() - lock.lockedAt;
        const hasSettled = lock.hasSettled || deltaFromLockedY <= NAV_LOCK_RELEASE_PX;

        if (hasSettled) {
          navLockRef.current = { ...lock, hasSettled: true };
          if (deltaFromLockedY <= NAV_LOCK_RELEASE_PX) {
            setActiveSection((prev) => (prev === lock.id ? prev : lock.id));
            return;
          }

          navLockRef.current = null;
        } else if (lockAgeMs <= NAV_LOCK_TIMEOUT_MS) {
          setActiveSection((prev) => (prev === lock.id ? prev : lock.id));
          return;
        } else {
          navLockRef.current = null;
        }
      }

      let nextActive = sectionIds[0] ?? "home";
      let bestScore = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top;
        const distance = Math.abs(sectionTop - probeY);
        const score = sectionTop > probeY ? distance + BELOW_PROBE_PENALTY_PX : distance;
        if (score < bestScore) {
          bestScore = score;
          nextActive = id;
        }
      });

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [headerOffset, sectionIds]);

  const goToSection = (id) => {
    setActiveSection(id);
    const target = scrollToId(id, reducedMotion, headerOffset);
    if (!target) return;

    const isClamped = Math.abs(target.targetTop - target.clampedTop) > 0.5;
    navLockRef.current = isClamped
      ? {
          id,
          lockedScrollY: target.clampedTop,
          lockedAt: performance.now(),
          hasSettled: false,
        }
      : null;
  };

  return (
    <div className="min-h-screen bg-[#02030a] text-white">
      <BootSequenceOverlay
        identityName={COPY.name}
        identityTagline={COPY.signal}
        onComplete={() => setBootComplete(true)}
      />

      <div className={cn("relative isolate transition-opacity duration-500", bootComplete ? "opacity-100" : "opacity-95")}>
        <ControlRoomBackground reducedMotion={reducedMotion} className="fixed inset-0 -z-10" />

        <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-8 sm:pb-24">
          <header ref={headerRef} className="sticky top-3 z-40 py-3">
            <div className="module-surface px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => goToSection("home")}
                  className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-left transition hover:border-cyan-300/60"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-cyan-400/20 text-xs font-bold">
                    JR
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{COPY.name}</span>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-white/60">Control Room</span>
                  </span>
                </button>

                <nav className="hidden flex-1 items-center gap-2 md:flex" aria-label="Module navigation">
                  {controlRoomSections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => goToSection(section.id)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-semibold transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                          isActive
                            ? "bg-cyan-300/15 text-cyan-100"
                            : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                        )}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="ml-auto flex items-center gap-2">
                  <CommandPalette
                    sections={controlRoomSections}
                    email={COPY.email}
                    github={COPY.github}
                    linkedin={COPY.linkedin}
                    onNavigate={goToSection}
                  />
                </div>
              </div>

              <nav
                className="nav-rail-scroll mt-3 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 md:hidden"
                aria-label="Module navigation"
              >
                {controlRoomSections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={`mobile-${section.id}`}
                      type="button"
                      onClick={() => goToSection(section.id)}
                      className={cn(
                        "flex-none snap-start rounded-md px-3 py-2 text-sm font-semibold transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                        isActive
                          ? "bg-cyan-300/15 text-cyan-100"
                          : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </header>

          <main className="space-y-8 pt-4 sm:space-y-10 sm:pt-6">
            <section id="home" className="scroll-mt-28">
              <div className="module-surface overflow-hidden p-6 sm:p-8">
                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/18 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-12 h-64 w-64 rounded-full bg-fuchsia-400/8 blur-3xl" />

                <div className="relative grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/8 px-3 py-1 text-xs uppercase tracking-[0.16em] text-cyan-100/90">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Central TX | Remote-ready
                    </div>

                    <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
                      Systems builder for GTM teams,
                      <span className="text-cyan-200"> shipping clean web apps.</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">{COPY.subhead}</p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => goToSection("projects")}
                        className="inline-flex h-11 items-center gap-2 rounded-lg border border-cyan-300/45 bg-cyan-300/12 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/18"
                      >
                        Enter Control Room
                        <CommandIcon className="h-4 w-4" />
                      </button>
                      <a
                        href={mailto}
                        className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white/90 transition hover:border-cyan-300/65 hover:text-cyan-100"
                      >
                        Open Contact Module
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <aside className="rounded-2xl border border-white/12 bg-black/35 p-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={HEADSHOT_SRC}
                        alt="Headshot of John Rodriguez"
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full border border-white/15 object-cover"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{COPY.name}</div>
                        <div className="mt-1 text-xs text-white/65">{COPY.titleOneLine}</div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white/75">
                      {COPY.signal}
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/65">
                      <MapPin className="h-3.5 w-3.5" />
                      {COPY.location}
                    </div>
                  </aside>
                </div>
              </div>
            </section>

            <SectionShell
              id="about"
              tone="violet"
              title="I build the operating system behind predictable execution."
              subtitle="When follow-up gaps happen, I blame the system, then I fix it: lifecycle design, routing logic, governance, automation, and reporting. I also write code and ship tools that teams actually adopt."
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">What you get</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/80">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>Clean workflows: intake to conversion tracking with clear ownership.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>Automation that saves time and improves data integrity.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>Dashboards that make pipeline health visible and actionable.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">How I work</h3>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-white/80">
                    <div>Start with the problem, then the data model.</div>
                    <div>Make states explicit and test the edges.</div>
                    <div>Ship small, iterate fast, document decisions.</div>
                  </div>
                </div>
              </div>
            </SectionShell>

            <SectionShell
              id="projects"
              title="Shipped tools and prototypes"
              subtitle="Structured data, clean UX, and systems thinking. Each module is designed to be scannable in seconds."
            >
              <ProjectsArcade projects={projects} defaultProjectId={projects[0]?.id} />
            </SectionShell>

            <SectionShell
              id="toolbox"
              tone="violet"
              title="What I reach for"
              subtitle="Practical tools for building, shipping, and maintaining systems that hold up in real operations."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Braces className="h-4 w-4 text-cyan-200" />
                    Frontend
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    JavaScript, React, Next.js, Tailwind, forms, design systems.
                  </p>
                </article>

                <article className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Database className="h-4 w-4 text-cyan-200" />
                    Backend
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/75">Postgres, APIs, webhooks, data modeling.</p>
                </article>

                <article className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Boxes className="h-4 w-4 text-cyan-200" />
                    Data and Automation
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/75">Automation glue, dashboards, reporting.</p>
                </article>

                <article className="rounded-xl border border-white/12 bg-black/35 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Workflow className="h-4 w-4 text-cyan-200" />
                    GTM Systems
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    Lead lifecycle, routing, governance, SLAs, reporting, documentation.
                  </p>
                </article>
              </div>
            </SectionShell>

            <SectionShell
              id="contact"
              title="Send a quick note"
              subtitle={`${COPY.replySla} Include the role, scope, and timeline and I will respond fast with next steps.`}
            >
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <article className="rounded-2xl border border-white/12 bg-black/35 p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={HEADSHOT_SRC}
                      alt="Headshot of John Rodriguez"
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full border border-white/15 object-cover"
                    />
                    <div>
                      <div className="text-base font-bold text-white">{COPY.name}</div>
                      <div className="mt-1 text-sm text-white/70">{COPY.headline}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-white/75">Availability: {COPY.replySla}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={mailto}
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-cyan-300/45 bg-cyan-300/10 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                    <a
                      href={COPY.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white/85 transition hover:border-cyan-300/65"
                    >
                      GitHub
                    </a>
                    <a
                      href={COPY.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white/85 transition hover:border-cyan-300/65"
                    >
                      LinkedIn
                    </a>
                  </div>
                </article>

                <aside className="rounded-2xl border border-white/12 bg-black/35 p-5 sm:p-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/75">Direct line</div>
                  <a
                    href={mailto}
                    className="mt-3 inline-flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/[0.02] px-4 py-3 text-sm text-white/85 transition hover:border-cyan-300/65"
                  >
                    <span>{COPY.email}</span>
                    <Mail className="h-4 w-4" />
                  </a>
                  <p className="mt-4 text-sm leading-7 text-white/75">This opens your email client with the details prefilled.</p>
                </aside>
              </div>

              <footer className="mt-8 border-t border-white/12 pt-5 text-xs text-white/55">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>
                    Copyright {new Date().getFullYear()} {COPY.name}. Built with Next.js + Tailwind.
                  </span>
                  <button
                    type="button"
                    onClick={() => goToSection("home")}
                    className="text-white/75 transition hover:text-cyan-100"
                  >
                    Return to Home
                  </button>
                </div>
              </footer>
            </SectionShell>
          </main>
        </div>
      </div>
    </div>
  );
}
