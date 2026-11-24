import React from "react";
import Link from "next/link";
import { Collection } from "@/types";
import { Layers, ArrowRight } from "lucide-react";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden aspect-[16/10] flex flex-col justify-end p-6 transition-all duration-300 hover:border-amber-600/50 hover:shadow-2xl"
    >
      <img
        src={collection.coverImage}
        alt={collection.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/65 to-transparent" />

      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider bg-amber-600/90 text-stone-950 font-bold">
            <Layers className="w-3 h-3" />
            Curated Collection
          </span>
          {collection.photoCount && (
            <span className="text-[11px] font-mono text-amber-300">
              {collection.photoCount} Archives
            </span>
          )}
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
          {collection.title}
        </h3>

        <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed">
          {collection.description}
        </p>

        <div className="pt-2 flex items-center text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
          <span>View Collection</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </Link>
  );
}
