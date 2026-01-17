"use client";

import { useState } from "react";
import Image from "next/image";

export function ProfileAvatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500 scale-110" />

      {/* Image container with creative shape */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
        {/* Normal photo */}
        <Image
          src="/images/profile/daffa_2.jpg"
          alt="Daffa Albari"
          fill
          className={`object-cover transition-all duration-700 ease-in-out ${
            isHovered ? "opacity-0 scale-110 rotate-3" : "opacity-100 scale-100 rotate-0"
          }`}
          priority
        />

        {/* Ghibli art style */}
        <Image
          src="/images/profile/ghibli_art.jpg"
          alt="Daffa Albari - Ghibli Style"
          fill
          className={`object-cover transition-all duration-700 ease-in-out ${
            isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-3"
          }`}
          priority
        />
      </div>
    </div>
  );
}
