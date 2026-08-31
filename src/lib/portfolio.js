const DEFAULT_SITE_URL = "https://johnrodriguez.vercel.app";

export const portfolioSite = {
  name: "John Rodriguez",
  shortName: "John Rodriguez",
  title: "John Rodriguez | GTM Systems, RevOps, Internal Tools",
  description:
    "Portfolio for John Rodriguez, a GTM systems and automation builder focused on RevOps workflows, internal tools, lead flow, reporting, and AI-assisted operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  location: "Jarrell, TX (Central Time)",
  timezoneLabel: "Central TX | Remote-ready",
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  githubLabel: "Public GitHub",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  resume: "/resume/john-rodriguez-resume.pdf",
  replySla: "Replies within 24 hours on weekdays.",
  availability:
    "Open to product-minded ops, RevOps, automation, and internal tools work.",
};

export const heroContent = {
  eyebrow: "REVOPS | AI WORKFLOWS | INTERNAL TOOLS",
  headlineLead: "John Rodriguez",
  headlineAccent: "builds evidence-bound operational systems from messy workflows.",
  headline:
    "John Rodriguez builds evidence-bound operational systems from messy workflows.",
  summary:
    "I build job-to-invoice, agent-memory, and field-sales tools that keep context, workflow state, review gates, and next actions visible.",
  callout:
    "The pattern is consistent: preserve context, make workflow state explicit, keep human review where judgment matters, and build for the people doing the work.",
  profileTitle: "Operational systems, AI workflows, and internal tools.",
  profileSignal:
    "Systems that preserve context, expose state, and keep review where judgment matters.",
};

export const aboutContent = {
  title: "I build practical systems for revenue work that needs to move cleanly.",
  subtitle:
    "My background is 15+ years in sales and marketing, now paired with hands-on building across lead flow, reporting visibility, handoffs, and AI-assisted workflows.",
  outcomes: [
    "Lead and lifecycle workflows with clear ownership, status, and next action.",
    "Internal tools that make field activity, intake, reporting, and handoffs easier to run.",
    "AI-assisted operating workflows that preserve context without pretending judgment can be automated away.",
  ],
  process: [
    "Start with the real workflow: who owns it, what breaks, and what signal the team needs.",
    "Make states explicit so follow-up, reporting, and handoffs do not depend on memory.",
    "Ship small, test the path, document decisions, and keep the interface usable under pressure.",
  ],
};

export const certificationContent = {
  title: "Certified by micro1",
  issuer: "micro1",
  issued: "August 2026",
  description:
    "Recognized for outstanding performance during micro1's AI Interview, validating communication, accuracy, and task completion for AI project work.",
  image: {
    src: "/certifications/micro1-certification.jpg",
    alt: "Certified by micro1 certificate awarded to John Rodriguez for outstanding performance during micro1's AI Interview.",
    width: 2040,
    height: 1440,
  },
};

export const strengths = [
  {
    title: "GTM workflow architecture",
    description:
      "I turn lead flow, lifecycle rules, routing, and handoffs into explicit operating systems that teams can follow and leaders can inspect.",
  },
  {
    title: "AI-assisted operations",
    description:
      "I design practical AI workflows around context capture, handoff quality, review discipline, and repeatable execution.",
  },
  {
    title: "Internal tool building",
    description:
      "I build the forms, dashboards, maps, queues, and reporting surfaces that make operational work easier to use in the real world.",
  },
];

