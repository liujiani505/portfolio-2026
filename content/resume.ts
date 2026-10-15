/**
 * Experience. Only facts Jiani has confirmed are stated; everything in
 * [BRACKETS] needs her input. (The earlier résumé was sample content and is
 * in /_archive/content/resume.ts.)
 */
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
    title: "Principal Designer / Developer",
    org: "Fidelity Investments",
    location: "Boston, MA",
    summary:
      "Principal-level design for enterprise digital experiences used by roughly 94,000 associates.",
    current: true,
    points: [
      "Led behavioral research into how associates find and use information, separating observation from hypothesis from validated finding.",
      "Designed an experimentation framework that moves teams from building first to starting with evidence, a hypothesis and a pre-agreed measure.",
      "Prototype and implement experiments directly, drawing on front-end development experience.",
      "Train business partners on web accessibility.",
    ],
  },
  {
    period: "2022 — 2024",
    title: "UI/UX Designer & Front-End Developer",
    org: "Subaru of New England",
    location: "",
    summary:
      "Lead Designer on the retailer operations platform, including a redesign of vehicle allocation across 6 districts and 65 retailers.",
    points: [],
  },
  {
    period: "2019 — 2022",
    title: "Senior Digital Designer",
    org: "Boston University",
    location: "Boston, MA",
    summary: "",
    points: [],
  },
  {
    period: "2015 — 2019",
    title: "Graphic Designer",
    org: "Boston University",
    location: "Boston, MA",
    summary: "",
    points: [],
  },
];

export const education: { period: string; title: string; org: string; note: string }[] = [
  {
    period: "[YEARS]",
    title: "[NEED INPUT: degree]",
    org: "[NEED INPUT: school]",
    note: "",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Product",
    items: [
      "Product strategy",
      "Problem framing",
      "Hypothesis & experiment design",
      "Success measures",
      "Stakeholder alignment",
    ],
  },
  {
    group: "Research",
    items: [
      "Behavioral analytics (GA4)",
      "A/B testing",
      "Research synthesis",
      "[NEED INPUT: other methods you use]",
    ],
  },
  {
    group: "Craft",
    items: [
      "Interaction design",
      "Visual design",
      "Information architecture",
      "Design systems",
      "Accessibility",
    ],
  },
  {
    group: "AI",
    items: [
      "AI interaction design",
      "Human-in-the-loop flows",
      "Designing for uncertainty & trust",
      "AI-assisted prototyping",
    ],
  },
  {
    group: "Technical fluency",
    items: [
      "Front-end development",
      "Responsive implementation",
      "Prototyping in code",
      "[NEED INPUT: languages / frameworks]",
    ],
  },
];

/** Talks and mentoring. Empty = section hidden. */
export const recognition: { year: string; title: string; org: string; kind: "Award" | "Speaking" | "Mentoring" | "Writing" }[] = [
  {
    year: "[YEAR]",
    title: "Web accessibility training presenter",
    org: "Company GDAA event",
    kind: "Speaking",
  },
  {
    year: "Ongoing",
    title: "Training business partners on web accessibility",
    org: "Fidelity Investments",
    kind: "Mentoring",
  },
];
