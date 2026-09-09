const DEFAULT_SITE_URL = "https://johnrodriguez.vercel.app";

export const portfolioSite = {
  name: "John Rodriguez",
  shortName: "John Rodriguez",
  title: "John Rodriguez | AI Evaluation & Software Development",
  description:
    "John Rodriguez builds software for business operations and evaluates AI models. Explore his work in agent memory, field service, and sales tools, plus training and credentials.",
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  githubLabel: "Public GitHub",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  resume: "/resume/john-rodriguez-resume.pdf",
  replySla: "Replies within 24 hours on weekdays.",
  availability:
    "Open to AI evaluation, software development, and operations roles.",
};

export const heroContent = {
  eyebrow: "AI EVALUATION · SOFTWARE · OPERATIONS",
  headlineLead: "John Rodriguez",
  headlineAccent: "builds useful software and evaluates AI.",
  headline:
    "John Rodriguez builds useful software and evaluates AI.",
  summary:
    "I turn hands-on experience in sales and operations into useful software—and bring that same attention to detail to evaluating AI.",
  profileTitle: "AI evaluator and software builder.",
  profileSignal:
    "From reviewing model responses to building the tools people use at work.",
};

export const aboutContent = {
  title: "Built from experience on both sides of the software.",
  subtitle:
    "Before building software, I ran sales teams, managed stores, trained people, and owned the daily follow-through. Today I build applications and work as a paid AI trainer and LLM evaluator. That background helps me spot the gap between a convincing answer and something that works in practice.",
  outcomes: [
    "AI evaluation across coding, factuality, instruction following, and comparative tasks.",
    "Applications that connect the everyday details: job photos, customer records, invoices, leads, and follow-up.",
    "Sales and operations experience spanning team leadership, CRM workflows, hiring, and training.",
  ],
  process: [
    "Understand the job first. Talk through who does the work, where it stalls, and what they need next.",
    "Build a usable path through it. Keep the source information close and make the next step clear.",
    "Check the result. Test real tasks, investigate failures, and explain the decisions behind the work.",
  ],
};

