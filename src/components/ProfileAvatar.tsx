"use client";

import { useState } from "react";
import Image from "next/image";

export function ProfileAvatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <figure
      className="relative m-0 inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-[12rem] w-[12rem] overflow-hidden border border-[var(--color-rule)] sm:h-[13rem] sm:w-[13rem]"
        style={{ borderRadius: "2px" }}
      >
        <Image
          src="/images/profile/daffa_2.jpg"
          alt="Daffa Albari"
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 0 : 1 }}
          priority
        />
        <Image
          src="/images/profile/ghibli_art.jpg"
          alt="Daffa Albari, illustrated"
          fill
          className="object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
          priority
        />
      </div>
      <figcaption
        className="mt-[var(--space-xs)] font-[var(--font-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
      >
        Plate I · The author
      </figcaption>
    </figure>
  );
}
