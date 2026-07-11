"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, education } from "@/lib/data";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 02 · About</span>
          <h2 className="chapter-head__title">
            Less magic. More boring infrastructure that holds.
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-[var(--space-2xl)] md:grid-cols-12"
        >
          <div className="md:col-span-7">
            <p className="lede lede--dropcap">
              I build AI that earns its keep — observable, debuggable, and
              cheap enough to leave running. The interesting work is rarely
              the model; it&apos;s the plumbing around it, the failure modes,
              and the question of what should happen at 3 a.m. when something
              upstream changes.
            </p>

            <p className="mt-[var(--space-md)] text-[var(--color-ink-2)] max-w-[var(--measure-prose)]">
              Right now that means LLM frameworks the whole team builds on,
              cost-tuned inference pipelines, and knowledge-graph stacks where
              hallucination is a regulatory problem, not a UX one. I&apos;m
              happiest when the work disappears into the product — when a
              teammate stops thinking about &ldquo;the AI&rdquo; and just uses
              it.
            </p>

            <p className="mt-[var(--space-md)] text-[var(--color-ink-2)] max-w-[var(--measure-prose)]">
              Outside that, I&apos;ll cheerfully ship a clean React app, a
              mobile build, or a half-baked pixel-art weekend project. The
              breadth keeps the depth honest.
            </p>
          </div>

          <aside className="md:col-span-5 md:border-l md:border-[var(--color-rule)] md:pl-[var(--space-xl)]">
            <dl className="space-y-[var(--space-md)]">
              <div>
                <dt className="eyebrow">Based</dt>
                <dd className="mt-[var(--space-2xs)] font-[var(--font-display)] text-lg text-[var(--color-ink)]">
                  Bandung, Indonesia · remote-friendly
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Studied</dt>
                <dd className="mt-[var(--space-2xs)] font-[var(--font-display)] text-lg text-[var(--color-ink)]">
                  {education.institution}
                </dd>
                <dd className="mt-[var(--space-3xs)] text-sm text-[var(--color-ink-3)]">
                  {education.degree} · GPA {education.gpa}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Currently</dt>
                <dd className="mt-[var(--space-2xs)] font-[var(--font-display)] text-lg text-[var(--color-ink)]">
                  AI Engineer · PT. Indonesia Indicator
                </dd>
              </div>
            </dl>
          </aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[var(--space-3xl)]"
        >
          <h3 className="eyebrow">Working knowledge</h3>
          <div className="mt-[var(--space-md)] grid gap-[var(--space-xl)] md:grid-cols-3">
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <h4 className="font-[var(--font-display)] text-lg font-medium tracking-tight text-[var(--color-ink)]">
                  {category}
                </h4>
                <ul className="mt-[var(--space-sm)] flex flex-wrap gap-[var(--space-2xs)]">
                  {list.map((skill) => (
                    <li key={skill}>
                      <span className="tag">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
