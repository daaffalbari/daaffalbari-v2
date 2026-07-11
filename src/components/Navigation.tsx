"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  onOpenCommandPalette: () => void;
}

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Get in touch" },
];

export function Navigation({ onOpenCommandPalette }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onOpenCommandPalette]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors",
          isScrolled
            ? "border-b border-[var(--color-rule)] bg-[var(--color-paper)]"
            : "border-b border-transparent bg-[var(--color-paper)]/0",
        )}
        style={{ transitionDuration: "var(--dur-base)" }}
      >
        <nav className="page flex h-[var(--nav-height)] items-center justify-between gap-4">
          <a
            href="#"
            className="font-[var(--font-display)] text-base font-medium tracking-tight text-[var(--color-ink)]"
            aria-label="Daffa Albari — home"
          >
            Daffa Albari
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[var(--font-body)] text-sm text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
              </a>
            ))}
            <span
              aria-hidden
              className="h-3 w-px bg-[var(--color-rule)]"
            />
            <button
              onClick={onOpenCommandPalette}
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]"
              aria-label="Open command palette (⌘K)"
            >
              ⌘ K
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex h-9 w-9 items-center justify-center text-[var(--color-ink-2)]"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {isMobileOpen && (
        <div
          className="fixed inset-x-0 top-[var(--nav-height)] z-40 border-b border-[var(--color-rule)] bg-[var(--color-paper)] md:hidden"
        >
          <div className="page py-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-3 font-[var(--font-display)] text-2xl font-medium tracking-tight text-[var(--color-ink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <hr className="my-5 border-0 border-t border-[var(--color-rule)]" />
            <button
              onClick={() => {
                setIsMobileOpen(false);
                onOpenCommandPalette();
              }}
              className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
            >
              ⌘ K — Command palette
            </button>
          </div>
        </div>
      )}
    </>
  );
}
