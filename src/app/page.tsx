"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
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

  return (
    <SmoothScroll>
      <Navigation onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <main>
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Blog />
        <Contact />
      </main>

      <Footer />

      <Chatbot
        externalOpen={isChatOpen}
        onExternalOpenChange={setIsChatOpen}
      />
    </SmoothScroll>
  );
}
