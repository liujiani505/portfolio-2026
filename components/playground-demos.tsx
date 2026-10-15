"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { PlaygroundItem } from "@/content/playground";
import { ease } from "@/lib/utils";

/** Every tile is a working demo, not a screenshot. */
export function PlaygroundDemo({ demo, active }: { demo: PlaygroundItem["demo"]; active: boolean }) {
  switch (demo) {
    case "easing":
      return <EasingDemo active={active} />;
    case "typescale":
      return <TypeScaleDemo />;
    case "tokens":
      return <TokensDemo />;
    case "cursor":
      return <CursorDemo />;
    case "marks":
      return <MarksDemo active={active} />;
    case "grid":
      return <GridDemo active={active} />;
    case "components":
      return <ComponentsDemo />;
    case "stagger":
      return <StaggerDemo active={active} />;
    default:
      return null;
  }
}

const CURVES = [
  { name: "enter", v: [0.16, 1, 0.3, 1], rule: "Things arriving. Decelerates hard." },
  { name: "settle", v: [0.32, 0.72, 0, 1], rule: "Things already here, moving." },
  { name: "exit", v: [0.4, 0, 1, 1], rule: "Things leaving. Never linger." },
  { name: "snap", v: [0.6, 0, 0.2, 1], rule: "State toggles under 150ms." },
];

