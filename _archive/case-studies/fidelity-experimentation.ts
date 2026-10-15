import type { CaseStudy } from "../types";

/**
 * CASE STUDY 03 — proves: "I can operate strategically at Principal level
 * and create systems for experimentation and learning."
 *
 * The subject is the decision-making system, not the tool. Wix appears once,
 * as an implementation detail.
 */
export const fidelityExperimentation: CaseStudy = {
  slug: "fidelity-experimentation-framework",
  index: "03",
  kind: "Product strategy",
  layout: "strategy",
  title: "An experimentation framework",
  subtitle: "Changing how a team learns before it builds",
  proves: "Principal-level influence: reframing solution-first work into a repeatable way of making product decisions.",
  thesis:
    "The team did not have a design problem. It had a learning problem: work started from a tool and hoped to learn something afterwards. I designed the system that reverses that order.",
  company: "Fidelity Investments",
  role: "Principal Designer",
  timeframe: "[NEED INPUT: timeframe]",
  team: "[NEED INPUT: stakeholders and partners you aligned]",
  disciplines: [
    "Product strategy",
    "Experiment design",
    "Measurement frameworks",
    "Stakeholder alignment",
    "Rapid prototyping",
  ],
  stack: ["A/B testing", "Lightweight prototypes", "Quick polls", "GA4"],
  headlineMetrics: [],
  confidentiality:
    "Internal work. The framework is shown as designed; examples are recreated and proprietary detail is omitted.",
  shift: {
    type: "shift",
    from: {
      label: "Before — solution first",
      steps: ["Tool", "Build something", "Collect data", "Hope we learn something"],
      note: "Learning is an accident at the end.",
    },
    to: {
      label: "After — evidence first",
      steps: ["Evidence", "Problem", "Hypothesis", "Experiment", "Measurement", "Learning", "Decision"],
      note: "Every step has an output the next one depends on.",
    },
  },
  summary:
    "A framework that moves a team from building first and measuring later to starting from evidence, stating a hypothesis, and running the smallest experiment that could change a decision.",
  keywords: [
    "fidelity",
    "experimentation",
    "experiment",
    "framework",
    "strategy",
    "hypothesis",
    "a/b testing",
    "measurement",
    "stakeholder",
    "influence",
    "principal",
    "leadership",
    "decision",
    "prototype",
  ],
  chapters: [
    {
      id: "reframe",
      label: "Reframing the problem",
      blocks: [
        {
          type: "prose",
          body: [
            "The conversation began with a tool and a question about what to build with it. That is solution-first thinking: the answer is chosen before the problem is stated, so whatever gets built can only confirm itself.",
            "I proposed a different starting point. Before anything is built, name the evidence, the problem it points to, and what we would need to see to change our minds.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "What was the original ask, and from whom? What did you say or show that shifted the conversation from 'what should we build' to 'what do we need to learn'?",
        },
      ],
    },
    {
      id: "framework",
      label: "The framework",
      blocks: [
        {
          type: "flow",
          title: "Seven steps, each with an output",
          steps: [
            {
              actor: "Human",
              title: "Evidence",
              body: "Start from something observed — behavioural data, feedback, a pattern in support requests — not from an idea.",
            },
            {
              actor: "Human",
              title: "Problem",
              body: "State who is affected and what it costs them, in one sentence that names no solution.",
            },
            {
              actor: "Human",
              title: "Hypothesis",
              body: "If we change X for audience Y, we expect Z — because of the evidence above.",
              guardrail: "A hypothesis must be able to fail. If no result would change the plan, it is not a hypothesis.",
            },
            {
              actor: "System",
              title: "Experiment",
              body: "The smallest thing that can test it: a poll, a lightweight prototype, an A/B test, a test experience.",
            },
            {
              actor: "System",
              title: "Measurement",
              body: "Success measure and decision threshold agreed before launch, not chosen afterwards.",
              guardrail: "One primary measure per experiment.",
            },
            {
              actor: "Human",
              title: "Learning",
              body: "What happened, what it means, and how confident we are.",
            },
            {
              actor: "Human",
              title: "Decision",
              body: "Invest, iterate or stop — recorded, with the reason.",
            },
          ],
        },
        {
          type: "placeholder",
          tag: "NEED INPUT",
          prompt:
            "Is this how the framework is actually written up internally? Correct any step names or rules so this matches the real artifact.",
        },
      ],
    },
    {
      id: "methods",
      label: "Lightweight experiments",
      blocks: [
        {
          type: "prose",
          body: [
            "The point of a lightweight experiment is to make being wrong cheap. Each method below answers a different kind of question, and none of them requires committing to the larger solution first.",
          ],
        },
        {
          type: "table",
          head: ["Method", "Good for", "Cost", "Used so far"],
          rows: [
            ["Quick poll", "Stated preference, fast signal", "Hours", "[NEED INPUT: yes/no + example]"],
            ["Lightweight prototype", "Whether an interaction makes sense", "Days", "[NEED INPUT]"],
            ["A/B test", "Whether a change alters behaviour", "Days–weeks", "[NEED INPUT]"],
            ["Test experience", "A new format in real conditions", "Weeks", "[NEED INPUT]"],
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "One real experiment, start to finish: the evidence, the hypothesis, what was built, what was measured, what you learned, what was decided. If none has completed yet, describe the first one planned and label it as planned.",
        },
      ],
    },
    {
      id: "alignment",
      label: "Aligning stakeholders",
      blocks: [
        {
          type: "prose",
          body: [
            "A framework nobody uses is a slide. For this one to work, the people who own roadmaps have to agree to state a hypothesis and a success measure before starting.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "Who needed convincing, what was their objection, and what moved them? Has the framework been adopted beyond your own work — by whom?",
        },
        {
          type: "tradeoffs",
          title: "A decision I'd defend",
          items: [
            {
              decision: "[NEED INPUT: e.g. insisting on a pre-agreed success measure]",
              chose: "[What you held the line on]",
              rejected: "[The easier path]",
              why: "[Why it mattered]",
              cost: "[What it slowed down or who it frustrated]",
            },
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
            "I can build and instrument experiments myself, which shortens the distance between a hypothesis and a result.",
          points: [
            {
              title: "Building the test",
              body: "Wix Studio is the implementation layer for tests — a means, not the strategy. [NEED INPUT: what you personally built or configured]",
            },
            {
              title: "Measurement plan",
              body: "[NEED INPUT: how variants were tracked and how results were read — events, segments, duration]",
            },
            {
              title: "Guardrails",
              body: "[NEED INPUT: what you put in place so a test could not mislead — sample, duration, one primary measure]",
            },
          ],
          underHood: {
            label: "Anatomy of one experiment",
            steps: ["Hypothesis", "Variant A / B", "Tracked behaviour", "Primary measure", "Decision threshold"],
            note: "The threshold is written down before the test starts. That single rule is what separates an experiment from a launch with analytics attached.",
          },
        },
      ],
    },
    {
      id: "outcomes",
      label: "What changed",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD VERIFIED METRIC",
          prompt:
            "What is different now? Experiments run, decisions changed, investment avoided or redirected, teams using the framework. Verified only — 'in progress' is a fine answer.",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "[NEED INPUT: lesson 1]",
      body: "What you learned about changing how a team makes decisions.",
    },
    {
      title: "[NEED INPUT: lesson 2]",
      body: "Where the framework met resistance, and what you'd change about how you introduced it.",
    },
  ],
};
