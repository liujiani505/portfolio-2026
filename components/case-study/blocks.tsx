import type { Block } from "@/content/types";
import { Reveal } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * Case study building blocks in the Quiet Grid style: no tinted boxes or
 * dark panels. Structure comes from thin rules, type weight and spacing.
 */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <Reveal>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <div className="max-w-[62ch] space-y-5 text-pretty text-lg leading-relaxed">
            {block.body.map((p) =>
              p.startsWith("[") ? (
                <PlaceholderBlock key={p} tag="NEED INPUT" prompt={p.replace(/^\[NEED INPUT:\s*/, "").replace(/\]$/, "")} />
              ) : (
                <p key={p}>{p}</p>
              ),
            )}
          </div>
        </Reveal>
      );

    case "metrics":
      return (
        <Reveal>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <dl className="grid gap-6 border-t border-line pt-5 sm:grid-cols-3">
            {block.items.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-title font-light tabular-nums">{m.value}</dd>
                <dd className="mt-2 text-base leading-snug text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "columns":
      return (
        <Reveal>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <ul className={cn("grid gap-8 border-t border-line pt-5 sm:gap-6", block.items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
            {block.items.map((it) => (
              <li key={it.title}>
                <h3 className="text-base font-medium">{it.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{it.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case "list":
      return (
        <Reveal>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <ul className="max-w-[62ch] border-t border-line">
            {block.items.map((t) =>
              t.startsWith("[") ? (
                <li key={t} className="border-b border-line py-4">
                  <PlaceholderBlock tag="NEED INPUT" prompt={t.replace(/^\[NEED INPUT:\s*/, "").replace(/\]$/, "")} />
                </li>
              ) : (
                <li key={t} className="border-b border-line py-4 text-lg leading-snug">
                  {t}
                </li>
              ),
            )}
          </ul>
          {block.note && <p className="mt-4 max-w-[62ch] text-base text-muted">{block.note}</p>}
        </Reveal>
      );

    case "facts":
      return (
        <Reveal>
          <dl className="grid gap-6 border-t border-line pt-5 sm:grid-cols-3">
            {block.items.map((f) => (
              <div key={f.k}>
                <dt className="eyebrow mb-1.5">{f.k}</dt>
                <dd className="text-base">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );

    case "callout":
      return (
        <Reveal>
          <aside className="max-w-3xl border-t border-ink pt-5">
            <p className="eyebrow">{block.kind === "insight" ? "Insight" : block.kind}</p>
            <h3 className="mt-3 max-w-[40ch] text-balance text-xl font-medium leading-snug">{block.title}</h3>
            <p className="mt-3 max-w-[62ch] text-pretty text-lg leading-relaxed text-muted">{block.body}</p>
          </aside>
        </Reveal>
      );

    case "statement":
      return (
        <Reveal>
          <div className="py-4">
            <p className="max-w-[26ch] text-balance text-big font-light">{block.body}</p>
            {block.sub && <p className="mt-4 max-w-[62ch] text-lg text-muted">{block.sub}</p>}
          </div>
        </Reveal>
      );

    case "table":
      return (
        <Reveal>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={block.title ?? "Table"}>
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={cn(
                        "border-b border-ink py-3 pr-4 align-bottom text-base font-medium",
                        block.highlight === i && "bg-surface pl-4",
                      )}
                    >
                      {h || <span className="sr-only">Criteria</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("|")} className="align-top">
                    {row.map((c, i) =>
                      i === 0 && block.head[0] === "" ? (
                        <th key={i} scope="row" className="border-b border-line py-4 pr-4 text-base font-medium text-muted">
                          {c}
                        </th>
                      ) : (
                        <td
                          key={i}
                          className={cn(
                            "border-b border-line py-4 pr-4 text-base leading-relaxed",
                            block.highlight === i && "bg-surface pl-4",
                          )}
                        >
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <Caption>{block.caption}</Caption>}
        </Reveal>
      );

    case "image":
      return (
        <Reveal>
          <figure>
            {block.label && <p className="eyebrow mb-3">{block.label}</p>}
            <div
              className={cn("relative", block.scroll ? "max-h-[34rem] overflow-y-auto rounded-xl border border-line bg-white" : "shot")}
              {...(block.scroll ? { tabIndex: 0, role: "region", "aria-label": `${block.label ?? "Image"}, scrollable` } : {})}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                className={cn("block h-auto w-full", block.aspect && "object-cover object-top")}
                style={block.aspect ? { aspectRatio: block.aspect } : undefined}
              />
              {block.pins?.map((p, i) => (
                <span
                  key={p.title}
                  aria-hidden
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1f1f1e] text-base font-medium text-white shadow-[0_0_0_3px_#fff]"
                >
                  {i + 1}
                </span>
              ))}
            </div>
            {block.pins && (
              <ol className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {block.pins.map((p, i) => (
                  <li key={p.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink text-base font-medium">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-base font-medium">{p.title}</span>
                      <span className="block text-base leading-relaxed text-muted">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
            {block.caption && <Caption>{block.caption}</Caption>}
          </figure>
        </Reveal>
      );

    case "compare":
      return (
        <Reveal>
          <figure>
            <div className="grid gap-6 lg:grid-cols-2">
              {[block.before, block.after].map((side, i) => (
                <div key={side.src}>
                  <p className={cn("eyebrow mb-3", i === 1 && "text-ink")}>
                    {i === 0 ? "Before" : "After"} · {side.label}
                  </p>
                  <div className="shot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={side.src} alt={side.alt} loading="lazy" className="block h-auto w-full" />
                  </div>
                </div>
              ))}
            </div>
            {block.caption && <Caption>{block.caption}</Caption>}
          </figure>
        </Reveal>
      );

    case "chain": {
      const tone = block.tone ?? "joined";
      return (
        <Reveal>
          <figure>
            {block.title && <BlockTitle>{block.title}</BlockTitle>}
            {block.label && <p className={cn("eyebrow mb-3", tone === "joined" && "text-ink")}>{block.label}</p>}
            <ol
              className={cn(
                "grid gap-x-6 gap-y-4 pt-4 sm:grid-cols-2",
                block.steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                tone === "joined" ? "border-t-2 border-ink" : "border-t border-dashed border-muted",
              )}
            >
              {block.steps.map((st, i) => (
                <li key={st.label} className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block text-base font-medium">{st.label}</span>
                    {st.note && <span className="block text-base text-muted">{st.note}</span>}
                  </span>
                  {i < block.steps.length - 1 && (
                    <span aria-hidden className="hidden text-muted lg:inline">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            {block.caption && <Caption>{block.caption}</Caption>}
          </figure>
        </Reveal>
      );
    }

    case "cta":
      return (
        <Reveal>
          <a href={block.href} target="_blank" rel="noopener noreferrer" className="pill">
            {block.label} <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {block.note && <p className="mt-3 text-base text-muted">{block.note}</p>}
        </Reveal>
      );

    case "gallery":
      return (
        <Reveal>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <li key={it.src}>
                <div className="shot aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    className={cn(
                      "block h-full w-full",
                      block.fit === "contain" ? "object-contain object-top p-3" : "object-cover object-top",
                    )}
                  />
                </div>
                <div className="mt-4 border-t border-line pt-3">
                  {block.numbered && <p className="text-base tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>}
                  <h3 className="text-base font-medium">{it.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case "placeholder":
      return (
        <Reveal>
          <PlaceholderBlock tag={block.tag} prompt={block.prompt} />
        </Reveal>
      );

    default:
      return null;
  }
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-5 text-xl font-medium">{children}</h3>;
}

function Caption({ children }: { children: React.ReactNode }) {
  return <figcaption className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">{children}</figcaption>;
}

/** A visible gap for content Jiani still needs to supply. */
export function PlaceholderBlock({ tag, prompt }: { tag: string; prompt: string }) {
  return (
    <div className="rounded-lg border border-dashed border-muted px-4 py-3 text-base">
      <span className="font-medium">[{tag}]</span> <span className="text-muted">{prompt}</span>
    </div>
  );
}
