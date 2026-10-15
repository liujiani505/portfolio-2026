import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { BlockRenderer } from "@/components/case-study/blocks";
import { Reveal } from "@/components/ui/primitives";

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-ink">
      <span aria-hidden>←</span> {label}
    </Link>
  );
}

function ExternalPill({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={"pill " + (className ?? "")}>
      {label} <span aria-hidden>↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function HeroImage({ cs, framed }: { cs: CaseStudy; framed?: string }) {
  const im = cs.hero?.image;
  if (!im) return null;
  const pic = (
    <div className="shot">
      <picture>
        {im.staticSrc && <source media="(prefers-reduced-motion: reduce)" srcSet={im.staticSrc} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={im.src} alt={im.alt} className="block h-auto w-full" />
      </picture>
    </div>
  );
  return (
    <figure>
      {framed ? (
        <div className="rounded-2xl p-5 md:p-12" style={{ background: framed }}>
          {pic}
        </div>
      ) : (
        pic
      )}
      {im.caption && <figcaption className="mt-4 text-base text-muted">{im.caption}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Case study page: label column left, content right.                  */
/* ------------------------------------------------------------------ */

export function CaseStudyArticle({
  cs,
  next,
  position,
}: {
  cs: CaseStudy;
  next?: CaseStudy;
  /** 1-based position among the case studies, for the "Case study 01" label. */
  position?: number;
}) {
  const label = `${position ? `Case study ${String(position).padStart(2, "0")} · ` : ""}${cs.title}`;
  return (
    <article>
      <header className="shell pt-28 md:pt-36">
        <Reveal>
          <BackLink href="/#case-studies" label="Case studies" />
        </Reveal>
        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-5">
          <Reveal className="col-span-12 md:col-span-3">
            <p className="eyebrow md:pt-4">{label}</p>
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <Reveal delay={0.04}>
              <h1 className="max-w-[16ch] text-balance text-display-xl font-light">
                {cs.hero?.headline ?? `${cs.subtitle}.`}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[44ch] text-pretty text-lede text-muted">{cs.thesis}</p>
            </Reveal>
            {cs.hero?.cta && (
              <Reveal delay={0.1}>
                <ExternalPill href={cs.hero.cta.href} label={cs.hero.cta.label} className="mt-8" />
              </Reveal>
            )}
          </div>
        </div>

        {cs.hero?.facts && (
          <Reveal delay={0.12}>
            <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-5 md:grid-cols-4">
              {cs.hero.facts.map((f) => (
                <div key={f.k}>
                  <dt className="eyebrow mb-1.5">{f.k}</dt>
                  <dd className="text-base">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {cs.hero?.image && (
          <Reveal delay={0.14} className="mt-12">
            <HeroImage cs={cs} />
          </Reveal>
        )}
      </header>

      <div className="shell pb-8">
        {cs.chapters.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            aria-labelledby={`${chapter.id}-h`}
            className="mt-24 grid scroll-mt-24 grid-cols-12 gap-x-6 gap-y-4 md:mt-28"
          >
            <div className="col-span-12 border-t border-line pt-6 md:col-span-3">
              {chapter.headline ? (
                <p className="eyebrow md:sticky md:top-28">{chapter.label}</p>
              ) : (
                <h2 id={`${chapter.id}-h`} className="eyebrow md:sticky md:top-28">
                  {chapter.label}
                </h2>
              )}
            </div>
            <div className="col-span-12 min-w-0 md:col-span-9 md:border-t md:border-line md:pt-6">
              {chapter.headline && (
                <Reveal>
                  <h2 id={`${chapter.id}-h`} className="mb-8 max-w-[22ch] text-balance text-title font-light">
                    {chapter.headline}
                  </h2>
                </Reveal>
              )}
              <div className="space-y-10 md:space-y-12">
                {chapter.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {cs.lessons.length > 0 && (
          <section id="lessons" aria-labelledby="lessons-h" className="mt-24 grid scroll-mt-24 grid-cols-12 gap-x-6 gap-y-4 md:mt-28">
            <div className="col-span-12 border-t border-line pt-6 md:col-span-3">
              <h2 id="lessons-h" className="eyebrow">
                Reflection
              </h2>
            </div>
            <div className="col-span-12 grid gap-10 md:col-span-9 md:grid-cols-2 md:border-t md:border-line md:pt-6">
              {cs.lessons.map((l, i) => (
                <Reveal key={l.title} delay={i * 0.05}>
                  <h3 className="text-xl font-medium leading-snug">{l.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted">{l.body}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>

      {next && (
        <Link
          href={`/case-studies/${next.slug}`}
          data-cursor={`Next: ${next.title}`}
          className="shell group mt-28 block border-t border-line pb-20 pt-10"
        >
          <span className="eyebrow">Next case study</span>
          <span className="mt-4 block text-title font-light transition-colors group-hover:text-muted">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* AI Lab page: one lighter column, clearly a level below.             */
/* ------------------------------------------------------------------ */

export function LabArticle({
  cs,
  label,
  tile,
  next,
}: {
  cs: CaseStudy;
  label: string;
  tile?: string;
  next?: { href: string; title: string };
}) {
  const facts = cs.hero?.facts ?? [];
  return (
    <article className="shell pb-8 pt-28 md:pt-36">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-4">
          <Reveal>
            <BackLink href="/#lab" label="AI Lab" />
          </Reveal>
          <Reveal delay={0.04}>
            <p className="eyebrow mt-12">{label}</p>
            <h1 className="mt-3 text-title font-normal">{cs.title}</h1>
            <p className="mt-4 max-w-[44ch] text-lede text-muted">{cs.thesis}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-base text-muted">
              {facts.map((f) => (
                <li key={f.k}>
                  <span className="text-ink">{f.k}:</span> {f.v}
                </li>
              ))}
            </ul>
            {cs.hero?.cta && <ExternalPill href={cs.hero.cta.href} label={cs.hero.cta.label} className="mt-8" />}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="col-span-12 mt-12 md:col-span-9 md:col-start-4">
          <HeroImage cs={cs} framed={tile ?? "rgb(var(--surface))"} />
        </Reveal>

        <div className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-4">
          {cs.question && (
            <section aria-labelledby="q-h" className="mt-16">
              <h2 id="q-h" className="eyebrow">
                The question
              </h2>
              <Reveal>
                <p className="mt-4 max-w-[28ch] text-balance text-big font-light">{cs.question}</p>
              </Reveal>
            </section>
          )}
          {cs.chapters.map((chapter) => (
            <section key={chapter.id} id={chapter.id} aria-labelledby={`${chapter.id}-h`} className="mt-16 border-t border-line pt-6">
              {chapter.headline ? (
                <>
                  <p className="eyebrow">{chapter.label}</p>
                  <h2 id={`${chapter.id}-h`} className="mb-6 mt-3 text-sub font-normal">
                    {chapter.headline}
                  </h2>
                </>
              ) : (
                <h2 id={`${chapter.id}-h`} className="eyebrow mb-4">
                  {chapter.label}
                </h2>
              )}
              <div className="space-y-8">
                {chapter.blocks
                  .filter((b) => b.type !== "cta")
                  .map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
              </div>
            </section>
          ))}

          {next && (
            <Link href={next.href} className="group mt-24 block border-t border-line pt-8">
              <span className="eyebrow">Next experiment</span>
              <span className="mt-3 block text-sub font-light transition-colors group-hover:text-muted">
                {next.title} <span aria-hidden>→</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
