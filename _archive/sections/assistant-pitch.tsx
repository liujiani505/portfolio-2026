"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/primitives";
import { useAssistant } from "@/components/assistant/assistant-context";
import { ease } from "@/lib/utils";

const PROMPTS = [
  "How does she decide what problem is worth solving?",
  "What separates an observation from a validated finding?",
  "How does the experimentation framework work?",
  "How does she approach a complex operational platform?",
];

export function AssistantPitch() {
  const { open } = useAssistant();

  return (
    <section className="border-y border-line bg-surface py-section">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="eyebrow">The assistant</span>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-title font-medium">
                Don&apos;t scroll the portfolio. Interrogate it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 max-w-prose space-y-4 text-pretty text-[15px] leading-relaxed text-muted">
                <p>
                  A hiring manager has about three minutes. Scrolling is a bad way to spend them —
                  you end up reading whatever I chose to put first, which is not the same as what
                  you need to know.
                </p>
                <p>
                  So this site has a reader. It answers from the case studies only, cites which
                  section it drew from, and says so plainly when the answer isn&apos;t there. It
                  can&apos;t praise me; it has nothing to praise me with except the work.
                </p>
                <p className="text-faint">
                  It&apos;s also a demonstration of grounding, citation and admitting uncertainty —
                  applied to my own work.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-xl border border-line bg-canvas">
                <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    Ask about my work
                  </span>
                  <kbd className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
                    ⌘K
                  </kbd>
                </div>
                <div className="space-y-2 p-3">
                  {PROMPTS.map((p, i) => (
                    <motion.button
                      key={p}
                      type="button"
                      onClick={() => open(p)}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: ease.out }}
                      className="group flex w-full items-center justify-between gap-4 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-ink/90 transition-colors hover:border-line hover:bg-surface"
                    >
                      {p}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="shrink-0 text-faint transition-transform duration-500 ease-out group-hover:translate-x-1"
                      >
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.25" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
