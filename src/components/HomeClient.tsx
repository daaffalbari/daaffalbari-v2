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
import type { ProjectMeta } from "@/lib/projects";
import type { PostListItem } from "@/lib/blog";

export function HomeClient({
  projects,
  cmsPosts,
}: {
  projects: ProjectMeta[];
  cmsPosts: PostListItem[];
}) {
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
        <Projects projects={projects} />
        <Achievements />
        <Blog cmsPosts={cmsPosts} />
        <Contact />
      </main>

      <Footer />

      <Chatbot externalOpen={isChatOpen} onExternalOpenChange={setIsChatOpen} />
    </SmoothScroll>
  );
}
