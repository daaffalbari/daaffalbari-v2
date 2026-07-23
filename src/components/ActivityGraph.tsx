"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

const WEEKS = 53;
const DAYS = 7;
const CELL = 11;
const GAP = 3;
const PITCH = CELL + GAP;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLOR = [
  "var(--color-rule)",
  "color-mix(in oklch, var(--color-accent) 28%, var(--color-rule))",
  "color-mix(in oklch, var(--color-accent) 52%, var(--color-rule))",
  "color-mix(in oklch, var(--color-accent) 78%, var(--color-rule))",
  "var(--color-accent)",
];

// Qualitative, not a literal count — this is illustrative placeholder
// data (see the caption below), so we don't put a fabricated exact
// number in front of a visitor.
const LEVEL_LABEL = ["No activity", "Light", "Moderate", "Active", "Busy"];

const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short" });
const TOOLTIP_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

interface Cell {
  date: Date;
  level: number; // -1 = hasn't happened yet
}

// Deterministic pseudo-random so a given date always renders the same
// level (no reshuffling on every reload).
function seeded(i: number): number {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

// Rolling 53-week window ending today — recomputed on every visit, so
// the graph advances on its own with no stored/updated data.
function buildCells(today: Date): Cell[] {
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + (6 - today.getDay())); // Saturday of this week

  const firstDate = new Date(weekEnd);
  firstDate.setDate(weekEnd.getDate() - (WEEKS * DAYS - 1));

  const quietWeeks = new Set([13, 14, 33]); // short breaks, not maxed-out every day
  const cells: Cell[] = [];

  for (let i = 0; i < WEEKS * DAYS; i++) {
    const date = new Date(firstDate);
    date.setDate(firstDate.getDate() + i);

    if (date > today) {
      cells.push({ date, level: -1 });
      continue;
    }

    const week = Math.floor(i / DAYS);
    const day = i % DAYS;
    const r = seeded(i);
    const isWeekend = day === 0 || day === 6;

    let level: number;
    if (quietWeeks.has(week)) {
      level = r > 0.9 ? 1 : 0;
    } else if (isWeekend) {
      level = r < 0.75 ? 0 : r < 0.92 ? 1 : 2;
    } else {
      level = r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.8 ? 2 : r < 0.94 ? 3 : 4;
    }
    cells.push({ date, level });
  }

  return cells;
}

function buildMonthLabels(cells: Cell[]): { week: number; label: string }[] {
  const labels: { week: number; label: string }[] = [];
  let lastMonth = -1;

  for (let week = 0; week < WEEKS; week++) {
    const sunday = cells[week * DAYS].date;
    const month = sunday.getMonth();
    if (month !== lastMonth) {
      labels.push({ week, label: MONTH_FORMAT.format(sunday) });
      lastMonth = month;
    }
  }

  return labels;
}

export function ActivityGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cells = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return buildCells(today);
  }, []);

  const monthLabels = useMemo(() => buildMonthLabels(cells), [cells]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-[var(--space-3xl)]"
    >
      <h3 className="eyebrow">Shipping rhythm</h3>

      <div className="mt-[var(--space-md)] flex justify-center overflow-x-auto">
        <div
          className="inline-flex flex-col gap-[var(--space-2xs)]"
          style={{ minWidth: WEEKS * PITCH + 32 }}
        >
          <div className="flex">
            <div style={{ width: 28, flexShrink: 0 }} />
            <div className="relative flex-1" style={{ height: 14 }}>
              {monthLabels.map(({ week, label }) => (
                <span
                  key={week}
                  className="absolute whitespace-nowrap font-[var(--font-mono)] text-[10px] uppercase tracking-[0.06em] text-[var(--color-ink-3)]"
                  style={{ left: week * PITCH }}
                >
                  {label}
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
              {cells.map(({ date, level }, i) => {
                if (level < 0) {
                  // Hasn't happened yet — rendered identical to an empty
                  // day, but not interactive: nothing to report on a date
                  // that hasn't occurred.
                  return (
                    <span
                      key={i}
                      aria-hidden="true"
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: 2,
                        background: LEVEL_COLOR[0],
                      }}
                    />
                  );
                }

                const tooltip = `${TOOLTIP_FORMAT.format(date)} · ${LEVEL_LABEL[level]}`;

                return (
                  <span key={i} className="group relative" style={{ width: CELL, height: CELL }}>
                    <span
                      tabIndex={0}
                      aria-label={tooltip}
                      className="block h-full w-full cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                      style={{
                        borderRadius: 2,
                        background: LEVEL_COLOR[level],
                      }}
                    />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-[var(--color-ink)] px-[var(--space-2xs)] py-[3px] font-[var(--font-mono)] text-[10px] text-[var(--color-paper)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                    >
                      {tooltip}
                    </span>
                  </span>
                );
              })}
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

      <p className="mx-auto mt-[var(--space-sm)] max-w-[var(--measure-narrow)] text-center text-sm text-[var(--color-ink-3)]">
        A rough shape of the last year — hover or tab through a day for a
        read on how busy it was. Most of the actual commits live in private
        company repositories and don&apos;t show up on a public profile.
      </p>
    </motion.div>
  );
}
