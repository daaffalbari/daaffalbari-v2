"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeDecoration() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme !== "light");
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (isDark) {
    // Moon with stars for dark mode
    return (
      <div className="relative pointer-events-none flex justify-center">
        {/* Stars */}
        <motion.div
          className="absolute -top-2 -left-6"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-yellow-200 text-xs">✦</span>
        </motion.div>
        <motion.div
          className="absolute top-6 -left-8"
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="text-yellow-200 text-sm">✦</span>
        </motion.div>
        <motion.div
          className="absolute -top-1 right-[-20px]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="text-yellow-200 text-xs">✦</span>
        </motion.div>

        {/* Moon */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Moon glow */}
          <div className="absolute inset-0 bg-yellow-200/20 rounded-full blur-xl scale-150" />

          {/* Moon body */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-lg shadow-yellow-200/30">
            {/* Moon craters */}
            <div className="absolute top-2 left-3 w-2 h-2 rounded-full bg-yellow-300/40" />
            <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-yellow-300/30" />
            <div className="absolute top-4 left-7 w-1 h-1 rounded-full bg-yellow-300/30" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Clouds for light mode - using soft blue/gray tones
  return (
    <div className="relative pointer-events-none flex justify-center">
      {/* Small cloud left */}
      <motion.div
        animate={{
          x: [0, -5, 0],
          y: [0, 2, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-8 top-2"
      >
        <div className="flex items-end opacity-60 drop-shadow-sm">
          <div className="w-6 h-4 bg-sky-200/70 rounded-full" />
          <div className="w-8 h-5 bg-sky-100/80 rounded-full -ml-2" />
        </div>
      </motion.div>

      {/* Main cloud */}
      <motion.div
        animate={{
          x: [0, 5, 0],
          y: [0, -4, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="flex items-end drop-shadow-md">
          <div className="w-8 h-5 bg-sky-200/80 rounded-full" />
          <div className="w-12 h-8 bg-sky-100/90 rounded-full -ml-3" />
          <div className="w-7 h-5 bg-sky-200/80 rounded-full -ml-2" />
        </div>
      </motion.div>

      {/* Small cloud right */}
      <motion.div
        animate={{
          x: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-6 top-1"
      >
        <div className="flex items-end opacity-50 drop-shadow-sm">
          <div className="w-5 h-3 bg-sky-200/60 rounded-full" />
          <div className="w-6 h-4 bg-sky-100/70 rounded-full -ml-2" />
        </div>
      </motion.div>
    </div>
  );
}
