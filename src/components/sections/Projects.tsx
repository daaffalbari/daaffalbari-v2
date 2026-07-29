"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

const KIND_LABEL: Record<ProjectMeta["kind"], string> = {
  product: "Product",
  research: "Research",
};

export function Projects({ projects }: { projects: ProjectMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 04 · Selected work</span>
          <h2 className="chapter-head__title">
            Things shipped, in production, used by real people.
          </h2>
        </motion.header>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="standfirst mb-[var(--space-xl)]"
        >
          A short list, ordered by what taught me the most. Read any title for the
          full case.
        </motion.p>

        <ol className="border-t border-[var(--color-ink)]">
          {projects.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.12 + index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-[var(--color-rule)]"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-[var(--space-md)] py-[var(--space-lg)] text-left transition-colors hover:bg-[var(--color-paper-2)] md:grid-cols-[3rem_1fr_auto_7rem]"
              >
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  №{String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-ink)] md:text-[2rem]">
                    {project.title}
                  </h3>
                  <p className="mt-[var(--space-2xs)] line-clamp-2 text-sm text-[var(--color-ink-2)]">
                    {project.description}
                  </p>
                </div>

                <ul className="hidden flex-wrap justify-end gap-[var(--space-2xs)] md:flex md:max-w-[14rem]">
                  {project.stack.slice(0, 3).map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)] md:text-right">
                  {KIND_LABEL[project.kind]} · {project.year}{" "}
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>

        <p className="mt-[var(--space-xl)] text-sm text-[var(--color-ink-3)]">
          More on{" "}
          <a
            href="https://github.com/daaffalbari"
            target="_blank"
            rel="noopener noreferrer"
            className="lnk"
          >
            GitHub →
          </a>
        </p>
      </div>
    </section>
  );
}
