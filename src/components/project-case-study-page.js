import Image from "next/image";
import Link from "next/link";

import { CapacityMeter, SourceDrawer } from "./project-instruments";
import { Icon } from "./portfolio-ui";
import { WorkbenchSample } from "./workbench-sample";

function ProofPhoto({ image, sizes, label, className, priority, children }) {
  return (
    <a
      className="proof-photo"
      href={image.src}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${label} at full size in a new tab`}
    >
      <figure className={className}>
        <Image {...image} alt={image.alt} sizes={sizes} priority={priority} />
        <figcaption>
          {children}
          <span className="photo-link">View full size ↗</span>
        </figcaption>
      </figure>
    </a>
  );
}

export function ProjectCaseStudyPage({ project }) {
  const hasInstrument = ["allowance", "memorex"].includes(project.slug);
  return (
    <div className="portfolio-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header frame">
        <Link className="brand" href="/" aria-label="John Rodriguez, portfolio">
          <span>JR</span>
          <b>John Rodriguez</b>
        </Link>
        <nav aria-label="Portfolio navigation">
          <Link href="/#projects">All work</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <main id="main-content" className="frame case-page" tabIndex={-1}>
        <section className="case-lead" aria-labelledby="case-title">
          <div>
            <p className="kicker">{project.category}</p>
            <h1 id="case-title">{project.title}</h1>
            <p className="feature-line">{project.tagline}</p>
            <p className="body-copy">{project.summary}</p>
            {project.secondaryCta && (
              <a href={project.secondaryCta.href} className="text-link">
                View source <Icon name="arrow" className="h-4 w-4" />
              </a>
            )}
          </div>
          {project.slug === "mk-workbench" ? (
            <WorkbenchSample />
          ) : project.slug === "allowance" ? (
            <CapacityMeter priority />
          ) : project.slug === "memorex" ? (
            <SourceDrawer priority />
          ) : (
            <ProofPhoto
              image={project.image}
              label="Insight sales queue"
              className="case-image"
              sizes="(min-width: 830px) 580px, 100vw"
              priority
            >
              Field sales queue with sample leads.
            </ProofPhoto>
          )}
        </section>
        <section aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className="section-rule">
            The workflow
          </h2>
          <dl className="case-facts">
            <div>
              <dt>The constraint</dt>
              <dd>{project.problem}</dd>
            </div>
            <div>
              <dt>What I built</dt>
              <dd>{project.solution}</dd>
            </div>
            <div>
              <dt>{project.outcomeLabel || "In use"}</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
        </section>

        {hasInstrument && (
          <section aria-labelledby="app-heading">
            <h2 id="app-heading" className="section-rule">
              In the app
            </h2>
            <div className="proof-screens">
              <ProofPhoto
                image={project.image}
                label={`${project.title} app screenshot`}
                className="context-image"
                sizes="(min-width: 830px) 700px, 100vw"
              >
                {project.slug === "allowance"
                  ? "Expanded and compact windows. Account readings are covered."
                  : "The Memorex console with seeded project events."}
              </ProofPhoto>
              {project.contextImage && (
                <ProofPhoto
                  image={project.contextImage}
                  label="pinned Allowance window"
                  className="context-image pinned-capture"
                  sizes="(min-width: 830px) 460px, 100vw"
                >
                  The compact window pinned on the desktop.
                </ProofPhoto>
              )}
            </div>
          </section>
        )}

        <section aria-labelledby="build-heading">
          <h2 id="build-heading" className="section-rule">
            Engineering notes
          </h2>
          <div className="engineering-layout">
            <div>
              <h3>My role</h3>
              <p className="body-copy">{project.role}</p>
              <p className="stack-line">{project.stack.join(" · ")}</p>
            </div>
            <div>
              <h3>Safeguards and checks</h3>
              <ul>
                {project.validation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <footer className="site-footer">
          <Link href="/#projects">← All work</Link>
          <Link href="/#contact">Contact John →</Link>
        </footer>
      </main>
    </div>
  );
}
