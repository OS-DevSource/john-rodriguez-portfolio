"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, CircleDot, ExternalLink, Github } from "lucide-react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectsArcadeProps = {
  projects: Project[];
  defaultProjectId?: string;
};

type ScreenPhase = "idle" | "eject" | "insert";

export function ProjectsArcade({ projects, defaultProjectId }: ProjectsArcadeProps) {
  const fallbackId = projects[0]?.id ?? "";
  const [activeId, setActiveId] = useState(defaultProjectId ?? fallbackId);
  const [phase, setPhase] = useState<ScreenPhase>("idle");
  const timersRef = useRef<number[]>([]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? projects[0],
    [activeId, projects]
  );

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const loadProject = (projectId: string) => {
    if (projectId === activeId || phase !== "idle") return;
    clearTimers();
    setPhase("eject");

    const ejectTimer = window.setTimeout(() => {
      setActiveId(projectId);
      setPhase("insert");

      const insertTimer = window.setTimeout(() => {
        setPhase("idle");
      }, 220);

      timersRef.current.push(insertTimer);
    }, 180);

    timersRef.current.push(ejectTimer);
  };

  if (!activeProject) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
      <aside className="min-w-0 rounded-2xl border border-white/10 bg-black/45 p-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/75">Cartridge Slots</div>
          <Box className="h-4 w-4 text-cyan-200/75" />
        </div>

        <div role="tablist" aria-label="Project slots" className="grid min-w-0 gap-2">
          {projects.map((project, index) => {
            const isActive = project.id === activeId;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`screen-${project.id}`}
                onClick={() => loadProject(project.id)}
                className={cn(
                  "w-full overflow-hidden rounded-xl border px-3 py-3 text-left transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  isActive
                    ? "border-cyan-300/55 bg-cyan-400/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                )}
              >
                <div className="text-[11px] uppercase tracking-[0.17em] text-white/55">Slot {String(index + 1).padStart(2, "0")}</div>
                <div className="mt-1 min-w-0 truncate text-sm font-semibold">{project.title}</div>
                <div className="mt-1 min-w-0 truncate text-xs text-white/55">{project.oneLine}</div>
              </button>
            );
          })}
        </div>
      </aside>

      <section
        id={`screen-${activeProject.id}`}
        className={cn(
          "rounded-2xl border border-cyan-200/20 bg-[#070b15]/95 p-5 sm:p-6",
          "transition-all duration-200",
          phase === "eject" ? "opacity-55 blur-[1px]" : "opacity-100 blur-0"
        )}
        aria-live="polite"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/75">Arcade Screen</div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
            <CircleDot
              className={cn(
                "h-3.5 w-3.5",
                phase === "eject" ? "text-orange-300" : phase === "insert" ? "text-cyan-300" : "text-green-300"
              )}
            />
            {phase === "eject" ? "Eject" : phase === "insert" ? "Insert" : "Ready"}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white sm:text-3xl">{activeProject.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">{activeProject.oneLine}</p>

        <ul className="mt-5 space-y-2 text-sm text-white/80">
          {activeProject.outcomes.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {activeProject.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-xs text-white/75"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {activeProject.links.live ? (
            <a
              href={activeProject.links.live}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg border border-cyan-300/45 px-4 text-sm font-semibold text-cyan-100",
                "transition hover:border-cyan-200 hover:bg-cyan-300/10"
              )}
            >
              Launch <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-semibold text-white/40"
            >
              Launch unavailable
            </button>
          )}

          {activeProject.links.github ? (
            <a
              href={activeProject.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white/85",
                "transition hover:border-cyan-300/60 hover:text-white"
              )}
            >
              View Source <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
