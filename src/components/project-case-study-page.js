import Image from "next/image";
import Link from "next/link";

import { AllowanceVisual } from "./allowance-visual";
import { Icon } from "./portfolio-ui";
import { WorkbenchSample } from "./workbench-sample";

export function ProjectCaseStudyPage({ project }) {
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
            <AllowanceVisual priority />
          ) : (
            <figure className="case-image">
              <Image
                {...project.image}
                alt={project.image.alt}
                sizes="(min-width: 830px) 580px, 100vw"
                priority
              />
              <figcaption>
                {project.slug === "memorex"
                  ? "Project memory console with seeded events."
                  : "Field sales queue with sample leads."}
              </figcaption>
            </figure>
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
              <dt>In use</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
        </section>

        {project.contextImage && (
          <figure className="context-image">
            <a
              href={project.contextImage.src}
              target="_blank"
              rel="noreferrer"
              aria-label="Open full desktop screenshot"
            >
              <Image
                {...project.contextImage}
                alt={project.contextImage.alt}
                sizes="(min-width: 1200px) 1120px, 100vw"
              />
            </a>
            <figcaption>
              Desktop capture, September 2026. The pinned companion and the
              account menu both show 53% remaining.
            </figcaption>
          </figure>
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
