"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { MediumPost } from "@/lib/medium";

interface BlogPostContentProps {
  post: MediumPost;
  readTime: string;
}

export function BlogPostContent({ post, readTime }: BlogPostContentProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const t = document.createElement("textarea");
        t.value = shareUrl;
        t.style.position = "fixed";
        t.style.left = "-9999px";
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent */
    }
  };

  const tweet = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        post.title
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );

  const linkedin = () =>
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
      >
        <div
          className="h-full bg-[var(--color-accent)]"
          style={{
            width: `${progress}%`,
            transition: "width 60ms linear",
          }}
        />
      </div>

      <article className="min-h-screen pt-[calc(var(--nav-height)+var(--space-xl))] pb-[var(--space-3xl)]">
        <div className="page">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-[var(--space-xl)]"
          >
            <Link
              href="/#notes"
              className="lnk font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
            >
              ← Back to notes
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[var(--color-rule)] pb-[var(--space-xl)]"
          >
            {post.categories.length > 0 && (
              <p className="eyebrow">{post.categories.slice(0, 3).join(" · ")}</p>
            )}

            <h1
              className="display mt-[var(--space-md)]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.25rem)" }}
            >
              {post.title}
            </h1>

            <p className="mt-[var(--space-lg)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
              By {post.author} · {formatDate(post.pubDate)} · {readTime}
            </p>
          </motion.header>

          {post.thumbnail && (
            <motion.figure
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="my-[var(--space-2xl)]"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden border border-[var(--color-rule)]">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.figure>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[var(--space-2xl)] grid gap-[var(--space-2xl)] md:grid-cols-12"
          >
            <div className="md:col-span-8 md:col-start-2">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <hr className="my-[var(--space-2xl)] border-0 border-t border-[var(--color-rule)]" />

              <div className="flex flex-col gap-[var(--space-md)] sm:flex-row sm:items-center sm:justify-between">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  Share this piece
                </p>
                <div className="flex items-center gap-[var(--space-md)]">
                  <button
                    onClick={tweet}
                    aria-label="Share on Twitter"
                    className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  >
                    <Twitter className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Twitter
                  </button>
                  <button
                    onClick={linkedin}
                    aria-label="Share on LinkedIn"
                    className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  >
                    <Linkedin className="h-3.5 w-3.5" strokeWidth={1.5} />
                    LinkedIn
                  </button>
                  <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="lnk inline-flex items-center gap-[var(--space-2xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Link2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Copy link
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-[var(--space-xl)] text-sm text-[var(--color-ink-3)]">
                Originally published on Medium.{" "}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lnk"
                >
                  View original →
                </a>
              </p>

              <div className="mt-[var(--space-2xl)] border-t border-[var(--color-rule)] pt-[var(--space-lg)]">
                <Link
                  href="/#notes"
                  className="lnk font-[var(--font-display)] text-xl"
                >
                  ← Back to all notes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
