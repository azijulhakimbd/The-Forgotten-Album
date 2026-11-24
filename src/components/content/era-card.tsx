import React from "react";
import Link from "next/link";
import { Era } from "@/types";
import { formatYear } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function EraCard({ era }: { era: Era }) {
  return (
    <Link
      href={`/eras/${era.slug}`}
      className="group relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden flex flex-col transition-all duration-300 hover:border-amber-600/50 hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
        <img
          src={era.featuredImage}
          alt={era.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[25%] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-amber-300 border border-amber-500/30">
          {formatYear(era.startYear)} – {formatYear(era.endYear)}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {era.name}
          </h3>
          <p className="mt-1.5 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {era.description}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
          <span>Explore Era</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
