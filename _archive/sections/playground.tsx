"use client";

import { useState } from "react";
import { playground } from "@/content/playground";
import { Reveal, Section } from "@/components/ui/primitives";
import { PlaygroundDemo } from "@/components/playground-demos";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Motion", "Interaction", "Type", "Systems", "Brand", "Graphic"] as const;

export function Playground() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<string | null>(null);

  const items = playground.filter((p) => filter === "All" || p.category === filter);

  return (
    <Section
      id="playground"
      eyebrow="Playground"
      title="Craft, kept sharp on purpose."
      intro={
        <>
          Small studies I make to keep the hand in. Everything here is live code — hover or drag
          any of it. Most of these started as an argument I was losing in a design review.
        </>
      }
    >
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                filter === c
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink/25 hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.id}
            delay={(i % 3) * 0.05}
            className={cn(
              item.span === "wide" && "sm:col-span-2",
              item.span === "tall" && "lg:row-span-2",
            )}
          >
            <article
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(item.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-500 hover:border-ink/20"
            >
              <div className="min-h-[180px] flex-1 border-b border-line bg-canvas">
                <PlaygroundDemo demo={item.demo} active={active === item.id} />
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-faint">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-[15px] font-medium leading-snug">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.note}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
