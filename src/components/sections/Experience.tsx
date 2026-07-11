"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 03 · Experience</span>
          <h2 className="chapter-head__title">
            Where the lessons came from.
          </h2>
        </motion.header>

        <ol className="grid gap-[var(--space-2xl)]">
          {experiences.map((exp, index) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.08 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid gap-[var(--space-md)] border-t border-[var(--color-rule)] pt-[var(--space-lg)] md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  {exp.period}
                </p>
                {exp.type === "current" && (
                  <p className="mt-[var(--space-2xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">
                    Current
                  </p>
                )}
                <p className="mt-[var(--space-xs)] text-sm text-[var(--color-ink-3)]">
                  {exp.location}
                </p>
              </div>

              <div className="md:col-span-9">
                <h3 className="font-[var(--font-display)] text-2xl font-medium leading-tight tracking-tight text-[var(--color-ink)]">
                  {exp.role}{" "}
                  <span className="text-[var(--color-ink-3)]">·</span>{" "}
                  <span className="italic">{exp.company}</span>
                </h3>

                <ul className="mt-[var(--space-md)] grid gap-[var(--space-xs)] text-[var(--color-ink-2)]">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[1.5rem_1fr] gap-x-[var(--space-2xs)] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="font-[var(--font-mono)] text-xs text-[var(--color-ink-3)] pt-[0.4em]"
                      >
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-[var(--space-md)] flex flex-wrap gap-[var(--space-2xs)]">
                  {exp.skills.map((skill) => (
                    <li key={skill}>
                      <span className="tag">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
