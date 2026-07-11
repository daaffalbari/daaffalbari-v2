"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Play, X } from "lucide-react";
import { projects } from "@/lib/data";

type Project = (typeof projects)[0];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Project | null>(null);

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
          A short list, ordered by what taught me the most. Tap any title to
          read the case.
        </motion.p>

        <ol className="border-t border-[var(--color-ink)]">
          {projects.map((project, index) => {
            const year = project.id <= 2 ? "2024" : project.id === 3 ? "2024" : project.id === 4 ? "2023" : "2024";
            return (
              <motion.li
                key={project.id}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.12 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-[var(--color-rule)]"
              >
                <button
                  onClick={() => setSelected(project)}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-[var(--space-md)] py-[var(--space-lg)] text-left transition-colors hover:bg-[var(--color-paper-2)] md:grid-cols-[3rem_1fr_auto_5rem]"
                >
                  <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                    №{String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-ink)] md:text-[2rem]">
                      {project.title}
                    </h3>
                    <p className="mt-[var(--space-2xs)] text-sm text-[var(--color-ink-2)] line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <ul className="hidden flex-wrap justify-end gap-[var(--space-2xs)] md:flex md:max-w-[14rem]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)] md:text-right">
                    {year} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </button>
              </motion.li>
            );
          })}
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

      <AnimatePresence>
        {selected && (
          <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[var(--color-paper)]/95"
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="relative my-[var(--space-2xl)] w-full max-w-[var(--measure-page)] px-[clamp(1.25rem,4vw,3rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="sticky top-[var(--space-md)] z-[1] mb-[var(--space-md)] inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
          Close
        </button>

        <p className="eyebrow">Case · {project.category}</p>
        <h2 className="display mt-[var(--space-sm)]" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>
          {project.title}
        </h2>

        <p className="lede mt-[var(--space-lg)] max-w-[var(--measure-prose)]">
          {project.longDescription}
        </p>

        <dl className="mt-[var(--space-xl)] grid gap-[var(--space-md)] border-t border-[var(--color-rule)] pt-[var(--space-md)] md:grid-cols-3">
          <div>
            <dt className="eyebrow">Role</dt>
            <dd className="mt-[var(--space-3xs)] font-[var(--font-display)] text-base text-[var(--color-ink)]">
              {project.role}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-[var(--space-3xs)] flex flex-wrap gap-[var(--space-2xs)]">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Recognition</dt>
            <dd className="mt-[var(--space-3xs)] text-sm text-[var(--color-ink-2)]">
              {project.achievements.length > 0
                ? `${project.achievements.length} award${project.achievements.length > 1 ? "s" : ""}`
                : "—"}
            </dd>
          </div>
        </dl>

        {project.mockup && (
          <figure className="mt-[var(--space-2xl)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)]">
              <Image
                src={project.mockup}
                alt={`${project.title} mockup`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 80vw, 100vw"
              />
            </div>
            <figcaption className="mt-[var(--space-xs)] font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
              Plate · {project.title} interface
            </figcaption>
          </figure>
        )}

        {project.achievements.length > 0 && (
          <section className="mt-[var(--space-2xl)] border-t border-[var(--color-rule)] pt-[var(--space-lg)]">
            <h3 className="eyebrow">Recognition</h3>
            <ul className="mt-[var(--space-sm)] grid gap-[var(--space-xs)]">
              {project.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-[var(--space-2xs)] text-[var(--color-ink-2)]"
                >
                  <span
                    aria-hidden
                    className="font-[var(--font-mono)] text-xs text-[var(--color-ink-3)]"
                  >
                    ✦
                  </span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-[var(--space-2xl)] flex flex-wrap gap-[var(--space-md)] border-t border-[var(--color-rule)] pt-[var(--space-lg)]">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              Visit project →
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} />
              Source →
            </a>
          )}
          {project.links.video && (
            <a
              href={project.links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
            >
              <Play className="h-4 w-4" strokeWidth={1.5} />
              Watch demo →
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}
