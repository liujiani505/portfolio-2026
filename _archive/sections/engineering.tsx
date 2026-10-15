import { engineeringIntro, repos } from "@/content/engineering";
import { Reveal, Section, ArrowLink } from "@/components/ui/primitives";

export function Engineering() {
  return (
    <Section
      id="engineering"
      eyebrow="Front-end engineering"
      title={engineeringIntro.claim}
      intro={
        <div className="space-y-4">
          {engineeringIntro.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      }
    >
      {/* Why it matters */}
      <div className="mb-20 grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {engineeringIntro.reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[15px] font-medium leading-snug">{r.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Repos */}
      <div className="divide-y divide-line border-y border-line">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.04}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-mono text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent">
                    {r.name}
                  </h3>
                  {r.stars && (
                    <span className="font-mono text-[11px] tabular-nums text-faint">★ {r.stars}</span>
                  )}
                </div>
                <p className="mt-1.5 text-[13px] text-muted">{r.tagline}</p>
              </div>

              <div className="md:col-span-6">
                <p className="text-[13px] leading-relaxed text-muted">{r.body}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {r.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start justify-start md:col-span-2 md:justify-end">
                <span className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors group-hover:text-ink">
                  View source
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-8">
          <ArrowLink href="https://github.com/jianiliu" external>
            All repositories on GitHub
          </ArrowLink>
        </div>
      </Reveal>
    </Section>
  );
}
