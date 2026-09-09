import Image from "next/image";
import { AllowanceVisual } from "./allowance-visual";

import { buildMailtoLink, portfolioSite } from "@/lib/portfolio";

import { Backdrop, Button, Card, Icon, TOKENS, cx } from "./portfolio-ui";

function DetailCard({ label, children }) {
  return (
    <Card interactive className="h-full">
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-orange-200/75">{label}</h3>
      <div className="mt-3 text-sm leading-7 text-white/78">{children}</div>
    </Card>
  );
}

function FactCard({ label, children }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.025] p-4">
      <h3 className="text-[11px] uppercase tracking-[0.18em] text-sky-200/90">{label}</h3>
      <div className="mt-2 text-sm leading-6 text-white/78">{children}</div>
    </div>
  );
}

function ListSection({ title, eyebrow, items, variant = "cards" }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <div className="text-[11px] uppercase tracking-[0.22em] text-sky-200/90">{eyebrow}</div>
        <h2 className={cx(TOKENS.h2, "mt-2")}>{title}</h2>
      </div>

      {variant === "cards" ? (
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} interactive className="h-full">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/76">{item.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/12 bg-white/[0.025] p-4 text-sm leading-6 text-white/78"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className={cx("relative z-10", TOKENS.container, "py-6 sm:py-8")}>
          <header className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <span className="text-sm font-extrabold text-white">JR</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-white">{portfolioSite.name}</div>
                  <div className="text-xs text-white/70">Case study</div>
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

          <main id="main-content" className="py-12 sm:py-16" tabIndex={-1}>
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
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/75">
                    {project.statusLabel}
                  </span>
                </div>
              </div>

              <Card interactive>
                {project.slug === "allowance" ? <AllowanceVisual priority /> : <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black/40">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className={cx("h-auto w-full object-contain", project.image.fit === "contain" && "max-h-[440px] p-6")}
                  />
                </div>}
                <div className="mt-5 grid gap-3 text-sm leading-6 text-white/74">
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

            {project.contextImage ? (
              <section className="mt-12" aria-labelledby="desktop-context-title">
                <h2 id="desktop-context-title" className={TOKENS.h2}>The same reading, alongside the work.</h2>
                <p className={cx(TOKENS.body, "mt-3 max-w-3xl")}>
                  This desktop capture shows Allowance and the account usage menu both at 53% remaining.
                  The pinned companion keeps that reading visible while the main workspace stays open.
                </p>
                <figure className="mt-6">
                  <a href={project.contextImage.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-sky-300" aria-label="Open the full desktop screenshot in a new tab">
                    <Image {...project.contextImage} alt={project.contextImage.alt} sizes="(min-width: 1200px) 1100px, 100vw" className="h-auto w-full" />
                  </a>
                  <figcaption className="mt-3 text-sm text-white/55">Actual desktop capture, September 9, 2026. Open the image to inspect it at full size.</figcaption>
                </figure>
              </section>
            ) : null}

            <section className="mt-12">
              <div className="mb-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-sky-200/90">
                  The problem
                </div>
                <h2 className={cx(TOKENS.h2, "mt-2")}>What needed to change.</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <DetailCard label="Problem">{project.problem}</DetailCard>
                <DetailCard label="What I built">{project.solution}</DetailCard>
              </div>
            </section>

            <section className="mt-12">
              <div className="mb-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-sky-200/90">Scope</div>
                <h2 className={cx(TOKENS.h2, "mt-2")}>Role, stack, and validation.</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <FactCard label="Role">{project.role}</FactCard>
                <FactCard label="Status">{project.status}</FactCard>
                <FactCard label="Stack">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className={TOKENS.chip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </FactCard>
                <FactCard label="Validation">
                  <ul className="space-y-2">
                    {(project.validation || [project.outcome]).filter(Boolean).slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FactCard>
              </div>
            </section>

            <ListSection
              eyebrow="Decision-making"
              title="Key decisions"
              items={project.keyDecisions}
            />

            <ListSection
              eyebrow="Next improvements"
              title="Planned refinements"
              items={project.nextSteps}
              variant="list"
            />

            <section className="mt-12">
              <Card interactive>
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-sky-200/92">
                      Work together
                    </div>
                    <h2 className={cx(TOKENS.h2, "mt-2")}>Have a workflow that needs work?</h2>
                    <p className={cx(TOKENS.body, "mt-3")}>
                      Tell me what your team is trying to do and where the current process gets in the way.
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
