"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MessageCircle } from "lucide-react";

type PetState = "idle" | "walk" | "lie" | "swipe";

interface PixelPetProps {
  onChatClick?: () => void;
}

export function PixelPet({ onChatClick }: PixelPetProps) {
  const [petState, setPetState] = useState<PetState>("idle");
  const [position, setPosition] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const walkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sprites: Record<PetState, string> = {
    idle: "/images/pets/gray_idle_8fps.gif",
    walk: "/images/pets/gray_walk_8fps.gif",
    lie: "/images/pets/gray_lie_8fps.gif",
    swipe: "/images/pets/gray_swipe_8fps.gif",
  };

  // Handle click to walk
  const handleClick = useCallback(() => {
    if (isWalking) return;

    setIsWalking(true);
    setPetState("walk");

    // Small random movement
    const distance = 15 + Math.random() * 25;
    const goRight = Math.random() > 0.5;

    setPosition(prev => {
      const newPos = goRight ? prev + distance : prev - distance;
      return Math.max(-60, Math.min(60, newPos));
    });

    // Stop walking after animation
    walkTimeoutRef.current = setTimeout(() => {
      setIsWalking(false);
      setPetState("idle");
    }, 1200);
  }, [isWalking]);

  // Random idle behaviors
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isWalking && Math.random() > 0.75) {
        const actions: PetState[] = ["lie", "swipe"];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setPetState(randomAction);

        setTimeout(() => {
          if (!isWalking) {
            setPetState("idle");
          }
        }, 2500);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isWalking]);

  // Toggle bubble visibility periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBubble(prev => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (walkTimeoutRef.current) {
        clearTimeout(walkTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      {/* Chat Bubble */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500 z-20 ${
          showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <button
          onClick={onChatClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--card)] border border-[var(--card-border)] rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer shadow-lg"
        >
          <MessageCircle className="w-3 h-3" />
          <span>Chat with Abel!</span>
        </button>
        {/* Bubble tail */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-[var(--card)] border-r border-b border-[var(--card-border)] rotate-45" />
      </div>

      {/* Totoro */}
      <div
        onClick={handleClick}
        className="cursor-pointer hover:scale-110 transition-transform"
        style={{
          transform: `translateX(${position}px)`,
          transition: isWalking ? "transform 1.2s ease-in-out" : "none",
        }}
      >
        <img
          src={sprites[petState]}
          alt="Totoro pet"
          className="pixel-art w-14 h-14 sm:w-16 sm:h-16"
          draggable={false}
        />
      </div>
    </div>
  );
}
