export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type Tradeoff = {
  decision: string;
  chose: string;
  rejected: string;
  why: string;
  cost: string;
};

export type Iteration = {
  version: string;
  name: string;
  what: string;
  learned: string;
  killed?: boolean;
};

export type FlowStep = {
  actor: "Human" | "Model" | "System" | "Human + Model";
  title: string;
  body: string;
  guardrail?: string;
};

export type ConfidenceBand = {
  range: string;
  behaviour: string;
  surface: string;
  share: string;
};

export type VisualId =
  | "system-map"
  | "before-after"
  | "confidence-ladder"
  | "spatial-stack"
  | "review-queue"
  | "token-scale";

export type Block =
  | { type: "prose"; title?: string; body: string[] }
  | { type: "metrics"; title?: string; items: Metric[] }
  | { type: "columns"; title?: string; items: { title: string; body: string }[] }
  | { type: "tradeoffs"; title?: string; items: Tradeoff[] }
  | { type: "iterations"; title?: string; items: Iteration[] }
  | { type: "flow"; title?: string; steps: FlowStep[] }
  | {
      type: "prompt";
      title?: string;
      label: string;
      body: string;
      annotations: { k: string; v: string }[];
    }
  | { type: "confidence"; title?: string; bands: ConfidenceBand[] }
  | { type: "quote"; body: string; attribution: string }
  | {
      type: "callout";
      kind: "insight" | "constraint" | "risk";
      title: string;
      body: string;
    }
  | { type: "table"; title?: string; head: string[]; rows: string[][]; /** Column index (in head) to shade as the explored option. */ highlight?: number; caption?: string }
  | { type: "visual"; id: VisualId; caption: string }
  /**
   * A visible gap. Rendered as a dashed frame so missing facts are obvious on
   * the page and can never be mistaken for content. Never indexed by the assistant.
   */
  | {
      type: "placeholder";
      tag: PlaceholderTag;
      /** What exactly is needed, phrased as a question to the author. */
      prompt: string;
      /** `frame` renders a large 16:10 image slot — use for final UI moments. */
      variant?: "note" | "frame";
    }
  /** Separates what was seen from what is believed from what has been proven. */
  | { type: "evidence"; title?: string; intro?: string; items: EvidenceItem[] }
  /** "Implementation thinking" — how the design gets built, with an optional expander. */
  | {
      type: "implementation";
      title?: string;
      intro?: string;
      points: { title: string; body: string }[];
      underHood?: { label: string; steps: string[]; note: string };
    }
  /** A real artifact or screenshot. `scroll` frames a very tall image in a scrollable window. */
  | {
      type: "image";
      src: string;
      alt: string;
      label?: string;
      caption?: string;
      scroll?: boolean;
      /** Crop to this CSS aspect-ratio (top-aligned), e.g. "1440 / 1000". */
      aspect?: string;
      /** Numbered pins placed on the image (percent coordinates) with a legend below. */
      pins?: { x: number; y: number; title: string; body: string }[];
    }
  /** Before / after, side by side. */
  | {
      type: "compare";
      before: { src: string; alt: string; label: string };
      after: { src: string; alt: string; label: string };
      caption?: string;
    }
  /** A large editorial line. */
  | { type: "statement"; body: string; sub?: string }
  /** A simple top-to-bottom or left-to-right chain of steps. */
  | { type: "chain"; title?: string; label?: string; steps: { label: string; note?: string }[]; direction?: "row" | "column"; caption?: string; /** "joined" draws a solid line under the steps; "loose" a dashed one. */ tone?: "joined" | "loose" }
  /** A prominent link out (e.g. to a live prototype). */
  | { type: "cta"; label: string; href: string; note?: string }
  /** A simple list of short statements, with an optional note under it. */
  | { type: "list"; title?: string; items: string[]; note?: string }
  /** Label / value pairs in a row (e.g. Done / Next / Not done). */
  | { type: "facts"; items: { k: string; v: string }[] }
  /** A short row of screenshots with one line each. */
  | { type: "gallery"; items: { src: string; alt: string; title: string; body: string }[]; /** Fit whole screenshots inside the frame instead of cropping. */ fit?: "cover" | "contain"; numbered?: boolean }
  /** A before → after operating model, drawn as two step chains. */
  | {
      type: "shift";
      title?: string;
      from: { label: string; steps: string[]; note: string };
      to: { label: string; steps: string[]; note: string };
    };

export type PlaceholderTag =
  | "ADD REAL PROJECT DETAIL"
  | "ADD VERIFIED METRIC"
  | "ADD SCREENSHOT"
  | "NEED INPUT";

export type EvidenceItem = {
  level: "observation" | "hypothesis" | "validated";
  statement: string;
  /** Where it comes from, or how it would be tested. */
  basis: string;
};

export type Chapter = {
  id: string;
  label: string;
  /** Optional large headline under the label. */
  headline?: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  index: string;
  kind: "Product design" | "Research" | "Product strategy" | "AI product concept";
  /**
   * Each case study has its own shape:
   *  product  — outcomes band, long-form with large UI moments
   *  research — opens on the question being asked, built around evidence levels
   *  strategy — opens on the operating-model shift, few screens
   */
  layout: "product" | "research" | "strategy" | "journey";
  /** The one thing this case study is here to prove. Shown on the index card. */
  proves: string;
  /** Overrides for the case-study page header. */
  hero?: {
    eyebrow: string;
    /** Overrides the page h1 (defaults to the subtitle). */
    headline?: string;
    image?: { src: string; alt: string; caption?: string; /** Shown instead when the visitor prefers reduced motion. */ staticSrc?: string; /** Square/illustrative art: shown centred at a fixed width instead of full-bleed. */ contain?: boolean };
    cta?: { label: string; href: string };
    facts?: { k: string; v: string }[];
    /** Label for the band of headline numbers (default "Outcomes"). */
    metricsLabel?: string;
    metricsNote?: string;
  };
  /** Homepage card extras. */
  card?: {
    tags?: string[];
    image?: { src: string; alt: string; /** CSS aspect-ratio to crop the image to, e.g. "1440 / 1000". */ aspect?: string };
    /** Background color behind the homepage screenshot (legacy). */
    stage?: string;
    /** Subtitle split into lines for the homepage (desktop only). */
    subtitleLines?: string[];
    /** Short facts table shown beside the homepage image. */
    facts?: { k: string; v: string }[];
  };
  /** research layout: the question the work set out to answer. */
  question?: string;
  /** strategy layout: the before → after model shown under the header. */
  shift?: Extract<Block, { type: "shift" }>;
  /** Shown under the header when visuals are recreated or anonymised. */
  confidentiality?: string;
  title: string;
  subtitle: string;
  /** One line a hiring manager could repeat in a debrief. */
  thesis: string;
  company: string;
  role: string;
  timeframe: string;
  team: string;
  disciplines: string[];
  stack: string[];
  /** Verified outcomes only. Leave empty until the numbers are confirmed. */
  headlineMetrics: Metric[];
  /** Rendered on the index card — must stand alone. */
  summary: string;
  chapters: Chapter[];
  lessons: { title: string; body: string }[];
  /** Feeds the AI assistant's retrieval index. */
  keywords: string[];
};
