import type { CaseStudy } from "../types";

/**
 * AI Lab · Acronym Roulette — written up in the standard case-study layout.
 * Lives under /lab (not in Selected Work). Copy is Jiani's own.
 */
export const LIVE_URL = "https://acronym-roulette.vercel.app/";

export const acronymRoulette: CaseStudy = {
  slug: "acronym-roulette",
  index: "Exp 01",
  kind: "AI product concept",
  layout: "research",
  title: "Acronym Roulette",
  subtitle: "A tiny guessing game about the language we think we know",
  proves: "Learning through play, and rapid AI-assisted prototyping of an interaction idea.",
  question: "What if learning acronyms felt more like playing a game than reading a glossary?",
  thesis: "A tiny guessing game about the language we think we know.",
  company: "AI Lab",
  role: "Concept, design and prototype",
  timeframe: "",
  team: "",
  disciplines: ["Interactive experiment", "Game design"],
  stack: [],
  hero: {
    eyebrow: "AI Lab · Interactive Experiment · Game Design",
    headline: "Acronym Roulette",
    facts: [
      { k: "Type", v: "Interactive experiment" },
      { k: "Focus", v: "Game design · Learning through play" },
      { k: "Approach", v: "AI-assisted rapid prototyping" },
      { k: "Status", v: "Live" },
    ],
    cta: { label: "Play the live experiment", href: LIVE_URL },
    image: {
      src: "/lab/acronym-roulette-screen.png",
      alt: "Acronym Roulette game screen: round 01, Brokerage app. The letters ETF beside the clue “He bought an ETF that tracks the S&P 500 and trades all day like a stock.” and three answer options: Equity Trust Fund, Exchange-Traded Fund, Electronic Funds Transfer.",
    },
  },
  headlineMetrics: [],
  summary:
    "Acronym Roulette is a bite-sized guessing game that challenges players to decode acronyms through contextual clues, exploring how the same letters can mean different things in different contexts.",
  keywords: ["acronym", "game", "play", "learning", "context", "prototype", "vibe code", "ai-assisted", "lab"],
  chapters: [
    {
      id: "idea",
      label: "The idea",
      headline: "The same letters, different meanings.",
      blocks: [
        {
          type: "prose",
          body: [
            "Financial and corporate environments are full of acronyms. Some are confusing, and the same letters can mean completely different things depending on context.",
            "What if learning them felt more like playing a game than reading a glossary?",
          ],
        },
      ],
    },
    {
      id: "experiment",
      label: "The experiment",
      headline: "Guess, discover, move on.",
      blocks: [
        {
          type: "prose",
          body: [
            "I created Acronym Roulette, a playful, bite-sized guessing game that challenges users to decode acronyms through contextual clues.",
            "Players make a guess, discover the meaning, and move on to the next challenge, all through a simple, interactive experience.",
          ],
        },
        { type: "cta", label: "Play the live experiment", href: LIVE_URL },
      ],
    },
    {
      id: "explored",
      label: "What I explored",
      headline: "Three questions in one small game.",
      blocks: [
        {
          type: "columns",
          items: [
            { title: "Learning through play", body: "Turning unfamiliar terminology into quick, engaging challenges." },
            { title: "Context matters", body: "Exploring how the same acronym can carry different meanings." },
            { title: "Rapid prototyping", body: "Using AI-assisted development to bring an interaction idea to life." },
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
          body: "Playful interactions can make complex language feel more approachable.",
          sub: "A small exploration, not a finished product.",
        },
      ],
    },
  ],
  lessons: [],
};
