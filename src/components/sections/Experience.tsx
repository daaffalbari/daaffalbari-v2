"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mb-4 inline-block font-mono text-sm text-[var(--accent)]">
            Experience
          </span>
          <h2 className="section-title">Where I've Worked</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline Line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-[7px] top-[20px] h-full w-px bg-[var(--card-border)]" />
              )}

              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 border-[var(--background)]",
                      exp.type === "current"
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--card-border)]"
                    )}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--card-border-hover)]">
                  {/* Header */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-[var(--foreground)]">
                        {exp.role}
                      </h3>
                      {exp.type === "current" && (
                        <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-xs text-[var(--accent)]">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[var(--accent)]">{exp.company}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-muted)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="mb-4 space-y-1.5">
                    {exp.highlights.slice(0, 3).map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]"
                      >
                        <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-[var(--card-hover)] px-2 py-1 text-xs text-[var(--foreground-muted)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
