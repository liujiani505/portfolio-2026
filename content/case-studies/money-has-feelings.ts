import type { CaseStudy } from "../types";

/**
 * AI Lab · Money Has Feelings — same structure as Acronym Roulette.
 * Lives under /lab (not in Selected Work). Copy is Jiani's own.
 */
export const MHF_URL = "https://money-has-feelings.vercel.app/";

export const moneyHasFeelings: CaseStudy = {
  slug: "money-has-feelings",
  index: "Exp 02",
  kind: "AI product concept",
  layout: "research",
  title: "Money Has Feelings",
  subtitle: "What if your feelings about money came to life?",
  proves: "Emotional design and playful interaction, prototyped quickly with AI.",
  question: "What if we could make the invisible emotions around money visible through a playful digital character?",
  thesis: "What if your feelings about money came to life?",
  company: "AI Lab",
  role: "Concept, design and prototype",
  timeframe: "",
  team: "",
  disciplines: ["Interactive experiment", "Emotional design"],
  stack: [],
  hero: {
    eyebrow: "AI Lab · Interactive Experiment · Emotional Design",
    headline: "Money Has Feelings",
    facts: [
      { k: "Type", v: "Interactive experiment" },
      { k: "Focus", v: "Emotional design · Playful interaction" },
      { k: "Approach", v: "AI-assisted prototyping" },
      { k: "Status", v: "Live" },
    ],
    cta: { label: "Play the live experiment", href: MHF_URL },
    image: {
      src: "/lab/money-has-feelings-screen.png",
      alt: "Money Has Feelings start screen: the heading “What’s on your money mind?”, the blue character, a text box with a Show me button, and suggestions such as Pricey headphones, Rent going up and Card paid off.",
    },
  },
  headlineMetrics: [],
  summary:
    "Money Has Feelings is a tiny interactive experience that turns everyday money emotions into an expressive, animated character, using color, movement and personality to make financial feelings visible.",
  keywords: ["money", "feelings", "emotion", "character", "animation", "emotional design", "play", "prototype", "lab"],
  chapters: [
    {
      id: "idea",
      label: "The idea",
      headline: "Money isn't just about numbers.",
      blocks: [
        {
          type: "prose",
          body: [
            "Money isn't just about numbers. It can make us feel excited, anxious, proud, or overwhelmed, sometimes all at once.",
            "What if we could make those invisible emotions visible through a playful digital character?",
          ],
        },
      ],
    },
    {
      id: "experiment",
      label: "The experiment",
      headline: "Feelings, given a face.",
      blocks: [
        {
          type: "prose",
          body: [
            "I created Money Has Feelings, a tiny interactive experience that transforms everyday money emotions into an expressive, animated character.",
            "Through color, movement, and personality, the character brings financial feelings to life, inviting users to explore how they relate to money.",
          ],
        },
        { type: "cta", label: "Play the live experiment", href: MHF_URL },
      ],
    },
    {
      id: "explored",
      label: "What I explored",
      headline: "Three questions in one small character.",
      blocks: [
        {
          type: "columns",
          items: [
            { title: "Emotional design", body: "Making abstract financial feelings tangible through visual expression." },
            { title: "Playful interaction", body: "Using character animation and micro-interactions to create moments of delight." },
            { title: "AI-assisted prototyping", body: "Exploring how quickly an imaginative concept can become a working interactive experience." },
          ],
        },
      ],
    },
    {
      id: "takeaway",
      label: "The takeaway",
      blocks: [
        {
          type: "statement",
          body: "Expressive interfaces might make conversations about money feel more human and approachable.",
          sub: "A playful exploration, not a finished product.",
        },
      ],
    },
  ],
  lessons: [],
};