export const trainingCredentials = [
  {
    image: { src: "/certifications/google-ai.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/google-ai.pdf",
    title: "Google AI Professional Certificate",
    issuer: "Google / Coursera",
    date: "September 4, 2026",
    description: "Completed all eight courses, covering practical AI use in research, communication, content creation, data analysis, and app building and deployment.",
    href: "https://coursera.org/verify/professional-cert/II1LEJTA8C4N",
  },
  {
    image: { src: "/certifications/python-functions.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/python-functions.pdf",
    title: "Functions and Conditional Statements",
    issuer: "Google / Coursera",
    date: "September 8, 2026",
    href: "https://coursera.org/verify/9Y6SBIVFCK4V",
  },
  {
    image: { src: "/certifications/hello-python.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/hello-python.pdf",
    title: "Hello, Python!",
    issuer: "Google / Coursera",
    date: "September 7, 2026",
    href: "https://coursera.org/verify/KFUUXPV1VAEB",
  },
  {
    image: { src: "/certifications/prompt-engineering.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/prompt-engineering.pdf",
    title: "Advanced Prompt Engineering Techniques",
    issuer: "LinkedIn Learning",
    date: "August 31, 2026",
  },
  {
    image: { src: "/certifications/large-language-models.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/large-language-models.pdf",
    title: "Introduction to Large Language Models",
    issuer: "LinkedIn Learning",
    date: "August 28, 2026",
  },
  {
    image: { src: "/certifications/data-annotation.jpg", width: 1400, height: 1082 },
    pdf: "/certifications/data-annotation.pdf",
    title: "Break into AI: Data Annotation Essentials",
    issuer: "LinkedIn Learning",
    date: "August 2026",
  },
];

export const certificationContent = {
  title: "Certified by micro1",
  issuer: "micro1",
  issued: "August 2026",
  description:
    "Awarded for outstanding performance during micro1’s AI Interview.",
  image: {
    src: "/certifications/micro1-certification.jpg",
    alt: "Certified by micro1 certificate awarded to John Rodriguez for outstanding performance during micro1's AI Interview.",
    width: 2040,
    height: 1440,
  },
};

export const strengths = [
  {
    title: "Sales & operations",
    description:
      "I’ve owned the pipeline, trained the team, and managed the follow-up. I use that experience to build tools around how people actually work.",
  },
  {
    title: "AI evaluation",
    description:
      "I compare model responses, write evaluation criteria, investigate unsupported claims, and explain why one response better meets the task.",
  },
  {
    title: "Software development",
    description:
      "I take applications from workflow and interface design through implementation, automated testing, and deployment.",
  },
];

export const portfolioProjects = [
  {
    slug: "mk-workbench",
    title: "MK Workbench",
    proofType: "Applied AI / operations",
    tagline:
      "A private production job-to-invoice system for field service operations.",
    cardSummary: "From job photos to a reviewed, ready-to-send invoice.",
    cardProblem:
      "Photos, notes, line items, customer details, and invoices can get scattered across tools and manual handoffs.",
    cardSolution:
      "One place to review source documents, check AI-extracted details, manage the job, and prepare the invoice.",
    cardMeta:
      "Used in production by a plumbing business, with required review, user permissions, and automated tests.",
    seoDescription:
      "MK Workbench is a private production job-to-invoice platform connecting intake, document review, job records, invoice generation, finalization, and archive.",
    summary:
      "Built for a plumbing business, MK Workbench brings job documents, customer details, invoice drafting, and PDF generation into one mobile-ready application.",
    problem:
      "Field service jobs produce fragmented operational data: photos, texts, notes, addresses, line items, invoice terms, and PDFs. Reconstructing that story by hand makes billing slower and less trustworthy.",
    solution:
      "Built a shared workspace for intake, job review, invoice drafting, and archive. AI proposes details from images; a person checks them before approval. Customer matching, user roles, and an audit trail support the daily workflow.",
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
      "Explore other field-service workflows after validating changes in daily use.",
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
      "Project memory that helps coding agents pick up where the last session left off.",
    cardSummary: "The next session starts with the decisions behind the code.",
    cardProblem:
      "AI coding work loses decisions, failures, relationships, and handoff context across sessions and tools.",
    cardSolution:
      "Captures decisions and checkpoints, then retrieves a compact summary with links back to the source.",
    cardMeta:
      "Private product used in my development workflow, with a Codex plugin and local and hosted storage.",
    seoDescription:
      "Memorex preserves decisions and checkpoints across coding sessions, with cited retrieval, project-scoped memory, and a Codex plugin.",
    summary:
      "Memorex preserves what happened, why it happened, what broke, and what the next coding agent needs to know, then compiles that history into compact, cited context instead of replaying raw logs.",
    problem:
      "Agent-assisted software work moves quickly, but decisions, failures, branch context, and handoff details fragment across tasks and tools. The next run either starts cold or consumes too much unfiltered history.",
    solution:
      "Built a memory system that captures decisions and task checkpoints, finds relevant history, and supplies compact context with citations. The Codex plugin now includes automatic repository enrollment after setup, workspace coverage, and controls to pause or resume memory.",
    outcome:
      "A private agent-memory product used across my own projects, with a Codex plugin, cited retrieval, and controls for memory coverage.",
    role:
      "Product concept, system architecture, lifecycle and retrieval design, full-stack implementation, Codex integration, storage contracts, testing, and deployment hardening.",
    stack: ["Next.js", "TypeScript", "SQLite", "PostgreSQL", "MCP", "Codex plugin"],
    cardStack: ["Next.js", "TypeScript", "SQLite", "PostgreSQL", "MCP"],
    status:
      "Private product in active use across my development projects.",
    statusLabel: "Private / deployed",
    validation: [
      "Includes a workspace, CLI, and Codex plugin for capturing and retrieving project history.",
      "Returns compact context with expandable citations and connections between related records.",
      "Supports local and hosted storage, with controls to view, enable, or pause memory coverage.",
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
      "Evaluate retrieval quality across longer projects and concurrent coding sessions.",
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
    cardSummary: "Leads, visits, and follow-up in one mobile workspace.",
    cardProblem:
      "Field teams lose time when lead status, appointments, notes, and map context split apart.",
    cardSolution:
      "Map-based lead review, quick field actions, duplicate-aware CSV imports, and shareable visit cards.",
    cardMeta:
      "Private internal prototype with Convex persistence and core route smoke coverage.",
    seoDescription:
      "Insight is a mobile-first field sales workflow prototype with map-centric leads, appointments, CSV import, Convex persistence, and route smoke coverage.",
    summary:
      "Insight is a mobile-first lead and appointment tracker built around one-handed field use, fast lead review, simple activity capture, and operational visibility.",
    problem:
      "Field sales teams need quick context on phones: which leads are active, what happened today, where the next visit is, and which handoff or appointment needs attention.",
    solution:
      "Built map-based lead review with live location, quick edits, appointment history, and duplicate-aware CSV imports. Shareable visit cards include revocation and open tracking.",
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
      "Built persistent lead and appointment records with event history and route smoke tests.",
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
  {
    slug: "allowance",
    title: "Allowance",
    proofType: "Native macOS app",
    tagline: "A small macOS companion for checking remaining Codex capacity.",
    cardSummary: "Know what’s left. Get back to your work.",
    cardProblem: "Checking account limits interrupts the coding session, especially when several usage windows reset at different times.",
    cardSolution: "A native menu-bar app with remaining capacity, local reset times, expandable details, and a window you can keep on top.",
    cardMeta: "Open-source Swift app. Available to build from source; a notarized download is not yet available.",
    seoDescription: "Allowance is John Rodriguez’s native macOS companion for Codex capacity, with a compact interface, local reset times, and accessible controls.",
    summary: "I designed Allowance as a quiet companion to a coding session: a compact capacity display that expands when you need the details and stays out of the way when you don’t.",
    problem: "Account limits are useful only if you can understand them at a glance. Multiple windows, reset dates, and stale readings can make a small status check harder than it needs to be.",
    solution: "Built a native Swift app that reads account limits through the local Codex CLI. A shared refresh loop keeps the menu-bar companion current, while clear sign-in, network, and stale-data states explain when a reading needs attention.",
    outcome: "A source release with a compact and expanded interface, keyboard controls, and support for reduced motion and transparency.",
    role: "Product concept, visual design, native macOS implementation, CLI integration, original app artwork, and verification.",
    stack: ["Swift", "SwiftUI", "AppKit", "Codex CLI", "XCTest"],
    cardStack: ["Swift", "SwiftUI", "AppKit", "macOS"],
    status: "Open-source release. Build locally with the documented Xcode and CLI requirements; no notarized download yet. Independent project, unaffiliated with OpenAI.",
    statusLabel: "Open source / macOS",
    validation: [
      "Portable checks cover parsing, timeouts, CLI selection, and recovery after failure.",
      "One refresh loop prevents duplicate account requests.",
      "Unavailable readings stay distinct from a zero balance; stale readings retain their timestamp.",
    ],
    keyDecisions: [
      { title: "Keep the first view small", description: "Show the main capacity reading first. Expand the other windows only when the user needs them." },
      { title: "Make uncertainty visible", description: "Keep the last successful reading during a refresh failure and show that it is stale." },
      { title: "Use the native desktop", description: "Support a pinnable window, keyboard access, and system motion and transparency preferences." },
    ],
    nextSteps: ["Broaden compatibility testing across macOS and Codex CLI versions.", "Prepare signing and notarization before offering a downloadable app."],
    image: {
      src: "/projects/allowance-expanded.png",
      alt: "Allowance’s expanded macOS window showing capacity, reset times, and pin and refresh controls. Values reflect the screenshot capture time.",
      width: 756,
      height: 856,
      fit: "contain",
    },
    contextImage: {
      src: "/projects/allowance-desktop.png",
      alt: "Actual desktop with Allowance pinned at the upper left showing 53% remaining, matching the account usage menu in the main workspace.",
      width: 4480,
      height: 2520,
    },
    primaryCta: { label: "Case study", href: "/projects/allowance" },
    secondaryCta: { label: "View source", href: "https://github.com/OS-DevSource/allowance" },
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
