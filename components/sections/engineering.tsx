import { engineeringIntro } from "@/content/engineering";
import { Reveal, Section, ArrowLink } from "@/components/ui/primitives";

/**
 * Technical fluency — one compact band. The proof lives in the case studies
 * ("Implementation thinking") and the AI Lab prototype, not in a repo list.
 * The previous long-form version is in /_archive/sections/engineering.tsx.
 */
export function Engineering() {
  return (
    <Section
      id="engineering"
      eyebrow="Working with engineering"
      title={engineeringIntro.claim}
      intro={engineeringIntro.body[0]}
      className="border-t border-line"
    >
      <div className="grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {engineeringIntro.reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div>
              <div className="mb-3 font-sans font-medium text-base uppercase tracking-[0.06em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
              <p className="mt-2.5 text-base leading-relaxed text-muted">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
          {engineeringIntro.evidence.map((e) => (
            <ArrowLink key={e.href} href={e.href}>
              {e.label}
            </ArrowLink>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
