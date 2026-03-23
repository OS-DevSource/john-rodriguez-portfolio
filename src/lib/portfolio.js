const DEFAULT_SITE_URL = "https://john-rodriguez-portfolio.vercel.app";

export const portfolioSite = {
  name: "John Rodriguez",
  shortName: "John Rodriguez Portfolio",
  title: "Operator-builder for GTM systems, web apps, and automation.",
  description:
    "John Rodriguez designs GTM systems, ships web apps, and builds automation that turns messy handoffs into reliable execution.",
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  location: "Jarrell, TX (Central Time)",
  timezoneLabel: "Central TX | Remote-ready",
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  replySla: "Replies within 24 hours on weekdays.",
  availability: "Available for product-minded ops and systems work.",
};

export const heroContent = {
  eyebrow: "GTM SYSTEMS | WEB APPS | AUTOMATION",
  headline: "Operator-builder for GTM systems and web apps.",
  summary:
    "I turn messy handoffs into reliable execution with lifecycle design, workflow tooling, integrations, and reporting teams can trust.",
  callout:
    "I work where operating logic and product execution meet: lifecycle rules, intake design, integrations, dashboards, and usable UI.",
  profileTitle: "Lifecycle design, automation, and reporting.",
  profileSignal: "Systems that stay clear as handoffs and volume grow.",
};

export const aboutContent = {
  title: "I build the operating system behind predictable execution.",
  subtitle:
    "When follow-up gaps appear, I blame the system, then fix it with lifecycle design, routing logic, workflow tooling, automation, and reporting.",
  outcomes: [
    "Clean workflows from intake to conversion tracking with explicit ownership.",
    "Automation that removes repetitive work without adding brittle glue.",
    "Reporting systems that make funnel health visible and explainable.",
  ],
  process: [
    "Start with the bottleneck, then make the data model tell the truth.",
    "Make states explicit, test the edges, and reduce manual interpretation.",
    "Ship in small steps, document decisions, and harden what people use.",
  ],
};

export const strengths = [
  {
    title: "Workflow architecture",
    description:
      "I turn handoff-heavy processes into explicit states, decision points, and ownership rules so execution does not depend on tribal memory.",
  },
  {
    title: "Automation and orchestration",
    description:
      "I connect the systems around the work, from forms and APIs to routing and notifications, so follow-through is built into the flow.",
  },
  {
    title: "Reporting that matches reality",
    description:
      "I design reporting around the actual lifecycle, not tool defaults, so leaders can trust the signal and operators can act on it.",
  },
];

export const portfolioProjects = [
  {
    slug: "scaleview",
    title: "ScaleView",
    tagline: "AI and LLM brand visibility measurement built for repeatable signal, not novelty screenshots.",
    cardSummary: "AI visibility audits for brand teams.",
    cardProblem: "AI mentions are visible, but measurement is inconsistent.",
    cardSolution: "Standardized sweeps with evidence capture and reporting.",
    cardMeta: "Prototype for repeatable visibility reviews.",
    summary:
      "ScaleView helps teams audit how often their brand appears in AI-generated answers by running consistent prompt sweeps, capturing evidence, and packaging the results for review.",
    problem:
      "Brand teams can see isolated AI mentions, but they usually do not have a repeatable way to measure visibility across prompts, compare runs, or inspect the evidence behind a score.",
    solution:
      "Built a workflow that standardizes prompt sweeps, captures answer evidence, and organizes results into a reviewable report so visibility can be tracked over time without manual copy-paste.",
    role:
      "Product design, application architecture, prompt-run workflow design, and implementation for the reporting experience.",
    stack: ["Next.js", "React", "Structured reporting", "Automation workflows"],
    status: "Prototype focused on making AI visibility audits repeatable and evidence-backed.",
    image: {
      src: "/projects/scaleview-proof-card.svg",
      alt: "ScaleView placeholder showing prompt sweep results and brand visibility reporting.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
      href: "/projects/scaleview",
    },
    secondaryCta: null,
  },
  {
    slug: "alphacore",
    title: "AlphaCore",
    tagline: "An ops cockpit for workflow clarity, reporting discipline, and automation-driven execution.",
    cardSummary: "Ops cockpit for workflows, reporting, and automation.",
    cardProblem: "Execution stalls across disconnected tools.",
    cardSolution: "Centralized workflow states, reporting, and checkpoints.",
    cardMeta: "Internal system for visibility and handoff control.",
    summary:
      "AlphaCore is a central operating view for workflow management, reporting, and automation support, designed to keep work moving without losing accountability.",
    problem:
      "When intake, reporting, and execution live across disconnected tools, teams lose time reconstructing context and managers lose confidence in what is actually on track.",
    solution:
      "Designed an operations cockpit that standardizes intake, structures the workflow states, and surfaces the reporting views needed to keep ownership, SLA risk, and next actions visible.",
    role:
      "Workflow mapping, data model design, UI planning, and implementation of the dashboard and automation support patterns.",
    stack: ["React", "Workflow systems", "Dashboards", "Automation logic"],
    status: "Internal workflow system concept focused on visibility, handoff control, and repeatable reporting.",
    image: {
      src: "/projects/alphacore-proof-card.svg",
      alt: "AlphaCore placeholder showing workflow queue, reporting panels, and automation checkpoints.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
      href: "/projects/alphacore",
    },
    secondaryCta: null,
  },
  {
    slug: "trinity-generator-quote-tool",
    title: "Trinity Generator Quote Tool",
    tagline: "A guided sizing and quoting workflow that reduces back-and-forth before the quote is even sent.",
    cardSummary: "Guided sizing and quote flow for cleaner intake.",
    cardProblem: "Quotes slow down when requirements arrive incomplete.",
    cardSolution: "Structured intake and decision logic before quoting.",
    cardMeta: "Workflow tool for consistent quote preparation.",
    summary:
      "The Trinity Generator Quote Tool turns a complex quoting process into a guided flow that collects the right inputs, supports sizing decisions, and produces a more consistent quote handoff.",
    problem:
      "Sizing and quoting break down when key requirements arrive incomplete or in inconsistent formats, forcing manual follow-up and slowing the quote cycle.",
    solution:
      "Created a guided workflow that collects the right inputs up front, structures the sizing decision path, and supports more consistent quote outputs for both internal teams and customers.",
    role:
      "UX design, workflow design, rules planning, and implementation of the guided quoting experience.",
    stack: ["Next.js", "Forms", "Decision workflows", "Quoting logic"],
    status: "Workflow tool focused on cleaner intake, better sizing inputs, and more consistent quote preparation.",
    image: {
      src: "/projects/trinity-proof-card.svg",
      alt: "Trinity Generator Quote Tool placeholder showing guided form steps and quote output cards.",
      width: 1200,
      height: 900,
    },
    primaryCta: {
      label: "Read case study",
      href: "/projects/trinity-generator-quote-tool",
    },
    secondaryCta: null,
  },
];

export const navigationItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "strengths", label: "Strengths" },
  { id: "contact", label: "Contact" },
];

export const socialProofLabel = "Proof Pass v1";

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
