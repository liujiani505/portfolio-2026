import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colours resolve from CSS variables so light/dark share one API.
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        lime: "rgb(var(--lime) / <alpha-value>)",
        /** Text on a lime fill — fixed dark in both themes. */
        "on-lime": "rgb(22 28 6 / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        /** Case study page titles */
        "display-xl": ["clamp(3.25rem, 6.6vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        /** Homepage hero */
        display: ["clamp(2.75rem, 5vw, 4.6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        /** Section headlines, case study names, contact line */
        title: ["clamp(2.25rem, 3.8vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.018em" }],
        /** Large reading statements (About, takeaways) */
        big: ["clamp(1.9rem, 3vw, 2.75rem)", { lineHeight: "1.16", letterSpacing: "-0.012em" }],
        /** Subtitles under titles, AI Lab page titles' companion */
        sub: ["clamp(1.6rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.012em" }],
        lede: ["1.375rem", { lineHeight: "1.5", letterSpacing: "-0.005em" }],
        eyebrow: ["1rem", { lineHeight: "1.3", letterSpacing: "0.04em" }],
      },
      maxWidth: {
        shell: "100rem",
        prose: "42rem",
      },
      spacing: {
        gutter: "clamp(1.5rem, 4.5vw, 4rem)",
        section: "clamp(4rem, 7vw, 6.5rem)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 12px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        breathe: "breathe 2.4s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
