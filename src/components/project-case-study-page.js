import Image from "next/image";

import { buildMailtoLink, portfolioSite, socialProofLabel } from "@/lib/portfolio";

import { Backdrop, Button, Card, Icon, TOKENS, cx } from "./portfolio-ui";

function DetailCard({ label, children }) {
  return (
    <Card interactive className="h-full">
      <div className="text-[11px] uppercase tracking-[0.2em] text-orange-200/70">{label}</div>
      <div className="mt-3 text-sm leading-7 text-white/78">{children}</div>
    </Card>
  );
}

export function ProjectCaseStudyPage({ project }) {
  const inquiryLink = buildMailtoLink({
    subject: `Portfolio inquiry: ${project.title}`,
    body: `Hey John,\n\nI read the ${project.title} case study and would like to connect about...\n\n- Context\n- Scope\n- Timeline\n\nThanks,\n`,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-x-clip">
        <Backdrop />

        <div className={cx("relative z-10", TOKENS.container, "py-6 sm:py-8")}>
          <header className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <span className="text-sm font-extrabold text-white">JR</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">{portfolioSite.name}</div>
                  <div className="text-xs text-white/60">Case study</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href="/" variant="secondary">
                  Back to portfolio
                </Button>
                <Button href={inquiryLink}>
                  Contact John <Icon name="mail" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <main className="py-12 sm:py-16">
            <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-sky-200/92">Case study</div>
                <h1 className={cx(TOKENS.h1, "mt-3 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)]")}>
                  {project.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-100/80">{project.tagline}</p>
                <p className={cx(TOKENS.body, "mt-5 max-w-2xl")}>{project.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className={TOKENS.chip}>
                      {item}
                    </span>
                  ))}
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/55">
                    {socialProofLabel}
                  </span>
                </div>
              </div>

              <Card interactive>
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="mt-5 grid gap-3 text-sm leading-6 text-white/68">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-sky-200/90">Role</div>
                    <p className="mt-1">{project.role}</p>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-sky-200/90">
                      Current status
                    </div>
                    <p className="mt-1">{project.status}</p>
                  </div>
                </div>
              </Card>
            </section>

            <section className="mt-12 grid gap-6 md:grid-cols-2">
              <DetailCard label="Problem">{project.problem}</DetailCard>
              <DetailCard label="Solution">{project.solution}</DetailCard>
            </section>

            <section className="mt-12">
              <Card interactive>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-sky-200/92">
                      Next conversation
                    </div>
                    <h2 className={cx(TOKENS.h2, "mt-2")}>Need this kind of systems thinking on your team?</h2>
                    <p className={cx(TOKENS.body, "mt-3")}>
                      If you need someone who can clarify the workflow, build the interface, and make the
                      reporting line up with reality, send a note.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button href={inquiryLink}>
                      Email John <Icon name="arrow" className="h-4 w-4" />
                    </Button>
                    <Button href="/" variant="secondary">
                      View more work
                    </Button>
                  </div>
                </div>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
