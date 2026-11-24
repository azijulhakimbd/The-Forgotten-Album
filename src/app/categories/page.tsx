import React from "react";
import { Metadata } from "next";
import { getCategories } from "@/lib/data";
import { CategoryCard } from "@/components/content/category-card";
import { Layers } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Archival Categories",
  description: "Browse historical photographs and essays organized across twelve distinct historical categories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <FadeIn distance={20}>
        <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Curatorial Taxonomy</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Archival Categories
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            From ancient stone monuments and forgotten trade routes to the pioneers of early aviation and laboratory chemistry.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <StaggerItem key={cat.id}>
            <CategoryCard category={cat} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
