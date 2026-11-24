"use client";

import React from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative p-2 rounded-full border border-antique-gold/30 hover:border-antique-gold text-muted-gold transition-colors focus:outline-none focus:ring-1 focus:ring-antique-gold ${className}`}
      title={`Switch to ${resolvedTheme === "dark" ? "Paper / Light" : "Archive / Dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-warm-gold hover:text-amber-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-sepia-brown hover:text-archive-black transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
