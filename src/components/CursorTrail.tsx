"use client";

import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addParticle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setParticles(prev => [...prev.slice(-12), { id, x, y, opacity: 1 }]);
  }, []);

  useEffect(() => {
    // Only show on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    let lastX = 0;
    let lastY = 0;
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only add particle if moved enough distance
      if (distance > 20) {
        lastX = e.clientX;
        lastY = e.clientY;

        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            addParticle(e.clientX, e.clientY);
            ticking = false;
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [addParticle]);

  // Fade out particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.08 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particles.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-[var(--accent)]"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity * 0.6,
            transform: `translate(-50%, -50%) scale(${particle.opacity})`,
            filter: `blur(${(1 - particle.opacity) * 2}px)`,
            boxShadow: `0 0 ${8 * particle.opacity}px var(--accent)`,
          }}
        />
      ))}
    </div>
  );
}
