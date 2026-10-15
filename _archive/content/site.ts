/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit this file first.
 *  Everything identity-related lives here. Change it once and it
 *  propagates to the nav, hero, metadata, SEO, JSON-LD and footer.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Jiani Liu",
  initials: "JL",
  /** Used in <title>, OG tags and the schema.org payload. */
  role: "Lead Product Designer, AI",
  company: "Halstead Health",
  location: "San Francisco, CA",
  email: "liujiani505@gmail.com",
  url: "https://jianiliu.design",

  /** One sentence. This is the 15-second message. */
  headline: "I design AI products people trust with the work that matters.",

  /** The 30-second message. Two sentences, no filler. */
  intro:
    "Senior Product Designer working at the seam between machine intelligence and human judgment. I take ambiguous, high-stakes problems — clinical billing, financial reconciliation, industrial safety — and turn them into systems that operators actually rely on, and that leadership can see on a P&L.",

  /** Shown as a compact proof bar under the hero. */
  proof: [
    { value: "$34M", label: "revenue recovered or protected across shipped work" },
    { value: "3", label: "0→1 AI products taken from research to GA" },
    { value: "40+", label: "engineers and PMs partnered with across 4 orgs" },
    { value: "8 yrs", label: "designing regulated, high-consequence software" },
  ],

  expertise: [
    "AI product design",
    "Design systems",
    "Product strategy",
    "Research → strategy",
    "Prototyping in code",
    "Zero-to-one",
  ],

  /** Availability line in the nav / contact section. Set `open: false` to soften it. */
  availability: {
    open: true,
    label: "Open to Senior / Staff Product Design roles",
  },

  links: {
    github: "https://github.com/jianiliu",
    linkedin: "https://linkedin.com/in/jianiliu",
    readcv: "https://read.cv/jianiliu",
    resumePdf: "/jiani-liu-resume.pdf",
  },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Playground", href: "/#playground" },
    { label: "Engineering", href: "/#engineering" },
    { label: "About", href: "/#about" },
    { label: "Résumé", href: "/#resume" },
  ],
} as const;

export type Site = typeof site;
