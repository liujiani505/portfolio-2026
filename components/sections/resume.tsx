"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { education, experience, recognition, skills } from "@/content/resume";
import { site } from "@/content/site";
import { Reveal, Section, ArrowLink } from "@/components/ui/primitives";
import { cn, ease } from "@/lib/utils";

export function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Experience"
      title="Principal-level design across strategy, research and craft."
      intro="UI/UX design and front-end development, then product strategy, research and experimentation at enterprise scale."
      className="!pt-10"
    >
      <Timeline />
      <SkillsGrid />
      <EducationAndRecognition />

      {site.links.resumePdf && (
        <Reveal>
          <div className="mt-10">
            <ArrowLink href={site.links.resumePdf} external>
              Download the one-page PDF
            </ArrowLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

function Timeline() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="border-t border-line">
      {experience.map((role, i) => {
        const hasDetail = role.points.length > 0;
        const isOpen = hasDetail && openIndex === i;
        return (
          <Reveal key={role.org + i} delay={i * 0.04}>
            <div className="border-b border-line">
              <button
                type="button"
                onClick={() => hasDetail && setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={hasDetail ? isOpen : undefined}
                disabled={!hasDetail}
                className="group grid w-full grid-cols-1 gap-2 py-7 text-left disabled:cursor-default md:grid-cols-12 md:gap-8"
              >
                <div className="flex items-center gap-3 md:col-span-3">
                  <span className="font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
                    {role.period}
                  </span>
                  {role.current && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-breathe rounded-full bg-accent" />
                    </span>
                  )}
                </div>

                <div className="md:col-span-8">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {role.title}
                    <span className="text-muted"> · {role.org}</span>
                  </h3>
                  {role.summary && (
                    <p className="mt-1.5 max-w-[62ch] text-base leading-relaxed text-muted">{role.summary}</p>
                  )}
                </div>

                <div className={hasDetail ? "hidden justify-end md:col-span-1 md:flex" : "hidden"}>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: ease.soft }}
                    className="mt-1.5 grid h-6 w-6 place-items-center text-faint transition-colors group-hover:text-ink"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </motion.span>
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.45, ease: ease.soft }}
                className="overflow-hidden"
              >
                <ul className="grid gap-3 pb-8 md:grid-cols-12 md:gap-8">
                  <li className="hidden md:col-span-3 md:block" aria-hidden />
                  <li className="md:col-span-8">
                    <ul className="space-y-2.5">
                      {role.points.map((p) => (
                        <li key={p} className="flex gap-3 text-base leading-relaxed text-muted">
                          <span className="mt-[0.6em] h-px w-3 shrink-0 bg-line" aria-hidden />
                          <span className="text-pretty">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </motion.div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function SkillsGrid() {
  return (
    <div className="mt-14">
      <Reveal>
        <div className="eyebrow mb-8">Capabilities</div>
      </Reveal>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.04}>
            <div className="border-t border-line pt-5">
              <h3 className="mb-4 text-lg font-semibold">{g.group}</h3>
              <ul className="space-y-1.5">
                {g.items.map((s) => (
                  <li key={s} className="text-base leading-snug text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function EducationAndRecognition() {
  const kindColor = (k: string) =>
    k === "Award" ? "text-accent" : k === "Speaking" ? "text-ink" : "text-muted";

  return (
    <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-12">
      <div className="md:col-span-5">
        <Reveal>
          <div className="eyebrow mb-8">Education</div>
        </Reveal>
        <div className="divide-y divide-line border-t border-line">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <div className="py-6">
                <div className="font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
                  {e.period}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                <div className="text-base text-muted">{e.org}</div>
                <p className="mt-2 text-base leading-relaxed text-faint">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className={recognition.length ? "md:col-span-6 md:col-start-7" : "hidden"}>
        <Reveal>
          <div className="eyebrow mb-8">Accessibility</div>
        </Reveal>
        <div className="divide-y divide-line border-t border-line">
          {recognition.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.03}>
              <div className="flex items-baseline gap-5 py-4">
                <span className="w-24 shrink-0 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint">
                  {r.year}
                </span>
                <div>
                  <span className={cn("text-base leading-snug", kindColor(r.kind))}>{r.title}</span>
                  <div className="mt-0.5 text-base text-faint">{r.org}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
