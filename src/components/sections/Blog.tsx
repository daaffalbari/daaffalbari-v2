"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { getMediumPosts, calculateReadTime, MEDIUM_PROFILE_URL } from "@/lib/medium";
import { mergeAndSortPosts, type PostListItem } from "@/lib/blog";

export function Blog({ cmsPosts }: { cmsPosts: PostListItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mediumPosts, setMediumPosts] = useState<PostListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const medium = await getMediumPosts(6);
      if (cancelled) return;
      setMediumPosts(
        medium.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.pubDate,
          readTime: calculateReadTime(p.content),
          source: "medium" as const,
          href: `/blog/${p.slug}`,
        }))
      );
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = mergeAndSortPosts(cmsPosts, mediumPosts).slice(0, 6);

  const formatDate = (dateString: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <section id="notes" ref={ref} className="chapter">
      <div className="page">
        <motion.header
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="chapter-head"
        >
          <span className="chapter-head__num">№ 06 · Notes</span>
          <h2 className="chapter-head__title">
            Writing — mostly on AI in production.
          </h2>
        </motion.header>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="standfirst mb-[var(--space-xl)]"
        >
          Field notes from shipping models, agents, and the messy infrastructure
          underneath — written here, with some cross-posted from Medium.
        </motion.p>

        {isLoading && posts.length === 0 ? (
          <ul className="border-t border-[var(--color-ink)]">
            {Array.from({ length: 3 }).map((_, i) => (
              <li
                key={i}
                className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-[var(--space-md)] border-b border-[var(--color-rule)] py-[var(--space-md)]"
              >
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  —
                </span>
                <span className="h-5 w-3/4 max-w-[28rem] rounded-sm bg-[var(--color-paper-2)]" />
                <span className="h-3 w-20 rounded-sm bg-[var(--color-paper-2)]" />
              </li>
            ))}
          </ul>
        ) : posts.length === 0 ? (
          <p className="text-[var(--color-ink-2)]">
            Nothing here yet. Read everything on{" "}
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lnk"
            >
              Medium →
            </a>
          </p>
        ) : (
          <ol className="border-t border-[var(--color-ink)]">
            {posts.map((post, index) => (
              <motion.li
                key={`${post.source}-${post.slug}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-[var(--color-rule)]"
              >
                <Link
                  href={post.href}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-[var(--space-md)] py-[var(--space-md)] transition-colors hover:bg-[var(--color-paper-2)]"
                >
                  <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                    №{String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-[var(--font-display)] text-xl font-medium leading-tight tracking-tight text-[var(--color-ink)] md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-[var(--space-3xs)] font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                      {formatDate(post.date)} · {post.readTime}
                      {post.source === "medium" ? " · Medium" : ""}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)] transition-transform group-hover:translate-x-0.5"
                  >
                    Read →
                  </span>
                </Link>
              </motion.li>
            ))}
          </ol>
        )}

        <p className="mt-[var(--space-xl)] text-sm text-[var(--color-ink-3)]">
          The full archive lives on{" "}
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lnk"
          >
            Medium →
          </a>
        </p>
      </div>
    </section>
  );
}
