import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  getPhotoBySlug,
  getRelatedPhotos,
  getRelatedStories,
  getCategoryBySlug,
  getEraBySlug,
  getPhotos,
} from "@/lib/data";
import { PhotoViewer } from "@/components/archive/photo-viewer";
import { PhotoCard } from "@/components/archive/photo-card";
import { StoryCard } from "@/components/stories/story-card";
import { ShareButtons } from "@/components/archive/share-buttons";
import {
  Calendar,
  MapPin,
  Camera,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  BookOpen,
  Eye,
} from "lucide-react";

interface PhotoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PhotoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = await getPhotoBySlug(slug);
  if (!photo) return { title: "Photograph Not Found" };

  return {
    title: `${photo.title} (${photo.datePhotographed})`,
    description: photo.shortDescription,
    openGraph: {
      title: `${photo.title} | The Forgotten Album`,
      description: photo.shortDescription,
      images: [{ url: photo.imageUrl }],
    },
  };
}

export default async function PhotoDetailPage({ params }: PhotoDetailPageProps) {
  const { slug } = await params;
  const photo = await getPhotoBySlug(slug);

  if (!photo) {
    notFound();
  }

  const [relatedPhotos, relatedStories, allPhotosResult] = await Promise.all([
    getRelatedPhotos(photo.id, 4),
    getRelatedStories(photo.id, 2),
    getPhotos({ limit: 100 }),
  ]);

  // Previous and next photo navigation
  const allPhotos = allPhotosResult.photos;
  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
  const nextPhoto = currentIndex >= 0 && currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Next/Prev Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-amber-500">Home</Link>
          <span>/</span>
          <Link href="/archive" className="hover:text-amber-500">Archive</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] truncate max-w-xs">{photo.title}</span>
        </nav>

        <div className="flex items-center gap-3 text-xs font-mono">
          {prevPhoto && (
            <Link
              href={`/archive/${prevPhoto.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border-color)] hover:border-amber-500 text-[var(--text-primary)] transition-colors"
              title={prevPhoto.title}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Photograph</span>
            </Link>
          )}
          {nextPhoto && (
            <Link
              href={`/archive/${nextPhoto.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border-color)] hover:border-amber-500 text-[var(--text-primary)] transition-colors"
              title={nextPhoto.title}
            >
              <span>Next Photograph</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Full-width Archival Image Viewer with Zoom & Fullscreen */}
      <section className="space-y-4">
        <PhotoViewer
          imageUrl={photo.imageUrl}
          title={photo.title}
          attribution={photo.attribution}
          sourceUrl={photo.sourceUrl}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[var(--text-muted)] font-mono gap-2 px-1">
          <span>Click fullscreen icon or zoom controls for high-resolution inspection</span>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>{photo.viewCount.toLocaleString()} Archival Views</span>
          </div>
        </div>
      </section>

      {/* Main Details and Provenance Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Photograph Narrative and Captions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded">
                <Calendar className="w-3.5 h-3.5" />
                {photo.datePhotographed} ({photo.datePrecision})
              </span>
              <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded">
                <MapPin className="w-3.5 h-3.5" />
                {photo.location}, {photo.country}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              {photo.title}
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-base text-[var(--text-primary)] leading-relaxed space-y-4">
            <p className="text-lg font-light italic text-[var(--text-muted)] border-l-2 border-amber-500 pl-4">
              {photo.shortDescription}
            </p>
            <p className="leading-relaxed">
              {photo.caption}
            </p>
          </div>

          {/* Social Share Controls */}
          <div className="pt-6 border-t border-[var(--border-color)]">
            <ShareButtons title={photo.title} slug={photo.slug} />
          </div>

          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Tags:</span>
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Historical Provenance & Archival Registry */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4 shadow-sm">
            <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5 pb-2 border-b border-[var(--border-color)]">
              <Shield className="w-4 h-4" />
              <span>Provenance & Attribution</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <p className="text-[var(--text-muted)] uppercase text-[10px]">Photographer / Studio</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5">{photo.photographer}</p>
              </div>

              <div>
                <p className="text-[var(--text-muted)] uppercase text-[10px]">Archival Repository</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5">{photo.sourceName}</p>
              </div>

              <div>
                <p className="text-[var(--text-muted)] uppercase text-[10px]">License & Copyright</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5 text-emerald-500">{photo.license}</p>
                {photo.copyrightNotes && (
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{photo.copyrightNotes}</p>
                )}
              </div>

              <div>
                <p className="text-[var(--text-muted)] uppercase text-[10px]">Attribution Record</p>
                <p className="font-medium text-[var(--text-primary)] mt-0.5 text-[11px] leading-relaxed">
                  {photo.attribution}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={photo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-600/15 hover:bg-amber-600/25 text-amber-700 dark:text-amber-300 text-xs w-full justify-center transition-colors border border-amber-600/30"
                >
                  <span>Verify with Source Archive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Historical Stories */}
      {relatedStories.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <h3 className="font-display text-xl font-bold">Related Editorial Essays</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* Related Archive Photographs */}
      {relatedPhotos.length > 0 && (
        <section className="pt-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <h3 className="font-display text-xl font-bold">Related Archival Photographs</h3>
            </div>
            <Link href="/archive" className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline">
              Explore All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPhotos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
