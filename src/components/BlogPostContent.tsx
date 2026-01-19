"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { MediumPost } from "@/lib/medium";

interface BlogPostContentProps {
  post: MediumPost;
  readTime: string;
}

export function BlogPostContent({ post, readTime }: BlogPostContentProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers or insecure contexts
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--card-border)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-[var(--background)]">
        {/* Header */}
        <header className="relative">
          {/* Back Button */}
          <div className="container pt-24 pb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/#blog"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-all duration-300"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--card-border)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
                </span>
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[var(--accent)] after:to-cyan-400 group-hover:after:w-full after:transition-all after:duration-300">
                  Back to blog
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          {post.thumbnail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="container mb-8"
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-2xl">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
              </div>
            </motion.div>
          )}

          {/* Title & Meta */}
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              {/* Categories */}
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground-muted)] mb-8 pb-8 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                    <span className="text-lg">👨‍💻</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{post.author}</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.pubDate)}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="container pb-16"
        >
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-[var(--card)] prose-pre:border prose-pre:border-[var(--card-border)] max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-cyan-500/10 border border-[var(--accent)]/30">
                    <Share2 className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-[var(--foreground)]">Share this article</span>
                    <span className="block text-xs text-[var(--foreground-muted)]">Spread the knowledge</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={shareOnTwitter}
                    className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--glass-background)] backdrop-blur-sm border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-white hover:border-[#1DA1F2]/50 hover:shadow-[0_0_20px_rgba(29,161,242,0.3)] transition-all duration-300 hover:scale-110"
                    aria-label="Share on Twitter"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#1a8cd8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Twitter className="w-4 h-4 relative z-10" />
                  </button>

                  <button
                    onClick={shareOnLinkedin}
                    className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--glass-background)] backdrop-blur-sm border border-[var(--glass-border)] text-[var(--foreground-muted)] hover:text-white hover:border-[#0A66C2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)] transition-all duration-300 hover:scale-110"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#004182] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Linkedin className="w-4 h-4 relative z-10" />
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className={`group relative flex items-center justify-center w-11 h-11 rounded-full bg-[var(--glass-background)] backdrop-blur-sm border text-[var(--foreground-muted)] transition-all duration-300 hover:scale-110 ${
                      copied 
                        ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                        : 'border-[var(--glass-border)] hover:text-white hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)]'
                    }`}
                    aria-label="Copy link"
                  >
                    <span className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                      copied 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 opacity-100' 
                        : 'bg-gradient-to-br from-[var(--accent)] to-cyan-600 opacity-0 group-hover:opacity-100'
                    }`} />
                    {copied ? (
                      <Check className="w-4 h-4 text-white relative z-10" />
                    ) : (
                      <Link2 className="w-4 h-4 relative z-10" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Original Article Link */}
            <div className="mt-8 p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
              <p className="text-sm text-[var(--foreground-muted)] mb-2">
                Originally published on Medium
              </p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                View original article →
              </a>
            </div>

            {/* Back to Blog */}
            <div className="mt-16 text-center">
              <Link
                href="/#blog"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(8,145,178,0.4)] hover:scale-[1.02]"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-cyan-500 to-[var(--accent)] bg-[length:200%_100%] transition-all duration-500 group-hover:bg-[position:100%_0]"></span>
                
                {/* Inner glow */}
                <span className="absolute inset-[1px] rounded-full bg-[var(--background)] transition-all duration-300 group-hover:bg-[var(--background)]/90"></span>
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                    <ArrowLeft className="w-3.5 h-3.5 text-[var(--accent)] group-hover:-translate-x-0.5 transition-transform duration-300" />
                  </span>
                  Back to all posts
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </>
  );
}
