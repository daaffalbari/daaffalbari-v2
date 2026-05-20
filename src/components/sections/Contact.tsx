"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 07 · Get in touch</span>
          <h2 className="chapter-head__title">
            Write to me — I read everything.
          </h2>
        </motion.header>

        <div className="grid gap-[var(--space-2xl)] md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <p className="lede max-w-[var(--measure-narrow)]">
              I&apos;m up for full-time roles, contract work, advisory, or a
              good long conversation about where AI is going wrong. Email is the
              fastest path.
            </p>

            <dl className="mt-[var(--space-xl)] space-y-[var(--space-lg)]">
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-[var(--space-2xs)]">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="lnk font-[var(--font-display)] text-xl"
                  >
                    {personalInfo.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-[var(--space-2xs)] font-[var(--font-display)] text-xl text-[var(--color-ink)]">
                  {personalInfo.phone}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Based</dt>
                <dd className="mt-[var(--space-2xs)] font-[var(--font-display)] text-xl text-[var(--color-ink)]">
                  {personalInfo.location}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Elsewhere</dt>
                <dd className="mt-[var(--space-2xs)] flex flex-wrap gap-x-[var(--space-md)] gap-y-[var(--space-2xs)]">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lnk font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                    >
                      {link.name} →
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="md:col-span-7"
          >
            <p className="eyebrow mb-[var(--space-md)]">Or use this form</p>
            <div className="space-y-[var(--space-md)]">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Subject" name="subject" />
              <Field label="Message" name="message" multiline required />
            </div>

            <div className="mt-[var(--space-lg)] flex items-center gap-[var(--space-md)]">
              <button
                type="submit"
                disabled={status === "sending"}
                className="pill"
                aria-disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send message"}
                {status === "idle" && <span aria-hidden>→</span>}
              </button>
              {status === "sent" && (
                <p
                  role="status"
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
                >
                  Got it — I&apos;ll reply within a day.
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]"
                >
                  Something went wrong — try email instead.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const sharedClass =
    "block w-full appearance-none rounded-none border-0 border-b border-[var(--color-rule)] bg-transparent px-0 py-[var(--space-xs)] font-[var(--font-body)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] outline-none transition-colors focus:border-[var(--color-ink)]";

  return (
    <label className="block">
      <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
        {label}
        {required && <span aria-hidden> *</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={sharedClass}
        />
      )}
    </label>
  );
}
