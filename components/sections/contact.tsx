"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/primitives";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 border-t border-line pb-16 pt-28 md:pt-36">
      <div className="shell grid grid-cols-12 gap-x-6">
        <p className="eyebrow col-span-12 mb-6 md:col-span-4 md:mb-0 md:pt-3">Contact</p>
        <div className="col-span-12 md:col-span-8">
          <Reveal>
            <h2 id="contact-heading" className="text-balance text-title font-light">
              If the work resonates, let&apos;s talk.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                data-cursor="Write to me"
                className="text-lede underline decoration-1 underline-offset-[6px] transition-colors hover:text-muted"
              >
                {site.email}
              </a>
              <button type="button" onClick={copy} className="eyebrow text-ink transition-colors hover:text-muted">
                {copied ? "Copied" : "Copy address"}
              </button>
              {site.links.linkedin && (
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="eyebrow text-ink hover:text-muted">
                  LinkedIn <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
