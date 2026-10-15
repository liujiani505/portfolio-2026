import Link from "next/link";
import { experiments, labIntro } from "@/content/lab";
import { Reveal } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * AI Lab — deliberately a level below the case studies: a tinted band,
 * a smaller heading, and compact items with a small artwork tile.
 */
export function Lab() {
  const live = experiments.filter((e) => e.status === "live" && e.caseStudy);
  return (
    <section id="lab" aria-labelledby="lab-heading" className="scroll-mt-20 bg-surface py-20 md:py-24">
      <div className="shell grid grid-cols-12 gap-x-6">
        <Reveal className="col-span-12 md:col-span-4">
          <p className="eyebrow md:pt-2">AI Lab</p>
        </Reveal>
        <div className="col-span-12 mt-4 md:col-span-8 md:mt-0">
          <Reveal>
            <h2 id="lab-heading" className="text-title font-light">
              Side experiments
            </h2>
            <p className="mt-4 max-w-[46ch] text-pretty text-base leading-relaxed text-muted">
              {labIntro.subtitle} Not case studies; just ideas I wanted to try.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-10 border-t border-line pt-8 sm:grid-cols-2 sm:gap-8">
            {live.map((e, i) => (
              <Reveal key={e.slug} as="li" delay={i * 0.06}>
                <article className="group grid grid-cols-[8.5rem_1fr] gap-5 md:grid-cols-[9.5rem_1fr]">
                  <Link
                    href={`/lab/${e.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="grid aspect-square place-items-center overflow-hidden rounded-lg"
                    style={{ background: e.thumb?.stage ?? "rgb(var(--canvas))" }}
                  >
                    {e.thumb && (
                      <picture
                        className={cn(
                          "block",
                          e.thumb.square ? "w-[78%] [mask-image:radial-gradient(closest-side,#000_72%,transparent)]" : "w-[86%]",
                        )}
                      >
                        {e.thumb.staticSrc && <source media="(prefers-reduced-motion: reduce)" srcSet={e.thumb.staticSrc} />}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={e.thumb.src}
                          alt=""
                          loading="lazy"
                          className="block h-auto w-full mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </picture>
                    )}
                  </Link>
                  <div className="min-w-0">
                    <p className="eyebrow">
                      Exp {e.index} · {e.model}
                    </p>
                    <h3 className="mt-2 text-xl font-medium">
                      <Link href={`/lab/${e.slug}`} className="transition-colors hover:text-muted">
                        {e.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">{e.question}</p>
                    <Link
                      href={`/lab/${e.slug}`}
                      aria-label={`See the ${e.title} experiment`}
                      className="mt-3 inline-flex items-center gap-2 text-base font-medium"
                    >
                      <span className="link-underline">See the experiment</span>
                      <span aria-hidden className="transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-base text-muted">{labIntro.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
