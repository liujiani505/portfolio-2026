import type { CaseStudy } from "../types";

/**
 * CASE STUDY 01 — proves: "I can design complex products."
 *
 * Everything in [BRACKETS] is a gap to fill with real project facts.
 * Search this file for "placeholder" and "[" to find them all.
 */
export const subaru: CaseStudy = {
  slug: "subaru-dealer-platform",
  index: "01",
  kind: "Product design",
  layout: "product",
  title: "Dealer Platform",
  subtitle: "Simplifying the operational workflows dealerships run on",
  proves: "Complex systems, multiple user needs and real constraints — resolved into a product people can move through.",
  thesis:
    "A dealer platform is not a website. It is the operational surface dealerships use to complete vehicle-related work, and the design problem is the workflow, not the page.",
  company: "Subaru of New England",
  role: "[NEED INPUT: your title on this project]",
  timeframe: "[NEED INPUT: years / duration]",
  team: "[NEED INPUT: who you worked with — product, engineering, business owners]",
  disciplines: [
    "Product design",
    "Systems thinking",
    "Information architecture",
    "Interaction design",
    "Visual design",
  ],
  stack: ["[NEED INPUT: design + build tools actually used]"],
  headlineMetrics: [],
  summary:
    "A redesign of the platform Subaru of New England dealerships use to complete vehicle-related workflows — approached as an operational system with several kinds of users, rather than as a site refresh.",
  keywords: [
    "subaru",
    "dealer",
    "dealership",
    "platform",
    "workflow",
    "complex systems",
    "information architecture",
    "interaction design",
    "enterprise",
    "b2b",
    "redesign",
  ],
  chapters: [
    {
      id: "context",
      label: "Context",
      blocks: [
        {
          type: "prose",
          body: [
            "Subaru of New England's dealer platform is where dealerships go to get vehicle-related work done. That makes it an operational tool: people arrive with a task, under time pressure, and the measure of the product is whether the task gets finished correctly.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "What is the platform, in two sentences? Who is Subaru of New England to the dealers (distributor), how many dealerships use it, and what state was the platform in when you started?",
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "Why now? What business reason triggered the redesign — and what was the original ask versus the problem you ended up solving?",
        },
      ],
    },
    {
      id: "ecosystem",
      label: "Ecosystem & users",
      blocks: [
        {
          type: "prose",
          title: "More than one user, more than one job",
          body: [
            "The first design decision in a system like this is who it is for. A dealership is not one user — different roles come to the same platform for different work, with different frequency and different tolerance for friction.",
          ],
        },
        {
          type: "columns",
          title: "Who uses the platform",
          items: [
            {
              title: "[NEED INPUT: role 1]",
              body: "What they come to do, how often, and what goes wrong for them today.",
            },
            {
              title: "[NEED INPUT: role 2]",
              body: "What they come to do, how often, and what goes wrong for them today.",
            },
            {
              title: "[NEED INPUT: role 3]",
              body: "What they come to do, how often, and what goes wrong for them today.",
            },
          ],
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt:
            "Ecosystem map: the platform, the dealership roles around it, and the systems it connects to. A redrawn diagram is fine — I can build this as an SVG once you list the pieces.",
        },
      ],
    },
    {
      id: "workflows",
      label: "Workflows & pain points",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "Name the 2–3 most important workflows (the things a dealer must complete). For each: the steps before the redesign, and where people got stuck, made errors or gave up.",
        },
        {
          type: "placeholder",
          tag: "NEED INPUT",
          prompt:
            "How did you learn this? Interviews, site visits, support tickets, analytics, stakeholder knowledge — say only what actually happened.",
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt: "Before: one honest screen or flow from the old platform that shows the core problem.",
        },
      ],
    },
    {
      id: "strategy",
      label: "Product & design strategy",
      blocks: [
        {
          type: "prose",
          body: [
            "The strategy question was what to organise the product around. A platform that has grown feature by feature tends to be organised by how it was built; the people using it think in terms of the job they came to finish.",
          ],
        },
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "What were the 2–3 principles or bets that guided the redesign? What did you deliberately decide NOT to do, and what business or technical constraints shaped that?",
        },
        {
          type: "tradeoffs",
          title: "Decisions I'd defend",
          items: [
            {
              decision: "[NEED INPUT: the key structural decision]",
              chose: "[What you chose]",
              rejected: "[The reasonable alternative you turned down]",
              why: "[Why — in terms of users and the business]",
              cost: "[What it cost: scope, time, something users lost]",
            },
          ],
        },
      ],
    },
    {
      id: "structure",
      label: "Information architecture",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "How was the platform organised before, and how did you reorganise it? What was the new top-level structure and why?",
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt: "IA before → after (sitemap or navigation model). I can redraw this as a diagram from a list.",
        },
      ],
    },
    {
      id: "interaction",
      label: "Interaction & exploration",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD REAL PROJECT DETAIL",
          prompt:
            "Pick the hardest workflow. Walk through the interaction decisions: what you tried, what you threw away, and why the final version won.",
        },
        {
          type: "iterations",
          title: "Exploration",
          items: [
            {
              version: "v1",
              name: "[NEED INPUT: first direction]",
              what: "[What it was]",
              learned: "[What you learned from it]",
              killed: true,
            },
            {
              version: "v2",
              name: "[NEED INPUT: the direction that shipped]",
              what: "[What it was]",
              learned: "[Why it held up]",
            },
          ],
        },
      ],
    },
    {
      id: "final",
      label: "Final experience",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt: "Hero screen: the single best view of the redesigned platform, full width.",
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt: "Key workflow, end to end: 2–4 screens showing the simplified flow.",
        },
        {
          type: "placeholder",
          tag: "ADD SCREENSHOT",
          variant: "frame",
          prompt: "Detail moment: a component, state or responsive view that shows visual craft up close.",
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
            "I design with the build in mind. These are the implementation questions this project raised and how the design answered them.",
          points: [
            {
              title: "Components & states",
              body: "[NEED INPUT: how the UI was broken into reusable components, and which states (empty, loading, error, partial) mattered most]",
            },
            {
              title: "Responsive behaviour",
              body: "[NEED INPUT: where dealers actually use the platform — desk, tablet, lot — and what changed across breakpoints]",
            },
            {
              title: "Constraints from the existing system",
              body: "[NEED INPUT: what the legacy platform or data made hard, and how the design worked within it]",
            },
            {
              title: "Working with engineering",
              body: "[NEED INPUT: how you handed off, what you prototyped or built yourself, how decisions were made together]",
            },
          ],
          underHood: {
            label: "How a workflow screen is assembled",
            steps: ["Dealer task", "Workflow state", "Components", "Platform data"],
            note: "[ADD REAL PROJECT DETAIL: replace with the real structure — one sentence per layer on what the design had to account for]",
          },
        },
      ],
    },
    {
      id: "outcomes",
      label: "Outcomes",
      blocks: [
        {
          type: "placeholder",
          tag: "ADD VERIFIED METRIC",
          prompt:
            "What changed after launch? Only what you can verify: adoption, task completion, time saved, support volume, dealer feedback, business result. If nothing was measured, say what shipped and how it was received.",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "[NEED INPUT: lesson 1]",
      body: "What you would do differently, or what this project taught you about designing operational systems.",
    },
    {
      title: "[NEED INPUT: lesson 2]",
      body: "Keep these honest and specific — one decision you'd revisit is worth more than three you'd repeat.",
    },
  ],
};
