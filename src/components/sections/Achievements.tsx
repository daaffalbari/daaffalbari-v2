"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Trophy,
  Award,
  Medal,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import { achievements } from "@/lib/data";

const icons = {
  globe: Globe,
  trophy: Trophy,
  award: Award,
  medal: Medal,
  graduation: GraduationCap,
  certificate: BadgeCheck,
};

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="section" ref={ref}>
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="mb-4 inline-block font-mono text-sm text-[var(--accent)]">
            Achievements
          </span>
          <h2 className="section-title">Some Nice Wins Along the Way</h2>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => {
            const Icon = icons[achievement.icon as keyof typeof icons] || Award;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--card-border-hover)]"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                </div>

                {/* Content */}
                <h3 className="mb-1 font-semibold text-[var(--foreground)]">
                  {achievement.title}
                </h3>
                <p className="mb-2 text-sm text-[var(--foreground-muted)]">
                  {achievement.organization}
                </p>
                <span className="text-xs text-[var(--accent)]">
                  {achievement.year}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 grid gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 sm:grid-cols-4"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--accent)]">2×</div>
            <div className="text-xs text-[var(--foreground-muted)]">
              Google Challenge Finalist
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">Top 10</div>
            <div className="text-xs text-[var(--foreground-muted)]">
              Microsoft Imagine Cup
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">6+</div>
            <div className="text-xs text-[var(--foreground-muted)]">
              Competition Trophies
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--foreground)]">Certified</div>
            <div className="text-xs text-[var(--foreground-muted)]">
              TensorFlow Developer
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