export const portfolioProjects = [
  {
    slug: "mk-workbench",
    title: "MK Workbench",
    proofType: "Applied AI / operations",
    tagline:
      "A private production job-to-invoice system for field service operations.",
    cardSummary: "A job becomes billable through a workflow, not memory.",
    cardProblem:
      "Photos, notes, line items, customer details, and invoices can get scattered across tools and manual handoffs.",
    cardSolution:
      "A review-gated intake-to-archive pipeline with human-approved AI extraction, explicit workflow state, regenerated PDFs, and audit history.",
    cardMeta:
      "Private and in production with server-enforced roles, CI, Vitest, Playwright, and production safety controls.",
    seoDescription:
      "MK Workbench is a private production job-to-invoice platform connecting intake, document review, job records, invoice generation, finalization, and archive.",
    summary:
      "MK Workbench preserves source material, extracts what it can, and routes every job through operational review, invoice review, finalization, and archive.",
    problem:
      "Field service jobs produce fragmented operational data: photos, texts, notes, addresses, line items, invoice terms, and PDFs. Reconstructing that story by hand makes billing slower and less trustworthy.",
    solution:
      "Built a Convex-backed workflow state machine for intake, review, invoice, finalization, and archive. OpenAI image extraction stays evidence-bound and review-only, and every important action writes to an audit log.",
    outcome:
      "A private production platform with explicit workflow state, role enforcement, automated coverage, and production safety controls.",
    role:
      "Product design, full-stack implementation, AI extraction guardrails, authentication and permissions, document generation, testing, and production safety.",
    stack: ["React", "Vite", "Convex", "OpenAI", "Vitest", "Playwright"],
    cardStack: ["React", "TypeScript", "Convex", "OpenAI", "Playwright"],
    status:
      "Private production job-to-invoice workflow platform.",
    statusLabel: "Private / production",
    validation: [
      "Uses Convex-backed data, storage, authentication, and server-enforced roles.",
      "Keeps OpenAI image extraction and OCR behind an explicit human review gate.",
      "Uses GitHub Actions, Vitest, Playwright smoke coverage, and production safety controls.",
    ],
    keyDecisions: [
      {
        title: "Put review before automation",
        description:
          "AI can propose structured fields, but low-confidence or ambiguous evidence cannot create trusted job or invoice state without a person.",
      },
      {
        title: "Make workflow state explicit",
        description:
          "Jobs move through named review gates so the next action and record history stay visible.",
      },
      {
        title: "Enforce access on the server",
        description:
          "Convex Auth, server-side permissions, allowlisted signup, and production-only controls protect the workflow at the data boundary.",
      },
    ],
    nextSteps: [
      "Package more trade-specific intake and confidence views without weakening the human review gate.",
      "Extend controlled mobile worker submission and customer search flows.",
      "Generalize the source-to-invoice pattern after the private operating loop remains dependable.",
    ],
    image: {
      src: "/projects/mk-workbench-product.png",
      alt: "MK Workbench review screen with sanitized demo data, workflow progress, job details, and approval controls.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/mk-workbench",
    },
  },
  {
    slug: "memorex",
    title: "Memorex",
    proofType: "Agent memory infrastructure",
    tagline:
      "An agent flight recorder, context compiler, and persistent project memory layer for AI coding workflows.",
    cardSummary: "Deep project memory, compact context for the next run.",
    cardProblem:
      "AI coding work loses decisions, failures, relationships, and handoff context across sessions and tools.",
    cardSolution:
      "Lifecycle capture, cited retrieval, scoped graph memory, generated context packs, and a project-first workspace.",
    cardMeta:
      "Private, deployed product with real-project dogfood, SQLite/Postgres runtime proof, and healthy live endpoints.",
    seoDescription:
      "Memorex is an agent flight recorder, context compiler, and persistent project memory layer with lifecycle capture, cited retrieval, scoped graph memory, and compact handoff context.",
    summary:
      "Memorex preserves what happened, why it happened, what broke, and what the next coding agent needs to know, then compiles that history into compact, cited context instead of replaying raw logs.",
    problem:
      "Agent-assisted software work moves quickly, but decisions, failures, branch context, and handoff details fragment across tasks and tools. The next run either starts cold or consumes too much unfiltered history.",
    solution:
      "Built a project-first memory system with task lifecycle capture, compact context packs, cited retrieval and expansion, scoped graph relationships, generated handoff briefs, a CLI, Codex integration, and local and hosted storage paths.",
    outcome:
      "A private, deployed agent-memory product with real-project dogfood, scoped graph memory, SQLite and Postgres runtime proof, and healthy live and readiness endpoints.",
    role:
      "Product concept, system architecture, lifecycle and retrieval design, full-stack implementation, Codex integration, storage contracts, testing, and deployment hardening.",
    stack: ["Next.js", "TypeScript", "SQLite", "PostgreSQL", "MCP", "Codex plugin"],
    cardStack: ["Next.js", "TypeScript", "SQLite", "PostgreSQL", "MCP"],
    status:
      "Private, deployed product in active real-project dogfood with healthy live and readiness endpoints.",
    statusLabel: "Private / deployed",
    validation: [
      "Runs a project-first workspace, lifecycle API, CLI, and Codex integration against real task history.",
      "Supports compact retrieval, citation expansion, scoped graph relationships, and generated context packs.",
      "Proves local SQLite and hosted PostgreSQL runtime paths with health and readiness checks.",
    ],
    keyDecisions: [
      {
        title: "Store deep, send small",
        description:
          "Raw history stays available, while normal agent runs receive compact, ranked context with citations back to source records.",
      },
      {
        title: "Scope memory at the boundary",
        description:
          "Project, repository, and task identifiers narrow retrieval and lifecycle writes so context cannot silently cross the wrong boundary.",
      },
      {
        title: "Keep evidence inspectable",
        description:
          "Summaries, relationships, and generated briefs retain citations so operators can inspect the records behind compressed context.",
      },
    ],
    nextSteps: [
      "Broaden real-project dogfood and measure context quality across longer, concurrent workstreams.",
      "Strengthen correction, redaction, and stale-context handling without bloating normal context packs.",
      "Continue hardening retrieval and storage behavior under larger project histories.",
    ],
    image: {
      src: "/projects/memorex-product.png",
      alt: "Memorex seeded pipeline proof console showing task activity, processor traces, and memory signals.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/memorex",
    },
  },
  {
    slug: "insight",
    title: "Insight",
    proofType: "Field workflow app",
    tagline:
      "Mobile-first lead and appointment tracker for field sales, map workflows, and operational visibility.",
    cardSummary: "Field workflow for mobile sales teams.",
    cardProblem:
      "Field teams lose time when lead status, appointments, notes, and map context split apart.",
    cardSolution:
      "Map-first lead review, quick actions, CSV import, editable details, and activity capture.",
    cardMeta:
      "Private internal prototype with Convex persistence and core route smoke coverage.",
    seoDescription:
      "Insight is a mobile-first field sales workflow prototype with map-centric leads, appointments, CSV import, Convex persistence, and route smoke coverage.",
    summary:
      "Insight is a mobile-first lead and appointment tracker built around one-handed field use, fast lead review, simple activity capture, and operational visibility.",
    problem:
      "Field sales teams need quick context on phones: which leads are active, what happened today, where the next visit is, and which handoff or appointment needs attention.",
    solution:
      "Built a map-centric workflow with geolocation, CSV import, editable lead details, quick actions, status control, Convex-backed persistence, and smoke-test coverage for core routes.",
    outcome:
      "Internal field workflow prototype with Convex-backed persistence and smoke-test coverage for core routes.",
    role:
      "Product workflow design, mobile UX, lead-state semantics, implementation, and route-level validation.",
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Convex",
      "Leaflet",
      "Papa Parse",
      "Playwright",
    ],
    cardStack: ["Next.js", "TypeScript", "Tailwind", "Convex", "Playwright"],
    status:
      "Private internal field workflow prototype with Convex-backed persistence and smoke-test coverage for core routes.",
    statusLabel: "Internal prototype",
    validation: [
      "Implemented schema, queries, mutations, seeded data, and core route smoke coverage.",
      "Designed for one-handed mobile use and fast field review.",
      "Separated lead states, appointment activity, and operational visibility.",
    ],
    keyDecisions: [
      {
        title: "Lead with the map",
        description:
          "Location and route context are primary because field work starts with where the rep is and what is nearby.",
      },
      {
        title: "Keep capture fast",
        description:
          "Quick actions and editable lead details reduce friction during mobile use.",
      },
      {
        title: "Make states explicit",
        description:
          "Lead status, appointments, and activity history stay visible so handoffs are easier to trust.",
      },
    ],
    nextSteps: [
      "Continue hardening mobile edge cases around filtering, map previews, and quick-edit flows.",
      "Expand validation around CSV import paths and appointment handoffs.",
      "Refine reporting surfaces once field workflow data is stable.",
    ],
    image: {
      src: "/projects/insight-product.png",
      alt: "Insight lead queue showing sanitized sample leads, pipeline counts, search, and field actions.",
      width: 2400,
      height: 1800,
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/insight",
    },
  },
];

export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "strengths", label: "Strengths" },
  { id: "contact", label: "Contact" },
];

export const socialProofLabel = "Selected work";

export function getProjectBySlug(slug) {
  return portfolioProjects.find((project) => project.slug === slug) || null;
}

export function getSiteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, portfolioSite.url).toString();
}

export function buildMailtoLink({ subject, body }) {
  const encodedSubject = encodeURIComponent(subject || "Portfolio inquiry");
  const encodedBody = encodeURIComponent(body || "Hey John,\n\n...");
  return `mailto:${portfolioSite.email}?subject=${encodedSubject}&body=${encodedBody}`;
}
