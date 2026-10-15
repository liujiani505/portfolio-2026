"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn, duration, ease } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Reveal — the only scroll animation in the system.                   */
/* One pattern, used everywhere, so the page has a consistent rhythm.  */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* Section — every top-level band on the page uses this.               */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-section", className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className={bleed ? undefined : "shell"}>
        {(eyebrow || title) && (
          <header className={cn("mb-10 md:mb-12", bleed && "shell")}>
            {eyebrow && (
              <Reveal>
                <div className="mb-6 flex items-center gap-4">
                  <span className="eyebrow">{eyebrow}</span>
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2
                  id={id ? `${id}-heading` : undefined}
                  className="max-w-4xl text-balance text-title font-semibold"
                >
                  {title}
                </h2>
              </Reveal>
            )}
            {intro && (
              <Reveal delay={0.1}>
                <div className="mt-6 max-w-prose text-pretty text-lg leading-relaxed text-muted">
                  {intro}
                </div>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow label                                                       */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Arrow link — a hairline that draws in, and an arrow that steps      */
/* ------------------------------------------------------------------ */

export function ArrowLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
 "group inline-flex items-center gap-2 text-base font-medium text-ink transition-colors hover:text-accent",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden
        className="translate-y-px transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path
          d={external ? "M4 10L10 4M10 4H5M10 4V9" : "M2 7h10M8 3l4 4-4 4"}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Metric — the unit of proof on this site                             */
/* ------------------------------------------------------------------ */

export function MetricCell({
  value,
  label,
  note,
  large = false,
}: {
  value: string;
  label: string;
  note?: string;
  large?: boolean;
}) {
  return (
    <div className="border-t border-line pt-5">
      <div
        className={cn(
 "font-medium tabular-nums tracking-tight text-ink",
          large ? "text-title" : "text-title",
        )}
      >
        {value}
      </div>
      <div className="mt-2 text-base leading-snug text-ink/85">{label}</div>
      {note && <div className="mt-1.5 text-base leading-relaxed text-faint">{note}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tag                                                                 */
/* ------------------------------------------------------------------ */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-sans font-medium text-base uppercase tracking-[0.06em] text-muted">
      {children}
    </span>
  );
}
