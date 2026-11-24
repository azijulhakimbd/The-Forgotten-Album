"use client";

import React from "react";
import Link from "next/link";
import { Personality } from "@/types";
import { ArrowRight } from "lucide-react";
import { motion } from "@/components/ui/motion";

export function PersonalityCard({ personality }: { personality: Personality }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/personalities/${personality.slug}`}
        className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden flex flex-col transition-colors duration-300 hover:border-amber-600/50 hover:shadow-xl h-full block"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
          <img
            src={personality.portraitImage}
            alt={personality.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          {personality.nationality && (
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-amber-300 border border-amber-500/20">
              {personality.nationality}
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-base text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {personality.name}
            </h3>
            {(personality.birthDate || personality.deathDate) && (
              <p className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                {personality.birthDate?.substring(0, 4)} – {personality.deathDate?.substring(0, 4) || "Present"}
              </p>
            )}
            <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              {personality.biography}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
            <span>Biography</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
