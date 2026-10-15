"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme";
import { cn, ease } from "@/lib/utils";
import { useAssistant } from "@/components/assistant/assistant-context";

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useAssistant();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 24);
    // Only hide on a deliberate downward scroll, well past the hero.
    setHidden(y > prev && y > 560 && !menuOpen);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.42, ease: ease.soft }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-colors duration-500 ease-out",
            condensed ? "bg-canvas/90 backdrop-blur-md" : "bg-transparent",
          )}
        >
          <div className="shell grid h-16 grid-cols-12 items-center gap-x-6 md:h-20">
            <Link
              href="/"
              className="eyebrow col-span-6 whitespace-nowrap text-ink md:col-span-4"
              aria-label={`${site.name}, home`}
            >
              {site.name}
            </Link>

            <nav className="col-span-5 hidden items-center gap-7 whitespace-nowrap md:flex" aria-label="Primary">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="eyebrow text-ink transition-colors hover:text-muted">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="col-span-6 flex items-center justify-end gap-6 whitespace-nowrap md:col-span-3">
              <button
                type="button"
                onClick={() => open()}
                data-cursor="Ask"
                className="eyebrow hidden text-ink transition-colors hover:text-muted sm:inline"
                aria-label="Ask about my work (Command K)"
              >
                Ask <span aria-hidden>⌘K</span>
              </button>
              <Link href="/#contact" className="eyebrow hidden text-ink transition-colors hover:text-muted md:inline">
                Contact
              </Link>
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="eyebrow text-ink md:hidden"
                aria-label="Open menu"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[60] bg-canvas md:hidden"
          >
            <div className="shell flex h-16 items-center justify-between">
              <span className="eyebrow text-ink">{site.name}</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="eyebrow text-ink" aria-label="Close menu">
                Close
              </button>
            </div>
            <nav className="shell mt-10 flex flex-col" aria-label="Mobile">
              {[...site.nav, { label: "Contact", href: "/#contact" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: ease.out }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line py-5 text-sub font-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="mt-8 text-left text-sub font-light text-muted"
              >
                Ask about my work
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Hairline reading-progress rule pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-accent"
    />
  );
}
