/**
 * AI INNOVATION LAB
 * Small product experiments, each answering one interaction question.
 * These are independent concept explorations — not employer work.
 *
 * status "live"    → has a working prototype and its own page
 * status "planned" → shown as a clearly marked preview only. Do not write
 *                    these up as finished until they are built.
 */
import type { CaseStudy } from "./types";
import { acronymRoulette } from "./case-studies/acronym-roulette";
import { moneyHasFeelings } from "./case-studies/money-has-feelings";

export type Experiment = {
  slug: string;
  index: string;
  title: string;
  /** The interaction model this demonstrates — the lab should not be six chatbots. */
  model: "Conversational" | "Simulation" | "Research augmentation" | "Agentic" | "Game" | "Character";
  /** Card thumbnail. `staticSrc` is used for visitors who prefer reduced motion. */
  thumb?: { src: string; staticSrc?: string; alt: string; square?: boolean; /** Tile background color. */ stage?: string };
  /** When set, the experiment page uses the standard case-study layout. */
  caseStudy?: CaseStudy;
  status: "live" | "planned";
  question: string;
  /** One line on what the experiment explores. */
  explores: string[];
  /** live only */
  whyAi?: string[];
  interaction?: string[];
  trust?: { title: string; body: string }[];
  learned?: string[];
  underHood?: { steps: string[]; notes: { title: string; body: string }[] };
};

export const labIntro = {
  title: "AI Innovation Lab",
  subtitle:
    "Small experiments exploring how AI can change the way people understand, decide, create, and act.",
  disclaimer: "Independent concept explorations. Not affiliated with, or products of, any employer.",
};

export const experiments: Experiment[] = [
  {
    slug: "acronym-roulette",
    index: "01",
    title: "Acronym Roulette",
    model: "Game",
    status: "live",
    question: "What if learning acronyms felt more like playing a game than reading a glossary?",
    explores: ["Learning through play", "Context", "Rapid prototyping"],
    thumb: {
      src: "/lab/acronym-roulette.svg",
      staticSrc: "/lab/acronym-roulette-static.png",
      stage: "#dfe8f6",
      alt: "Acronym Roulette: patterned letters spinning through acronyms like ETF, CPA and ROI.",
    },
    caseStudy: acronymRoulette,
  },
  {
    slug: "money-has-feelings",
    index: "02",
    title: "Money Has Feelings",
    model: "Character",
    status: "live",
    question: "What if your feelings about money came to life?",
    explores: ["Emotional design", "Playful interaction", "AI-assisted prototyping"],
    thumb: {
      src: "/lab/money-has-feelings.svg",
      staticSrc: "/lab/money-has-feelings-static.png",
      alt: "A soft round character shifting between money moods: calm, happy, anxious and content.",
      square: true,
      stage: "#fbe3d0",
    },
    caseStudy: moneyHasFeelings,
  },
];

export const getExperiment = (slug: string) => experiments.find((e) => e.slug === slug);
