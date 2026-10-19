"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { ease } from "@/lib/utils";

const LINES = ["I think. I make.", "I question what’s possible."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="shell flex min-h-[min(92vh,860px)] flex-col justify-between pb-8 pt-40 md:pt-[22vh]">
      <div className="grid grid-cols-12 gap-x-6">
        <h1 className="col-span-12 text-display font-light md:col-span-8 md:col-start-5">
          <span className="sr-only">{site.headline}</span>
          <span aria-hidden>
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block md:whitespace-nowrap"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: ease.out, delay: 0.08 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.45 }}
          className="col-span-12 mt-8 max-w-[44ch] md:col-span-8 md:col-start-5"
        >
          <p className="text-balance text-lede text-muted">
            Principal Product Designer connecting strategy, craft, and emerging technology to shape product direction, simplify complex systems, and turn ideas into experiences that work.
          </p>

          <p className="mt-4 text-balance text-lede text-muted">
            I lead through collaboration, experimentation, and hands-on execution—bringing people and perspectives together to move ambitious ideas forward.
          </p>
        </motion.div>
      </div>

      <div className="mt-20 flex items-end justify-between gap-6">
        <span className="eyebrow">{site.location}</span>
        <span className="eyebrow hidden sm:inline">{site.role}</span>
      </div>
    </section>
  );
}
