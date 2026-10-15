"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { VisualId } from "@/content/types";
import { ease } from "@/lib/utils";

/* ==================================================================
   Cover art — one abstract diagram per case study.
   Each is a literal picture of the project's core idea, not decoration.
   ================================================================== */

export function CoverArt({ slug, active }: { slug: string; active: boolean }) {
  const common = "h-full w-full";
  // 01 — tangled workflow steps aligning into clean lanes.
  if (slug === "subaru-vehicle-allocation") return <WorkflowCover className={common} active={active} />;
  // 02 — scattered behavioural signals resolving into intent clusters.
  if (slug === "bu-giving-companion") return <ReconCover className={common} active={active} />;
  // 03 — the seven-step learning loop.
  return <LoopCover className={common} active={active} />;
}

/** Retailer platform: three workflows, misaligned at rest, resolving into lanes. */
function WorkflowCover({ className, active }: { className?: string; active: boolean }) {
  const reduce = useReducedMotion();
  const on = active || !!reduce;
  const lanes = [24, 38, 52];
  const jitter = [
    [0, -7, 5, -4, 6],
    [0, 6, -8, 7, -3],
    [0, -5, 8, -6, 4],
  ];
  return (
    <svg viewBox="0 0 100 76" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {lanes.map((y, li) => (
        <g key={li}>
          <motion.line
            x1={26}
            x2={74}
            y1={y}
            y2={y}
            strokeWidth={0.3}
            className={li === 0 ? "stroke-lime" : "stroke-ink"}
            initial={false}
            animate={{ pathLength: on ? 1 : 0, opacity: on ? 0.5 : 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: li * 0.08 }}
          />
          {jitter[li].map((dy, i) => (
            <motion.rect
              key={i}
              x={25 + i * 11.4}
              
              width={5}
              height={5}
              rx={1}
              className={li === 0 ? "fill-lime" : "fill-ink"}
              initial={false}
              animate={{ y: y - 2.5 + (on ? 0 : dy), opacity: on ? 0.9 : 0.35 }}
              transition={{ duration: 0.8, ease: ease.out, delay: i * 0.04 + li * 0.05 }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Experimentation framework: seven steps on a loop, with the path drawing in. */
function LoopCover({ className, active }: { className?: string; active: boolean }) {
  const reduce = useReducedMotion();
  const on = active || !!reduce;
  const n = 7;
  const cx = 50;
  const cy = 38;
  const r = 22;
  return (
    <svg viewBox="0 0 100 76" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={0.25} className="stroke-ink" opacity={0.2} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        strokeWidth={0.5}
        className="stroke-lime"
        style={{ rotate: -90, transformOrigin: `${cx}px ${cy}px` }}
        initial={false}
        animate={{ pathLength: on ? 1 : 0.14 }}
        transition={{ duration: 1.4, ease: ease.out }}
      />
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.circle
            key={i}
            cx={cx + Math.cos(a) * r}
            cy={cy + Math.sin(a) * r}
            r={1.6}
            className={i === n - 1 ? "fill-lime" : "fill-ink"}
            initial={false}
            animate={{ opacity: on ? 1 : i === 0 ? 1 : 0.3 }}
            transition={{ duration: 0.4, delay: on ? i * 0.16 : 0 }}
          />
        );
      })}
    </svg>
  );
}

/** Recon: scattered records resolving into three cause-clusters. */
function ReconCover({ className, active }: { className?: string; active: boolean }) {
  const reduce = useReducedMotion();
  const clusters = [
    { cx: 30, cy: 34, n: 14 },
    { cx: 62, cy: 58, n: 10 },
    { cx: 82, cy: 28, n: 7 },
  ];
  // Deterministic pseudo-random so SSR and client agree.
  const rnd = (i: number, s: number) => ((Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1 + 1) % 1;

  return (
    <svg viewBox="0 0 100 76" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {clusters.map((c, ci) =>
        Array.from({ length: c.n }).map((_, i) => {
          const k = ci * 40 + i;
          const scatterX = 6 + rnd(k, 1) * 88;
          const scatterY = 6 + rnd(k, 2) * 64;
          const a = rnd(k, 3) * Math.PI * 2;
          const r = 2 + rnd(k, 4) * 8;
          return (
            <motion.circle
              key={k}
              r={1.05}
              className={ci === 0 ? "fill-lime" : "fill-ink"}
              initial={false}
              animate={
                reduce
                  ? { cx: c.cx + Math.cos(a) * r, cy: c.cy + Math.sin(a) * r, opacity: 0.75 }
                  : active
                    ? { cx: c.cx + Math.cos(a) * r, cy: c.cy + Math.sin(a) * r, opacity: 0.85 }
                    : { cx: scatterX, cy: scatterY, opacity: 0.32 }
              }
              transition={{ duration: 1.1, ease: ease.out, delay: i * 0.012 }}
            />
          );
        }),
      )}
      {clusters.map((c, i) => (
        <motion.circle
          key={`ring-${i}`}
          cx={c.cx}
          cy={c.cy}
          r={12}
          fill="none"
          strokeWidth={0.35}
          className={i === 0 ? "stroke-lime" : "stroke-ink"}
          initial={false}
          animate={{ opacity: active && !reduce ? 0.4 : 0, scale: active ? 1 : 0.9 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.3 }}
        />
      ))}
    </svg>
  );
}

/** Recoup: confidence bands, with the low band visibly declining to act. */
function RecoupCover({ className, active }: { className?: string; active: boolean }) {
  const reduce = useReducedMotion();
  const rows = Array.from({ length: 22 });
  return (
    <svg viewBox="0 0 100 76" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      {rows.map((_, i) => {
        const y = 6 + i * 3;
        const conf = 1 - i / rows.length;
        const w = 24 + conf * 58;
        const band = conf >= 0.92 ? 0 : conf >= 0.72 ? 1 : conf >= 0.45 ? 2 : 3;
        return (
          <g key={i}>
            <motion.rect
              x={10}
              y={y}
              height={1.1}
              rx={0.55}
              className={band === 3 ? "fill-ink/25" : band === 2 ? "fill-ink/45" : "fill-ink"}
              initial={false}
              animate={{ width: active || reduce ? w : w * 0.35, opacity: active ? 1 : 0.5 }}
              transition={{ duration: 0.9, ease: ease.out, delay: i * 0.018 }}
            />
            {band <= 1 && (
              <motion.circle
                cx={6}
                cy={y + 0.55}
                r={0.9}
                className="fill-accent"
                initial={false}
                animate={{ opacity: active ? 1 : 0.35 }}
                transition={{ duration: 0.5, delay: i * 0.018 }}
              />
            )}
          </g>
        );
      })}
      {/* the refusal line */}
      <motion.line
        x1={4}
        x2={96}
        y1={57}
        y2={57}
        strokeWidth={0.3}
        strokeDasharray="1.5 1.5"
        className="stroke-accent"
        initial={false}
        animate={{ opacity: active ? 0.8 : 0.25 }}
        transition={{ duration: 0.6 }}
      />
    </svg>
  );
}

/** Fieldnote: a perspective floor with spatial anchors dropped onto it. */
function FieldnoteCover({ className, active }: { className?: string; active: boolean }) {
  const reduce = useReducedMotion();
  const anchors = [
    [28, 46],
    [44, 38],
    [62, 52],
    [74, 41],
    [52, 60],
    [36, 56],
  ];
  return (
    <svg viewBox="0 0 100 76" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g className="stroke-ink" strokeWidth={0.25} opacity={0.35}>
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={50 + (i - 5) * 4} y1={28} x2={50 + (i - 5) * 22} y2={76} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => {
          const t = i / 7;
          const y = 28 + Math.pow(t, 1.8) * 48;
          const spread = 20 + Math.pow(t, 1.8) * 110;
          return <line key={`h${i}`} x1={50 - spread / 2} y1={y} x2={50 + spread / 2} y2={y} />;
        })}
      </g>
      {anchors.map(([cx, cy], i) => (
        <g key={i}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={1.1}
            className={i === 1 ? "fill-accent" : "fill-ink"}
            initial={false}
            animate={{ opacity: active || reduce ? 1 : 0.35, scale: active ? 1 : 0.6 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 0.5, ease: ease.out, delay: 0.1 + i * 0.07 }}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r={4.5}
            fill="none"
            strokeWidth={0.28}
            className={i === 1 ? "stroke-accent" : "stroke-ink"}
            initial={false}
            animate={{ opacity: active && !reduce ? 0.5 : 0, scale: active ? 1 : 0.4 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 0.9, ease: ease.out, delay: 0.15 + i * 0.07 }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ==================================================================
   In-case-study diagrams
   ================================================================== */

export function Visual({ id }: { id: VisualId }) {
  const map: Record<VisualId, JSX.Element> = {
    "system-map": <SystemMap />,
    "before-after": <BeforeAfter />,
    "confidence-ladder": <ConfidenceLadder />,
    "spatial-stack": <SpatialStack />,
    "review-queue": <ReviewQueue />,
    "token-scale": <TokenScale />,
  };
  return <div className="w-full">{map[id]}</div>;
}

const label = "font-sans font-medium text-base uppercase tracking-[0.06em] fill-current";

function SystemMap() {
  const nodes = [
    { x: 8, label: "Remit", kind: "sys" },
    { x: 25, label: "Classify", kind: "model" },
    { x: 42, label: "Policy @ date", kind: "sys" },
    { x: 59, label: "Extract", kind: "model" },
    { x: 76, label: "Draft", kind: "model" },
    { x: 93, label: "Review", kind: "human" },
  ];
  return (
    <svg viewBox="0 0 100 44" className="w-full text-ink" aria-hidden>
      <line x1="8" y1="20" x2="93" y2="20" strokeWidth="0.25" className="stroke-ink/40" />
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect
            x={n.x - 7}
            y={15}
            width={14}
            height={10}
            rx={1.2}
            className={
              n.kind === "model"
                ? "fill-accent/12 stroke-accent"
                : n.kind === "human"
                  ? "fill-ink stroke-ink"
                  : "fill-transparent stroke-ink/50"
            }
            strokeWidth={0.3}
          />
          <text
            x={n.x}
            y={20.9}
            textAnchor="middle"
            className={`${label} ${n.kind === "human" ? "fill-canvas" : n.kind === "model" ? "fill-accent" : "fill-ink/70"}`}
          >
            {n.label}
          </text>
          {i < nodes.length - 1 && (
            <g>
              <line
                x1={n.x + 7.5}
                y1={20}
                x2={nodes[i + 1].x - 8}
                y2={20}
                strokeWidth={0.3}
                className="stroke-ink/50"
              />
              <circle cx={(n.x + nodes[i + 1].x) / 2} cy={20} r={0.85} className="fill-accent" />
              <text
                x={(n.x + nodes[i + 1].x) / 2}
                y={29.5}
                textAnchor="middle"
                className={`${label} fill-ink/40`}
              >
                gate
              </text>
            </g>
          )}
        </g>
      ))}
      <text x={8} y={9} className={`${label} fill-ink/40`}>
        deterministic
      </text>
      <text x={52} y={9} className={`${label} fill-accent`}>
        model steps — each independently evaluated
      </text>
      <text x={86} y={38} className={`${label} fill-ink/40`}>
        human signs
      </text>
    </svg>
  );
}

function BeforeAfter() {
  const rnd = (i: number, s: number) => ((Math.sin(i * 12.9 + s * 78.2) * 43758.5) % 1 + 1) % 1;
  return (
    <svg viewBox="0 0 100 46" className="w-full text-ink" aria-hidden>
      <text x={0} y={5} className={`${label} fill-ink/40`}>
        record-centric — 40 opens, one cause
      </text>
      {Array.from({ length: 40 }).map((_, i) => (
        <rect
          key={i}
          x={2 + (i % 8) * 5.2}
          y={11 + Math.floor(i / 8) * 5.4}
          width={4}
          height={3.6}
          rx={0.5}
          className="fill-ink/15"
        />
      ))}
      <line x1={49} y1={2} x2={49} y2={44} strokeWidth={0.25} className="stroke-ink/25" />
      <text x={54} y={5} className={`${label} fill-accent`}>
        cause-centric — 3 clusters, 3 decisions
      </text>
      {[
        { x: 60, y: 16, n: 18 },
        { x: 78, y: 24, n: 14 },
        { x: 92, y: 15, n: 8 },
      ].map((c, ci) => (
        <g key={ci}>
          <circle
            cx={c.x}
            cy={c.y}
            r={8}
            fill="none"
            strokeWidth={0.3}
            className={ci === 0 ? "stroke-accent" : "stroke-ink/40"}
          />
          {Array.from({ length: c.n }).map((_, i) => {
            const a = rnd(ci * 30 + i, 1) * Math.PI * 2;
            const r = rnd(ci * 30 + i, 2) * 6.2;
            return (
              <circle
                key={i}
                cx={c.x + Math.cos(a) * r}
                cy={c.y + Math.sin(a) * r}
                r={0.85}
                className={ci === 0 ? "fill-accent" : "fill-ink/60"}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function ConfidenceLadder() {
  const bands = [
    { h: 14, o: 1, t: "≥0.92 · full draft" },
    { h: 10, o: 0.7, t: "0.72–0.92 · contested first" },
    { h: 7, o: 0.45, t: "0.45–0.72 · evidence only" },
    { h: 4, o: 0.22, t: "<0.45 · routed out" },
  ];
  let y = 4;
  return (
    <svg viewBox="0 0 100 44" className="w-full text-ink" aria-hidden>
      {bands.map((b, i) => {
        const top = y;
        y += b.h + 2;
        return (
          <g key={i}>
            <rect x={0} y={top} width={54} height={b.h} rx={1} className="fill-accent" opacity={b.o} />
            <text x={58} y={top + b.h / 2 + 1.2} className={`${label} fill-ink/70`}>
              {b.t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SpatialStack() {
  const layers = [
    "technician attention",
    "agent context",
    "spatial anchor graph",
    "physical asset",
  ];
  return (
    <svg viewBox="0 0 100 52" className="w-full text-ink" aria-hidden>
      {layers.map((l, i) => {
        const y = 6 + i * 11;
        return (
          <g key={l}>
            <path
              d={`M20 ${y} L80 ${y - 5} L94 ${y + 3} L34 ${y + 8} Z`}
              fill="none"
              strokeWidth={0.3}
              className={i === 0 ? "stroke-accent" : "stroke-ink/45"}
            />
            <text x={0} y={y + 3} className={`${label} ${i === 0 ? "fill-accent" : "fill-ink/50"}`}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={0} y={y + 8} className={`${label} fill-ink/40`}>
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ReviewQueue() {
  const criteria = [
    { c: 0.31, met: false },
    { c: 0.48, met: false },
    { c: 0.79, met: true },
    { c: 0.88, met: true },
    { c: 0.94, met: true },
    { c: 0.97, met: true },
  ];
  return (
    <svg viewBox="0 0 100 46" className="w-full text-ink" aria-hidden>
      <text x={0} y={4} className={`${label} fill-ink/40`}>
        criteria, ascending confidence — weakest link first
      </text>
      {criteria.map((c, i) => {
        const y = 9 + i * 6;
        return (
          <g key={i}>
            <rect
              x={0}
              y={y}
              width={1.6}
              height={4.4}
              className={c.met ? "fill-ink/30" : "fill-accent"}
            />
            <rect x={4} y={y} width={c.c * 44} height={4.4} rx={0.6} className="fill-ink/12" />
            <rect
              x={4}
              y={y}
              width={1.6}
              height={4.4}
              rx={0.6}
              className={c.met ? "fill-ink/40" : "fill-accent"}
            />
            <text x={51} y={y + 3.2} className={`${label} fill-ink/50`}>
              {c.met ? "documented" : "needs review"} · {(c.c * 100).toFixed(0)}%
            </text>
          </g>
        );
      })}
      <rect x={78} y={9} width={22} height={33} rx={1} className="fill-ink/[0.06]" />
      <text x={80} y={14} className={`${label} fill-ink/40`}>
        draft
      </text>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          x={80}
          y={17 + i * 2.6}
          width={i % 3 === 2 ? 12 : 18}
          height={0.8}
          className="fill-ink/20"
        />
      ))}
    </svg>
  );
}

function TokenScale() {
  return (
    <svg viewBox="0 0 100 30" className="w-full text-ink" aria-hidden>
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <rect x={i * 9} y={6} width={8} height={12} rx={0.8} className="fill-ink" opacity={0.1 + i * 0.085} />
          <text x={i * 9} y={24} className={`${label} fill-ink/40`}>
            {i * 100 || 50}
          </text>
        </g>
      ))}
    </svg>
  );
}
