import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPersonalityBySlug, getPersonalities, getPhotos, getStories } from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { StoryCard } from "@/components/stories/story-card";
import { ArrowLeft, User, Layers, BookOpen, Calendar, MapPin } from "lucide-react";

interface PersonalityDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const personalities = await getPersonalities();
  return personalities.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PersonalityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const personality = await getPersonalityBySlug(slug);
  if (!personality) return { title: "Personality Not Found" };

  return {
    title: `${personality.name} Biography & Photographs`,
    description: personality.biography,
  };
}

export default async function PersonalityDetailPage({ params }: PersonalityDetailPageProps) {
  const { slug } = await params;
  const personality = await getPersonalityBySlug(slug);

  if (!personality) {
    notFound();
  }

  const [{ photos }, { stories }] = await Promise.all([
    getPhotos({ personalityId: personality.id, limit: 12 }),
    getStories({ limit: 4 }),
  ]);

  const relatedStories = stories.filter((s) => s.personalityId === personality.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link
        href="/personalities"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All Personalities</span>
      </Link>

      {/* Main Biography Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-lg">
        <div className="md:col-span-4 aspect-[4/5] rounded-xl overflow-hidden bg-black/40 border border-[var(--border-color)]">
          <img
            src={personality.portraitImage}
            alt={personality.name}
            className="w-full h-full object-cover filter grayscale-[15%]"
          />
        </div>

        <div className="md:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-amber-600 dark:text-amber-400">
            {personality.nationality && (
              <span className="bg-amber-500/10 px-2.5 py-0.5 rounded">
                {personality.nationality}
              </span>
            )}
            {(personality.birthDate || personality.deathDate) && (
              <span className="bg-amber-500/10 px-2.5 py-0.5 rounded flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {personality.birthDate?.substring(0, 4)} – {personality.deathDate?.substring(0, 4) || "Present"}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            {personality.name}
          </h1>

          <div className="prose prose-invert max-w-none text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-light space-y-4 pt-2">
            <p className="leading-relaxed whitespace-pre-line">
              {personality.biography}
            </p>
          </div>
        </div>
      </div>

      {/* Related Archive Photos */}
      {photos.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <h2 className="font-display text-2xl font-bold">Photographic Artifacts</h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">{photos.length} item{photos.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Featured Biographical Essays</h2>
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
