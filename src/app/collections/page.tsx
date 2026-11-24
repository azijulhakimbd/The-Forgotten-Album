import React from "react";
import { Metadata } from "next";
import { getCollections } from "@/lib/data";
import { CollectionCard } from "@/components/content/collection-card";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Themed Historical Photo Collections",
  description: "Curated archival portfolios assembling rare photographs around compelling themes and bygone ways of life.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Portfolios</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Themed Collections
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Thematic groupings exploring lost urban thoroughfares, portraits of historic personalities, everyday life one hundred years ago, and moments that altered the destiny of nations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>
    </div>
  );
}