function EasingDemo({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const curve = CURVES[i];

  useEffect(() => {
    if (!active || reduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % CURVES.length), 2200);
    return () => clearInterval(t);
  }, [active, reduce]);

  const path = useMemo(() => {
    const [x1, y1, x2, y2] = curve.v;
    return `M0,60 C${x1 * 60},${60 - y1 * 60} ${x2 * 60},${60 - y2 * 60} 60,0`;
  }, [curve]);

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex gap-1.5">
        {CURVES.map((c, ci) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setI(ci)}
            className={`rounded-full border px-2.5 py-1 font-sans font-medium text-base uppercase tracking-[0.06em] transition-colors ${
              ci === i ? "border-accent/40 text-accent" : "border-line text-faint hover:text-muted"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-6">
        <svg viewBox="0 0 60 60" className="h-20 w-20 shrink-0" aria-hidden>
          <rect x="0" y="0" width="60" height="60" className="fill-ink/[0.04]" />
          <motion.path
            d={path}
            fill="none"
            strokeWidth="1.2"
            className="stroke-accent"
            initial={false}
            animate={{ d: path }}
            transition={{ duration: 0.5, ease: ease.soft }}
          />
        </svg>
        <div className="flex-1">
          <div className="relative h-8">
            <motion.div
              key={`${i}-${active}`}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-ink"
              initial={{ left: "0%" }}
              animate={{ left: reduce ? "0%" : "calc(100% - 10px)" }}
              transition={{
                duration: 1.2,
                ease: curve.v as [number, number, number, number],
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.25,
              }}
            />
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
          </div>
          <p className="mt-2 text-base leading-snug text-faint">{curve.rule}</p>
          <code className="mt-1 block font-sans font-medium text-base text-muted">
            cubic-bezier({curve.v.join(", ")})
          </code>
        </div>
      </div>
    </div>
  );
}

function TypeScaleDemo() {
  const sizes = [
    { px: 96, ls: "-0.045em", lh: 0.92 },
    { px: 56, ls: "-0.032em", lh: 1.0 },
    { px: 32, ls: "-0.022em", lh: 1.15 },
    { px: 20, ls: "-0.012em", lh: 1.4 },
    { px: 15, ls: "0em", lh: 1.6 },
    { px: 12, ls: "0.01em", lh: 1.5 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-1 overflow-hidden p-5">
      {sizes.map((s) => (
        <div key={s.px} className="flex items-baseline gap-3 overflow-hidden">
          <span className="w-7 shrink-0 font-sans font-medium text-base text-faint">{s.px}</span>
          <span
            className="truncate font-medium"
            style={{ fontSize: s.px / 2.15, letterSpacing: s.ls, lineHeight: s.lh }}
          >
            Optical, not modular
          </span>
        </div>
      ))}
      <p className="mt-3 border-t border-line pt-3 font-sans font-medium text-base leading-relaxed text-faint">
        tracking = f(size). Linear scale, non-linear tracking.
      </p>
    </div>
  );
}

function TokensDemo() {
  const [dark, setDark] = useState(false);
  const tokens = [
    { n: "canvas", l: "#FAFAF9", d: "#09090A" },
    { n: "surface", l: "#FFFFFF", d: "#121214" },
    { n: "ink", l: "#0C0C0D", d: "#F4F4F2" },
    { n: "muted", l: "#5C5E63", d: "#9A9CA2" },
    { n: "faint", l: "#8F9298", d: "#6A6C72" },
    { n: "line", l: "#E2E2DF", d: "#27272A" },
    { n: "accent", l: "#243FC2", d: "#8D9CFF" },
  ];
  return (
    <div className="flex h-full flex-col p-5">
      <button
        type="button"
        onClick={() => setDark((d) => !d)}
        className="mb-4 self-start rounded-full border border-line px-2.5 py-1 font-sans font-medium text-base uppercase tracking-[0.06em] text-faint transition-colors hover:text-ink"
      >
        {dark ? "dark" : "light"} →
      </button>
      <div className="flex-1 space-y-1.5">
        {tokens.map((t) => (
          <div key={t.n} className="flex items-center gap-3">
            <motion.span
              className="h-4 w-4 shrink-0 rounded border border-line"
              animate={{ backgroundColor: dark ? t.d : t.l }}
              transition={{ duration: 0.4, ease: ease.soft }}
            />
            <span className="font-sans font-medium text-base text-muted">--{t.n}</span>
            <span className="ml-auto font-sans font-medium text-base tabular-nums text-faint">
              {dark ? t.d : t.l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CursorDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [label, setLabel] = useState<string | null>(null);
  const zones = [
    { l: "Open", x: 10, y: 18, w: 36, h: 30 },
    { l: "Drag", x: 54, y: 18, w: 36, h: 30 },
    { l: "Delete", x: 10, y: 56, w: 80, h: 26 },
  ];

  return (
    <div
      ref={ref}
      className="relative h-full cursor-none p-5"
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setPos({ x, y });
        const z = zones.find((zz) => x > zz.x && x < zz.x + zz.w && y > zz.y && y < zz.y + zz.h);
        setLabel(z?.l ?? null);
      }}
      onPointerLeave={() => setLabel(null)}
    >
      {zones.map((z) => (
        <div
          key={z.l}
          className="absolute rounded-md border border-dashed border-line"
          style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.w}%`, height: `${z.h}%` }}
        />
      ))}
      <motion.div
        className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-canvas"
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: label ? "auto" : 8,
          height: label ? 22 : 8,
          paddingLeft: label ? 10 : 0,
          paddingRight: label ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 40 }}
      >
        {label && (
          <span className="whitespace-nowrap font-sans font-medium text-base uppercase tracking-[0.06em]">
            {label}
          </span>
        )}
      </motion.div>
      <p className="absolute bottom-4 left-5 font-sans font-medium text-base text-faint">
        hover the zones →
      </p>
    </div>
  );
}

