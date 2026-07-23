"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const WEEKS = 53;
const DAYS = 7;
const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;

const MONTH_LABELS = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLOR = [
  "var(--color-rule)",
  "color-mix(in oklch, var(--color-accent) 28%, var(--color-rule))",
  "color-mix(in oklch, var(--color-accent) 52%, var(--color-rule))",
  "color-mix(in oklch, var(--color-accent) 78%, var(--color-rule))",
  "var(--color-accent)",
];

// Deterministic pseudo-random so server and client render the same values.
function seeded(i: number): number {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function buildWeeks(): number[][] {
  const quietWeeks = new Set([13, 14, 33]); // short breaks, not maxed-out every day
  const weeks: number[][] = [];

  for (let w = 0; w < WEEKS; w++) {
    const days: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const r = seeded(w * DAYS + d);
      const isWeekend = d === 0 || d === 6;

      if (quietWeeks.has(w)) {
        days.push(r > 0.9 ? 1 : 0);
        continue;
      }

      let level: number;
      if (isWeekend) {
        level = r < 0.75 ? 0 : r < 0.92 ? 1 : 2;
      } else {
        level = r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.8 ? 2 : r < 0.94 ? 3 : 4;
      }
      days.push(level);
    }
    weeks.push(days);
  }

  return weeks;
}

export function ActivityGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const weeks = useMemo(() => buildWeeks(), []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-[var(--space-3xl)]"
    >
      <h3 className="eyebrow">Shipping rhythm</h3>

      <div className="mt-[var(--space-md)] overflow-x-auto">
        <div
          className="inline-flex flex-col gap-[var(--space-2xs)]"
          style={{ minWidth: WEEKS * PITCH + 32 }}
        >
          <div className="flex">
            <div style={{ width: 28, flexShrink: 0 }} />
            <div className="relative flex-1" style={{ height: 14 }}>
              {MONTH_LABELS.map((month, idx) => (
                <span
                  key={idx}
                  className="absolute whitespace-nowrap font-[var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-3)]"
                  style={{
                    left: ((idx * (WEEKS - 1)) / (MONTH_LABELS.length - 1)) * PITCH,
                  }}
                >
                  {month}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-[var(--space-2xs)]">
            <div
              className="grid"
              style={{ gridTemplateRows: `repeat(${DAYS}, ${CELL}px)`, rowGap: GAP }}
            >
              {DAY_LABELS.map((label, i) => (
                <span
                  key={i}
                  className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-3)]"
                  style={{ width: 24, lineHeight: `${CELL}px` }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${WEEKS}, ${CELL}px)`,
                gridTemplateRows: `repeat(${DAYS}, ${CELL}px)`,
                gridAutoFlow: "column",
                gap: GAP,
              }}
            >
              {weeks.flatMap((days, w) =>
                days.map((level, d) => (
                  <span
                    key={`${w}-${d}`}
                    aria-hidden="true"
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: LEVEL_COLOR[level],
                    }}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-[var(--space-3xs)]">
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-3)]">
              Less
            </span>
            {LEVEL_COLOR.map((color, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ width: CELL, height: CELL, borderRadius: 2, background: color }}
              />
            ))}
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-3)]">
              More
            </span>
          </div>
        </div>
      </div>

      <p className="mt-[var(--space-sm)] max-w-[var(--measure-prose)] text-sm text-[var(--color-ink-3)]">
        A rough shape of the last year. Most of the actual commits live in
        private company repositories and don&apos;t show up on a public
        profile.
      </p>
    </motion.div>
  );
}
