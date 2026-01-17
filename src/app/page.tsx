"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorTrail } from "@/components/CursorTrail";
import { Chatbot } from "@/components/Chatbot";
import {
  Hero,
  About,
  Experience,
  Projects,
  Achievements,
  Blog,
  Contact,
} from "@/components/sections";

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for page loader to finish
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <SmoothScroll>
      <CursorTrail />
      <Navigation onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero onOpenChat={handleOpenChat} />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Blog />
        <Contact />
      </motion.main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>

      <Chatbot
        externalOpen={isChatOpen}
        onExternalOpenChange={setIsChatOpen}
      />
    </SmoothScroll>
  );
}
