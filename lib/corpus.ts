import { caseStudies } from "@/content/case-studies";
import { about } from "@/content/about";
import { engineeringIntro } from "@/content/engineering";
import { experiments, labIntro } from "@/content/lab";
import { experience, education, recognition, skills } from "@/content/resume";
import { site } from "@/content/site";
import type { Block, CaseStudy } from "@/content/types";

export type Chunk = {
  /** Stable id, used as a citation target. */
  id: string;
  /** Human-readable source label shown in the assistant UI. */
  source: string;
  /** Deep link back into the site. */
  href: string;
  text: string;
  keywords: string[];
};

function blockToText(b: Block): string {
  switch (b.type) {
    case "prose":
      return [b.title, ...b.body].filter(Boolean).join(" ");
    case "metrics":
      return [b.title, ...b.items.map((m) => `${m.value} — ${m.label}. ${m.note ?? ""}`)]
        .filter(Boolean)
        .join(" ");
    case "columns":
      return [b.title, ...b.items.map((c) => `${c.title}: ${c.body}`)].filter(Boolean).join(" ");
    case "tradeoffs":
      return [
        b.title,
        ...b.items.map(
          (t) =>
            `Decision: ${t.decision}. Chose: ${t.chose}. Rejected: ${t.rejected}. Why: ${t.why} What it cost: ${t.cost}`,
        ),
      ]
        .filter(Boolean)
        .join(" ");
    case "iterations":
      return [
        b.title,
        ...b.items.map(
          (i) => `${i.version} ${i.name}${i.killed ? " (killed)" : ""}: ${i.what} Learned: ${i.learned}`,
        ),
      ]
        .filter(Boolean)
        .join(" ");
    case "flow":
      return [
        b.title,
        ...b.steps.map(
          (s) => `[${s.actor}] ${s.title}: ${s.body}${s.guardrail ? ` Guardrail: ${s.guardrail}` : ""}`,
        ),
      ]
        .filter(Boolean)
        .join(" ");
    case "prompt":
      return [
        b.title,
        b.label,
        b.body,
        ...b.annotations.map((a) => `${a.k}: ${a.v}`),
      ]
        .filter(Boolean)
        .join(" ");
    case "confidence":
      return [
        b.title,
        ...b.bands.map(
          (c) => `Confidence ${c.range} (${c.share} of cases): ${c.behaviour}. ${c.surface}`,
        ),
      ]
        .filter(Boolean)
        .join(" ");
    case "quote":
      return `"${b.body}" — ${b.attribution}`;
    case "callout":
      return `${b.title}: ${b.body}`;
    case "table":
      return [b.title, b.head.join(" | "), ...b.rows.map((r) => r.join(" | "))]
        .filter(Boolean)
        .join(" ");
    case "visual":
      return b.caption;
    case "image":
      return [b.label, b.caption, ...(b.pins ?? []).map((p) => `${p.title}: ${p.body}`)].filter(Boolean).join(" ");
    case "compare":
      return [b.before.label, b.after.label, b.caption].filter(Boolean).join(" ");
    case "statement":
      return [b.body, b.sub].filter(Boolean).join(" ");
    case "chain":
      return [b.title, b.steps.map((s) => `${s.label}${s.note ? ` (${s.note})` : ""}`).join(" → "), b.caption].filter(Boolean).join(" ");
    case "cta":
      return `${b.label}: ${b.href}`;
    case "gallery":
      return b.items.map((g) => `${g.title}: ${g.body}`).join(" ");
    case "placeholder":
      // Gaps are never retrievable — the assistant must not quote a prompt as fact.
      return "";
    case "evidence":
      return [
        b.title,
        b.intro,
        ...b.items
          .filter((i) => !i.statement.startsWith("[NEED INPUT"))
          .map((i) => `${i.level.toUpperCase()} (${i.level === "validated" ? "tested" : "not yet tested"}): ${i.statement}`),
      ]
        .filter(Boolean)
        .join(" ");
    case "implementation":
      return [b.title, b.intro, ...b.points.map((p) => `${p.title}: ${p.body}`)]
        .filter(Boolean)
        .join(" ");
    case "shift":
      return `${b.from.label}: ${b.from.steps.join(" → ")}. ${b.to.label}: ${b.to.steps.join(" → ")}.`;
    default:
      return "";
  }
}

function caseStudyChunks(cs: CaseStudy): Chunk[] {
  const base = `/case-studies/${cs.slug}`;
  const head: Chunk = {
    id: `${cs.slug}:overview`,
    source: `${cs.title} — overview`,
    href: base,
    text: [
      `${cs.title}: ${cs.subtitle}. ${cs.kind} project at ${cs.company}. Role: ${cs.role}. ${cs.timeframe}. Team: ${cs.team}.`,
      `Thesis: ${cs.thesis}`,
      cs.summary,
      `What it demonstrates: ${cs.proves}`,
      cs.question ? `Central question: ${cs.question}` : "",
      cs.headlineMetrics.length
        ? `Verified results: ${cs.headlineMetrics.map((m) => `${m.value} ${m.label}`).join("; ")}.`
        : "No outcome metrics have been published for this case study yet.",
      `Disciplines: ${cs.disciplines.join(", ")}. Tools: ${cs.stack.join(", ")}.`,
    ].join("\n"),
    keywords: [...cs.keywords, cs.title.toLowerCase(), cs.company.toLowerCase()],
  };

  const chapters = cs.chapters.map<Chunk>((ch) => ({
    id: `${cs.slug}:${ch.id}`,
    source: `${cs.title} — ${ch.label}`,
    href: `${base}#${ch.id}`,
    text: `${cs.title} · ${ch.label}\n${ch.headline ?? ""}\n${ch.blocks.map(blockToText).join("\n")}`,
    keywords: [...cs.keywords, ch.label.toLowerCase(), ch.id],
  }));

  const lessons: Chunk = {
    id: `${cs.slug}:lessons`,
    source: `${cs.title} — lessons`,
    href: `${base}#lessons`,
    text: `${cs.title} lessons learned\n${cs.lessons
      .filter((l) => !l.title.startsWith("["))
      .map((l) => `${l.title}: ${l.body}`)
      .join("\n")}`,
    keywords: [...cs.keywords, "lessons", "learned", "mistake", "differently", "retrospective"],
  };

  // Strip any bracketed gap markers so unfinished content is never quoted as fact.
  return [head, ...chapters, lessons].map((c) => ({
    ...c,
    text: c.text.replace(/\[(NEED INPUT|ADD [A-Z ]+|CONFIRM)[^\]]*\]/g, "").replace(/[ \t]{2,}/g, " "),
  }));
}

