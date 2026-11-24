const DEFAULT_SITE_URL = "https://johnrodriguez.vercel.app";

export const portfolioSite = {
  name: "John Rodriguez",
  shortName: "John Rodriguez",
  title: "John Rodriguez | Software for Small Teams & AI Evaluation",
  description:
    "John Rodriguez builds software for small teams in Central Texas and evaluates AI. See how his work connects field notes, job records, and invoices.",
  url: process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  email: "os.devsource@gmail.com",
  github: "https://github.com/OS-DevSource",
  githubLabel: "Public GitHub",
  linkedin: "https://www.linkedin.com/in/john-rodriguez-626136387/",
  resume: "/resume/john-rodriguez-resume.pdf",
};

export const heroContent = {
  headline: "John Rodriguez",
  summary: "I build software for small teams, from turning job photos into invoices to planning the next sales visit.",
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

export const portfolioProjects = [
  {
    slug: "mk-workbench",
    title: "MK Workbench",
    category: "Client software · Field service",
    tagline: "From a plumber’s job note to an invoice ready to send.",
    summary: "I built MK Workbench for a plumbing business. It brings the job photos, the work performed, and the draft invoice into one place.",
    problem: "A photo from the job and a note from the plumber can arrive separately. The person billing the job needs to know which customer, work, and parts they belong to.",
    solution: "The app reads the source material and suggests invoice details. A person checks the draft against the original, fixes anything missing, then approves it for the invoice.",
    outcome: "The business uses the private system in production to review jobs and prepare invoice PDFs.",
    role: "I designed and built the application, from the mobile intake screen to permissions, PDF generation, and tests.",
    validation: [
      "A reviewer must approve extracted details before they become invoice records.",
      "The server checks each user’s role. The job history records changes.",
      "Vitest checks application logic. Playwright exercises the main workflow in CI."
    ],
    statusLabel: "Private client system",
    stack: [
      "React",
      "Vite",
      "Convex",
      "OpenAI",
      "Vitest",
      "Playwright"
    ],
    primaryCta: {
      label: "Case study",
      href: "/projects/mk-workbench"
    }
  },
  {
    slug: "memorex",
    title: "Memorex",
    category: "Personal tool · Developer workflow",
    tagline: "Pick up a coding project where the last session ended.",
    summary: "I built Memorex for my own development work. It keeps the decisions behind a change and links each summary back to its source.",
    problem: "A code change shows what happened. It rarely explains the options I tried, what failed, or why I chose this approach.",
    solution: "A Codex plugin captures decisions and checkpoints. The next session retrieves a short project brief with links to the original records.",
    outcome: "I use this private tool across my own projects. It supports both local and hosted storage.",
    role: "I built the storage model, retrieval system, workspace, and Codex integration.",
    validation: [
      "Repository and task identifiers keep each brief tied to the right project.",
      "Citations let me check a summary against the original record.",
      "Memory collection can be paused or resumed per workspace."
    ],
    statusLabel: "Personal development tool",
    stack: [
      "Next.js",
      "TypeScript",
      "SQLite",
      "PostgreSQL",
      "MCP",
      "Codex plugin"
    ],
    image: {
      src: "/projects/memorex-product.png",
      alt: "Memorex seeded pipeline proof console showing task activity, processor traces, and memory signals.",
      width: 1200,
      height: 900
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/memorex"
    }
  },
  {
    slug: "insight",
    title: "Insight",
    category: "Internal prototype · Field sales",
    tagline: "See the next sales visit and the last conversation in one place.",
    summary: "Insight puts leads, appointments, and visit notes on a map a field rep can use on a phone.",
    problem: "On the way to a visit, a rep needs the address, the latest note, and the next appointment. Looking in three places makes a handoff harder.",
    solution: "I built map-based lead review, quick edits, appointment history, and CSV imports that check for duplicate leads.",
    outcome: "The internal prototype stores lead and appointment history. A rep can share a visit card and revoke access later.",
    role: "I designed the mobile workflow, built the application, and tested its core routes.",
    validation: [
      "Lead changes and appointments are saved in Convex.",
      "Visit cards support revocation and track opens.",
      "Browser smoke tests cover the main routes."
    ],
    statusLabel: "Internal prototype",
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Convex",
      "Leaflet",
      "Papa Parse",
      "Playwright"
    ],
    image: {
      src: "/projects/insight-product.png",
      alt: "Insight lead queue showing sanitized sample leads, pipeline counts, search, and field actions.",
      width: 2400,
      height: 1800
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/insight"
    }
  },
  {
    slug: "allowance",
    title: "Allowance",
    category: "Open source · macOS",
    tagline: "Check your remaining Codex capacity without leaving your work.",
    summary: "Allowance lives in the Mac menu bar. It shows how much capacity is left and when it resets. Open the details or pin the reading beside your work.",
    problem: "Several usage windows can reset at different times. Opening account settings for each check interrupts the coding session.",
    solution: "A native Swift app reads limits through the local Codex CLI. One refresh loop keeps the compact and expanded views in sync.",
    outcome: "Available to build from source. The app supports keyboard controls, reduced motion, and reduced transparency.",
    role: "I designed the interface and artwork, built the macOS app, and tested the CLI integration.",
    validation: [
      "Tests cover parsing, timeouts, CLI selection, and recovery after failure.",
      "Unavailable readings stay distinct from zero. An older reading keeps its timestamp.",
      "The compact and expanded windows share the same reading."
    ],
    statusLabel: "Open source for macOS",
    stack: [
      "Swift",
      "SwiftUI",
      "AppKit",
      "Codex CLI",
      "XCTest"
    ],
    image: {
      src: "/projects/allowance-product.png",
      alt: "Allowance’s expanded and compact macOS windows showing the available usage windows and pin controls, with account readings covered.",
      width: 1448,
      height: 1086
    },
    contextImage: {
      src: "/projects/allowance-desktop.png",
      alt: "Cropped desktop capture with the compact Allowance window pinned and account readings covered.",
      width: 940,
      height: 585
    },
    primaryCta: {
      label: "Case study",
      href: "/projects/allowance"
    },
    secondaryCta: {
      label: "View source",
      href: "https://github.com/OS-DevSource/allowance"
    }
  }
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
