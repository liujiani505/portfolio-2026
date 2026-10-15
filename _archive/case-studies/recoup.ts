import type { CaseStudy } from "../types";

export const recoup: CaseStudy = {
  slug: "recoup",
  index: "02",
  kind: "AI-native",
  title: "Recoup",
  subtitle: "An AI copilot for insurance denials, designed to be doubted",
  thesis:
    "Hospitals abandon $260B of denied claims a year because appealing costs more than the claim is worth. Recoup changes that arithmetic — but only because we designed the model to show its work and hand back the cases it shouldn't touch.",
  company: "Halstead Health",
  role: "Lead Product Designer · 0→1 through GA",
  timeframe: "2024 – 2026 · 22 months",
  team: "2 designers (I led), 2 PMs, 11 engineers, 3 ML engineers, 1 clinical informaticist, 4 embedded billing specialists",
  disciplines: [
    "AI product design",
    "Human-in-the-loop systems",
    "Prompt & eval design",
    "Trust & explainability",
    "Service design",
  ],
  stack: [
    "Figma",
    "React",
    "TypeScript",
    "Framer Motion",
    "Claude",
    "Python",
    "LangSmith",
    "Braintrust",
  ],
  headlineMetrics: [
    { value: "+22 pts", label: "appeal overturn rate", note: "41% → 63%, matched cohort" },
    { value: "4.7×", label: "appeals filed per specialist per day", note: "6 → 28" },
    { value: "$31M", label: "recovered for 14 health systems", note: "first 12 months of GA" },
    { value: "0", label: "appeals auto-submitted without human sign-off", note: "by design" },
  ],
  summary:
    "US hospitals lose roughly 11% of claims to payer denials, and let two thirds of them go because a specialist takes 90 minutes to write an appeal worth $600. I led design on Recoup from a blank page to general availability: an AI system that reads the denial, the chart and the payer's own policy, then drafts a cited appeal a human reviews in nine minutes. Every design decision in it is downstream of one question — what does this system do when it isn't sure?",
  keywords: [
    "ai",
    "artificial intelligence",
    "llm",
    "healthcare",
    "denials",
    "revenue cycle",
    "human in the loop",
    "confidence",
    "explainability",
    "trust",
    "evals",
    "prompts",
    "guardrails",
    "0 to 1",
    "systems thinking",
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      blocks: [
        {
          type: "prose",
          body: [
            "When a hospital bills an insurer and the insurer says no, that's a denial. Someone in the revenue cycle department has to decide whether to fight it.",
            "Fighting it means: read the denial code, find the relevant part of the patient's chart, look up the payer's medical-necessity policy for that procedure — a 40-page PDF that changed in March — and write a letter arguing the care met it. About 90 minutes, done by a specialist who costs the hospital roughly $52 an hour.",
            "The average denied claim is worth $612. So for most denials, the appeal costs more than the claim. Hospitals write off about 65% of denials without ever appealing. Industry-wide that's around $260 billion a year in care that was delivered and never paid for.",
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "Why this is an AI problem and not a workflow problem",
          body:
            "People had tried to fix this with templates and macros for twenty years. It doesn't work, because the argument is the product. A generic appeal loses. A winning appeal cites this patient's specific chart against this payer's specific policy language — which is exactly the kind of synthesis that was impossible to automate before 2023 and is now merely difficult.",
        },
        {
          type: "quote",
          body:
            "I know which ones I could win. I just can't get to them. By the time I do, the 60-day window is closed.",
          attribution: "Denials specialist, 2,100-bed academic health system — first research session",
        },
      ],
    },
    {
      id: "business-context",
      label: "Business context",
      blocks: [
        {
          type: "prose",
          body: [
            "Halstead sold revenue-cycle software to hospital CFOs. The company had good distribution and a stagnant product. Recoup was the bet that AI could turn a reporting tool into something that moved money.",
            "The business model made the design constraints unusually sharp: we charged a percentage of recovered revenue. If Recoup drafted an appeal that lost, we earned nothing and the hospital had spent specialist time. Our incentives and the customer's were aligned in a way that made 'ship it and see' genuinely expensive.",
          ],
        },
        {
          type: "table",
          title: "The unit economics we had to move",
          head: ["", "Before", "Target", "Shipped"],
          rows: [
            ["Specialist time per appeal", "90 min", "< 15 min", "9 min"],
            ["Cost to appeal", "$78", "< $15", "$8"],
            ["Break-even claim value", "$190", "< $40", "$21"],
            ["Share of denials worth appealing", "35%", "> 80%", "91%"],
            ["Overturn rate", "41%", "≥ 41%", "63%"],
          ],
        },
        {
          type: "prose",
          body: [
            "The row that people skip is the third one. Dropping the break-even from $190 to $21 doesn't make appeals faster — it makes a whole category of denials worth touching that were previously invisible. Most of the $31M came from claims nobody had ever looked at.",
          ],
        },
      ],
    },
    {
      id: "research",
      label: "Research",
      blocks: [
        {
          type: "prose",
          body: [
            "Eleven weeks of research across five health systems before we drew a screen. Two things I'd defend as essential:",
          ],
        },
        {
          type: "columns",
          items: [
            {
              title: "We annotated 340 real appeals",
              body:
                "With two senior specialists, we tagged every winning and losing appeal by argument structure, evidence type and payer. This became both the design brief and — unchanged — the first eval set. The research artefact and the ML artefact were the same document.",
            },
            {
              title: "We measured trust before we built anything",
              body:
                "A Wizard-of-Oz study where specialists reviewed 'AI-drafted' appeals I had written by hand. It told us how people read a draft they didn't write, before a single token was generated. This is the study I'd run again first on any AI product.",
            },
            {
              title: "We shadowed the failure, not the success",
              body:
                "Sat with specialists on the appeals they lost. Losing appeals almost always failed on evidence, not prose — they cited the wrong policy version, or missed a chart note. That set the whole retrieval architecture.",
            },
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "The Wizard-of-Oz finding that shaped everything",
          body:
            "When a draft was good, specialists skimmed it and approved in about 40 seconds. When a draft was subtly wrong — one incorrect date, a policy citation from the wrong year — they caught it only 31% of the time. Fluent text suppressed scrutiny. We could not fix that with a disclaimer. It meant the interface had to make the model's evidence structurally reviewable, not just readable: claims and their sources pinned together so verifying was cheaper than trusting.",
        },
        {
          type: "metrics",
          title: "Where specialists actually lost time",
          items: [
            { value: "48%", label: "finding the right policy version", note: "Payer PDFs, versioned by service date" },
            { value: "27%", label: "locating chart evidence", note: "Across an average of 6 note types" },
            { value: "19%", label: "writing", note: "The part everyone assumed was the bottleneck" },
            { value: "6%", label: "submission mechanics" },
          ],
        },
      ],
    },
    {
      id: "strategy",
      label: "Strategy",
      blocks: [
        {
          type: "prose",
          title: "The product principle",
          body: [
            "Recoup is not an appeal writer. It is an evidence assembler that also writes.",
            "That distinction decided everything. An appeal writer optimises for output quality and hides its process. An evidence assembler optimises for reviewability — its job is to make a specialist's nine minutes of attention land on the two things that could be wrong.",
          ],
        },
        {
          type: "columns",
          title: "Four rules we wrote in month two and never broke",
          items: [
            {
              title: "Every claim carries its source",
              body:
                "No sentence in a generated appeal exists without a linked citation to a chart location or a policy paragraph. If the model can't cite it, the model doesn't say it. This is enforced in the generation schema, not in the prompt.",
            },
            {
              title: "The system says when it shouldn't",
              body:
                "Low confidence is a first-class output, not an error state. Recoup routes cases away from itself — and the routing is visible to the user, with a reason.",
            },
            {
              title: "A human signs, always",
              body:
                "No appeal is ever submitted without a named person approving it. Not a setting. Not an enterprise tier. Architecture.",
            },
            {
              title: "Reviewing must be faster than writing",
              body:
                "If verifying the draft costs more than drafting it, the product is negative value. We measured review time as a primary metric from week one, alongside quality.",
            },
          ],
        },
        {
          type: "visual",
          id: "system-map",
          caption:
            "The Recoup pipeline. Four model calls with different jobs and different failure modes, three deterministic gates, one human. The gates are the design work.",
        },
      ],
    },
    {
      id: "ai-workflow",
      label: "AI workflows",
      blocks: [
        {
          type: "prose",
          body: [
            "We resisted building 'an agent' for a long time and I'm glad we did. Recoup is a pipeline of narrow, individually-evaluable steps, because each step has a different accuracy profile and a different consequence when it's wrong.",
          ],
        },
        {
          type: "flow",
          title: "One denial, end to end",
          steps: [
            {
              actor: "System",
              title: "Ingest & normalise",
              body:
                "The 835 remittance file arrives with a denial code and a payer-specific reason string. Deterministic parsing, no model. 100% of failures here are visible and loud.",
              guardrail: "Unparseable remits go to a human queue, never to a guess.",
            },
            {
              actor: "Model",
              title: "Classify the root cause",
              body:
                "Maps the denial to one of 34 appealable root causes — medical necessity, authorisation, coding specificity, timely filing, bundling. A small fine-tuned classifier, not an LLM: it's a closed set, it runs on every claim, and it needs calibrated probabilities.",
              guardrail:
                "Below 0.72 confidence the case is labelled 'needs triage' and shown to a specialist with the top three candidates rather than one answer.",
            },
            {
              actor: "System",
              title: "Retrieve policy at service date",
              body:
                "Pulls the payer's medical policy as it existed on the date of service — not today's version. This is a versioned document store we built because getting it wrong invalidates the entire appeal.",
              guardrail:
                "If no policy version exists for that date, the pipeline stops. It does not substitute the nearest one.",
            },
            {
              actor: "Model",
              title: "Extract supporting chart evidence",
              body:
                "Given the policy's criteria, an LLM searches the chart for evidence of each criterion and returns structured findings with exact source spans — note ID, section, character offsets.",
              guardrail:
                "Output schema requires a verbatim quote and a location for every finding. Anything unquotable is dropped before it reaches generation.",
            },
            {
              actor: "Model",
              title: "Draft the appeal",
              body:
                "Composes the letter strictly from the extracted findings and the retrieved policy language. It has no access to the raw chart at this stage — it can only argue from evidence that already passed the citation gate.",
              guardrail:
                "Deliberate context restriction. The drafting model cannot invent a fact because it cannot see any fact it wasn't handed.",
            },
            {
              actor: "Human + Model",
              title: "Review",
              body:
                "The specialist sees the draft with every claim linked to its source, the criteria checklist with coverage state, and an explicit list of what the model could not find. Average: 9 minutes.",
              guardrail:
                "Weak or missing criteria are surfaced at the top, not buried in the prose. The interface argues against its own draft.",
            },
            {
              actor: "Human",
              title: "Sign & submit",
              body:
                "A named specialist approves. Their edits are captured as a diff and flow into the weekly eval set.",
              guardrail: "No auto-submit path exists in the codebase.",
            },
          ],
        },
        {
          type: "callout",
          kind: "constraint",
          title: "Why the drafting model is blindfolded",
          body:
            "The single highest-leverage architectural decision, and it came out of design. Early versions gave the drafting model the whole chart for 'context' and it produced better prose — and occasionally asserted a fact that was true in the chart but not in the extracted evidence, which is unciteable and therefore unusable in an appeal. Cutting its context to only the gated findings made the writing slightly stiffer and made hallucinated citations structurally impossible. We traded prose quality for a class of failure disappearing.",
        },
      ],
    },
    {
      id: "prompts",
      label: "Prompts & evals",
      blocks: [
        {
          type: "prose",
          body: [
            "I wrote the first version of every prompt in this system. Not because I'm the best prompt engineer on the team — I'm not — but because the prompt is where the product's judgment lives, and handing that off is like handing off the copy and the empty states.",
          ],
        },
        {
          type: "prompt",
          title: "Evidence extraction — the load-bearing one",
          label: "extract_criteria_evidence · v14",
          body: `You are reviewing a patient chart against a specific payer medical policy.

For EACH criterion in <policy_criteria>, determine whether the chart
contains evidence that it was met.

Return one object per criterion:
  criterion_id
  status: met | not_met | not_documented
  quote:  verbatim text from the chart, 10-60 words. Required when
          status is "met". Must appear character-for-character in
          the source. Do not paraphrase, correct, or expand
          abbreviations.
  source: { note_id, section, start_offset, end_offset }
  confidence: 0.0-1.0

Rules:
- "not_documented" means you could not find evidence. It is a correct
  and expected answer. Do not infer from clinical plausibility.
- If a criterion is partially supported, status is "not_met" and the
  quote shows the strongest available evidence.
- Never combine two chart locations into one quote.`,
          annotations: [
            {
              k: "Why 'not_documented' is a first-class answer",
              v: "v6 of this prompt let the model infer. It was right most of the time and catastrophic the rest — inferred evidence reads identically to observed evidence in a draft, and an appeal built on it is a compliance problem. Naming the answer we wanted made the model comfortable giving it. not_documented rate went from 4% to 23%, which was the true rate.",
            },
            {
              k: "Why the quote is verbatim and offset-anchored",
              v: "So the interface can highlight it in the source document. A citation you can't jump to is a citation nobody checks. Offsets are validated in code — a quote that doesn't match its span is dropped and re-requested, never shown.",
            },
            {
              k: "Why confidence is per-criterion",
              v: "A single confidence score for the whole appeal is useless to a reviewer. Per-criterion scores let the interface sort the specialist's attention to the two weakest links, which is the entire reason review takes nine minutes instead of forty.",
            },
          ],
        },
        {
          type: "prose",
          title: "Evals as a design instrument",
          body: [
            "The 340 annotated appeals from research became the eval set. Every prompt change ran against it before shipping. Two eval dimensions came out of design rather than ML:",
            "Citation integrity — does every assertion trace to a real, correctly-located source? Binary, non-negotiable, and it gates deploys.",
            "Reviewability — measured by having specialists find deliberately-injected errors in generated drafts. If the injected-error catch rate dropped below 85%, the interface change didn't ship, even if quality scores went up. This is the metric I'm proudest of building, because it measures the human-plus-machine system rather than the model.",
          ],
        },
      ],
    },
    {
      id: "confidence",
      label: "Confidence & edge cases",
      blocks: [
        {
          type: "prose",
          body: [
            "Most AI products show confidence as a percentage next to an answer. In testing, that number changed nobody's behaviour — specialists read 78% and 94% identically. What changed behaviour was the system doing something different at different confidence levels, and saying so.",
          ],
        },
        {
          type: "confidence",
          title: "Four bands, four distinct product behaviours",
          bands: [
            {
              range: "≥ 0.92",
              behaviour: "Full draft, review-ready",
              surface:
                "Standard review view. Citations inline. Specialist skims, verifies the two flagged criteria, signs. Median 6 min.",
              share: "54%",
            },
            {
              range: "0.72 – 0.92",
              behaviour: "Draft with contested criteria pulled to the top",
              surface:
                "Weak criteria surface above the letter with the model's uncertainty stated in words — 'the chart documents the trial of conservative therapy but not its duration; this payer requires 6 weeks.' Median 14 min.",
              share: "29%",
            },
            {
              range: "0.45 – 0.72",
              behaviour: "No draft. Evidence packet only.",
              surface:
                "Recoup declines to write and instead hands over an organised dossier: policy criteria, what it found, what it couldn't. The specialist writes. Still ~4× faster than starting cold.",
              share: "13%",
            },
            {
              range: "< 0.45",
              behaviour: "Routed out with a reason",
              surface:
                "'This denial involves an experimental-treatment exclusion — Recoup does not handle these.' Named reason, sent to the specialist queue. Never a silent low-quality draft.",
              share: "4%",
            },
          ],
        },
        {
          type: "prose",
          body: [
            "The 13% band is the one that earned trust. A system that visibly refuses work it can't do well gets believed when it says it can. Every specialist interview after we shipped that band mentioned it unprompted.",
          ],
        },
        {
          type: "columns",
          title: "Edge cases we designed for explicitly",
          items: [
            {
              title: "The policy changed mid-treatment",
              body:
                "Service spans a policy revision. Recoup surfaces both versions and the argument for applying the earlier one, rather than silently picking. Rare — 0.8% of cases — and a guaranteed loss if handled wrong.",
            },
            {
              title: "The denial is correct",
              body:
                "Sometimes the care genuinely wasn't covered. Recoup says so and recommends not appealing, with reasoning. Filing losing appeals burns payer goodwill and specialist time. Roughly 9% of triaged denials.",
            },
            {
              title: "The chart contradicts itself",
              body:
                "Two notes disagree. We show both with timestamps and authors rather than picking the one that helps. Discovered in month four; it is now its own review state.",
            },
            {
              title: "Model degradation over time",
              body:
                "Payers change denial language quarterly. A drift monitor compares live classifier confidence distributions against the eval baseline; a sustained drop pages the team and automatically widens the human-review band.",
            },
          ],
        },
      ],
    },
    {
      id: "iterations",
      label: "Design iterations",
      blocks: [
        {
          type: "iterations",
          title: "The review interface, five versions",
          items: [
            {
              version: "v1",
              name: "Draft with a confidence badge",
              what: "The letter, plus a percentage in the corner. What everyone builds first.",
              learned:
                "Injected-error catch rate: 34%. Specialists read fluent prose and approved. The badge was decorative. We nearly shipped this.",
              killed: true,
            },
            {
              version: "v2",
              name: "Inline citation chips",
              what: "Every sentence got a superscript linking to its source.",
              learned:
                "Catch rate 51%. Better, but people clicked citations at the start and stopped by paragraph three. Verification was still optional, and optional verification decays.",
            },
            {
              version: "v3",
              name: "Criteria checklist as the primary object",
              what:
                "Flipped the hierarchy. The payer's criteria list became the main view; the letter moved to a secondary panel. You review evidence against requirements, then read the prose.",
              learned:
                "Catch rate 79%. Review time dropped too — 22 min to 13. Reviewing a structured checklist is a fundamentally cheaper cognitive task than proofreading an argument.",
            },
            {
              version: "v4",
              name: "Weakest-link ordering",
              what:
                "Criteria sort by model confidence ascending. The two things most likely to be wrong are the first two things you see.",
              learned:
                "Catch rate 88%, review time 9 min. The system spends the user's attention where its own uncertainty is highest — this is the pattern I'd carry to any AI product.",
            },
            {
              version: "v5",
              name: "Absence made visible",
              what:
                "A permanent 'what Recoup could not find' section, always present, never collapsed — even when empty.",
              learned:
                "Missing evidence had been invisible: the draft simply didn't mention it. Specialists were reviewing what was there, never what was absent. This section catches the most expensive class of error and cost eleven days to build.",
            },
          ],
        },
        {
          type: "visual",
          id: "review-queue",
          caption:
            "v4 review view. Criteria ordered by ascending model confidence, coverage state on the left rail, the drafted letter secondary. The interface's job is to spend nine minutes of human attention as well as possible.",
        },
      ],
    },
    {
      id: "outcome",
      label: "Outcome & impact",
      blocks: [
        {
          type: "metrics",
          title: "First 12 months of general availability",
          items: [
            { value: "$31M", label: "recovered across 14 health systems" },
            { value: "63%", label: "overturn rate", note: "vs 41% baseline, matched by payer and denial type" },
            { value: "9 min", label: "median review time", note: "from 90 min to write" },
            { value: "4.7×", label: "appeals filed per specialist per day", note: "6 → 28" },
            { value: "91%", label: "of denials now economically worth appealing", note: "from 35%" },
            { value: "0", label: "auto-submitted appeals", note: "and no compliance findings in two external audits" },
          ],
        },
        {
          type: "prose",
          body: [
            "The commercial outcome: Recoup went from zero to $8.4M ARR in its first year and became the reason Halstead won three health-system deals it had previously lost. It moved the company from a reporting vendor to a revenue partner.",
            "The outcome that mattered inside the building was different. Denials specialists had assumed this product was built to replace them — several told me so in the first research sessions. A year in, the same role had shifted from writing letters to judging arguments and handling the hard 17% Recoup routes to them. Two of the four embedded specialists on the team moved into product roles. That was not an accident of the technology; it was a consequence of deciding early that the human signs.",
          ],
        },
        {
          type: "quote",
          body:
            "It shows me what it couldn't find. That's the part that made me trust the rest of it.",
          attribution: "Denials specialist, 900-bed regional system, month 9",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "Design the uncertainty, not the answer",
      body:
        "Every meaningful decision in Recoup was about what happens when the model isn't sure. Confidence bands with genuinely different product behaviours, a band where the system declines to draft, a permanent section for what it couldn't find. The answer takes care of itself; the doubt is the product.",
    },
    {
      title: "Fluency suppresses scrutiny — the interface has to fight it",
      body:
        "Well-written wrong text gets approved. Our injected-error catch rate went from 34% to 88% with zero change to model quality, purely by restructuring what the reviewer looks at first. Measure the human-plus-machine system, not the model.",
    },
    {
      title: "Constrain the model's context on purpose",
      body:
        "Blindfolding the drafting model — letting it see only gated evidence, never the raw chart — made the prose worse and made an entire class of failure impossible. Narrow, evaluable steps beat one capable agent when the cost of being wrong is asymmetric.",
    },
    {
      title: "Prompts are product copy",
      body:
        "The prompt is where the product's judgment lives. 'not_documented is a correct answer' is a product decision written in English. Designers who won't touch prompts are handing away the most consequential surface in an AI product.",
    },
    {
      title: "What I'd do differently",
      body:
        "We built the drift monitor in month sixteen, after a payer changed its denial language and our classifier quietly degraded for three weeks before anyone noticed. AI products decay in ways static software doesn't. Monitoring for that is a design responsibility — someone has to decide what the system does when it starts being wrong — and I should have owned it from month one.",
    },
  ],
};
