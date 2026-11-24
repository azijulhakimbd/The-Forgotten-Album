import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPlaceBySlug, getPhotos, getStories } from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { StoryCard } from "@/components/stories/story-card";
import { ArrowLeft, MapPin, Layers, BookOpen, Compass } from "lucide-react";

interface PlaceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PlaceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);
  if (!place) return { title: "Place Not Found" };

  return {
    title: `${place.name} (${place.country})`,
    description: place.description,
  };
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  const [{ photos }, { stories }] = await Promise.all([
    getPhotos({ placeId: place.id, limit: 12 }),
    getStories({ limit: 4 }),
  ]);

  const relatedStories = stories.filter((s) => s.placeId === place.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link
        href="/places"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All Places</span>
      </Link>

      {/* Main Place Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-lg">
        <div className="md:col-span-5 aspect-[16/10] md:aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-[var(--border-color)]">
          <img
            src={place.coverImage}
            alt={place.name}
            className="w-full h-full object-cover filter grayscale-[15%]"
          />
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-amber-600 dark:text-amber-400">
            <span className="bg-amber-500/10 px-2.5 py-0.5 rounded flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {place.country}{place.region ? `, ${place.region}` : ""}
            </span>
            {place.historicalName && (
              <span className="bg-amber-500/10 px-2.5 py-0.5 rounded">
                Ancient: {place.historicalName}
              </span>
            )}
            {place.latitude && (
              <span className="bg-amber-500/10 px-2.5 py-0.5 rounded">
                Coords: {place.latitude}° N, {place.longitude}° E
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            {place.name}
          </h1>

          <div className="prose prose-invert max-w-none text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-light space-y-4 pt-2">
            <p className="leading-relaxed whitespace-pre-line">
              {place.description}
            </p>
          </div>
        </div>
      </div>

      {/* Photographs of this Place */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Photographs of {place.name}</h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">{photos.length} item{photos.length !== 1 ? "s" : ""}</span>
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] py-6 italic">No specific photographs individually linked to this place yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        )}
      </section>

      {/* Stories about this Place */}
      {relatedStories.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Historical Essays on {place.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
