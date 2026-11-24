import React from "react";
import { Metadata } from "next";
import { getPlaces } from "@/lib/data";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lost Places, Cities & Historic Landmarks",
  description: "Ruins, lost citadels, ancient temples, and iconic historic architecture documented across five continents.",
};

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>Geographical Topography</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Lost Places & Landmarks
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          From the rock-cut canyons of Petra and the cloud-shrouded terraces of Machu Picchu to the ancient submerged avenues of Alexandria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <Link
            key={place.id}
            href={`/places/${place.slug}`}
            className="group relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden flex flex-col transition-all duration-300 hover:border-amber-600/50 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
              <img
                src={place.coverImage}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{place.country}</span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {place.name}
                </h3>
                {place.historicalName && (
                  <p className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                    Ancient name: {place.historicalName}
                  </p>
                )}
                <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
                <span>View Place Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
