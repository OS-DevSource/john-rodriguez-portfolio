const DEFAULT_SITE_URL = "https://john-rodriguez-portfolio.vercel.app";

export const portfolioSite = {
  name: "John Rodriguez",
  shortName: "John Rodriguez Portfolio",
  title: "John Rodriguez | GTM Systems, RevOps, Internal Tools",
  description:
    "Portfolio for John Rodriguez, a GTM systems and automation builder focused on RevOps workflows, internal tools, lead flow, reporting, and AI-assisted operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  location: "Jarrell, TX (Central Time)",
  timezoneLabel: "Central TX | Remote-ready",
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  resume: "/resume/john-rodriguez-resume.pdf",
  replySla: "Replies within 24 hours on weekdays.",
  availability:
    "Open to product-minded ops, RevOps, automation, and internal tools work.",
};

export const heroContent = {
  eyebrow: "GTM SYSTEMS | REVOPS | INTERNAL TOOLS",
  headlineLead: "Systems builder for",
  headlineAccent: "GTM teams, internal tools, and automation.",
  headline:
    "Systems builder for GTM teams, internal tools, and automation.",
  summary:
    "I turn messy handoffs, lead flow, reporting gaps, and manual workflows into usable systems teams can actually run.",
  callout:
    "I work where RevOps, product thinking, and web app execution meet: lifecycle rules, intake design, integrations, dashboards, and field-ready UI.",
  profileTitle: "GTM systems, AI workflow automation, and internal tools.",
  profileSignal:
    "Practical systems that keep teams aligned as volume, handoffs, and complexity grow.",
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
    slug: "memorex",
    title: "Memorex",
    proofType: "AI workflow memory",
    tagline:
      "AI-native project memory for agent workflow continuity, decisions, traces, and handoff briefs.",
    cardSummary: "Project memory for fragmented agent work.",
    cardProblem:
      "Agent-assisted work drops context between sessions, tools, decisions, and handoffs.",
    cardSolution:
      "Event streams, trace views, memory ledgers, decisions, and generated handoff briefs.",
    cardMeta:
      "Prototype validating AI-native project memory, handoff continuity, and context recovery.",
    seoDescription:
      "Memorex is an AI-native project memory prototype for preserving task context, decisions, handoffs, and generated briefs across agent-assisted work.",
    summary:
      "Memorex validates a practical answer to a real LLM workflow problem: project context gets fragmented across sessions, tools, and implementation passes.",
    problem:
      "Agent-assisted software work can move quickly, but important context often lives in chat fragments, issue comments, branch state, and memory notes. That makes the next pass slower and riskier.",
    solution:
      "Designed a project memory prototype around event streams, task context, memory ledgers, selected traces, generated briefs, and handoff-ready summaries.",
    outcome:
      "Prototype validating whether AI-native project memory can improve continuity between implementation passes.",
    role:
      "Product concept, workflow modeling, information architecture, implementation planning, and AI workflow design.",
    stack: ["Next.js", "React", "Vercel", "Linear", "Miro", "AI workflows"],
    cardStack: ["Next.js", "React", "Vercel", "Linear", "AI workflows"],
    status:
      "Prototype built to validate AI-native project memory and handoff continuity.",
    statusLabel: "Prototype",
  validation: [
      "Modeled event streams, memory ledgers, trace views, and generated briefs.",
      "Focused the prototype on preserving project context across fragmented work.",
      "Defined clear prototype boundaries for integrations, sync, and handoff behavior.",
    ],
    keyDecisions: [
      {
        title: "Start with continuity",
        description:
          "The product centers on what the next implementation pass needs to know, not on storing every possible artifact.",
      },
      {
        title: "Keep evidence visible",
        description:
          "Events, selected traces, and generated briefs are separate so summaries can stay reviewable.",
      },
      {
        title: "Design for operator trust",
        description:
          "The workflow favors clear context and handoff quality over black-box automation.",
      },
    ],
    nextSteps: [
      "Tighten the bridge between task stages, selected traces, and generated briefs.",
      "Clarify integration boundaries for future production work.",
      "Add more validation around retrieval quality and stale context handling.",
    ],
    image: {
      src: "/projects/memorex-proof-card.svg",
      alt: "Memorex project memory interface with event streams, trace views, and handoff briefs.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
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
      "Internal prototype with Convex persistence and core route smoke coverage.",
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
      "Internal field workflow prototype with Convex-backed persistence and smoke-test coverage for core routes.",
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
      src: "/projects/insight-proof-card.svg",
      alt: "Insight mobile field sales interface with map markers, lead status, appointments, and activity history.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
      href: "/projects/insight",
    },
  },
  {
    slug: "trinity-generator-quote-tool",
    title: "Trinity Quote Tool",
    proofType: "Quote workflow",
    tagline:
      "Structured quote workflow for intake, pricing controls, signatures, uploads, and PDF proposal generation.",
    cardSummary: "Quote workflow for cleaner sales proposals.",
    cardProblem:
      "Quote work slows when customer inputs, pricing rules, uploads, and approvals split apart.",
    cardSolution:
      "Structured intake, pricing controls, uploads, signatures, access rules, and PDF output.",
    cardMeta:
      "Production-style workflow for intake, quoting, signature capture, and PDF proposals.",
    seoDescription:
      "Trinity Quote Tool is a production-style quote workflow covering intake, pricing controls, signatures, uploads, role-aware access, and PDF proposal generation.",
    summary:
      "The Trinity Quote Tool turns pricing, customer inputs, files, signatures, and final PDF output into a more repeatable proposal process.",
    problem:
      "Quoting gets slower and less consistent when customer inputs, files, signatures, pricing logic, and final proposal generation are handled through scattered manual steps.",
    solution:
      "Built a mobile-first quote workflow with structured intake, uploads, signatures, pricing controls, role-aware access, Supabase-backed storage, and server-side PDF generation.",
    outcome:
      "Production-style quote workflow focused on consistent intake, quoting, signature capture, and PDF proposal generation.",
    role:
      "Workflow design, UX refinement, quote logic, auth/storage problem solving, PDF generation, and deployment troubleshooting.",
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Postgres",
      "Storage",
      "RLS",
      "PDFKit",
    ],
    cardStack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "PDFKit"],
    status:
      "Production-style quote workflow focused on consistent intake, quoting, signature capture, and PDF proposal generation.",
    statusLabel: "Production-style build",
    validation: [
      "Resolved production-style issues across auth, storage, PDF generation, pricing logic, deployment constraints, and UI refinement.",
      "Kept the workflow centered on repeatable proposal generation instead of ad hoc document assembly.",
      "Used role-aware access and server-side PDF generation as core workflow boundaries.",
    ],
    keyDecisions: [
      {
        title: "Structure before output",
        description:
          "The quote path captures pricing inputs and customer requirements before generating the proposal.",
      },
      {
        title: "Treat files as workflow data",
        description:
          "Uploads, signatures, storage, and proposal output are part of the same quote process.",
      },
      {
        title: "Solve production-style constraints",
        description:
          "Auth, RLS, storage, PDF generation, and deployment behavior shaped the implementation details.",
      },
    ],
    nextSteps: [
      "Keep tightening pricing rule visibility for non-technical operators.",
      "Add more guardrails around incomplete quote inputs and proposal review states.",
      "Document deployment constraints and PDF generation failure modes for handoff.",
    ],
    image: {
      src: "/projects/trinity-proof-card.svg",
      alt: "Trinity Quote Tool interface with structured intake, pricing controls, signature capture, and PDF proposal output.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
      href: "/projects/trinity-generator-quote-tool",
    },
  },
];

export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
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
