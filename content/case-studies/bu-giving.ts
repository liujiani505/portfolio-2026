import type { CaseStudy } from "../types";

/**
 * CASE STUDY 02 — Boston University Giving Companion
 * Jiani's freelance project. Not an official Boston University product.
 * No donor testing has been completed yet.
 *
 * Rendered by the standard case study template. Copy below is the page itself.
 */
const IMG = "/work/bu";

export const buGiving: CaseStudy = {
  slug: "bu-giving-companion",
  index: "02",
  kind: "AI product concept",
  layout: "product",
  title: "Boston University",
  subtitle: "Designing an AI giving companion for donors",
  proves:
    "Framing an ambiguous consumer opportunity, designing AI around trust, and being precise about what is still unvalidated.",
  thesis:
    "A freelance project exploring how AI could connect an existing but fragmented university giving ecosystem into a more personal donor journey.",
  company: "Boston University",
  role: "Product Strategy, UX Research, AI Interaction Design, Prototyping",
  timeframe: "[NEED INPUT: timeframe]",
  team: "[NEED INPUT: client / collaborators, if any]",
  disciplines: ["Consumer product", "AI interaction design", "Trust design", "Concept prototype"],
  stack: [],
  card: {
    subtitleLines: ["Designing an AI giving", "companion for donors."],
    facts: [
      { k: "Type", v: "Freelance project" },
      { k: "Role", v: "Product strategy, UX research, AI interaction design, prototyping" },
      { k: "Status", v: "Interactive concept prototype" },
    ],
    tags: ["Consumer product", "AI interaction design", "Trust design", "Concept prototype"],
    image: {
      src: "/work/bu/landing.jpg",
      aspect: "1440 / 1000",
      alt: "Boston University Giving Companion landing page: 'Your giving journey starts with what matters to you' beside a photo of students.",
    },
  },
  hero: {
    eyebrow: "Boston University · Giving Companion",
    headline: "Connecting discovery, giving, and impact through AI.",
    facts: [
      { k: "Type", v: "Freelance project" },
      { k: "Role", v: "Product strategy, UX research, AI interaction design, prototyping" },
      { k: "Organization studied", v: "Boston University Alumni & Friends" },
      { k: "Status", v: "Concept prototype · donor testing planned" },
    ],
    image: {
      src: `${IMG}/recommendations.jpg`,
      alt: "Recommendations page: three funds labelled closest match, strong match and related, each with why it matches, a verified source link, a compare checkbox and an explore button.",
    },
  },
  headlineMetrics: [],
  summary:
    "Boston University Giving Companion is a freelance project: a concept for a donor-facing AI assistant inside Boston University's existing Alumni & Friends giving experience. It helps annual donors discover funds that match what they care about, compare them, give through BU's existing secure checkout, and later follow verified updates about programs they supported. It is an interactive concept prototype; donor usability validation is planned, not done.",
  keywords: [
    "bu",
    "boston university",
    "giving",
    "donor",
    "fundraising",
    "advancement",
    "ai",
    "assistant",
    "trust",
    "consumer",
    "recommendation",
    "concept",
    "validation",
  ],
  chapters: [
    {
      id: "opportunity",
      label: "The opportunity",
      headline: "Major donors get a relationship. Annual donors mostly find their own way.",
      blocks: [
        {
          type: "columns",
          items: [
            { title: "High-touch: major & principal donors", body: "Individual attention from advancement staff: guidance before a gift, a relationship after it." },
            { title: "Self-serve: annual donors", body: "Find a fund alone, give through a form, and rarely hear how that program is doing." },
            { title: "The constraint", body: "Staff capacity: individual cultivation doesn't scale to every annual donor." },
          ],
        },
        {
          type: "prose",
          body: [
            "Exploratory conversations in the advancement sector, and feedback relayed from alumni and donors, pointed to the same few concerns. Advancement leadership has also expressed interest in exploring AI for annual giving and longer-term donor relationships.",
          ],
        },
        {
          type: "list",
          items: [
            "Finding relevant giving opportunities can be difficult.",
            "Giving navigation can feel fragmented or confusing.",
            "Donors may struggle to see how the programs they supported are progressing.",
            "Annual donors rarely get the individual attention major donors do.",
          ],
          note: "These shaped the opportunity. They are not completed donor research.",
        },
        {
          type: "callout",
          kind: "insight",
          title: "How might we help annual donors discover giving opportunities that reflect their interests, and stay meaningfully connected to their impact, without requiring high-touch support from staff?",
          body: "The design question the rest of the project works from.",
        },
      ],
    },
    {
      id: "existing",
      label: "Understanding the existing experience",
      headline: "The pieces exist. The journey between them doesn't.",
      blocks: [
        {
          type: "prose",
          body: [
            "Boston University (BU) already has a Where to Give directory, school-specific fund pages, donation forms and published impact stories. Each works on its own. The gaps are in between.",
          ],
        },
        {
          type: "chain",
          label: "Today: separate touchpoints, the donor connects them",
          tone: "loose",
          steps: [
            { label: "Where to Give directory", note: "Which fund fits what I care about?" },
            { label: "Fund pages", note: "How is this different from that one?" },
            { label: "Donation form", note: "What happened after I gave?" },
            { label: "Impact stories" },
          ],
          caption: "Gaps shown are assumptions to validate with donors.",
        },
        {
          type: "chain",
          label: "Proposed: the same touchpoints, connected by one guidance layer",
          tone: "joined",
          steps: [
            { label: "Where to Give directory" },
            { label: "Fund pages" },
            { label: "Donation form" },
            { label: "Impact stories" },
          ],
          caption: "The Giving Companion: one continuous journey across what BU already runs.",
        },
        {
          type: "columns",
          title: "What I knew, and what I was assuming",
          items: [
            { title: "Stakeholder observations", body: "Relevant opportunities are hard to find. Navigation feels fragmented. Leadership interest in AI for annual giving." },
            { title: "Public website analysis", body: "Discovery, fund detail, donation and impact live in separate places. Impact stories aren't connected back to the funds a donor gave to." },
            { title: "Assumptions to validate", body: "Donors would describe a cause in their own words. Explanations and sources would increase confidence. Returning donors want program updates, with permission." },
          ],
        },
      ],
    },
    {
      id: "strategy",
      label: "Product strategy",
      headline: "Connect the ecosystem. Don't replace it.",
      blocks: [
        {
          type: "prose",
          body: [
            "Another donation platform would compete with what BU already runs. A guidance layer can sit on top: it reads verified content, listens to the donor, and hands off to the systems that already work.",
          ],
        },
        {
          type: "table",
          head: ["", "Improved navigation & directory", "Structured interest-based fund finder", "AI-assisted giving companion"],
          highlight: 3,
          rows: [
            ["What it is", "Clearer categories, labels and search on existing pages.", "A guided set of questions that filters funds by cause, school and audience.", "Donors describe what matters in their own words; answers are grounded in BU's published content."],
            ["Strength", "Lowest risk and cost. Helps every visitor.", "Predictable, explainable, easy to govern.", "Handles open-ended interests and follow-up questions, and can connect giving to later updates."],
            ["Limit", "Still asks donors to know where to look. Nothing after the gift.", "Only as good as its categories. Rigid for personal or nuanced motivations.", "Needs strong guardrails, source grounding and governance. Highest risk if wrong."],
            ["Open question", "Is findability the real problem?", "Would a finder be enough?", "Does AI add value beyond a good finder? Not yet validated."],
          ],
          caption: "I explored the companion because it is the only option that spans before and after the gift. The simpler options stay on the table until donors have tried all three.",
        },
        {
          type: "columns",
          title: "What the Companion connects",
          items: [
            { title: "Donor-provided interests", body: "Their own words, plus giving history only with permission." },
            { title: "Verified fund information", body: "Where to Give and school fund pages." },
            { title: "Published impact content", body: "Your Impact stories and BU news." },
          ],
        },
        {
          type: "prose",
          body: [
            "Payment stays in BU's existing secure giving form. The Companion stores nothing new about the gift itself; it reads what BU already publishes and hands off to what BU already runs.",
          ],
        },
      ],
    },
    {
      id: "experience",
      label: "Designing the experience",
      headline: "One journey, from a sentence to a relationship.",
      blocks: [
        {
          type: "prose",
          title: "1 · Discover through conversation",
          body: [
            "Start with what the donor cares about, not with BU's org chart. A plain question, a few example prompts, and browse-by-cause for anyone who'd rather click than type. It lives inside the existing Giving navigation, and answers draw only from BU's published giving pages and impact stories.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/landing.jpg`,
          alt: "Giving Companion landing: 'Your giving journey starts with what matters to you', the question 'What would you like your gift to support?' with a text box, a Start discovery button and example prompts, beside the Giving navigation with Giving Companion, Discover funds, Compare funds and My Giving Journey.",
        },
        {
          type: "prose",
          title: "2 · Explore recommendations you can question",
          body: [
            "A donor writes, “I'm passionate about helping first-generation college students succeed.” The Companion answers in plain language, then shows three funds, each with why it matches and where that came from.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/recommendations.jpg`,
          aspect: "1440 / 1200",
          alt: "Recommendations page: three funds labelled closest match, strong match and related, each with why it matches and a verified source link.",
        },
        {
          type: "columns",
          items: [
            { title: "Graded, not ranked", body: "“Closest match”, “Strong match”, “Related” say how strong the fit is without implying a score." },
            { title: "Reasons in the donor's words", body: "“You said you want first-generation students to succeed…”" },
            { title: "Room to narrow", body: "Follow-ups like “Is there an option within my school?” keep the donor steering." },
          ],
        },
        {
          type: "prose",
          title: "3 · Compare with confidence",
          body: [
            "Two funds that both help first-generation students are easy to confuse. The comparison opens with a one-paragraph short version, then lines them up on the questions donors actually weigh. The last row, “Best if you want to…”, turns a spec sheet into a decision.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/compare.jpg`,
          alt: "Compare funds side by side: a short plain-language summary, then rows for where each fund lives, what it pays for, who it reaches, verified updates and who it's best for.",
        },
        {
          type: "prose",
          title: "4 · Give through BU, not around it",
          body: [
            "The Companion stops where payment starts. It confirms the fund, explains what happens next, and hands off to BU's existing secure giving form with the fund already selected.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/give.jpg`,
          alt: "Give page: the chosen Newbury Center Fund, what happens next in three steps, and a 'Continue to BU Giving' button with a note that checkout is handled by BU's existing system.",
        },
        {
          type: "prose",
          title: "5 · Beyond the donation",
          body: [
            "A year later the donor asks, “What's happening with the scholarship program I supported last year?” With permission to use their giving history, the Companion finds what BU has published about that fund since the gift.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/journey.jpg`,
          aspect: "1440 / 1300",
          alt: "My Giving Journey: the donor's question, progress steps, the fund and gift date used with permission, two verified program updates, and related stories.",
        },
        {
          type: "statement",
          body: "Program progress is not the same as your gift's impact.",
          sub: "The page reports what BU has published about the program and says plainly that it can't connect an individual gift to an individual recipient.",
        },
      ],
    },
    {
      id: "trust",
      label: "Trust by design",
      headline: "Six details that decide whether a donor believes it.",
      blocks: [
        {
          type: "gallery",
          fit: "contain",
          numbered: true,
          items: [
            { src: `${IMG}/recs-match.jpg`, alt: "Fund card with a 'Why this matches you' explanation, a verified badge and a source link.", title: "Recommendations explain themselves", body: "Every fund says why it matched, in terms of what the donor said, and how strong the match is." },
            { src: `${IMG}/plain-language.jpg`, alt: "'In plain language' panel with source chips and a note about what it doesn't include.", title: "Sources you can check", body: "Plain-language answers link back to the BU pages they came from and say what they don't cover." },
            { src: `${IMG}/journey-permission.jpg`, alt: "Progress steps including 'Checking your giving history (permission on)' with a Manage link.", title: "Permission is visible and reversible", body: "Giving history is used only when the donor allows it, and the page shows exactly what was used." },
            { src: `${IMG}/verified-impact.jpg`, alt: "Verified impact information with sources, and a 'Not available' note that per-gift outcomes aren't published.", title: "Honest about what it doesn't know", body: "When BU hasn't published something, the Companion says so instead of estimating." },
            { src: `${IMG}/journey-person.jpg`, alt: "Panel: Want to talk this through with a person? with a Request a conversation button.", title: "A person is always one step away", body: "Talking to someone from advancement is offered on every screen, not hidden behind the assistant." },
            { src: `${IMG}/give-handoff.jpg`, alt: "Ready to give panel with an optional 'Remember this fund' checkbox and a Continue to BU Giving button.", title: "The donor decides, BU handles payment", body: "Remembering the fund is opt-in, and checkout happens in BU's existing system. The Companion never sees payment details." },
          ],
        },
      ],
    },
    {
      id: "validation",
      label: "Validation and next steps",
      headline: "What this is, and what has to happen next.",
      blocks: [
        {
          type: "facts",
          items: [
            { k: "Done", v: "Interactive concept prototype" },
            { k: "Next", v: "Donor usability study" },
            { k: "Not done", v: "Donor testing, launch, results" },
          ],
        },
        {
          type: "table",
          title: "Proposed donor tasks",
          head: ["Task", "What it would tell me"],
          rows: [
            ["Find a fund that supports first-generation students.", "Does conversational discovery reach a relevant fund?"],
            ["Compare two funds.", "Can donors explain the difference in their own words?"],
            ["Verify where a recommendation came from.", "Do donors notice and use source links?"],
            ["Find updates about a program you supported.", "Is My Giving Journey findable, and is it clear what isn't known?"],
          ],
        },
        {
          type: "list",
          title: "What I'd measure",
          items: [
            "Relevant fund discovery success",
            "Accuracy of fund understanding",
            "Time and effort to compare options",
            "Recognition of verified evidence",
            "Trust and perceived usefulness",
            "Ability to find post-gift updates",
          ],
          note: "I'd run the same tasks against a structured fund finder too. If it performs as well, it is the simpler product to ship.",
        },
      ],
    },
  ],
  lessons: [
    {
      title: "Connect, don't add",
      body: "The opportunity wasn't to create more fundraising content. It was to explore how existing experiences could become more connected and meaningful.",
    },
    {
      title: "The first test decides",
      body: "The concept is only as good as its first test with real donors. That is the critical next step, alongside an honest comparison with simpler, non-AI alternatives.",
    },
  ],
};
