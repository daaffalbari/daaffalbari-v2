"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  FolderKanban,
  Trophy,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  {
    id: "about",
    label: "Go to About",
    icon: User,
    action: () => (window.location.hash = "#about"),
    group: "Navigation",
  },
  {
    id: "experience",
    label: "Go to Experience",
    icon: Briefcase,
    action: () => (window.location.hash = "#experience"),
    group: "Navigation",
  },
  {
    id: "work",
    label: "Go to Selected work",
    icon: FolderKanban,
    action: () => (window.location.hash = "#work"),
    group: "Navigation",
  },
  {
    id: "achievements",
    label: "Go to Awards",
    icon: Trophy,
    action: () => (window.location.hash = "#achievements"),
    group: "Navigation",
  },
  {
    id: "notes",
    label: "Go to Notes",
    icon: BookOpen,
    action: () => (window.location.hash = "#notes"),
    group: "Navigation",
  },
  {
    id: "contact",
    label: "Get in touch",
    icon: Mail,
    action: () => (window.location.hash = "#contact"),
    group: "Navigation",
  },
  {
    id: "github",
    label: "Open GitHub",
    icon: Github,
    action: () => window.open("https://github.com/daaffalbari", "_blank"),
    group: "Elsewhere",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    icon: Linkedin,
    action: () =>
      window.open("https://www.linkedin.com/in/daaffalbari/", "_blank"),
    group: "Elsewhere",
  },
];

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.group]) acc[cmd.group] = [];
      acc[cmd.group].push(cmd);
      return acc;
    },
    {} as Record<string, typeof commands>
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => setSelectedIndex(0), [search]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) =>
          Math.min(i + 1, filteredCommands.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          cmd.action();
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, filteredCommands, selectedIndex]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[var(--color-paper)]/85 pt-[18vh] px-4"
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, delay: 0.04 }}
            className="w-full max-w-[36rem] border border-[var(--color-ink)] bg-[var(--color-paper)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-rule)] px-4 py-3">
              <Search
                className="h-4 w-4 text-[var(--color-ink-3)]"
                strokeWidth={1.5}
              />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or type a command…"
                className="flex-1 bg-transparent font-[var(--font-body)] text-base text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink-3)]"
              />
              <kbd className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                Esc
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-[var(--space-2xs)]">
              {Object.entries(groupedCommands).map(([group, cmds]) => (
                <div key={group} className="py-[var(--space-2xs)]">
                  <div className="px-4 py-[var(--space-2xs)] font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                    {group}
                  </div>
                  {cmds.map((cmd) => {
                    const currentIndex = flatIndex++;
                    const Icon = cmd.icon;
                    const isActive = selectedIndex === currentIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          cmd.action();
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-[0.625rem] text-left transition-colors",
                          isActive
                            ? "bg-[var(--color-paper-2)] text-[var(--color-ink)]"
                            : "text-[var(--color-ink-2)]"
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                        <span className="flex-1 font-[var(--font-body)] text-sm">
                          {cmd.label}
                        </span>
                        {isActive && (
                          <ArrowRight
                            className="h-3.5 w-3.5 text-[var(--color-accent)]"
                            strokeWidth={1.5}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="px-4 py-[var(--space-xl)] text-center text-sm text-[var(--color-ink-3)]">
                  Nothing matches.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--color-rule)] px-4 py-[var(--space-2xs)] font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>⌘ K to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
