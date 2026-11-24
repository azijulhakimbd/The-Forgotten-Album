import React from "react";
import { Metadata } from "next";
import { getPhotos, getCategories, getEras } from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { PhotoFilters } from "@/components/archive/photo-filters";
import { Landmark, Compass } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Historical Photo Archive",
  description:
    "Explore our verified historical photography archive spanning the 19th and 20th centuries. Preserving public domain photographic heritage.",
};

interface ArchivePageProps {
  searchParams: Promise<{
    category?: string;
    era?: string;
    sort?: "latest" | "oldest" | "most_viewed" | "alphabetical";
    q?: string;
    page?: string;
  }>;
}

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1", 10);
  const categoryId = resolvedParams.category || undefined;
  const eraId = resolvedParams.era || undefined;
  const sortBy = resolvedParams.sort || "latest";
  const search = resolvedParams.q || undefined;

  const [categories, eras, { photos, total, totalPages }] = await Promise.all([
    getCategories(),
    getEras(),
    getPhotos({
      categoryId,
      eraId,
      sortBy,
      search,
      page,
      limit: 12,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <FadeIn distance={20}>
        <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Landmark className="w-3.5 h-3.5" />
            <span>Curated Photography Archive</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            The Historical Archive
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Browse authentic photographs documenting human triumph, scientific awakening, lost cities, and everyday life across two centuries.
          </p>
        </div>
      </FadeIn>

      {/* Filter and Search Controls */}
      <React.Suspense fallback={<div className="h-16 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] animate-pulse" />}>
        <PhotoFilters categories={categories} eras={eras} />
      </React.Suspense>

      {/* Photo Gallery Grid */}
      {photos.length === 0 ? (
        <div className="py-20 text-center rounded-xl border border-dashed border-[var(--border-color)] p-8 space-y-4">
          <Compass className="w-10 h-10 text-[var(--text-muted)] mx-auto animate-spin-slow" />
          <h3 className="font-display text-xl font-semibold">No photographs matched your criteria</h3>
          <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
            Try adjusting your category, era, or search query to find archival items.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>
              Showing {photos.length} of {total} historical photographs
            </span>
            <span>Page {page} of {totalPages}</span>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <StaggerItem key={photo.id}>
                <PhotoCard photo={photo} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8 border-t border-[var(--border-color)] font-mono text-xs">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === page;
                return (
                  <a
                    key={p}
                    href={`/archive?page=${p}${categoryId ? `&category=${categoryId}` : ""}${eraId ? `&era=${eraId}` : ""}${sortBy ? `&sort=${sortBy}` : ""}${search ? `&q=${encodeURIComponent(search)}` : ""}`}
                    className={`px-3.5 py-1.5 rounded border transition-colors ${
                      isCurrent
                        ? "bg-amber-600 text-stone-950 font-bold border-amber-600"
                        : "border-[var(--border-color)] hover:border-amber-500 text-[var(--text-primary)]"
                    }`}
                  >
                    {p}
                  </a>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
