export type Repo = {
  name: string;
  tagline: string;
  body: string;
  stack: string[];
  href: string;
  stars?: string;
  status: "Maintained" | "Archived" | "Internal";
};

export const engineeringIntro = {
  claim: "I ship code. It makes me a better designer, and I can prove where.",
  body: [
    "I'm not an engineer and I don't want the title. But I write production TypeScript, I own components in two design systems, and I prototype in React rather than Figma when the thing I'm testing is density, latency or state.",
    "The argument for designers coding is usually 'better collaboration.' That's true and it's weak. The real return is that some design problems are invisible until the thing is real:",
  ],
  reasons: [
    {
      title: "Latency is a material",
      body:
        "A Figma prototype is instantaneous. Real data arrives in 400–1800ms, sometimes not at all. You cannot design a loading state, a stale state or an optimistic update against a medium that has no time in it.",
    },
    {
      title: "Density breaks designs, not screenshots",
      body:
        "Every layout works on the twelve rows you chose. Building against a real fixture set of two thousand records is how I found that a comparison view I'd tested successfully was unusable at production density.",
    },
    {
      title: "The component API is the design system",
      body:
        "Whether a button takes `variant` or three booleans determines how many variants exist in two years. That decision gets made in a pull request, and if no designer is in the room it gets made for the wrong reasons.",
    },
    {
      title: "Estimates stop being negotiations",
      body:
        "Knowing that the interaction I'm asking for is two days and the one next to it is three weeks changes what I propose. Most scope fights are really information asymmetry.",
    },
  ],
};

export const repos: Repo[] = [
  {
    name: "evidence-diff",
    tagline: "The agreement-collapsed comparison view, extracted",
    body:
      "The React component at the centre of the Recon case study, generalised. Renders N sources of the same record, collapses fields where everything agrees, and surfaces disagreements with provenance on hover. Virtualised to 10k rows, fully keyboard-navigable, ARIA grid semantics.",
    stack: ["TypeScript", "React", "Radix", "Tailwind"],
    href: "https://github.com/jianiliu/evidence-diff",
    stars: "1.2k",
    status: "Maintained",
  },
  {
    name: "cited",
    tagline: "Render LLM output where every claim is traceable",
    body:
      "A primitive for AI interfaces: takes structured model output with source spans and renders text whose every assertion links to, and highlights within, its source document. Validates that quoted spans actually exist in the source and refuses to render the ones that don't. The lesson from Recoup, packaged.",
    stack: ["TypeScript", "React", "Framer Motion"],
    href: "https://github.com/jianiliu/cited",
    stars: "870",
    status: "Maintained",
  },
  {
    name: "motion-rules",
    tagline: "An easing and duration system with documented intent",
    body:
      "Six named curves, four duration tiers, and a rule for each. Ships as a Tailwind plugin, a Framer Motion variant set and Figma variables generated from the same source of truth — so the spec cannot drift between design and code.",
    stack: ["TypeScript", "Tailwind", "Framer Motion", "Figma Plugin API"],
    href: "https://github.com/jianiliu/motion-rules",
    stars: "610",
    status: "Maintained",
  },
  {
    name: "tokens-bridge",
    tagline: "Figma variables → CSS custom properties, one direction, no drift",
    body:
      "A CI step that reads Figma Variables via the REST API and emits typed CSS custom properties plus a Tailwind theme. Fails the build when a design token exists in code but not in Figma. Boring, unglamorous, and it ended a two-year argument at Meridian.",
    stack: ["TypeScript", "Node", "Figma REST API", "GitHub Actions"],
    href: "https://github.com/jianiliu/tokens-bridge",
    stars: "440",
    status: "Maintained",
  },
  {
    name: "this-portfolio",
    tagline: "The site you're reading",
    body:
      "Next.js App Router, TypeScript, Tailwind, Framer Motion. Streaming AI assistant over an Anthropic API route with a deterministic offline fallback. 100/100 Lighthouse accessibility, no layout shift, and every animation gated on prefers-reduced-motion. Source is public — including the parts I'd do differently.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Claude API"],
    href: "https://github.com/jianiliu/portfolio",
    status: "Maintained",
  },
];
