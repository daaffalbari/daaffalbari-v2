"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Server,
  Database,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { skills, education, personalInfo } from "@/lib/data";

const categoryIcons = {
  "AI & LLM": Brain,
  "Backend & Cloud": Server,
  "ML & Data": Database,
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mb-4 inline-block font-mono text-sm text-[var(--accent)]">
            About
          </span>
          <h2 className="section-title">
            Building with Intelligence
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 md:grid-cols-12"
        >
          {/* Main Bio Card */}
          <motion.div
            variants={itemVariants}
            className="bento-item md:col-span-8"
          >
            <div className="space-y-4 text-[var(--foreground-muted)]">
              <p className="text-lg leading-relaxed text-[var(--foreground)]">
                I'm an AI Engineer focused on building intelligent systems that work in production.
              </p>
              <p className="leading-relaxed">
                Currently at PT. Indonesia Indicator, I architect enterprise-grade LLM frameworks,
                implement Graph RAG systems, and build AI-powered platforms. My work has reduced
                development time by 5-10× and cut infrastructure costs by 75%.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--card-border)] pt-6">
              <div>
                <div className="text-2xl font-bold text-[var(--accent)]">5-10×</div>
                <div className="text-xs text-[var(--foreground-muted)]">Dev Speed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--foreground)]">75%</div>
                <div className="text-xs text-[var(--foreground-muted)]">Cost Reduction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--foreground)]">~0</div>
                <div className="text-xs text-[var(--foreground-muted)]">Hallucination</div>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={itemVariants}
            className="bento-item md:col-span-4"
          >
            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Based in</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold">Indonesia</h3>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              Open to remote
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            variants={itemVariants}
            className="bento-item md:col-span-4"
          >
            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm">Education</span>
            </div>
            <h3 className="mt-2 font-semibold">{education.institution}</h3>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              GPA: {education.gpa}
            </p>
          </motion.div>

          {/* Skills Cards */}
          {Object.entries(skills).map(([category, skillList]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || Brain;

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bento-item md:col-span-4"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[var(--accent)]" />
                  <h3 className="font-medium">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillList.slice(0, 6).map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
