# Portfolio — Jiani Liu

Portfolio site for a Principal Product Designer. Next.js 14 (App Router), TypeScript, Tailwind, Framer Motion, and a streaming AI assistant grounded in the case studies.

Verified: `tsc --noEmit` clean, `next build` clean, 9 routes prerendered, ~171 kB first-load JS on the homepage.

---

## Quick start

```bash
npm install          # required — see note below
npm run dev          # http://localhost:3000
```

**Note on `node_modules`:** the folder ships with Linux-built dependencies from the environment this was assembled in. Run `npm install` once on your machine so npm swaps in the correct native `@next/swc-*` binary for macOS. If you'd rather start clean, delete `node_modules/` and `.next/` first — both are gitignored.

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
npm run lint
```

### Enabling the AI assistant

```bash
cp .env.example .env.local
# add ANTHROPIC_API_KEY=sk-ant-...
```

Without a key the site still works. The assistant detects the missing key and falls back to a deterministic retrieval reader that quotes the case studies directly — so previews, forks and offline demos never show a broken feature.

---

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — the Next.js preset is detected automatically, no config needed.
3. Add `ANTHROPIC_API_KEY` under **Settings → Environment Variables** (Production + Preview).
4. Deploy.

The only server-rendered route is `/api/assistant`. Everything else is static, so it's cheap to host anywhere that runs Next.

---

## Make it yours

Everything you'd want to change lives in `content/` — no component edits required.

| File | What's in it |
|---|---|
| `content/site.ts` | **Start here.** Name, role, email, links, headline, the four proof metrics, nav. Propagates to metadata, SEO, JSON-LD, nav and footer. |
| `content/case-studies/*.ts` | The three case studies. Written against a typed block schema (`content/types.ts`) so you compose from `prose`, `metrics`, `tradeoffs`, `iterations`, `flow`, `prompt`, `confidence`, `quote`, `callout`, `table`, `visual`. |
| `content/playground.ts` | Playground tiles and which live demo renders in each. |
| `content/engineering.ts` | Repos and the argument for why a designer codes. |
| `content/about.ts`, `content/resume.ts` | About narrative, timeline, skills, awards, speaking, mentoring. |

Adding a case study: drop a new file in `content/case-studies/`, add it to the array in `index.ts`. The route, sitemap entry, static params, prev/next link and assistant retrieval index all pick it up automatically.

**Content status.** The original sample content (fictional companies, metrics, awards, repos) has been removed from the live site and kept in `_archive/`. What is on the site now is either confirmed by Jiani or shown as a visible `[NEED INPUT]` / `[ADD …]` placeholder. Search the `content/` folder for `[` to find every gap; `CASE-STUDY-TODO.md` lists the case-study ones. Placeholders are never indexed by the ⌘K assistant.

**AI Lab.** `content/lab.ts` holds the experiments. Only `status: "live"` ones get a page (`/lab/[slug]`); planned ones show as marked previews. Experiments with a `caseStudy` render with the same article layout as the case studies.

Design tokens are eleven CSS custom properties in `app/globals.css` — change `--accent` there and the entire site re-themes in both light and dark.

---

## Architecture

```
app/
  layout.tsx              Fonts, metadata, JSON-LD, providers, theme anti-FOUC script
  page.tsx                Homepage section composition
  work/[slug]/page.tsx    Case study route (SSG via generateStaticParams)
  api/assistant/route.ts  Streaming Anthropic endpoint + offline signal
  sitemap.ts, robots.ts   Generated from the content layer
components/
  ui/primitives.tsx       Reveal, Section, MetricCell, ArrowLink — the whole vocabulary
  sections/               One file per homepage band
  case-study/blocks.tsx   Renders the typed block schema; includes the decision explorer
  assistant/              Context + command-palette UI
  visuals.tsx             Case study cover art and in-page diagrams, all SVG
  playground-demos.tsx    Eight live demos
lib/
  corpus.ts               Flattens content → retrievable chunks; lexical retrieval
  utils.ts                Named easing curves and durations
```

Three ideas hold it together:

**One content layer, many consumers.** Case studies are typed data, not MDX. The detail page, the homepage cards, the sitemap, the SEO metadata and the assistant's retrieval index are all derived from the same objects, so they cannot drift.

**One motion vocabulary.** `lib/utils.ts` defines four named curves with documented intent. `<Reveal>` is the only scroll animation in the system. Every animation is gated on `prefers-reduced-motion`.

**Graceful degradation as a feature.** The assistant works without an API key. The cursor disables itself on coarse pointers. Theme is set before first paint. Nothing on the site depends on JavaScript to be readable.

---

## The AI assistant

Press ⌘K anywhere.

- `lib/corpus.ts` flattens all content into ~34 labelled chunks with deep links.
- A lexical scorer picks the top 5 for the question — no embeddings, no vector store, runs in under a millisecond. That's what makes the client-side fallback possible.
- The API route sends those chunks as context with a system prompt that forbids inventing anything and requires admitting gaps.
- The response streams token-by-token; retrieved sources render as clickable chips that deep-link into the relevant case study section.
- No key, or the request fails? The client runs the same retrieval locally and quotes the source directly, clearly labelled as the offline reader.

Out-of-scope questions return no chunks and produce an honest "I couldn't find that" with suggestions — verified against a set of test queries.

Model defaults to `claude-sonnet-4-5`; override with `ANTHROPIC_MODEL`.

---

## Accessibility & performance

- Skip link, semantic landmarks, labelled sections, `aria-expanded` on every disclosure.
- Full keyboard operation, including the assistant (⌘K to open, Esc to close).
- Visible focus rings using the accent colour; never removed.
- `prefers-reduced-motion` honoured globally in CSS and per-component via `useReducedMotion`.
- Decorative SVG marked `aria-hidden`; the animated headline exposes plain text to screen readers via `sr-only`.
- Fonts self-hosted through `next/font` — no layout shift, no third-party requests.
- No images to optimise: every visual is inline SVG.

---

## Known trade-offs

- **No CMS.** Content is TypeScript. Faster and type-safe for one author; wrong choice if a non-technical person needs to edit it.
- **Lexical retrieval, not embeddings.** Fine at 34 chunks. Past ~200 you'd want real embeddings.
- **No rate limiting on `/api/assistant`.** Add Vercel KV or Upstash before putting a real API key on a public domain.
- **`/jiani-liu-resume.pdf` doesn't exist yet.** Drop your PDF in `public/` or change the link in `content/site.ts`.
