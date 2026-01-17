"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personalInfo, socialLinks, navLinks } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background-secondary)]">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 font-semibold">{personalInfo.name}</div>
            <p className="mb-4 text-sm text-[var(--foreground-muted)]">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon =
                  link.icon === "github"
                    ? Github
                    : link.icon === "linkedin"
                      ? Linkedin
                      : Mail;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--card-border)] text-[var(--foreground-muted)] transition-colors hover:border-[var(--card-border-hover)] hover:text-[var(--foreground)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-3 text-sm font-medium">Navigation</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-3 text-sm font-medium">Contact</div>
            <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-between border-t border-[var(--card-border)] pt-8">
          <p className="text-xs text-[var(--foreground-muted)]">
            © {currentYear} {personalInfo.name}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Back to top
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
