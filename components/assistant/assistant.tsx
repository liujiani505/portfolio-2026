"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAssistant } from "./assistant-context";
import { retrieve, type Chunk } from "@/lib/corpus";
import { site } from "@/content/site";
import { cn, ease } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Chunk[];
  offline?: boolean;
};

const SUGGESTIONS = [
 "How does she decide what problem is worth solving?",
 "What's the difference between an observation and a validated finding in her research?",
 "How does the experimentation framework work?",
 "How does she approach a complex operational platform?",
 "How technical is she, really?",
];

/** Deterministic answer built from retrieval alone. Used when no API key is set. */
function offlineAnswer(query: string): { content: string; sources: Chunk[] } {
  const sources = retrieve(query, 3);
  if (!sources.length) {
    return {
      content:
 "I couldn't find anything on that in the case studies. Try asking about the Subaru vehicle allocation redesign, the research into how associates find information, or the experimentation framework.",
      sources: [],
    };
  }
  const lead = sources[0];
  const excerpt = lead.text
    .split("\n")
    .filter(Boolean)
    .slice(0, 3)
    .join(" ")
    .slice(0, 700);

  return {
    content: `From ${lead.source}:\n\n${excerpt}${excerpt.length >= 700 ? "…" : ""}\n\nThis is the offline reader — it retrieves the most relevant passages rather than composing an answer. Add an ANTHROPIC_API_KEY to enable the full assistant.`,
    sources,
  };
}

export function Assistant() {
  const { isOpen, seed, open, close } = useAssistant();
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* ⌘K / Ctrl+K, and Escape to close. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = useCallback(
    async (raw: string) => {
      const question = raw.trim();
      if (!question || busy) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: question };
      const replyId = crypto.randomUUID();
      const history = [...messages, userMsg];

      setMessages([...history, { id: replyId, role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const patch = (fn: (m: Message) => Message) =>
        setMessages((prev) => prev.map((m) => (m.id === replyId ? fn(m) : m)));

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        if (res.status === 503 || !res.body) {
          const { content, sources } = offlineAnswer(question);
          patch((m) => ({ ...m, content, sources, offline: true }));
          return;
        }

        if (!res.ok) {
          patch((m) => ({
            ...m,
            content: "Something went wrong reaching the model. Please try again.",
          }));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          patch((m) => ({ ...m, content: acc }));
        }
        patch((m) => ({ ...m, sources: retrieve(question, 3) }));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const { content, sources } = offlineAnswer(question);
        patch((m) => ({ ...m, content, sources, offline: true }));
      } finally {
        setBusy(false);
      }
    },
    [busy, messages],
  );

  useEffect(() => {
    if (isOpen && seed) void send(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, seed]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close assistant"
            onClick={close}
            className="absolute inset-0 bg-ink/25 backdrop-blur-[3px] dark:bg-black/55"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.36, ease: ease.out }}
            className="relative flex h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-line bg-canvas shadow-2xl shadow-ink/10 sm:h-[72vh] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-accent" />
                </span>
                <div>
                  <div className="text-base font-medium">Ask about my work</div>
                  <div className="text-base text-faint">
                    Grounded in the three case studies. It will tell you when it doesn&apos;t know.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                <svg width="13" height="13" viewBox="0 0 15 15" aria-hidden>
                  <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
              {messages.length === 0 ? (
                <div className="mx-auto max-w-md">
                  <p className="text-base leading-relaxed text-muted">
                    This assistant reads {site.name.split(" ")[0]}&apos;s case studies and answers
                    from them only. It is not a chatbot bolted onto a portfolio — it exists because
                    the most useful thing a hiring manager can do in three minutes is interrogate
                    the work rather than scroll it.
                  </p>
                  <div className="mt-7 space-y-2">
                    {SUGGESTIONS.map((s, i) => (
                      <motion.button
                        key={s}
                        type="button"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.045, duration: 0.4, ease: ease.out }}
                        onClick={() => void send(s)}
                        className="group flex w-full items-center justify-between gap-4 rounded-lg border border-line px-4 py-3 text-left text-base text-ink/90 transition-colors hover:border-ink/25 hover:bg-surface"
                      >
                        {s}
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
              ) : (
                <div className="mx-auto max-w-xl space-y-7">
                  {messages.map((m) => (
                    <div key={m.id}>
                      {m.role === "user" ? (
                        <div className="flex justify-end">
                          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-base text-canvas">
                            {m.content}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {m.content ? (
                            <div className="space-y-3 text-base leading-relaxed text-ink/90">
                              {m.content.split("\n\n").map((p, i) => (
                                <p key={i} className="text-pretty">
                                  {p}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <Thinking />
                          )}
                          {m.sources && m.sources.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              <span className="font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
                                Sources
                              </span>
                              {m.sources.map((s) => (
                                <Link
                                  key={s.id}
                                  href={s.href}
                                  onClick={close}
                                  className="rounded-full border border-line px-2.5 py-1 text-base text-muted transition-colors hover:border-accent/40 hover:text-accent"
                                >
                                  {s.source}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-line p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                className="mx-auto flex max-w-xl items-end gap-2 rounded-xl border border-line bg-surface px-3 py-2 transition-colors focus-within:border-ink/25"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder="Ask about a decision, a metric, a tradeoff…"
                  aria-label="Your question"
                  className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-base outline-none placeholder:text-faint"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className={cn(
 "grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all",
                    busy || !input.trim()
                      ? "bg-line text-faint"
                      : "bg-ink text-canvas hover:opacity-90",
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-1.5" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-faint"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