const GAP = /\[(NEED INPUT|ADD [A-Z ]+|CONFIRM|YEARS?)[^\]]*\]/g;

const rawCorpus: Chunk[] = [
  {
    id: "profile",
    source: "Profile",
    href: "/#about",
    text: [
      `${site.name} — ${site.role} at ${site.company}, based in ${site.location}.`,
      site.headline,
      site.intro,
      ...site.also.map((a) => `${a.label}: ${a.body}`),
      `Focus: ${site.proof.map((p) => `${p.value} — ${p.label}`).join("; ")}.`,
      `Expertise: ${site.expertise.join(", ")}.`,
      site.availability.open ? site.availability.label : "",
      `Contact: ${site.email}.`,
    ]
      .filter(Boolean)
      .join(" "),
    keywords: ["who", "profile", "summary", "contact", "hire", "available", "role", "overview"],
  },
  ...caseStudies.flatMap(caseStudyChunks),
  {
    id: "about",
    source: "About",
    href: "/#about",
    text: [
      about.opener,
      ...about.story,
      ...about.beliefs.map((b) => `${b.title}: ${b.body}`),
      ...about.personal,
    ].join("\n"),
    keywords: [
      "about",
      "story",
      "philosophy",
      "belief",
      "values",
      "background",
      "why design",
      "personal",
      "leadership",
    ],
  },
  {
    id: "lab",
    source: "AI Innovation Lab",
    href: "/#lab",
    text: [
      `${labIntro.title}. ${labIntro.subtitle} ${labIntro.disclaimer}`,
      ...experiments.map(
        (e) =>
          `${e.title} (${e.model}; ${e.status === "live" ? "working prototype" : "planned, not built yet"}). Question: ${e.question} ${[...(e.whyAi ?? []), ...(e.interaction ?? []), ...(e.trust ?? []).map((t) => `${t.title}: ${t.body}`)].join(" ")}`,
      ),
    ].join("\n"),
    keywords: ["ai", "lab", "experiment", "prototype", "game", "emotion", "agentic", "trust", "llm", "model", "chatbot"],
  },
  {
    id: "engineering",
    source: "Technical fluency",
    href: "/#top",
    text: [
      engineeringIntro.claim,
      ...engineeringIntro.body,
      ...engineeringIntro.reasons.map((r) => `${r.title}: ${r.body}`),
    ].join("\n"),
    keywords: [
      "code",
      "engineering",
      "react",
      "typescript",
      "next",
      "tailwind",
      "framer",
      "github",
      "prototype",
      "technical",
      "developer",
    ],
  },
  {
    id: "resume",
    source: "Résumé",
    href: "/#about",
    text: [
      ...experience.map(
        (r) => `${r.period} — ${r.title}, ${r.org} (${r.location}). ${r.summary} ${r.points.join(" ")}`,
      ),
      ...education.map((e) => `${e.period} — ${e.title}, ${e.org}. ${e.note}`),
      ...skills.map((s) => `${s.group} skills: ${s.items.join(", ")}`),
      ...recognition.map((r) => `${r.year} — ${r.kind}: ${r.title} (${r.org})`),
    ].join("\n"),
    keywords: [
      "resume",
      "cv",
      "experience",
      "education",
      "career",
      "years",
      "skills",
      "awards",
      "speaking",
      "mentoring",
      "job",
      "history",
    ],
  },
];

/** Unfinished content is never retrievable. */
export const corpus: Chunk[] = rawCorpus.map((c) => ({ ...c, text: c.text.replace(GAP, "") }));

const STOP = new Set(
  "a an the and or but of to in on for with how what why when did do does is are was were you your his her their this that it its i me my as at by from about tell show me can could would should".split(
    " ",
  ),
);

function tokenise(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/**
 * Deliberately simple lexical retrieval. No embeddings, no vector store —
 * the corpus is ~25 chunks and this runs in under a millisecond on the client,
 * which is what makes the offline fallback possible.
 */
export function retrieve(query: string, k = 4): Chunk[] {
  const terms = tokenise(query);
  if (!terms.length) return corpus.slice(0, k);

  const scored = corpus.map((chunk) => {
    const hay = `${chunk.source} ${chunk.text}`.toLowerCase();
    const kw = chunk.keywords.join(" ");
    let score = 0;
    for (const t of terms) {
      if (kw.includes(t)) score += 4;
      const matches = hay.split(t).length - 1;
      if (matches) score += Math.min(matches, 6);
    }
    // Slight bias toward overview chunks so short questions get context.
    if (chunk.id.endsWith(":overview")) score *= 1.15;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.chunk);
}
