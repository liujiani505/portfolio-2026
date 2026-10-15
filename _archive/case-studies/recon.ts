import type { CaseStudy } from "../types";

export const recon: CaseStudy = {
  slug: "meridian-recon",
  index: "01",
  kind: "Enterprise",
  title: "Recon",
  subtitle: "Rebuilding payout reconciliation for 900 finance operators",
  thesis:
    "A back-office tool nobody wanted to own was quietly costing $9M a year. I reframed it as a revenue problem, not a UI problem — and the roadmap followed.",
  company: "Meridian Payments",
  role: "Product Designer → Senior Product Designer (design lead)",
  timeframe: "2021 – 2023 · 19 months",
  team: "1 designer (me), 1 PM, 7 engineers, 1 data scientist, 2 embedded ops partners",
  disciplines: [
    "Product strategy",
    "Systems design",
    "Field research",
    "Prioritisation",
    "Design systems",
  ],
  stack: ["Figma", "React", "TypeScript", "Amplitude", "Snowflake", "Storybook"],
  headlineMetrics: [
    { value: "−62%", label: "median time to resolve a broken payout", note: "4h 10m → 1h 34m" },
    { value: "$9.4M", label: "annualised write-offs eliminated", note: "measured over 4 quarters" },
    { value: "3.1×", label: "exceptions cleared per operator per day" },
    { value: "+18", label: "NPS among enterprise finance teams", note: "31 → 49" },
  ],
  summary:
    "Meridian moved $40B a year across fourteen payment rails. When a payout broke, finding out why took an operator four hours and six systems. I led the redesign of the reconciliation console from field research through GA — and turned a cost-centre tool into the product finance teams named in renewal calls.",
  keywords: [
    "enterprise",
    "fintech",
    "reconciliation",
    "payments",
    "prioritisation",
    "roadmap",
    "tradeoffs",
    "metrics",
    "business impact",
    "operations",
    "b2b",
    "workflow",
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      blocks: [
        {
          type: "prose",
          body: [
            "Meridian is a payments platform. Marketplaces, payroll providers and gig platforms use it to move money to their sellers, contractors and drivers — about $40 billion a year across fourteen banking rails in nine countries.",
            "Roughly 0.4% of those payouts fail. That sounds small. At Meridian's volume it was 61,000 broken payouts a month, each one a person who did not get paid and a support ticket somewhere downstream.",
            "The tool finance operators used to fix them was called Recon. It had been built in six weeks in 2018 as an internal admin panel, and never redesigned. By 2021 it had 900 daily users across 240 enterprise accounts and it was the single most complained-about surface in the product.",
          ],
        },
        {
          type: "callout",
          kind: "constraint",
          title: "The thing that made this hard",
          body:
            "Recon wasn't slow because the UI was ugly. It was slow because the truth about a payout lived in five systems that disagreed with each other — the ledger, the rail's status webhook, the bank statement file, the customer's own record, and a Slack channel where an ops lead kept notes. Any redesign that didn't reconcile those sources was decoration.",
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
            "Recon had no revenue attached to it, so it had no owner. It sat in a platform team's backlog behind work that could be counted. Getting it funded meant showing what it cost to leave alone.",
            "I spent two weeks with finance and the support org building that number, and it turned out to be three numbers stacked on top of each other.",
          ],
        },
        {
          type: "metrics",
          title: "What the status quo cost, per year",
          items: [
            {
              value: "$9.4M",
              label: "written off",
              note: "Payouts unresolved past 90 days that Meridian absorbed rather than chase.",
            },
            {
              value: "$2.8M",
              label: "support load",
              note: "31% of enterprise tickets traced to a payout the customer could not self-diagnose.",
            },
            {
              value: "$6.1M",
              label: "renewal risk",
              note: "Four of the eleven at-risk enterprise accounts named reconciliation in their churn interview.",
            },
          ],
        },
        {
          type: "prose",
          body: [
            "The write-off number was the one that moved the room. It was already in the finance org's own reporting — I hadn't discovered it, I had just connected it to a product surface for the first time. That reframe is what got the project staffed with seven engineers instead of one.",
          ],
        },
        {
          type: "quote",
          body:
            "I've had this line item in my close for three years. Nobody ever told me it was a design problem.",
          attribution: "VP Finance Operations, Meridian",
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
            "I ran three streams in parallel over five weeks, because I needed both the texture and the scale.",
          ],
        },
        {
          type: "columns",
          items: [
            {
              title: "14 shadowing sessions",
              body:
                "Sat beside operators at four customers — a food delivery marketplace, a payroll processor, a freight broker and a creator platform. Recorded screen and hands. No script for the first 40 minutes.",
            },
            {
              title: "Instrumented the old tool",
              body:
                "Added event tracking to every filter, tab and export. Six weeks of data across 900 users. This is where the wall-clock numbers came from, and where my assumptions got corrected.",
            },
            {
              title: "Read 600 support tickets",
              body:
                "Tagged by failure cause and by what the operator tried first. Gave me the actual distribution of problems, not the vivid ones.",
            },
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "The finding that changed the product",
          body:
            "Operators weren't resolving payouts one at a time. They were doing it in batches, by cause — 'all the ones that bounced because of a closed account,' 'all the ones stuck at the same bank.' But Recon was built entirely around the single payout record. Every operator I watched had built a private workaround: export to CSV, sort in Excel, work the groups, come back and update records one by one. Nine of fourteen had the same spreadsheet.",
        },
        {
          type: "metrics",
          title: "Where the four hours actually went",
          items: [
            { value: "8%", label: "deciding what to do", note: "The judgment call was fast." },
            { value: "17%", label: "taking the action", note: "Retry, refund, contact, escalate." },
            { value: "75%", label: "assembling context", note: "Six systems, two logins, one CSV export." },
          ],
        },
        {
          type: "prose",
          body: [
            "Three quarters of the cost was in gathering evidence, not in judgment. That single ratio determined the entire strategy: don't automate the decision, automate the dossier.",
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
          title: "One sentence the whole team could hold",
          body: [
            "Recon should present a broken payout the way a good analyst would hand it to you: already investigated, grouped with its siblings, with the evidence attached and one obvious next action.",
            "That sentence did more work than any artefact I made. It resolved arguments in standup for a year and a half.",
          ],
        },
        {
          type: "columns",
          title: "Three principles, in priority order",
          items: [
            {
              title: "1 · Cause before record",
              body:
                "The primary object in the product is a cluster of payouts that failed for the same reason — not an individual payout. Every screen, URL and permission model follows from that.",
            },
            {
              title: "2 · Evidence in place",
              body:
                "If an operator has to leave to verify something, we have failed. Ledger entry, rail response, bank line and customer record render inline, with disagreements between them made explicit rather than hidden.",
            },
            {
              title: "3 · Reversible by default",
              body:
                "Operators move money. Every bulk action is previewable, scoped, and undoable for 30 minutes. Confidence to act quickly comes from knowing you can take it back.",
            },
          ],
        },
        {
          type: "visual",
          id: "before-after",
          caption:
            "Left: the record-centric model, where an operator opens 40 payouts to discover they share one cause. Right: the cause-centric model, where the cluster is the object and the payouts are its evidence.",
        },
      ],
    },
    {
      id: "ai",
      label: "AI opportunities",
      blocks: [
        {
          type: "prose",
          body: [
            "This project ran in 2021–22, before it was reasonable to put a language model in a money-movement path. What we did use was narrower and, I'd argue, more honest: a gradient-boosted classifier that assigned a root cause to each failed payout from the rail response, the account history and the customer's configuration.",
            "The design question was not 'how do we show AI.' It was 'how much should a 91%-accurate classifier be allowed to decide.'",
          ],
        },
        {
          type: "tradeoffs",
          title: "The decision we spent three weeks on",
          items: [
            {
              decision: "How to surface the predicted root cause",
              chose: "As the default grouping, with the confidence visible and the grouping one click away from being dissolved",
              rejected: "As a filter the operator opts into",
              why:
                "Opt-in meant nobody would use it — the whole point was to remove a step, and an opt-in filter adds one. Making it the default put the model's accuracy on the line, which is exactly where it belonged: we could measure regroup rate as a live accuracy signal.",
              cost:
                "We had to build dissolve-and-regroup, an interaction nobody would have prioritised otherwise. It shipped three weeks late. It also became our best telemetry — a spike in dissolves flagged two model regressions before the data team's monitoring did.",
            },
          ],
        },
        {
          type: "callout",
          kind: "risk",
          title: "What we refused to automate",
          body:
            "The classifier never triggered an action. It never retried a payout, never issued a refund, never emailed a recipient. It sorted the work and stated its reasoning; a person decided. In a money path with a 9% error rate, the value of automation is in the assembly, and the risk is all in the action.",
        },
      ],
    },
    {
      id: "decisions",
      label: "Product decisions",
      blocks: [
        {
          type: "prose",
          body: [
            "Nineteen months, seven engineers, one designer. Most of the job was deciding what not to build.",
          ],
        },
        {
          type: "table",
          title: "How I sequenced it",
          head: ["Phase", "Shipped", "Why then", "Deliberately deferred"],
          rows: [
            [
              "P0 · 10 wks",
              "Cause clusters, inline evidence panel, bulk retry with preview",
              "Attacks the 75% context-assembly cost directly. Nothing else moves the metric as much per engineer-week.",
              "Custom views, saved filters, mobile",
            ],
            [
              "P1 · 14 wks",
              "Audit trail, undo window, role-scoped bulk limits",
              "Enterprise security review blocked GA without it. Also the thing that made operators willing to use bulk actions at all.",
              "Approvals workflow, SSO-scoped permissions",
            ],
            [
              "P2 · 16 wks",
              "Customer-facing read-only view, exception API, Slack digest",
              "Deflects the $2.8M support load by letting customers self-diagnose. Sold as a premium tier.",
              "Full customer write access",
            ],
          ],
        },
        {
          type: "tradeoffs",
          title: "Two more decisions worth defending",
          items: [
            {
              decision: "Bulk action ceiling",
              chose: "Hard cap of 500 payouts per action, with a typed confirmation above 100",
              rejected: "Unlimited bulk, or a soft warning",
              why:
                "Ops leadership wanted unlimited. I modelled the blast radius: at Meridian's average payout size, an erroneous 5,000-item bulk retry is a $1.2M incident and a regulatory conversation. 500 covers 94% of real clusters.",
              cost:
                "The largest customer hits the ceiling about twice a month and has to split the job. They complained. We kept it. Two years in, there has been no bulk-action incident above $40K.",
            },
            {
              decision: "Whether to keep CSV export",
              chose: "Kept it, and instrumented it as a failure signal",
              rejected: "Removed it to force adoption of the new flow",
              why:
                "Killing the escape hatch would have inflated adoption numbers and hidden the places the product still didn't work. Instead every export became a logged event with a reason prompt.",
              cost:
                "Adoption looked worse in month one than it would have. It also gave us a ranked list of the twelve gaps that mattered, which drove the entire P1 backlog.",
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
          title: "The evidence panel, four times",
          items: [
            {
              version: "v1",
              name: "Tabs per source",
              what:
                "Ledger, rail, bank and customer record each got a tab in a right-hand panel. Clean, obvious, easy to build.",
              learned:
                "Operators tabbed back and forth constantly, holding values in their head. The whole task was comparison and the design forbade comparison. Dead on arrival in the first test.",
              killed: true,
            },
            {
              version: "v2",
              name: "Four-column diff",
              what: "All four sources side by side, aligned on shared fields.",
              learned:
                "Comparison worked. But at real data density it was 40 rows of mostly-identical values, and the two rows that disagreed were invisible. Right idea, wrong emphasis.",
            },
            {
              version: "v3",
              name: "Agreement-collapsed diff",
              what:
                "Fields where all sources agree collapse into a single quiet line. Disagreements expand, get an accent rule and sort to the top.",
              learned:
                "Time-to-first-insight dropped from 71s to 19s in testing. This became the core pattern — and later shipped as a shared component used by three other teams.",
            },
            {
              version: "v4",
              name: "Plus provenance on hover",
              what:
                "Every value shows its source, timestamp and freshness on hover, with a link to the raw record.",
              learned:
                "Senior operators stopped exporting to CSV once they could verify without leaving. Export events fell 68%. Trust needed to be checkable, not just claimed.",
            },
          ],
        },
        {
          type: "prose",
          body: [
            "The v2 → v3 move is the one I'd point at in an interview. Both designs showed the same information. One of them had a point of view about which information mattered, and it was four times faster.",
          ],
        },
      ],
    },
    {
      id: "prototype",
      label: "Prototype",
      blocks: [
        {
          type: "prose",
          body: [
            "I built the evidence panel in React against a fixture set of 2,000 anonymised real payouts rather than prototyping it in Figma. Three reasons, and I'd do it again:",
          ],
        },
        {
          type: "columns",
          items: [
            {
              title: "Real density",
              body:
                "Figma prototypes are built on the ten rows you chose. The v2 design tested beautifully on twelve fields and fell apart on forty. Only real data surfaces that.",
            },
            {
              title: "Real latency",
              body:
                "The rail status call takes 400–1800ms. Designing the loading and stale states against actual timing changed the pattern — we render the ledger immediately and stream the rest in.",
            },
            {
              title: "Straight to production",
              body:
                "The prototype's component API survived into the shipped code almost unchanged. Engineering estimated it saved about three weeks of spec-and-clarify.",
            },
          ],
        },
      ],
    },
    {
      id: "outcome",
      label: "Outcome & impact",
      blocks: [
        {
          type: "metrics",
          title: "12 months post-GA",
          items: [
            { value: "−62%", label: "median resolution time", note: "4h 10m → 1h 34m, n≈61k/month" },
            { value: "3.1×", label: "exceptions cleared per operator-day" },
            { value: "$9.4M", label: "annual write-offs eliminated", note: "90-day unresolved rate fell from 2.7% to 0.3%" },
            { value: "−31%", label: "payout-related support tickets" },
            { value: "+18", label: "enterprise NPS", note: "31 → 49" },
            { value: "$4.2M", label: "new ARR", note: "Exception API tier, 38 accounts in year one" },
          ],
        },
        {
          type: "prose",
          body: [
            "The outcome I care most about isn't in that grid. Meridian's ops org had been planning to hire eleven more operators to keep pace with volume growth. They hired three. The rest of the capacity came out of the redesign.",
            "Recon also stopped being an orphan. It got a permanent team, a roadmap and a line in the enterprise pricing page — which is the real measure of whether a platform surface has been taken seriously.",
          ],
        },
        {
          type: "quote",
          body:
            "We renewed partly because of this. I don't say that about admin tooling.",
          attribution: "Director of Payments, top-5 Meridian account, renewal call",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "Find the number that already exists",
      body:
        "I didn't build a new business case for Recon. I found a write-off line that finance had been reporting for three years and connected it to a screen. Attaching your work to a number leadership already trusts is faster and more durable than inventing a metric they have to learn.",
    },
    {
      title: "Automate the assembly, not the judgment",
      body:
        "Seventy-five percent of the cost was gathering evidence; eight percent was deciding. Most teams reach for the decision because it's the impressive part. The leverage was in the boring three quarters.",
    },
    {
      title: "Keep the escape hatch and instrument it",
      body:
        "Leaving CSV export in place made our adoption numbers look worse and made the product better. Every workaround a user still needs is a ranked, free piece of research.",
    },
    {
      title: "What I'd do differently",
      body:
        "I under-invested in the customer-facing view. We treated it as a P2 revenue add-on, but it was also the highest-leverage support deflection we had. If I ran it again I'd pull a read-only version into P0 — it was three weeks of work sitting behind eleven months of sequencing.",
    },
  ],
};
