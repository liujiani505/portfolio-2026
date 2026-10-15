import type { CaseStudy } from "../types";

/**
 * CASE STUDY 02 — proves: "I can uncover the right problem using research
 * and behavioural evidence."
 *
 * Rule for this file: nothing moves from `hypothesis` to `validated` without
 * evidence. Items marked [CONFIRM] are drawn from the author's own analysis
 * and need a check that they are accurate and cleared to publish.
 */
export const fidelityInformation: CaseStudy = {
  slug: "fidelity-information-behavior",
  index: "02",
  kind: "Research",
  layout: "research",
  title: "How associates find and use information",
  subtitle: "Reading behaviour across an enterprise information ecosystem",
  proves: "Finding the problem worth solving before designing anything — and being precise about what is known versus assumed.",
  question:
    "How do associates actually use a large enterprise information ecosystem — and what does their behaviour tell us about what they need?",
  thesis:
    "Before redesigning anything, I wanted to know why people come at all: to finish a task, to find one specific thing, to keep up, or to understand something. The answer changes what should be built.",
  company: "Fidelity Investments",
  role: "Principal Designer",
  timeframe: "[NEED INPUT: timeframe]",
  team: "[NEED INPUT: partners — analytics, content, product, engineering]",
  disciplines: [
    "Behavioural analysis",
    "Research synthesis",
    "Problem framing",
    "Hypothesis design",
    "Measurement",
  ],
  stack: ["GA4", "[NEED INPUT: other research + analysis tools]"],
  headlineMetrics: [],
  confidentiality:
    "Internal work. Figures are rounded, examples are recreated, and proprietary detail is omitted.",
  summary:
    "A behavioural study of how roughly 94,000 associates find and consume information — separating what the data shows from what we believe from what has actually been tested.",
  keywords: [
    "fidelity",
    "research",
    "behaviour",
    "behavior",
    "analytics",
    "ga4",
    "enterprise",
    "information",
    "intranet",
    "associates",
    "intent",
    "hypothesis",
    "problem discovery",
    "ambiguity",
  ],
  chapters: [
    {
      id: "problem",
      label: "Business problem",
      blocks: [
        {
          type: "prose",
          body: [
            "Roughly 94,000 associates rely on a shared information ecosystem to do their jobs. Like most enterprise ecosystems it is fragmented: information reaches people through several channels and lives in several places.",
            "The usual response to that is a redesign. I started somewhere else — with the question of what people are trying to do when they arrive, because a product built for readers fails people who came to complete a task, and the reverse.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "What was the stated business problem, and who raised it? What solution was already being assumed when you joined the conversation?",
        },
      ],
    },
    {
      id: "intent",
      label: "Four reasons to arrive",
      blocks: [
        {
          type: "prose",
          body: [
            "I framed the analysis around intent. Every visit is some mix of four things, and each implies a different product.",
          ],
        },
        {
          type: "columns",
          items: [
            { title: "Complete a task", body: "Get in, do the thing, leave. Success is speed and certainty." },
            { title: "Find something specific", body: "A known item. Success is finding it without knowing where it lives." },
            { title: "Consume news & content", body: "Keep up with what is happening. Success is relevance." },
            { title: "Understand something", body: "Make sense of a change or topic. Success is clarity, not volume." },
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "Utility behaviour and content consumption are different products",
          body: "Treating them as one experience is the framing I set out to test. The evidence below is organised by how sure we are.",
        },
      ],
    },
    {
      id: "evidence",
      label: "What the evidence says",
      blocks: [
        {
          type: "evidence",
          intro:
            "Three levels, kept separate on purpose. An observation is something the behavioural data shows. A hypothesis is my explanation for it. A validated finding has been tested.",
          items: [
            {
              level: "observation",
              statement:
                "[CONFIRM] Traffic to featured articles is driven mainly by push channels — email and chat — rather than by people discovering them on the homepage.",
              basis: "GA4 behavioural analysis. [NEED INPUT: period covered; OK to publish?]",
            },
            {
              level: "observation",
              statement:
                "[CONFIRM] Utility-style content consistently draws stronger engagement than narrative articles.",
              basis: "GA4 behavioural analysis. [NEED INPUT: which engagement measure; OK to publish?]",
            },
            {
              level: "observation",
              statement: "[NEED INPUT: any further observations — search behaviour, return visits, device, time of day]",
              basis: "[Source]",
            },
            {
              level: "hypothesis",
              statement:
                "Most visits are utility visits. People arrive to do or find something, and content is consumed when it is pushed to them, not when they browse for it.",
              basis: "Follows from the two observations above. Not yet tested directly.",
            },
            {
              level: "hypothesis",
              statement:
                "Context changes behaviour. Customer-facing associates have less time and attention to give than other audiences, and need different formats.",
              basis: "Reasoned from role constraints. Needs audience-level data to test.",
            },
            {
              level: "hypothesis",
              statement:
                "High-traffic, low-engagement articles would perform better restructured into interactive, utility-oriented formats.",
              basis: "To be tested by experiment — see the experimentation framework case study.",
            },
            {
              level: "validated",
              statement: "[NEED INPUT: has anything been tested yet? If not, leave this empty — that is an honest answer.]",
              basis: "[Experiment, sample, result]",
            },
          ],
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt:
            "Behavioural chart, anonymised: e.g. traffic source split for featured content, or engagement by content type. Send rounded numbers and I'll build it as a chart in the site's style.",
        },
      ],
    },
    {
      id: "audiences",
      label: "Audience & context",
      blocks: [
        {
          type: "prose",
          body: [
            "The same page serves people in very different working conditions. Someone between customer conversations has seconds; someone at a desk planning their week has minutes. An average across both describes neither.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "Which audiences did you look at, and what differences did the data actually show between them? If the data couldn't be segmented, say so and describe how you'd get it.",
        },
      ],
    },
    {
      id: "experiments",
      label: "From hypotheses to tests",
      blocks: [
        {
          type: "prose",
          body: [
            "A hypothesis is only useful if it can lose. For each one I defined what would be tested, what would be measured, and what result would change the plan.",
          ],
        },
        {
          type: "table",
          head: ["Hypothesis", "Test", "Measure", "Status"],
          rows: [
            [
              "Utility formats outperform narrative for the same topic",
              "A/B test: restructured article vs. original",
              "[NEED INPUT: primary measure]",
              "[NEED INPUT: planned / running / complete]",
            ],
            [
              "Discovery is push-led, not homepage-led",
              "[NEED INPUT: test design]",
              "[NEED INPUT]",
              "[NEED INPUT]",
            ],
            [
              "Customer-facing associates need shorter, action-first formats",
              "[NEED INPUT: test design]",
              "[NEED INPUT]",
              "[NEED INPUT]",
            ],
          ],
        },
      ],
    },
    {
      id: "implementation",
      label: "Implementation thinking",
      blocks: [
        {
          type: "implementation",
          intro:
            "Research only becomes product evidence if the measurement is designed as carefully as the interface.",
          points: [
            {
              title: "Instrumentation",
              body: "[NEED INPUT: which events and dimensions you relied on in GA4, and anything you had to add or fix to answer the question]",
            },
            {
              title: "Limits of the data",
              body: "[NEED INPUT: what the analytics could not tell you — e.g. audience segments, intent, off-platform reads — and how you handled that]",
            },
            {
              title: "From finding to format",
              body: "[NEED INPUT: how a finding translated into a concrete component or content format that could be built and tested]",
            },
          ],
          underHood: {
            label: "From behaviour to a testable claim",
            steps: ["Behavioural signal", "Observation", "Hypothesis", "Experiment", "Finding"],
            note: "Each step narrows the claim. A signal is not an observation until it is consistent; an observation is not a finding until a test could have contradicted it.",
          },
        },
      ],
    },
    {
      id: "implications",
      label: "Implications",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "What changed because of this work? A decision made differently, a roadmap item reframed, a redesign avoided or redirected. Verified outcomes only.",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "[NEED INPUT: lesson 1]",
      body: "What this taught you about discovering problems at enterprise scale.",
    },
    {
      title: "[NEED INPUT: lesson 2]",
      body: "Something you assumed going in that the evidence did not support.",
    },
  ],
};
