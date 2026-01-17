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
  Moon,
  Sun,
  Github,
  Linkedin,
  Terminal,
  Sparkles,
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
    id: "projects",
    label: "Go to Projects",
    icon: FolderKanban,
    action: () => (window.location.hash = "#projects"),
    group: "Navigation",
  },
  {
    id: "achievements",
    label: "Go to Achievements",
    icon: Trophy,
    action: () => (window.location.hash = "#achievements"),
    group: "Navigation",
  },
  {
    id: "blog",
    label: "Go to Blog",
    icon: BookOpen,
    action: () => (window.location.hash = "#blog"),
    group: "Navigation",
  },
  {
    id: "contact",
    label: "Go to Contact",
    icon: Mail,
    action: () => (window.location.hash = "#contact"),
    group: "Navigation",
  },
  {
    id: "github",
    label: "Open GitHub",
    icon: Github,
    action: () => window.open("https://github.com/daaffalbari", "_blank"),
    group: "Links",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn",
    icon: Linkedin,
    action: () =>
      window.open("https://www.linkedin.com/in/daaffalbari/", "_blank"),
    group: "Links",
  },
  {
    id: "hire",
    label: "sudo hire-me",
    icon: Terminal,
    action: () => (window.location.hash = "#contact"),
    group: "Easter Eggs",
  },
  {
    id: "magic",
    label: "Cast a spell",
    icon: Sparkles,
    action: () => {
      document.body.style.transition = "filter 0.5s";
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 2000);
    },
    group: "Easter Eggs",
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
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredCommands, selectedIndex]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="cmd-overlay"
            onClick={onClose}
          >
            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="cmd-palette mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-[var(--card-border)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--foreground-muted)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-[var(--foreground-muted)]"
                />
                <kbd className="rounded bg-[var(--card-hover)] px-2 py-0.5 text-xs text-[var(--foreground-muted)]">
                  ESC
                </kbd>
              </div>

              {/* Commands */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {Object.entries(groupedCommands).map(([group, cmds]) => (
                  <div key={group} className="mb-2">
                    <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-[var(--foreground-muted)]">
                      {group}
                    </div>
                    {cmds.map((cmd) => {
                      const currentIndex = flatIndex++;
                      const Icon = cmd.icon;
                      return (
                        <motion.button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                            selectedIndex === currentIndex
                              ? "bg-[var(--card-hover)] text-[var(--foreground)]"
                              : "text-[var(--foreground-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
                          )}
                          whileHover={{ x: 2 }}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{cmd.label}</span>
                          {selectedIndex === currentIndex && (
                            <ArrowRight className="h-4 w-4 text-[var(--accent-cyan)]" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}

                {filteredCommands.length === 0 && (
                  <div className="py-8 text-center text-[var(--foreground-muted)]">
                    No commands found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-[var(--card-border)] px-4 py-2.5 text-xs text-[var(--foreground-muted)]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-[var(--card-hover)] px-1.5 py-0.5">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-[var(--card-hover)] px-1.5 py-0.5">
                      ↵
                    </kbd>
                    Select
                  </span>
                </div>
                <span>⌘K to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
