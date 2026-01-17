"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, Rss } from "lucide-react";
import {
  getMediumPosts,
  calculateReadTime,
  MEDIUM_PROFILE_URL,
  type MediumPost,
} from "@/lib/medium";

export function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const mediumPosts = await getMediumPosts(6);
      setPosts(mediumPosts);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="blog" className="section" ref={ref}>
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="mb-4 inline-block font-mono text-sm text-[var(--accent)]">
            Blog
          </span>
          <h2 className="section-title">Random Thoughts &amp; Learnings</h2>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5"
              >
                <div className="mb-3 flex gap-1.5">
                  <div className="h-5 w-12 rounded-md bg-[var(--card-hover)]" />
                  <div className="h-5 w-16 rounded-md bg-[var(--card-hover)]" />
                </div>
                <div className="mb-2 h-6 w-3/4 rounded bg-[var(--card-hover)]" />
                <div className="mb-4 space-y-2">
                  <div className="h-4 w-full rounded bg-[var(--card-hover)]" />
                  <div className="h-4 w-2/3 rounded bg-[var(--card-hover)]" />
                </div>
                <div className="flex gap-3">
                  <div className="h-4 w-20 rounded bg-[var(--card-hover)]" />
                  <div className="h-4 w-16 rounded bg-[var(--card-hover)]" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-12 text-center"
          >
            <Rss className="mb-4 h-12 w-12 text-[var(--foreground-muted)]" />
            <h3 className="mb-2 text-lg font-semibold">Nothing here yet!</h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              I&apos;m writing some stuff, check back soon 😄
            </p>
          </motion.div>
        ) : (
          /* Blog Grid */
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post.guid}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="flex h-full flex-col rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--card-border-hover)]">
                    {/* Thumbnail */}
                    {post.thumbnail && (
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.categories.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.categories.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-[var(--card-hover)] px-2 py-0.5 text-xs text-[var(--foreground-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="mb-2 font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 flex-grow line-clamp-2 text-sm text-[var(--foreground-muted)]">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="mt-auto flex items-center gap-3 text-xs text-[var(--foreground-muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.pubDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {calculateReadTime(post.description)}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        )}

        {/* Medium Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <Rss className="h-4 w-4" />
            More posts on Medium
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
