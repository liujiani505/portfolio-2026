"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn, ease } from "@/lib/utils";
import {
  REACTIONS,
  TOPICS,
  WHO,
  scriptedPrep,
  scriptedReply,
  type Intake,
  type Prep,
  type Turn,
} from "./coach-script";

type Step = 0 | 1 | 2;
const STEPS = ["Describe", "Prepare", "Rehearse"];

async function callCoach<T>(payload: object): Promise<T | null> {
  try {
    const res = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.mode === "live" ? (json.data as T) : null;
  } catch {
    return null;
  }
}

const validPrep = (p: Prep | null): p is Prep =>
  !!p && typeof p.opening === "string" && [p.theirSide, p.questions, p.avoid].every(Array.isArray);

export function Coach() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [intake, setIntake] = useState<Intake>({ who: "", topic: "", worry: "", reaction: "" });
  const [prep, setPrep] = useState<Prep | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [scripted, setScripted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [note, setNote] = useState("");
  const [draft, setDraft] = useState("");

  const ready = intake.who && intake.topic && intake.reaction;

  const prepare = async () => {
    setBusy(true);
    const live = await callCoach<Prep>({ mode: "prep", intake });
    if (validPrep(live)) {
      setPrep(live);
      setScripted(false);
    } else {
      setPrep(scriptedPrep(intake));
      setScripted(true);
    }
    setDismissed(new Set());
    setTurns([]);
    setNote("");
    setBusy(false);
    setStep(1);
  };

  const say = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    const next: Turn[] = [...turns, { role: "you", text }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    const live = scripted ? null : await callCoach<{ reply: string; note: string }>({ mode: "rehearse", intake, turns: next });
    const r = live && typeof live.reply === "string" ? live : scriptedReply(intake, next);
    if (!live) setScripted(true);
    setTurns([...next, { role: "them", text: r.reply }]);
    setNote(r.note ?? "");
    setBusy(false);
  };

  const reset = () => {
    setStep(0);
    setPrep(null);
    setTurns([]);
    setNote("");
  };

  const toggle = (id: string) =>
    setDismissed((d) => {
      const n = new Set(d);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/15 bg-surface shadow-[0_1px_0_rgb(var(--line))]">
      {/* Header: steps + mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-8">
        <ol className="flex flex-wrap items-center gap-1.5">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={i > step && !(i === 1 && prep) && !(i === 2 && prep)}
                onClick={() => setStep(i as Step)}
                aria-current={step === i ? "step" : undefined}
                className={cn(
 "whitespace-nowrap rounded-full px-3 py-1.5 text-base transition-colors disabled:cursor-not-allowed",
                  step === i ? "bg-ink text-canvas" : "text-faint enabled:hover:text-ink",
                )}
              >
                {i + 1} {s}
              </button>
              {i < 2 && <span className="hidden h-px w-3 bg-line sm:block" aria-hidden />}
            </li>
          ))}
        </ol>
        <span className="font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
          {prep ? (scripted ? "Scripted demo — no model connected" : "Live model") : "Concept prototype"}
        </span>
      </div>

      <div className="min-h-[30rem] px-5 py-8 md:px-8 md:py-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            {step === 0 && (
              <div className="max-w-2xl space-y-9">
                <Chips label="Who do you need to talk with?" options={WHO} value={intake.who} onChange={(who) => setIntake({ ...intake, who })} />
                <Chips label="What is it about?" options={TOPICS} value={intake.topic} onChange={(topic) => setIntake({ ...intake, topic })} />
                <div>
                  <label htmlFor="worry" className="mb-3 block text-base font-medium">
                    What makes it hard to bring up? <span className="font-normal text-faint">Optional</span>
                  </label>
                  <textarea
                    id="worry"
                    rows={3}
                    maxLength={600}
                    value={intake.worry}
                    onChange={(e) => setIntake({ ...intake, worry: e.target.value })}
                    placeholder="A sentence or two is enough. Please don't include names or account details."
                    className="w-full resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-base leading-relaxed placeholder:text-faint focus:border-accent focus:outline-none"
                  />
                </div>
                <Chips label="How do you expect them to react?" options={REACTIONS} value={intake.reaction} onChange={(reaction) => setIntake({ ...intake, reaction })} />
                <button
                  type="button"
                  disabled={!ready || busy}
                  onClick={prepare}
                  className="rounded-full bg-ink px-6 py-3 text-base font-medium text-canvas transition-opacity hover:opacity-90 disabled:opacity-30"
                >
                  {busy ? "Preparing…" : "Help me prepare"}
                </button>
              </div>
            )}

            {step === 1 && prep && (
              <div>
                <p className="mb-8 max-w-prose text-base leading-relaxed text-muted">
                  These are suggestions, not a script. Dismiss anything that doesn&apos;t sound like you or
                  doesn&apos;t fit your {intake.who.replace(/^(A|An|My) /, "").toLowerCase()} — you know them; the coach doesn&apos;t.
                </p>
                <div className="grid gap-5 lg:grid-cols-2">
                  <Card title="A way to open" tone="accent">
                    <Item id="opening" text={prep.opening} off={dismissed.has("opening")} onToggle={toggle} large />
                  </Card>
                  <Card title="What they may be feeling" hint="A guess">
                    {prep.theirSide.map((t, i) => (
                      <Item key={i} id={`t${i}`} text={t} off={dismissed.has(`t${i}`)} onToggle={toggle} />
                    ))}
                  </Card>
                  <Card title="Questions to ask">
                    {prep.questions.map((t, i) => (
                      <Item key={i} id={`q${i}`} text={t} off={dismissed.has(`q${i}`)} onToggle={toggle} />
                    ))}
                  </Card>
                  <Card title="Worth avoiding">
                    {prep.avoid.map((t, i) => (
                      <Item key={i} id={`a${i}`} text={t} off={dismissed.has(`a${i}`)} onToggle={toggle} />
                    ))}
                  </Card>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => setStep(2)} className="rounded-full bg-ink px-6 py-3 text-base font-medium text-canvas transition-opacity hover:opacity-90">
                    Rehearse it
                  </button>
                  <button type="button" onClick={reset} className="rounded-full border border-line px-5 py-3 text-base text-muted transition-colors hover:border-ink/25 hover:text-ink">
                    Start over
                  </button>
                  <span className="text-base text-faint">
                    {dismissed.size ? `${dismissed.size} dismissed` : "Rehearsal is optional."}
                  </span>
                </div>
              </div>
            )}

            {step === 2 && prep && (
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="mb-5 text-base leading-relaxed text-muted">
                    The coach plays your {intake.who.replace(/^(A|An|My) /, "").toLowerCase()}. Say your opening in your own words.
                  </p>
                  <div className="space-y-3" aria-live="polite">
                    {turns.map((t, i) => (
                      <div key={i} className={cn("flex", t.role === "you" ? "justify-end" : "justify-start")}>
                        <div
                          className={cn(
 "max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed",
                            t.role === "you" ? "bg-ink text-canvas" : "border border-line bg-canvas",
                          )}
                        >
                          {t.role === "them" && (
                            <div className="mb-1 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
                              Role-play · not a real person
                            </div>
                          )}
                          {t.text}
                        </div>
                      </div>
                    ))}
                    {busy && <div className="font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">…</div>}
                  </div>
                  <form
                    className="mt-5 flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      say();
                    }}
                  >
                    <label htmlFor="say" className="sr-only">What you would say</label>
                    <input
                      id="say"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      maxLength={500}
                      placeholder={turns.length ? "Your reply…" : "Try your opening line…"}
                      className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-5 py-3 text-base placeholder:text-faint focus:border-accent focus:outline-none"
                    />
                    <button type="submit" disabled={!draft.trim() || busy} className="rounded-full bg-ink px-5 py-3 text-base font-medium text-canvas disabled:opacity-30">
                      Say it
                    </button>
                  </form>
                </div>

                <aside className="lg:col-span-5">
                  <div className="rounded-xl border border-accent/30 bg-accent-soft/50 p-5">
                    <div className="mb-2 font-sans font-medium text-base uppercase tracking-[0.06em] text-accent">Coach note</div>
                    <p className="text-base leading-relaxed text-ink/85">
                      {note || "After each reply, a short note appears here — outside the role-play, so it never gets mixed up with the conversation."}
                    </p>
                  </div>
                  {!dismissed.has("opening") && (
                    <div className="mt-4 rounded-xl border border-line p-5">
                      <div className="mb-2 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">Your opening</div>
                      <p className="text-base leading-relaxed text-muted">{prep.opening}</p>
                    </div>
                  )}
                  <button type="button" onClick={() => setStep(1)} className="mt-5 text-base text-muted underline-offset-4 hover:text-ink hover:underline">
                    Back to my prep sheet
                  </button>
                </aside>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The boundary, stated where people will see it */}
      <div className="border-t border-line bg-canvas px-5 py-3.5 text-base leading-relaxed text-faint md:px-8">
        Helps you prepare for a conversation you will have yourself. It does not give financial, legal or
        medical advice. Nothing you type is stored by this site.
      </div>
    </div>
  );
}

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
 "rounded-full border px-4 py-2 text-base transition-colors",
              value === o ? "border-ink bg-ink text-canvas" : "border-line text-muted hover:border-ink/30 hover:text-ink",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Card({ title, hint, tone, children }: { title: string; hint?: string; tone?: "accent"; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-xl border p-5 md:p-6", tone === "accent" ? "border-accent/30 bg-accent-soft/40" : "border-line bg-canvas")}>
      <div className="mb-3 flex items-center gap-3">
        <h3 className={cn("font-sans font-medium text-base uppercase tracking-[0.06em]", tone === "accent" ? "text-accent" : "text-muted")}>{title}</h3>
        {hint && <span className="rounded-full border border-line px-2 py-0.5 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">{hint}</span>}
      </div>
      <ul className="divide-y divide-line">{children}</ul>
    </section>
  );
}

function Item({ id, text, off, onToggle, large }: { id: string; text: string; off: boolean; onToggle: (id: string) => void; large?: boolean }) {
  return (
    <li className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className={cn("text-pretty leading-relaxed transition-opacity", large ? "text-lg text-ink" : "text-base text-ink/85", off && "text-faint line-through")}>
        {text}
      </span>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={off}
        className="shrink-0 rounded-full border border-line px-2.5 py-1 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint transition-colors hover:border-ink/30 hover:text-ink"
      >
        {off ? "Restore" : "Dismiss"}
      </button>
    </li>
  );
}
