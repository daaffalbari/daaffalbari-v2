"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <footer className="border-t border-[var(--card-border)]">
      <div className="container">
        <div className="flex flex-col items-center gap-6 py-10">
          {/* Name */}
          <p className="text-lg font-semibold text-[var(--foreground)]">
            {personalInfo.name}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.icon] || Github;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground-muted)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center gap-1 text-xs text-[var(--foreground-muted)]">
            <p>© {currentYear} All rights reserved</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" /> in Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
