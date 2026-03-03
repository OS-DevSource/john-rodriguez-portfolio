export type ProjectLinkSet = {
  live?: string;
  github?: string;
};

export type Project = {
  id: string;
  title: string;
  oneLine: string;
  outcomes: string[];
  stack: string[];
  links: ProjectLinkSet;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "scaleview",
    title: "ScaleView",
    oneLine: "Measure brand visibility in LLM answers using repeatable prompt sweeps.",
    outcomes: [
      "Orchestrates prompt sweeps with consistent scoring and evidence capture.",
      "Produces audit-friendly reports that track visibility over time.",
    ],
    stack: ["Next.js", "Postgres", "Automation"],
    links: {
      github: "https://github.com/OS-DevSource",
    },
  },
  {
    id: "alphacore",
    title: "AlphaCore",
    oneLine: "Operations cockpit for workflows, reporting, and automation glue.",
    outcomes: [
      "Standardized intake and structured data for clean execution.",
      "Dashboards for funnel health, SLAs, and accountability.",
    ],
    stack: ["React", "Dashboards", "Data models"],
    links: {
      github: "https://github.com/OS-DevSource",
    },
  },
  {
    id: "trinity-generator-quote-tool",
    title: "Trinity Generator Quote Tool",
    oneLine: "Guided sizing + quoting flow that reduces back-and-forth.",
    outcomes: [
      "Questionnaire flow designed for accurate sizing and fast use.",
      "Consistent quote outputs and follow-up structure.",
    ],
    stack: ["Next.js", "Forms", "Pricing logic"],
    links: {
      github: "https://github.com/OS-DevSource",
    },
  },
];
