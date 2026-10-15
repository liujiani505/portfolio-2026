export type Role = {
  period: string;
  title: string;
  org: string;
  location: string;
  summary: string;
  points: string[];
  current?: boolean;
};

export const experience: Role[] = [
  {
    period: "2024 — Present",
    title: "Lead Product Designer, AI",
    org: "Halstead Health",
    location: "San Francisco",
    summary:
      "Design lead for Recoup, an AI system for insurance denial appeals. 0→1 through GA and $8.4M ARR.",
    current: true,
    points: [
      "Led design from blank page to general availability across 14 health systems; $31M recovered for customers in year one.",
      "Authored the confidence architecture — four bands with distinct product behaviours, including one where the system declines to generate.",
      "Introduced 'reviewability' as a shipping gate: an eval measuring whether humans catch injected errors. Raised catch rate 34% → 88% with no change to model quality.",
      "Wrote v1 of every prompt in the pipeline and co-own the eval suite with ML.",
      "Manage one designer; run the org's AI design review, a fortnightly forum across four product teams.",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Senior Product Designer",
    org: "Meridian Payments",
    location: "San Francisco",
    summary:
      "Design lead for Recon, the payout reconciliation console used by 900 finance operators at 240 enterprise accounts.",
    points: [
      "Rebuilt reconciliation around failure cause rather than payout record: −62% resolution time, $9.4M annual write-offs eliminated, +18 enterprise NPS.",
      "Built the business case that got the project staffed from 1 engineer to 7 by connecting an existing finance write-off line to a product surface.",
      "Shipped the exception API tier that followed: $4.2M new ARR across 38 accounts in year one.",
      "Contributed the agreement-collapsed comparison pattern to the company design system; adopted by three other teams.",
    ],
  },
  {
    period: "2019 — 2021",
    title: "Product Designer, Design Systems",
    org: "Kestrel",
    location: "Seattle",
    summary:
      "Owned the component library and token pipeline for a B2B analytics platform across 6 product teams.",
    points: [
      "Took the library from 40 inconsistent components to 62 documented, accessible ones; cut new-surface build time by roughly 40%.",
      "Built the Figma-to-code token pipeline that ended two years of drift between design and production values.",
      "Ran the accessibility remediation that moved the platform to WCAG 2.1 AA and unblocked three public-sector deals.",
    ],
  },
  {
    period: "2018 — 2019",
    title: "Product Designer",
    org: "Overland Logistics",
    location: "Seattle",
    summary: "First design hire. Dispatch and routing tools for regional freight.",
    points: [
      "Redesigned the dispatch board around renegotiable commitments rather than fixed stop sequences, retiring a 40-tab shadow spreadsheet the team had run on for four years.",
      "Started here as a logistics analyst and moved into design after eight months.",
    ],
  },
];

export const education = [
  {
    period: "2017 — 2018",
    title: "M.S. Human–Computer Interaction",
    org: "University of Washington",
    note: "Thesis: interface strategies for communicating machine uncertainty to domain experts.",
  },
  {
    period: "2012 — 2016",
    title: "B.A. Cognitive Science",
    org: "University of California, San Diego",
    note: "Minor in Economics. Undergraduate research in judgment under uncertainty.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Product",
    items: [
      "Product strategy",
      "Roadmapping & sequencing",
      "Opportunity sizing",
      "Metric definition",
      "Pricing & packaging input",
      "Executive communication",
    ],
  },
  {
    group: "AI",
    items: [
      "Human-in-the-loop system design",
      "Confidence & escalation architecture",
      "Prompt design",
      "Eval design",
      "Explainability & provenance UX",
      "Model failure & drift handling",
    ],
  },
  {
    group: "Craft",
    items: [
      "Interaction design",
      "Typography",
      "Motion systems",
      "Information architecture",
      "Design systems",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    group: "Research",
    items: [
      "Contextual inquiry",
      "Wizard-of-Oz studies",
      "Usability testing",
      "Quantitative analysis (SQL)",
      "Diary & field studies",
    ],
  },
  {
    group: "Engineering",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "SwiftUI (working)",
      "Python (working)",
      "Git / CI",
    ],
  },
];

export const recognition: { year: string; title: string; org: string; kind: "Award" | "Speaking" | "Mentoring" | "Writing" }[] = [
  {
    year: "2026",
    title: "Designing the Doubt: interfaces for uncertain systems",
    org: "Config — 40-minute session",
    kind: "Speaking",
  },
  {
    year: "2025",
    title: "Fast Company Innovation by Design — Finalist, Health",
    org: "Recoup",
    kind: "Award",
  },
  {
    year: "2025",
    title: "What AI products owe their users when they're wrong",
    org: "Smashing Conf, Interaction Week — keynote & workshop",
    kind: "Speaking",
  },
  {
    year: "2024",
    title: "Mentor — 4 active mentees, 120+ sessions",
    org: "ADPList & Seattle Design Bridge",
    kind: "Mentoring",
  },
  {
    year: "2024",
    title: "Core77 Design Award — Honouree, Interaction",
    org: "Recon",
    kind: "Award",
  },
  {
    year: "2023 — Present",
    title: "Notes on high-consequence interfaces",
    org: "Essays, ~9k subscribers",
    kind: "Writing",
  },
  {
    year: "2023",
    title: "Guest critic, Interaction Design studio",
    org: "University of Washington HCDE",
    kind: "Mentoring",
  },
];
