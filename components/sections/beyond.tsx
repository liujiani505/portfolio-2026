import { Reveal } from "@/components/ui/primitives";

export function Beyond() {
  const cards = [
    {
      title: "Shape direction",
      body:
        "Frame ambiguous problems, identify opportunities, and connect user needs with business priorities.",
    },
    {
      title: "Build alignment",
      body: "Bring stakeholders, designers, and technical partners together around a shared vision.",
    },
    {
      title: "Explore what&apos;s next",
      body:
        "Experiment with AI-assisted workflows and emerging interactions to challenge established practices.",
    },
    {
      title: "Elevate the craft",
      body: "Mentor designers, share technical knowledge, and advocate for accessibility and quality.",
    },
  ];

  return (
    <section id="beyond" aria-labelledby="beyond-heading" className="scroll-mt-20 py-20 md:py-24">
      <div className="shell grid grid-cols-12 gap-x-6">
        <Reveal className="col-span-12 md:col-span-4">
          <p className="eyebrow md:pt-2">Beyond the pixels.</p>
        </Reveal>

        <div className="col-span-12 mt-4 md:col-span-8 md:mt-0">
          <Reveal>
            <h2 id="beyond-heading" className="text-title font-light">
              Great design is more than a polished interface.
            </h2>
            <p className="mt-4 max-w-[56ch] text-pretty text-base leading-relaxed text-muted">
              It&apos;s about creating clarity, building alignment, and helping teams move forward.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.04}>
                <article className="rounded-lg border border-line p-6">
                  <h3 className="text-lg font-medium">{c.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Beyond;
