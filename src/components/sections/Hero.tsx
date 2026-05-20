"use client";

import { motion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { socialLinks } from "@/lib/data";

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  return (
    <section
      id="top"
      className="relative pt-[calc(var(--nav-height)+var(--space-2xl))] pb-[var(--space-3xl)]"
    >
      <div className="page">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Issue №01 ·{" "}
          {new Date().toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}{" "}
          · Bandung, Indonesia
        </motion.p>

        <hr className="mt-[var(--space-md)] border-0 border-t border-[var(--color-rule)]" />

        <div className="mt-[var(--space-2xl)] grid gap-[var(--space-2xl)] md:grid-cols-12">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="display"
            >
              Building AI that works in the <em>real world</em>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="standfirst mt-[var(--space-lg)]"
            >
              An AI engineer who ships systems people actually use — from
              the LLM framework my team builds on every day, to the
              knowledge-graph stack a government client depends on. Currently
              with{" "}
              <span className="text-[var(--color-ink)]">
                PT. Indonesia Indicator
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-[var(--space-xl)] flex flex-wrap items-center gap-x-[var(--space-lg)] gap-y-[var(--space-md)]"
            >
              <a href="#contact" className="pill">
                Get in touch
                <span aria-hidden>→</span>
              </a>
              <a href="#work" className="lnk font-[var(--font-display)] text-lg">
                Read selected work →
              </a>
              {onOpenChat && (
                <button
                  onClick={onOpenChat}
                  className="lnk font-[var(--font-display)] text-lg"
                >
                  Ask my agent →
                </button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-[var(--space-2xl)] flex flex-wrap items-center gap-x-[var(--space-md)] gap-y-[var(--space-2xs)] font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
            >
              <span>Find me</span>
              <span aria-hidden>·</span>
              {socialLinks.map((link, i) => (
                <span key={link.name} className="inline-flex items-center gap-[var(--space-md)]">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lnk text-[11px] uppercase tracking-[0.08em]"
                  >
                    {link.name}
                  </a>
                  {i < socialLinks.length - 1 && <span aria-hidden>·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 md:pt-[var(--space-md)]"
          >
            <ProfileAvatar />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
