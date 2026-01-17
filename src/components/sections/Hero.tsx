"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { NeuralNetwork } from "@/components/NeuralNetwork";
import { PixelPet } from "@/components/PixelPet";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ThemeDecoration } from "@/components/ThemeDecoration";
import { personalInfo, socialLinks } from "@/lib/data";

const roles = ["AI Engineer", "LLM Specialist", "ML Engineer"];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Hello night owl";
}

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [greeting, setGreeting] = useState("Hello");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Set greeting on mount (client-side only)
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* Floating pet decorations */}
      <motion.div
        className="absolute top-28 right-[12%] hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/images/pets/cockatiel_idle.gif"
          alt="Cockatiel"
          className="pixel-art w-12 h-12 opacity-80"
          draggable={false}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[8%] hidden lg:block"
        animate={{ y: [0, 12, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <img
          src="/images/pets/duck_idle.gif"
          alt="Rubber Duck"
          className="pixel-art w-10 h-10 opacity-80"
          draggable={false}
        />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-[6%] hidden xl:block"
        animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <img
          src="/images/pets/crab_idle.gif"
          alt="Crab"
          className="pixel-art w-10 h-10 opacity-70"
          draggable={false}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity, y }} className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* Left side - Avatar & Totoro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex flex-col items-center"
          >
            {/* Moon/Clouds above photo */}
            <div className="absolute -top-16 -left-20">
              <ThemeDecoration />
            </div>

            <ProfileAvatar />

            {/* Totoro below avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4"
            >
              <PixelPet onChatClick={onOpenChat} />
            </motion.div>
          </motion.div>

          {/* Right side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--card)] border border-[var(--card-border)] px-4 py-2"
            >
              <span className="text-lg">👋</span>
              <span className="text-sm text-[var(--foreground-muted)]">{greeting}!</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2"
            >
              I&apos;m <span className="gradient-text-animated">Daffa Albari</span>
            </motion.h1>

            {/* Typewriter Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 h-8"
            >
              <span className="font-mono text-base sm:text-lg text-[var(--accent)]">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-5 inline-flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]"></span>
              </span>
              <span className="text-sm text-[var(--accent-green)]">
                Open for creative collaborations
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6 text-[var(--foreground-muted)] text-sm sm:text-base leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-all hover:shadow-lg hover:shadow-[var(--accent)]/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Chat
                <span>💬</span>
              </motion.a>

              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium transition-all hover:border-[var(--accent)]/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                See My Work
                <span>✨</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map((link) => {
                const Icon =
                  socialIcons[link.icon as keyof typeof socialIcons] || Github;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--card-border)] text-[var(--foreground-muted)] transition-all hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
