import type { CaseStudy } from "../types";

export const fieldnote: CaseStudy = {
  slug: "fieldnote",
  index: "03",
  kind: "Innovation",
  title: "Fieldnote",
  subtitle: "A spatial agent for the people who inspect the physical world",
  thesis:
    "Industrial inspection is a memory problem disguised as an expertise problem. Fieldnote asks what happens when the record writes itself — and what a technician's hands, voice and gaze become when they're the interface.",
  company: "Self-directed concept · built with 2 collaborators",
  role: "Concept, product design, prototype engineering",
  timeframe: "2025 · 14 weeks",
  team: "Me, one ML engineer, one industrial-safety advisor (former NDT inspector, 22 years)",
  disciplines: [
    "Spatial computing",
    "Multimodal interaction",
    "Agentic systems",
    "Speculative design",
    "Prototyping",
  ],
  stack: [
    "Apple Vision Pro",
    "visionOS / SwiftUI",
    "RealityKit",
    "Claude (vision + tools)",
    "Whisper",
    "React",
    "TypeScript",
  ],
  headlineMetrics: [
    { value: "14 wks", label: "concept to working headset prototype" },
    { value: "9", label: "inspectors in the field study", note: "3 sites, 41 inspection runs" },
    { value: "−71%", label: "post-inspection reporting time", note: "prototype study, n=41" },
    { value: "6", label: "hazard classes the agent is forbidden to judge", note: "by design" },
  ],
  summary:
    "A concept and working prototype for hands-free industrial inspection. A technician walks a site wearing a passthrough headset; a multimodal agent watches what they look at, listens to what they say, anchors findings to real-world locations in 3D, retrieves the right maintenance procedure without being asked, and assembles the compliance report by the time they take the headset off. Built to test a specific claim: that the highest-value application of spatial computing is not new interfaces, but the elimination of the gap between doing work and recording it.",
  keywords: [
    "innovation",
    "spatial computing",
    "vision pro",
    "multimodal",
    "agents",
    "ambient",
    "voice",
    "future",
    "prototype",
    "concept",
    "industrial",
    "safety",
  ],
  chapters: [
    {
      id: "problem",
      label: "Problem",
      blocks: [
        {
          type: "prose",
          body: [
            "A pressure-vessel inspector spends four hours walking a refinery unit and two hours that evening writing it up. The two hours are reconstruction: photos on a phone, notes on a clipboard, a voice memo, and memory. The reconstruction is where the errors live.",
            "My advisor on this project inspected industrial assets for twenty-two years. His line was: 'The report is never what I saw. It's what I could still remember at 7pm.'",
          ],
        },
        {
          type: "metrics",
          title: "The gap, measured in our baseline study",
          items: [
            { value: "34%", label: "of findings had no photograph", note: "hands were occupied at the moment of observation" },
            { value: "2.1 hrs", label: "average evening write-up per 4-hour inspection" },
            { value: "19%", label: "of findings could not be re-located on a follow-up visit", note: "described in prose, not anchored in space" },
            { value: "0", label: "inspections where the location record was better than a written description" },
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "The reframe",
          body:
            "Everyone building for this space was building a better camera or a better form. The real problem is that observation and documentation are separated by six hours and a change of context. Spatial computing is interesting here not because 3D is exciting, but because a headset is the only device that is present at the moment of observation and has both hands free.",
        },
      ],
    },
    {
      id: "context",
      label: "Why now",
      blocks: [
        {
          type: "columns",
          title: "Three things that were not true three years ago",
          items: [
            {
              title: "Passthrough is good enough to work in",
              body:
                "Not good enough for eight hours, and not certified for hazardous areas — both real constraints we designed around. But good enough for a 40-minute inspection leg, which is the actual unit of the work.",
            },
            {
              title: "Models can see and reason together",
              body:
                "A model that can look at a corroded flange, read the asset tag, retrieve the right ASME procedure and ask a useful follow-up question is a 2024 capability. In 2021 each of those was a separate system with a separate integration.",
            },
            {
              title: "Persistent spatial anchors",
              body:
                "A finding can be pinned to a physical location and be there on the next visit, six months later, for a different inspector. This turns an inspection from a document into a spatial database that accumulates.",
            },
          ],
        },
        {
          type: "prose",
          body: [
            "I'm deliberately not claiming this is a business today. Headset ergonomics, hazardous-area certification and cost all make it a three-to-five year proposition. The point of the prototype was to find out which of the interaction problems are hard, so the answer exists when the hardware arrives.",
          ],
        },
      ],
    },
    {
      id: "strategy",
      label: "The interaction thesis",
      blocks: [
        {
          type: "prose",
          title: "The agent is a scribe, not an inspector",
          body: [
            "Every design decision came from one commitment: the agent never judges. It observes, retrieves, organises, drafts and asks. The technician's professional certification is on the report, and their judgment is the thing the system is built to preserve — not to approximate.",
            "This is the same principle as Recoup, arrived at from a different direction. In a domain where being wrong hurts someone, the machine assembles and the human decides.",
          ],
        },
        {
          type: "columns",
          title: "Four interaction principles",
          items: [
            {
              title: "Gaze is intent, not input",
              body:
                "Looking at something never triggers an action. It builds context the agent may use when spoken to. Gaze-as-click is the most common spatial-UI mistake and it makes people afraid to look around.",
            },
            {
              title: "Voice is the primary verb",
              body:
                "Hands hold tools. Speech carries the finding — 'crack at the weld, maybe two inches, third one I've seen on this line.' The agent's job is to turn that into a structured, located, photographed, procedure-linked record.",
            },
            {
              title: "The record is visible in the world",
              body:
                "Findings appear anchored where they were made, as quiet markers in peripheral vision. The technician can see the shape of their own inspection as they walk it. Coverage becomes spatial rather than a checklist.",
            },
            {
              title: "The agent interrupts rarely, and only to ask",
              body:
                "It has a strict interruption budget — roughly one prompt per finding, only when a required field is genuinely ambiguous, and never while the technician is speaking or moving quickly.",
            },
          ],
        },
        {
          type: "visual",
          id: "spatial-stack",
          caption:
            "The four layers: physical asset, spatial anchor graph, agent context window, technician attention. Everything the system does is a negotiation about the fourth layer.",
        },
      ],
    },
    {
      id: "workflow",
      label: "How it works",
      blocks: [
        {
          type: "flow",
          title: "One finding, start to finish",
          steps: [
            {
              actor: "Human",
              title: "Observe and speak",
              body:
                "The technician looks at a flange and says: 'Corrosion on the west face, moderate, I'd call it a two.' No wake word, no button. A lightweight on-device classifier distinguishes inspection speech from ambient conversation.",
              guardrail:
                "A visible, persistent capture indicator. Everyone on site can see when the system is recording. Non-negotiable in a workplace.",
            },
            {
              actor: "Model",
              title: "Anchor and capture",
              body:
                "Gaze target plus depth data produce a spatial anchor. A frame is captured and the asset tag OCR'd. The finding now has a location that will still be correct on the next visit.",
            },
            {
              actor: "Model",
              title: "Retrieve the relevant procedure",
              body:
                "Asset class plus finding type plus severity retrieve the applicable inspection standard and the site's own maintenance history for that asset. Presented as a small peripheral card, not read aloud.",
              guardrail:
                "Retrieval is shown with its source document and revision. Unsourced guidance is never displayed.",
            },
            {
              actor: "Model",
              title: "Ask exactly one question",
              body:
                "'Standard wants a wall-thickness reading for grade two — do you have one?' Asked once, in a two-second window after the technician stops speaking. If ignored, the field is marked incomplete rather than re-asked.",
              guardrail:
                "The agent never asks a second time. Repetition is how ambient systems become intolerable.",
            },
            {
              actor: "System",
              title: "Assemble continuously",
              body:
                "The report builds as the walk proceeds. Coverage gaps against the inspection plan appear as dimmed anchors in space — areas of the unit not yet looked at.",
            },
            {
              actor: "Human + Model",
              title: "Review at the desk",
              body:
                "Headset off. The report opens on a normal screen, findings ordered by severity, each linked to its anchor, image, quote and retrieved standard. Median review: 11 minutes.",
              guardrail:
                "The technician's spoken words are preserved verbatim alongside the model's structured version. The original is always recoverable.",
            },
            {
              actor: "Human",
              title: "Certify",
              body:
                "The inspector signs. Their name, their judgment, their liability — unchanged from the paper process, which is what makes the whole thing adoptable.",
            },
          ],
        },
        {
          type: "callout",
          kind: "risk",
          title: "Six things the agent is forbidden to judge",
          body:
            "Structural integrity calls, fitness-for-service determinations, hazardous-atmosphere assessments, lockout/tagout adequacy, confined-space entry decisions, and anything triggering an immediate shutdown. In each case the agent may retrieve the standard and surface prior history — it may not offer an assessment, not even a hedged one. A hedged assessment in safety work is still an anchor on a human decision.",
        },
      ],
    },
    {
      id: "iterations",
      label: "What the prototype taught us",
      blocks: [
        {
          type: "iterations",
          title: "Three assumptions that died in the field",
          items: [
            {
              version: "A1",
              name: "Findings should render as rich 3D annotations",
              what:
                "Floating labelled cards anchored to each finding, with severity colour, icon and summary text.",
              learned:
                "Inspectors hated it within four minutes. Occlusion in a dense pipe rack is a safety hazard, and the visual noise competed with the thing they were there to look at. Replaced with 4px monochrome dots that expand only on direct sustained gaze. The best spatial UI is mostly absent.",
              killed: true,
            },
            {
              version: "A2",
              name: "The agent should confirm each finding",
              what: "A short verbal confirmation after every capture — 'got it, corrosion, west face, grade two.'",
              learned:
                "Intolerable by finding six. Inspectors started rushing their speech to get past the confirmation. Replaced with a 200ms haptic tick and a peripheral dot. Acknowledgement needs to be felt, not heard.",
              killed: true,
            },
            {
              version: "A3",
              name: "Natural language is the ideal input",
              what: "Fully open speech, the agent structures everything.",
              learned:
                "Partly wrong in an interesting way. Experienced inspectors already speak in a rigid professional grammar — location, defect, extent, severity. Fighting that with open-ended prompting made things slower. The agent now expects that grammar and only falls back to open interpretation when parsing fails. Domain language beats natural language.",
            },
            {
              version: "A4",
              name: "Coverage should be a checklist",
              what: "A visible task list of areas to inspect.",
              learned:
                "Replaced with dimmed spatial markers over un-inspected regions. Inspectors navigated by space, not by list — 'I haven't been round the back of that unit' is a spatial thought. The checklist was a translation nobody needed.",
            },
          ],
        },
        {
          type: "metrics",
          title: "Field study, 41 inspection runs across 3 sites",
          items: [
            { value: "−71%", label: "time from last observation to signed report", note: "2.1 hrs → 37 min" },
            { value: "+2.4×", label: "findings captured per run", note: "the ones that used to be lost between clipboard and evening" },
            { value: "97%", label: "of findings re-locatable on a follow-up visit", note: "from 81%" },
            { value: "38 min", label: "median comfortable session length", note: "the hard ceiling on this idea today" },
          ],
        },
        {
          type: "prose",
          body: [
            "That last number is the honest one. Thirty-eight minutes is not a shift. This concept is waiting on hardware, and pretending otherwise would make the rest of the work less believable.",
          ],
        },
      ],
    },
    {
      id: "outcome",
      label: "Where it goes",
      blocks: [
        {
          type: "prose",
          body: [
            "Fieldnote is a concept with a working prototype, not a product. What it produced that I think has durable value:",
          ],
        },
        {
          type: "columns",
          items: [
            {
              title: "An interaction grammar",
              body:
                "Gaze as context rather than input; voice as the verb; haptics for acknowledgement; a strict interruption budget. Four patterns that transfer to any ambient agent, headset or not — and that I used again in a shipped product six months later.",
            },
            {
              title: "A refusal architecture",
              body:
                "The list of six things the agent may not judge is the most reusable artefact from this project. Deciding what a capable system is not permitted to do, and encoding it structurally, is becoming the central design question in agentic products.",
            },
            {
              title: "A trailing spatial record",
              body:
                "Inspections that accumulate in place across visits and inspectors. This is the idea I'd build a company around — the headset is incidental, the persistent spatial memory of an asset is the asset.",
            },
          ],
        },
        {
          type: "quote",
          body:
            "The dots were the thing. I could see where I'd been. I've never been able to see where I'd been.",
          attribution: "Inspector, 16 years' experience, site 2",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "The best spatial interface is mostly absent",
      body:
        "Every rich 3D element we designed got cut. What survived was a 4px dot, a haptic tick and a peripheral card. When the physical world is the primary content, the interface's job is to stay out of the way and be findable when wanted.",
    },
    {
      title: "Professionals already have a grammar — use it",
      body:
        "We assumed open natural language was the ceiling. Experienced inspectors speak in a tight domain syntax, and building to that was faster and more accurate than open-ended interpretation. 'Natural' language is often less natural than the language experts actually use.",
    },
    {
      title: "Refusal is an architecture, not a policy",
      body:
        "The six forbidden judgments aren't a prompt instruction — they're a routing rule with no path to a model response. If you can only state a limit in English, you haven't built it.",
    },
    {
      title: "Be honest about the ceiling",
      body:
        "Thirty-eight minutes of comfortable wear is a real constraint and I put it in the results rather than the appendix. A speculative project earns its credibility by naming precisely what would have to change for it to be real.",
    },
  ],
};
