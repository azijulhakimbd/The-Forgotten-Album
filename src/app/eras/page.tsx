import React from "react";
import { Metadata } from "next";
import { getEras } from "@/lib/data";
import { EraCard } from "@/components/content/era-card";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Historical Eras & Epochs",
  description: "Explore the chronological eras that shaped human history, from the Ancient World to the dawn of the 21st century.",
};

export default async function ErasPage() {
  const eras = await getEras();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Compass className="w-3.5 h-3.5" />
          <span>Chronological Spans</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Historical Eras
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Journey across epochal thresholds: Classical Antiquity, the Renaissance humanist revival, the Industrial Revolution, and the World War era.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eras.map((era) => (
          <EraCard key={era.id} era={era} />
        ))}
      </div>
    </div>
  );
}
