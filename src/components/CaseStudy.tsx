"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, Github, Play, FileText } from "lucide-react";
import type { ProjectMeta } from "@/lib/projects";

interface CaseStudyProps {
  meta: ProjectMeta;
  next: { slug: string; title: string } | null;
  children: React.ReactNode; // rendered Markdoc body
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0 }}
      animate={inView || reduce ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const KIND_LABEL: Record<ProjectMeta["kind"], string> = {
  product: "Product",
  research: "Research",
};

export function CaseStudy({ meta, next, children }: CaseStudyProps) {
  const eyebrow = [
    "Case",
    KIND_LABEL[meta.kind],
    meta.year,
    meta.company || null,
  ]
    .filter(Boolean)
    .join(" · ");

  const metaRows = [
    meta.role && { label: "Role", value: meta.role },
    meta.stack.length > 0 && { label: "Stack", value: meta.stack.join(" · ") },
    meta.timeline && { label: "Timeline", value: meta.timeline },
    meta.team && { label: "Team", value: meta.team },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="min-h-screen pt-[calc(var(--nav-height)+var(--space-xl))] pb-[var(--space-3xl)]">
      <div className="page">
        {/* Back */}
        <Reveal className="mb-[var(--space-xl)]">
          <Link
            href="/#work"
            className="lnk font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
          >
            ← Selected work
          </Link>
        </Reveal>

        {/* Masthead */}
        <Reveal delay={0.05}>
          <p className="eyebrow">{eyebrow}</p>
          <h1
            className="display mt-[var(--space-md)]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            {meta.title}
          </h1>
          {meta.lede && (
            <p className="lede lede--dropcap mt-[var(--space-lg)]">{meta.lede}</p>
          )}
        </Reveal>

        {/* Meta rule */}
        {metaRows.length > 0 && (
          <Reveal delay={0.08}>
            <dl className="mt-[var(--space-xl)] grid grid-cols-2 gap-[var(--space-md)] border-y border-[var(--color-rule)] py-[var(--space-md)] md:grid-cols-4">
              {metaRows.map((row) => (
                <div key={row.label}>
                  <dt className="eyebrow">{row.label}</dt>
                  <dd className="mt-[var(--space-3xs)] font-[var(--font-display)] text-base text-[var(--color-ink)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {/* Hero plate */}
        {meta.coverImage && (
          <Reveal delay={0.1} className="my-[var(--space-2xl)]">
            <figure>
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--color-rule)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.coverImage}
                  alt={meta.coverAlt || meta.title}
                  className="h-full w-full object-cover"
                />
              </div>
              {meta.coverCaption && (
                <figcaption className="mt-[var(--space-xs)] font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  {meta.coverCaption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}

        {/* Narrative */}
        <Reveal delay={0.12} className="mt-[var(--space-2xl)]">
          <div className="prose">{children}</div>
        </Reveal>

        {/* Metric band */}
        {meta.metrics.length > 0 && (
          <Reveal className="mt-[var(--space-2xl)]">
            <section
              aria-label="Key results"
              className="flex flex-col border-y border-[var(--color-rule-strong)] sm:flex-row"
            >
              {meta.metrics.map((m, i) => (
                <div
                  key={`${m.figure}-${i}`}
                  className="flex-1 border-t border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-lg)] first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0"
                >
                  <div
                    className={`font-[var(--font-display)] leading-none tracking-[-0.025em] tabular-nums ${
                      m.accent
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-ink)]"
                    }`}
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3.75rem)" }}
                  >
                    {m.figure}
                  </div>
                  {m.label && (
                    <div className="mt-[var(--space-sm)] font-[var(--font-mono)] text-xs uppercase leading-relaxed tracking-[0.08em] text-[var(--color-ink-3)]">
                      {m.label}
                    </div>
                  )}
                </div>
              ))}
            </section>
          </Reveal>
        )}

        {/* Recognition */}
        {meta.achievements.length > 0 && (
          <Reveal className="mt-[var(--space-2xl)] border-t border-[var(--color-rule)] pt-[var(--space-lg)]">
            <h2 className="eyebrow">Recognition</h2>
            <ul className="mt-[var(--space-sm)] grid gap-[var(--space-xs)]">
              {meta.achievements.map((a) => (
                <li
                  key={a}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-[var(--space-2xs)] text-[var(--color-ink-2)]"
                >
                  <span
                    aria-hidden
                    className="font-[var(--font-mono)] text-xs text-[var(--color-accent)]"
                  >
                    ✦
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Links */}
        {(meta.links.live ||
          meta.links.github ||
          meta.links.video ||
          meta.links.paper) && (
          <Reveal className="mt-[var(--space-2xl)] border-t border-[var(--color-rule)] pt-[var(--space-lg)]">
            <div className="flex flex-wrap gap-[var(--space-lg)]">
              {meta.links.live && (
                <a
                  href={meta.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                  Visit project →
                </a>
              )}
              {meta.links.paper && (
                <a
                  href={meta.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
                >
                  <FileText className="h-4 w-4" strokeWidth={1.5} />
                  Read the write-up →
                </a>
              )}
              {meta.links.github && (
                <a
                  href={meta.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
                >
                  <Github className="h-4 w-4" strokeWidth={1.5} />
                  Source →
                </a>
              )}
              {meta.links.video && (
                <a
                  href={meta.links.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-display)] text-lg"
                >
                  <Play className="h-4 w-4" strokeWidth={1.5} />
                  Watch demo →
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* Next case */}
        {next && (
          <Reveal className="mt-[var(--space-3xl)]">
            <Link
              href={`/work/${next.slug}`}
              className="group block border-t border-[var(--color-rule-strong)] pt-[var(--space-2xl)]"
            >
              <span className="eyebrow">Next case →</span>
              <span className="mt-[var(--space-xs)] block font-[var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-[2.75rem]">
                {next.title}
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
