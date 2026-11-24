import React from "react";
import Link from "next/link";
import {
  getCategories,
  getEras,
  getPersonalities,
  getCollections,
  getPhotos,
  getStories,
  getEvents,
} from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { StoryCard } from "@/components/stories/story-card";
import { CategoryCard } from "@/components/content/category-card";
import { EraCard } from "@/components/content/era-card";
import { PersonalityCard } from "@/components/content/personality-card";
import { CollectionCard } from "@/components/content/collection-card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { generateOrganizationSchema } from "@/lib/seo/json-ld";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Calendar,
  MapPin,
  Camera,
  Layers,
  BookOpen,
  History,
  CheckCircle2,
} from "lucide-react";

export default async function HomePage() {
  const [
    categories,
    eras,
    personalities,
    collections,
    photoData,
    storyData,
    events,
  ] = await Promise.all([
    getCategories(),
    getEras(),
    getPersonalities(),
    getCollections(),
    getPhotos({ limit: 8, featured: true }),
    getStories({ limit: 4 }),
    getEvents(),
  ]);

  // Featured photograph (Wright Brothers Flight or Enduring Artifact)
  const featuredPhoto = photoData.photos[0] || null;
  // Today's historical moment
  const todaysMoment = events[0] || null;
  // Lead story
  const leadStory = storyData.stories[0] || null;
  const recentStories = storyData.stories.slice(1, 4);
  const orgJsonLd = generateOrganizationSchema();

  return (
    <div className="flex flex-col w-full space-y-24 sm:space-y-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* 5B. Cinematic Hero Section */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[var(--border-color)]">
        {/* Full-width Background Historical Photograph with parallax style */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=90"
            alt="Historical aviation milestone at Kitty Hawk"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-125 scale-105 animate-pulse-slow"
          />
          {/* Layered dark archival overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
          <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Historical Archive & Curatorial Magazine</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
            History is never truly <span className="text-amber-400 italic">forgotten.</span>
          </h1>

          <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore extraordinary photographs, untold stories, and moments that shaped our world. A museum archive preserved for the future.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/archive"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Explore the Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/stories"
              className="w-full sm:w-auto px-8 py-3.5 rounded border border-amber-400/40 hover:border-amber-400 bg-black/40 hover:bg-black/60 text-white font-medium text-sm transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Discover Stories</span>
            </Link>
          </div>

          {/* Quick Museum Stats Counter */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-stone-300 text-xs font-mono">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display">1838–2000</p>
              <p className="text-stone-400">Chronological Span</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display">12</p>
              <p className="text-stone-400">Curated Categories</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display">10</p>
              <p className="text-stone-400">Historical Eras</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display">100%</p>
              <p className="text-stone-400">Public Domain Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5C. Featured Photograph of the Era */}
      {featuredPhoto && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
                Curatorial Showcase
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
                Featured Historical Photograph
              </h2>
            </div>
            <Link
              href="/archive"
              className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View all archives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-xl">
            <div className="lg:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 group">
              <img
                src={featuredPhoto.imageUrl}
                alt={featuredPhoto.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded bg-black/75 backdrop-blur-sm text-xs font-mono text-amber-300 border border-amber-500/20">
                {featuredPhoto.datePhotographed}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {featuredPhoto.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-amber-500" />
                  By {featuredPhoto.photographer}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                {featuredPhoto.title}
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {featuredPhoto.caption}
              </p>

              <div className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-muted)] space-y-1 font-mono">
                <p>
                  <strong className="text-[var(--text-primary)]">Source:</strong> {featuredPhoto.sourceName}
                </p>
                <p>
                  <strong className="text-[var(--text-primary)]">License:</strong> {featuredPhoto.license}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href={`/archive/${featuredPhoto.slug}`}
                  className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <span>Examine Photograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/archive`}
                  className="px-5 py-2.5 rounded border border-[var(--border-color)] text-xs font-mono hover:border-amber-500 transition-colors"
                >
                  Browse Gallery
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5D. Today's Historical Moment */}
      {todaysMoment && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative rounded-2xl border border-amber-600/30 bg-gradient-to-r from-amber-950/20 via-stone-900/30 to-amber-950/20 p-6 sm:p-10 overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>On This Date In History • {todaysMoment.eventDate}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">
                  {todaysMoment.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  {todaysMoment.summary}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/timeline?event=${todaysMoment.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                  >
                    <span>Read complete historical event record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-4 aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/40">
                <img
                  src={todaysMoment.coverImage}
                  alt={todaysMoment.title}
                  className="w-full h-full object-cover filter grayscale-[20%]"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5E. Explore the Archive Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Taxonomy of the Past
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Explore the Archive
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>All 12 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 5F. Featured Stories (Historical Editorial System) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              The Historical Magazine
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Featured Stories & Essays
            </h2>
          </div>
          <Link
            href="/stories"
            className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Browse all stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-8">
          {leadStory && <StoryCard story={leadStory} featured={true} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* 5G. Explore by Era */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Chronological Epochs
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Explore by Era
            </h2>
          </div>
          <Link
            href="/eras"
            className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View all 10 Eras</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eras.slice(0, 8).map((era) => (
            <EraCard key={era.id} era={era} />
          ))}
        </div>
      </section>

      {/* 5H. Historical Personalities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Biographical Pantheon
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Historical Personalities
            </h2>
          </div>
          <Link
            href="/personalities"
            className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>All Personalities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {personalities.slice(0, 6).map((personality) => (
            <PersonalityCard key={personality.id} personality={personality} />
          ))}
        </div>
      </section>

      {/* 5I. Photo Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Thematic Visual Archives
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Photo Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      {/* 5J. Elegant Newsletter Subscription Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-amber-600/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto">
            <History className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              History deserves to be remembered.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto">
              Receive remarkable photographs and forgotten stories from the past delivered directly to your inbox every Sunday.
            </p>
          </div>

          <NewsletterForm />

          <p className="text-[11px] text-[var(--text-muted)] font-mono">
            No spam. Strictly public domain archives & verified historical narratives. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
