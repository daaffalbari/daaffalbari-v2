"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 05 · Awards</span>
          <h2 className="chapter-head__title">
            Recognition along the way.
          </h2>
        </motion.header>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="standfirst mb-[var(--space-xl)]"
        >
          A handful of competitions and certifications that taught me to ship
          under pressure.
        </motion.p>

        <ol className="border-t border-[var(--color-ink)]">
          {achievements.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-[var(--space-md)] border-b border-[var(--color-rule)] py-[var(--space-md)]"
            >
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                №{String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="font-[var(--font-display)] text-xl font-medium tracking-tight text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-[var(--space-3xs)] text-sm text-[var(--color-ink-2)]">
                  <span className="italic">{item.organization}</span>
                </p>
              </div>

              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)] whitespace-nowrap">
                {item.year}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
