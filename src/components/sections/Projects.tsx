"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Zap } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "AI/LLM", "Computer Vision", "Mobile/ML", "Data Science"];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="mb-4 inline-block font-mono text-sm text-[var(--accent)]">
            Projects
          </span>
          <h2 className="section-title">Things I&apos;ve Built</h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-colors",
                activeCategory === category
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "border border-[var(--card-border)] text-[var(--foreground-muted)] hover:border-[var(--card-border-hover)] hover:text-[var(--foreground)]"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--card-border-hover)]"
              >
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-xs text-[var(--foreground-muted)]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-xs text-[var(--accent)]">
                      <Zap className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 line-clamp-2 text-sm text-[var(--foreground-muted)]">
                  {project.description}
                </p>

                {/* Impact */}
                <div className="mb-4 flex items-center gap-1 text-sm text-[var(--accent-green)]">
                  <Zap className="h-3 w-3" />
                  {project.impact}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--card-hover)] px-2 py-1 text-xs text-[var(--foreground-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <a
            href="https://github.com/daaffalbari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <Github className="h-4 w-4" />
            View more on GitHub
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
