import { about } from "@/content/about";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/primitives";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="shell grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 md:col-span-4">
          <p className="eyebrow mb-6">About</p>
          {site.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.photo}
              alt={`Portrait of ${site.name}`}
              width={220}
              height={220}
              className="h-40 w-40 rounded-xl object-cover md:h-[13.75rem] md:w-[13.75rem]"
            />
          )}
        </Reveal>
        <div className="col-span-12 md:col-span-8">
          <Reveal>
            <h2 id="about-heading" className="max-w-[40ch] text-pretty text-big font-light">
              {about.opener} {about.story[0]}
            </h2>
          </Reveal>
          {about.story.slice(1).map((p) => (
            <Reveal key={p} delay={0.05}>
              <p className="mt-6 max-w-[40ch] text-pretty text-big font-light text-muted">{p}</p>
            </Reveal>
          ))}
          {site.links.resumePdf && (
            <Reveal delay={0.08}>
              <a href={site.links.resumePdf} target="_blank" rel="noopener noreferrer" className="pill mt-10">
                View my résumé <span aria-hidden>↗</span>
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
            </Reveal>
          )}
        </div>
      </div>

      <div className="shell mt-24 grid grid-cols-12 gap-x-6 gap-y-6">
        <h3 className="eyebrow col-span-12 md:col-span-4">How I work</h3>
        <ul className="col-span-12 grid gap-8 border-t border-line pt-6 sm:grid-cols-3 sm:gap-6 md:col-span-8">
          {about.beliefs.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.05}>
              <p className="text-base font-medium">{b.title}</p>
              <p className="mt-2 text-base leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
