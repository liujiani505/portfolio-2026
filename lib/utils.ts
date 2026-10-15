export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Shared motion vocabulary. Named intents, not magic numbers. */
export const ease = {
  /** Entrances. Decelerates hard — feels like the element was already moving. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Position changes on things already on screen. */
  soft: [0.32, 0.72, 0, 1] as const,
  /** Exits. */
  in: [0.4, 0, 1, 1] as const,
};

export const duration = {
  instant: 0.12,
  quick: 0.24,
  base: 0.42,
  slow: 0.7,
};

export const revealVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out, delay: i * 0.06 },
  }),
};