function MarksDemo({ active }: { active: boolean }) {
  const marks = [
    <g key="a">
      <circle cx="12" cy="12" r="8" fill="none" strokeWidth="1.6" />
      <path d="M12 4v16" strokeWidth="1.6" />
    </g>,
    <g key="b">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" strokeWidth="1.6" />
      <path d="M8 12h8" strokeWidth="1.6" />
    </g>,
    <g key="c">
      <path d="M4 20L12 4l8 16" fill="none" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 14h8" strokeWidth="1.6" />
    </g>,
    <g key="d">
      <path d="M4 12a8 8 0 0116 0" fill="none" strokeWidth="1.6" />
      <path d="M4 12a8 8 0 0016 0" fill="none" strokeWidth="1.6" strokeDasharray="2 2.5" />
    </g>,
    <g key="e">
      <circle cx="8" cy="12" r="5" fill="none" strokeWidth="1.6" />
      <circle cx="16" cy="12" r="5" fill="none" strokeWidth="1.6" />
    </g>,
    <g key="f">
      <path d="M5 5h14v14" fill="none" strokeWidth="1.6" />
      <path d="M5 19L19 5" strokeWidth="1.6" />
    </g>,
  ];
  return (
    <div className="grid h-full grid-cols-3 place-items-center gap-2 p-5">
      {marks.map((m, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="h-9 w-9 stroke-ink"
          initial={false}
          animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.94 }}
          transition={{ duration: 0.5, ease: ease.out, delay: i * 0.04 }}
        >
          {m}
        </motion.svg>
      ))}
    </div>
  );
}

function GridDemo({ active }: { active: boolean }) {
  const rows = [
    [8, 4],
    [3, 6, 3],
    [5, 7],
    [12],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-5">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1.5">
          {row.map((span, ci) => (
            <motion.div
              key={ci}
              className={ri === 1 && ci === 1 ? "h-7 rounded-sm bg-accent/25" : "h-7 rounded-sm bg-ink/[0.07]"}
              style={{ flex: span }}
              initial={false}
              animate={{ opacity: active ? 1 : 0.5, scaleY: active ? 1 : 0.7 }}
              transition={{ duration: 0.5, ease: ease.out, delay: (ri * 3 + ci) * 0.035 }}
            />
          ))}
        </div>
      ))}
      <p className="mt-2 font-sans font-medium text-base text-faint">measure as hierarchy</p>
    </div>
  );
}

function ComponentsDemo() {
  const [api, setApi] = useState(0);
  const apis = [
    { code: `<Button variant="primary" />`, count: "6 variants", verdict: "scales" },
    { code: `<Button primary large loading />`, count: "2⁶ = 64 states", verdict: "rots" },
    { code: `<Button as={Link} tone="accent" />`, count: "6 × 3 polymorphic", verdict: "flexible, costly" },
  ];
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex gap-1.5">
        {apis.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setApi(i)}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i === api ? "bg-accent" : "bg-line"
            }`}
            aria-label={`API ${i + 1}`}
          />
        ))}
      </div>
      <div>
        <code className="block break-all font-sans font-medium text-base leading-relaxed text-ink">
          {apis[api].code}
        </code>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="font-sans font-medium text-base text-faint">{apis[api].count}</span>
          <span className="font-sans font-medium text-base text-accent">{apis[api].verdict}</span>
        </div>
      </div>
    </div>
  );
}

function StaggerDemo({ active }: { active: boolean }) {
  const [ms, setMs] = useState(70);
  const [key, setKey] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || reduce) return;
    const t = setInterval(() => setKey((k) => k + 1), 2400);
    return () => clearInterval(t);
  }, [active, reduce]);

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`${key}-${i}`}
            className="h-3 rounded-sm bg-ink/10"
            style={{ width: `${100 - i * 9}%` }}
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: ease.out, delay: (i * ms) / 1000 }}
          />
        ))}
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={200}
          step={10}
          value={ms}
          onChange={(e) => {
            setMs(Number(e.target.value));
            setKey((k) => k + 1);
          }}
          aria-label="Stagger interval in milliseconds"
          className="w-full accent-[rgb(var(--accent))]"
        />
        <div className="mt-1 flex justify-between font-sans font-medium text-base text-faint">
          <span>{ms}ms</span>
          <span>{ms < 40 ? "reads as one object" : ms > 120 ? "reads as a queue" : "reads as order"}</span>
        </div>
      </div>
    </div>
  );
}
