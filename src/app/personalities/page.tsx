import React from "react";
import { Metadata } from "next";
import { getPersonalities } from "@/lib/data";
import { PersonalityCard } from "@/components/content/personality-card";
import { User } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Historical Personalities & Figures",
  description: "Portraits and biographies of inventors, abolitionists, leaders, physicists, and rebels who transformed civilizations.",
};

export default async function PersonalitiesPage() {
  const personalities = await getPersonalities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <FadeIn distance={20}>
        <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <User className="w-3.5 h-3.5" />
            <span>Biographical Pantheon</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Historical Figures
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Intimate encounters with the pioneers, thinkers, leaders, and courageous dissidents whose decisions and discoveries altered the arc of world history.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {personalities.map((p) => (
          <StaggerItem key={p.id}>
            <PersonalityCard personality={p} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
