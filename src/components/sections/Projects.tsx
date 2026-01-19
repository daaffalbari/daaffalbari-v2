"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Play,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";


type Project = (typeof projects)[0];

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

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
          <h2 className="section-title">Stuff I&apos;ve Built</h2>
          <p className="mt-4 max-w-lg text-[var(--foreground-muted)]">
            Cool things I&apos;ve worked on — some won awards, all taught me something
          </p>
        </motion.div>

        {/* Featured Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)]">
            <div className="grid lg:grid-cols-2">
              {/* Phone Mockup */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/5 to-transparent p-8 lg:p-12">
                {/* Phone Frame */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, rotateY: -10 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 rounded-[3rem] bg-[var(--accent)]/20 blur-2xl" />

                  {/* Phone Device */}
                  <div className="relative rounded-[2.5rem] border-[8px] border-[var(--foreground)]/10 bg-[var(--background)] p-2 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute left-1/2 top-0 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-[var(--foreground)]/10" />

                    {/* Screen */}
                    <div className="relative h-[400px] w-[185px] overflow-hidden rounded-[2rem] bg-[var(--card)] sm:h-[500px] sm:w-[230px]">
                      <Image
                        src={featuredProjects[currentIndex].mockup}
                        alt={featuredProjects[currentIndex].title}
                        fill
                        className="object-cover object-top"
                        sizes="230px"
                      />
                    </div>
                  </div>

                  {/* Floating Achievement Badge */}
                  {featuredProjects[currentIndex].achievements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -right-4 top-8 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-3 py-2 shadow-lg sm:-right-8"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[var(--accent)]" />
                        <span className="text-xs font-medium">
                          {featuredProjects[currentIndex].achievements.length}{" "}
                          Awards
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {featuredProjects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        idx === currentIndex
                          ? "w-6 bg-[var(--accent)]"
                          : "w-2 bg-[var(--foreground-muted)]/30 hover:bg-[var(--foreground-muted)]/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col justify-center p-6 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category & Role */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                        {featuredProjects[currentIndex].category}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {featuredProjects[currentIndex].role}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-bold lg:text-3xl">
                      {featuredProjects[currentIndex].title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-[var(--foreground-muted)]">
                      {featuredProjects[currentIndex].description}
                    </p>

                    {/* Achievements */}
                    {featuredProjects[currentIndex].achievements.length > 0 && (
                      <div className="mb-6">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                          Achievements
                        </div>
                        <ul className="space-y-1">
                          {featuredProjects[currentIndex].achievements
                            .slice(0, 3)
                            .map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Trophy className="h-3 w-3 text-[var(--accent)]" />
                                {achievement}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {featuredProjects[currentIndex].tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-[var(--card-hover)] px-2.5 py-1 text-xs text-[var(--foreground-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {featuredProjects[currentIndex].links.live && (
                        <a
                          href={featuredProjects[currentIndex].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                      {featuredProjects[currentIndex].links.github && (
                        <a
                          href={featuredProjects[currentIndex].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--card-border-hover)]"
                        >
                          <Github className="h-4 w-4" />
                          Source
                        </a>
                      )}
                      {featuredProjects[currentIndex].links.video && (
                        <a
                          href={featuredProjects[currentIndex].links.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--card-border-hover)]"
                        >
                          <Play className="h-4 w-4" />
                          Video
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="mt-8 flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition-colors hover:border-[var(--card-border-hover)] hover:bg-[var(--card-hover)]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] transition-colors hover:border-[var(--card-border-hover)] hover:bg-[var(--card-hover)]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <span className="ml-2 flex items-center text-sm text-[var(--foreground-muted)]">
                    {currentIndex + 1} / {featuredProjects.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-medium text-[var(--foreground-muted)]">
              Other Fun Projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-all hover:border-[var(--card-border-hover)] hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[var(--accent)]/5 to-transparent">
                    <Image
                      src={project.preview}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {project.category}
                      </span>
                      <span className="text-xs text-[var(--accent)]">
                        {project.role}
                      </span>
                    </div>

                    <h3 className="mb-2 font-semibold transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>

                    <p className="line-clamp-2 text-sm text-[var(--foreground-muted)]">
                      {project.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

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
            More on my GitHub
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[var(--background)]/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            {/* Centering wrapper */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)] shadow-2xl"
              >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--background)]/80 backdrop-blur-sm transition-colors hover:bg-[var(--card-hover)]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/10 to-transparent p-8">
                  {selectedProject.type === "mobile" ? (
                    // Phone Mockup for Mobile Apps
                    <div className="relative rounded-[2rem] border-[6px] border-[var(--foreground)]/10 bg-[var(--background)] p-1.5 shadow-xl">
                      <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-[var(--foreground)]/10" />
                      <div className="relative h-[350px] w-[162px] overflow-hidden rounded-[1.5rem] bg-[var(--card)] sm:h-[450px] sm:w-[208px]">
                        <Image
                          src={selectedProject.mockup}
                          alt={selectedProject.title}
                          fill
                          className="object-cover object-top"
                          sizes="208px"
                        />
                      </div>
                    </div>
                  ) : (
                    // Browser Mockup for Web Apps
                    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[var(--foreground)]/10 bg-[var(--background)] shadow-xl">
                      {/* Browser Header */}
                      <div className="flex items-center gap-2 border-b border-[var(--card-border)] bg-[var(--card)] px-4 py-3">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-500/60" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                          <div className="h-3 w-3 rounded-full bg-green-500/60" />
                        </div>
                        <div className="ml-2 flex-1 rounded-md bg-[var(--background)] px-3 py-1 text-xs text-[var(--foreground-muted)]">
                          {selectedProject.links.live || "localhost:3000"}
                        </div>
                      </div>
                      {/* Browser Content */}
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={selectedProject.mockup}
                          alt={selectedProject.title}
                          fill
                          className="object-cover object-top"
                          sizes="400px"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-[var(--foreground-muted)]">
                      {selectedProject.role}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold">
                    {selectedProject.title}
                  </h3>

                  <p className="mb-4 text-[var(--foreground-muted)]">
                    {selectedProject.description}
                  </p>

                  <p className="mb-6 text-sm text-[var(--foreground-muted)]">
                    {selectedProject.longDescription}
                  </p>

                  {selectedProject.achievements.length > 0 && (
                    <div className="mb-6">
                      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                        Achievements
                      </div>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent)]" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mb-6 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[var(--card-hover)] px-2.5 py-1 text-xs text-[var(--foreground-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {selectedProject.links.live && (
                      <a
                        href={selectedProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.links.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--card-border-hover)]"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                      </a>
                    )}
                    {selectedProject.links.video && (
                      <a
                        href={selectedProject.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--card-border-hover)]"
                      >
                        <Play className="h-4 w-4" />
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
