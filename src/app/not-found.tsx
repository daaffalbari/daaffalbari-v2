"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-pink)] opacity-10 blur-[150px]" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="terminal"
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-dot bg-[#ff5f57]" />
            <div className="terminal-dot bg-[#febc2e]" />
            <div className="terminal-dot bg-[#28c840]" />
            <span className="ml-2 text-xs text-[var(--foreground-muted)]">
              kubectl -- get page
            </span>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body space-y-4 p-6">
            {/* Error Header */}
            <div className="flex items-center gap-3 text-[var(--accent-pink)]">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold">Error: PageNotFound</span>
            </div>

            {/* Error Details */}
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-4">
              <div className="mb-3 font-mono text-sm">
                <span className="text-[var(--foreground-muted)]">
                  apiVersion:
                </span>{" "}
                <span className="text-[var(--accent-cyan)]">portfolio/v1</span>
              </div>
              <div className="mb-3 font-mono text-sm">
                <span className="text-[var(--foreground-muted)]">kind:</span>{" "}
                <span className="text-[var(--accent-purple)]">Page</span>
              </div>
              <div className="mb-3 font-mono text-sm">
                <span className="text-[var(--foreground-muted)]">status:</span>{" "}
                <span className="text-[var(--accent-pink)]">NotFound</span>
              </div>
              <div className="font-mono text-sm">
                <span className="text-[var(--foreground-muted)]">message:</span>{" "}
                <span className="text-[var(--foreground)]">
                  "The requested page could not be found in the cluster"
                </span>
              </div>
            </div>

            {/* 404 Display */}
            <div className="py-8 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-8xl font-bold"
              >
                <span className="gradient-text">404</span>
              </motion.div>
              <p className="text-lg text-[var(--foreground-muted)]">
                Pod not found in namespace /pages
              </p>
            </div>

            {/* Suggested Actions */}
            <div className="space-y-2">
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command">
                  kubectl describe error 404
                </span>
              </div>
              <div className="terminal-output pl-4">
                <p>Possible causes:</p>
                <p className="text-[var(--foreground-muted)]">
                  - Page was moved or deleted
                </p>
                <p className="text-[var(--foreground-muted)]">
                  - URL typo in the request
                </p>
                <p className="text-[var(--foreground-muted)]">
                  - Resource never existed
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] px-6 py-3 font-medium text-white transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                >
                  <Home className="h-4 w-4" />
                  Return to Home
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => window.history.back()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-6 py-3 font-medium transition-all hover:bg-[var(--card-hover)] sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
              </motion.div>
            </div>

            {/* Terminal Prompt */}
            <div className="terminal-line pt-4">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command animate-pulse">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
