import Image from "next/image";
import Link from "next/link";
import printer from "../../public/projects/ticket-printer.webp";
import phonePrinter from "../../public/projects/ticket-printer-small.webp";

import { getProjectBySlug, heroContent, portfolioSite } from "@/lib/portfolio";
import { CapacityMeter, SourceDrawer } from "./project-instruments";
import { PrinterStage } from "./printer-stage";
import { Credentials } from "./credentials";
import { ContactForm } from "./contact-form";
import { Icon } from "./portfolio-ui";
import { WorkbenchSample } from "./workbench-sample";

function ProjectLink({ project }) {
  return (
    <Link
      className="text-link"
      href={project.primaryCta.href}
      aria-label={`Read the ${project.title} case study`}
    >
      Read case study <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}

function TicketPress() {
  return (
    <PrinterStage>
      <picture>
        <source media="(max-width: 599px)" srcSet={phonePrinter.src} />
        <Image
          src={printer}
          alt="A thermal ticket printer with an orange print key, next to a plumbing job note and an elbow fitting."
          unoptimized
          loading="eager"
          fetchPriority="high"
        />
      </picture>
    </PrinterStage>
  );
}

export function PortfolioHome() {
  const workbench = getProjectBySlug("mk-workbench");
  const allowance = getProjectBySlug("allowance");
  const memorex = getProjectBySlug("memorex");
  const insight = getProjectBySlug("insight");

  return (
    <div className="portfolio-shell" id="home">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header frame">
        <a href="#home" className="brand" aria-label="John Rodriguez, home">
          <span>JR</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="hero frame" aria-labelledby="intro-name">
          <div className="hero-copy">
            <p className="kicker">
              <Icon name="pin" className="h-4 w-4" />
              Central Texas
            </p>
            <h1 id="intro-name">
              John <span>Rodriguez</span>
            </h1>
            <p className="hero-line">{heroContent.summary}</p>
            <a className="contact-action" href="#contact">
              Get in touch <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
          <TicketPress />
        </section>

        <section
          id="projects"
          className="frame work"
          aria-labelledby="work-title"
        >
          <h2 id="work-title" className="section-rule">
            Selected work
          </h2>
          <article className="feature">
            <div>
              <p className="kicker">{workbench.category}</p>
              <h3>{workbench.title}</h3>
              <p className="feature-line">{workbench.tagline}</p>
              <p className="body-copy">
                I built this for a plumbing business. AI suggests details from
                the paperwork. The person doing the billing checks each one
                before it goes on the invoice.
              </p>
              <ProjectLink project={workbench} />
            </div>
            <WorkbenchSample />
          </article>

          <article className="allowance-feature">
            <CapacityMeter />
            <div>
              <p className="kicker">{allowance.category}</p>
              <h3>{allowance.title}</h3>
              <p className="feature-line">{allowance.tagline}</p>
              <p className="body-copy">
                A small menu-bar app that shows what’s left and when it resets.
                Expand it for details, or pin it beside your editor.
              </p>
              <div className="project-actions">
                <ProjectLink project={allowance} />
                <a className="quiet-link" href={allowance.secondaryCta.href}>
                  View source
                </a>
              </div>
            </div>
          </article>

          <article className="feature memory-feature">
            <div>
              <p className="kicker">{memorex.category}</p>
              <h3>{memorex.title}</h3>
              <p className="feature-line">{memorex.tagline}</p>
              <p className="body-copy">
                My next coding session starts with a short brief. Each decision
                links back to the record that explains it.
              </p>
              <ProjectLink project={memorex} />
            </div>
            <SourceDrawer />
          </article>

          <article className="project-row">
            <Image
              {...insight.image}
              alt={insight.image.alt}
              sizes="(min-width: 640px) 190px, 94px"
            />
            <div>
              <p className="kicker">{insight.category}</p>
              <h3>{insight.title}</h3>
              <p className="body-copy">{insight.tagline}</p>
            </div>
            <ProjectLink project={insight} />
          </article>
        </section>

        <section
          id="about"
          className="frame lower-section"
          aria-labelledby="about-title"
        >
          <h2 id="about-title" className="section-rule">
            About John
          </h2>
          <div className="about-layout" id="strengths">
            <Image
              src="/headshot.jpg"
              alt="John Rodriguez"
              width={128}
              height={128}
              sizes="96px"
              className="portrait"
            />
            <div>
              <h3>I came to software through operations.</h3>
              <p className="body-copy">
                I spent more than 15 years in sales and operations, running
                stores, leading teams, and training the people doing the work.
                That’s where I learned to ask what happens after someone fills
                out the form.
              </p>
              <p className="body-copy">
                Today I build full-stack tools and evaluate AI professionally. I
                check model answers for accuracy, test how they handle
                instructions, and look for the point where a person needs to
                step in.
              </p>
              <div className="profile-links">
                <a href={portfolioSite.resume}>Résumé</a>
                <a href={portfolioSite.github}>GitHub</a>
                <a href={portfolioSite.linkedin}>LinkedIn</a>
              </div>
              <Credentials />
            </div>
          </div>
        </section>

        <section
          id="contact"
          tabIndex={-1}
          className="frame lower-section"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title" className="section-rule">
            Contact
          </h2>
          <div className="contact-layout">
            <div>
              <h3>Get in touch.</h3>
              <p className="body-copy">
                Tell me about the work your team does and where it gets stuck.
                I’m open to projects and roles in software, operations, and AI
                evaluation.
              </p>
              <a className="text-link" href={`mailto:${portfolioSite.email}`}>
                {portfolioSite.email} <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="frame site-footer">
        <span>© {new Date().getFullYear()} John Rodriguez</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
