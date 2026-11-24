import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getStories, getCategories } from "@/lib/data";
import { StoryCard } from "@/components/stories/story-card";
import { BookOpen, Sparkles, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Historical Magazine & Editorial Stories",
  description:
    "Long-form historical journalism, photo essays, and biographical investigations uncovering the human stories behind archival photographs.",
};

interface StoriesPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const categoryId = resolvedParams.category || undefined;
  const search = resolvedParams.q || undefined;

  const [categories, { stories, total, totalPages }] = await Promise.all([
    getCategories(),
    getStories({
      categoryId,
      search,
      page,
      limit: 9,
    }),
  ]);

  const leadStory = page === 1 && !categoryId && !search ? stories[0] : null;
  const remainingStories = leadStory ? stories.slice(1) : stories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Forgotten Album Editorial</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Historical Stories & Essays
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Deep dives into pivotal epochs, harrowing expeditions, lost moments, and the extraordinary human figures preserved in archival photographs.
        </p>

        {/* Category Filter Pills */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <Link
            href="/stories"
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              !categoryId
                ? "bg-amber-600 text-stone-950 font-semibold"
                : "border border-[var(--border-color)] text-[var(--text-muted)] hover:border-amber-500"
            }`}
          >
            All Essays
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/stories?category=${c.id}`}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                categoryId === c.id
                  ? "bg-amber-600 text-stone-950 font-semibold"
                  : "border border-[var(--border-color)] text-[var(--text-muted)] hover:border-amber-500"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Lead Story on First Page */}
      {leadStory && (
        <section className="space-y-4">
          <StoryCard story={leadStory} featured={true} />
        </section>
      )}

      {/* Magazine Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>Displaying {stories.length} of {total} historical essays</span>
          <span>Page {page} of {totalPages}</span>
        </div>

        {stories.length === 0 ? (
          <div className="py-16 text-center rounded-xl border border-dashed border-[var(--border-color)] p-8">
            <p className="text-sm text-[var(--text-muted)]">No stories matched your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 border-t border-[var(--border-color)] font-mono text-xs">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/stories?page=${p}${categoryId ? `&category=${categoryId}` : ""}`}
                className={`px-3.5 py-1.5 rounded border transition-colors ${
                  p === page
                    ? "bg-amber-600 text-stone-950 font-bold border-amber-600"
                    : "border-[var(--border-color)] hover:border-amber-500"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
