import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { Reveal } from "@/components/ui/primitives";
import type { CaseStudy } from "@/content/types";

export function SelectedWork() {
  return (
    <section id="case-studies" aria-labelledby="work-heading" className="scroll-mt-20 border-t border-line pt-24 md:pt-28">
      <div className="shell">
        <div className="grid grid-cols-12 gap-x-6 border-b border-line pb-5">
          <h2 id="work-heading" className="eyebrow col-span-6 md:col-span-4">Selected work</h2>
          <p className="eyebrow col-span-6 text-right md:col-span-8 md:text-left">
            {caseStudies.length === 2 ? "Two case studies" : `${caseStudies.length} case studies`}
          </p>
        </div>
      </div>
      {caseStudies.map((cs, i) => (
        <CaseSpread key={cs.slug} cs={cs} index={i} />
      ))}
    </section>
  );
}

function CaseSpread({ cs, index }: { cs: CaseStudy; index: number }) {
  const img = cs.card?.image;
  const lines = cs.card?.subtitleLines;
  const href = `/case-studies/${cs.slug}`;
  return (
    <article aria-labelledby={`cs-${cs.slug}`} className="shell border-b border-line py-20 last:border-b-0 md:py-28">
      <div className="grid grid-cols-12 gap-x-6">
        <Reveal className="col-span-12 md:col-span-4">
          <p className="eyebrow md:pt-3">Case study {String(index + 1).padStart(2, "0")}</p>
        </Reveal>
        <Reveal delay={0.05} className="col-span-12 mt-4 md:col-span-8 md:mt-0">
          <h3 id={`cs-${cs.slug}`} className="text-title font-normal">
            <Link href={href} className="transition-colors hover:text-muted">
              {cs.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-[34ch] text-balance text-sub font-light text-muted">
            {lines ? (
              lines.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < lines.length - 1 && (
                    <>
                      {" "}
                      <br className="hidden sm:inline" />
                    </>
                  )}
                </span>
              ))
            ) : (
              `${cs.subtitle}.`
            )}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-14">
        <Reveal className="order-2 col-span-12 md:order-1 md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="max-w-[36ch] text-base leading-relaxed text-muted">{cs.thesis}</p>
            {cs.card?.facts && (
              <dl className="mt-7 border-t border-line">
                {cs.card.facts.map((f) => (
                  <div key={f.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3 text-base">
                    <dt className="text-muted">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Link href={href} className="pill mt-8" aria-label={`Read the ${cs.title} case study`}>
              Read the case study <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="order-1 col-span-12 md:order-2 md:col-span-8">
          <Link href={href} tabIndex={-1} aria-hidden className="group block">
            <div className="shot transition-transform duration-700 ease-out group-hover:-translate-y-1">
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  className="block h-auto w-full object-cover object-top"
                  style={img.aspect ? { aspectRatio: img.aspect } : undefined}
                />
              )}
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
