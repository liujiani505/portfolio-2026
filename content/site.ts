/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit this file first.
 *  Everything identity-related lives here. Change it once and it
 *  propagates to the nav, hero, metadata, SEO, JSON-LD and footer.
 *
 *  Leave a link as "" to hide it everywhere.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Jiani Liu",
  initials: "JL",
  /** Used in <title>, OG tags, nav and the schema.org payload. */
  role: "Principal Product Designer",
  company: "Fidelity Investments",
  location: "Boston, MA",
  email: "liujiani505@gmail.com",
  url: "https://jianiliu.design",

  /** One sentence. This is the 15-second message. */
  headline: "I think. I make. I question what’s possible.",

  /** The 30-second message. */
  intro:
    "Principal Product Designer combining strategy, craft and technical fluency to solve complex product problems and explore emerging AI interactions.",

  /**
   * Shown under the hero. Deliberately not numbers: each line is a claim
   * the work below has to back up, with a link to where it does.
   */
  proof: [
    { value: "Complex systems", label: "Operational platforms simplified around the work people do", href: "/case-studies/subaru-vehicle-allocation" },
    { value: "Evidence first", label: "Research and behavioral data before screens", href: "/case-studies/bu-giving-companion" },
    { value: "Experimentation", label: "Small tests that change decisions before big builds", href: "/#case-studies" },
    { value: "AI interactions", label: "Prototyped, with trust and human control designed in", href: "/#lab" },
  ],

  /** Two short differentiators shown beside the hero description. */
  also: [
    {
      label: "Technical fluency",
      body: "Front-end background. I vibe code ideas into prototypes with AI.",
    },
    {
      label: "Accessibility",
      body: "I train business partners on web accessibility, and I'm a GDAA training presenter.",
    },
  ],

  expertise: [
    "Product strategy",
    "Research → strategy",
    "Interaction design",
    "Visual design",
    "Experimentation",
    "Technical prototyping",
    "Accessibility",
  ],

  /** Availability line in the hero. Set `open: false` to hide it. */
  availability: {
    open: false,
    label: "Open to Principal Product Design roles",
  },

  /** Profile photo for the About section. Put the file in /public and set e.g. "/profile.jpg". Empty = placeholder. */
  photo: "/profile.jpg",

  links: {
    /** [NEED INPUT] real profile URLs. Empty = hidden. */
    github: "",
    linkedin: "",
    readcv: "",
    /** Put the PDF in /public with this name (or change the path). */
    resumePdf: "/jiani-liu-resume.pdf",
  },

  nav: [
    { label: "Case studies", href: "/#case-studies" },
    { label: "AI Lab", href: "/#lab" },
    { label: "About", href: "/#about" },
  ],
} as const;

export type Site = typeof site;
