import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getEraBySlug, getEras, getPhotos, getStories, getEvents } from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { StoryCard } from "@/components/stories/story-card";
import { formatYear } from "@/lib/utils";
import { ArrowLeft, Calendar, Compass, Layers, BookOpen } from "lucide-react";

interface EraDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const eras = await getEras();
  return eras.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: EraDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const era = await getEraBySlug(slug);
  if (!era) return { title: "Era Not Found" };

  return {
    title: `${era.name} (${formatYear(era.startYear)} – ${formatYear(era.endYear)})`,
    description: era.description,
  };
}

export default async function EraDetailPage({ params }: EraDetailPageProps) {
  const { slug } = await params;
  const era = await getEraBySlug(slug);

  if (!era) {
    notFound();
  }

  const [{ photos }, { stories }, allEvents] = await Promise.all([
    getPhotos({ eraId: era.id, limit: 12 }),
    getStories({ eraId: era.id, limit: 6 }),
    getEvents(),
  ]);

  const eraEvents = allEvents.filter((e) => e.eraId === era.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 pb-8 border-b border-[var(--border-color)]">
        <Link
          href="/eras"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Eras</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Epoch: {formatYear(era.startYear)} – {formatYear(era.endYear)}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              {era.name}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {era.description}
            </p>
          </div>
          <div className="md:col-span-4 aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/40">
            <img
              src={era.featuredImage}
              alt={era.name}
              className="w-full h-full object-cover filter grayscale-[20%]"
            />
          </div>
        </div>
      </div>

      {/* Featured Historical Events in this Era */}
      {eraEvents.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Chronological Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eraEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    {ev.eventDate}
                  </span>
                  <h3 className="font-display text-lg font-bold mt-1">{ev.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1">{ev.summary}</p>
                </div>
                <Link
                  href={`/timeline?event=${ev.slug}`}
                  className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline pt-2"
                >
                  View on Timeline →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Photographs from this Era */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Photographs from {era.name}</h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {photos.length} item{photos.length !== 1 ? "s" : ""}
          </span>
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] py-6 italic">No photographs currently indexed for this era.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        )}
      </section>

      {/* Stories from this Era */}
      {stories.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Featured Essays from this Epoch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
