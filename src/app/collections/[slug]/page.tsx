import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getCollectionBySlug, getCollections, getPhotos } from "@/lib/data";
import { PhotoCard } from "@/components/archive/photo-card";
import { ArrowLeft, Layers, ShieldCheck } from "lucide-react";

interface CollectionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.title} Portfolio`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const { photos } = await getPhotos({ collectionSlug: collection.slug, limit: 24 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 pb-8 border-b border-[var(--border-color)]">
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Collections</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Curated Portfolio
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              {collection.title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {collection.description}
            </p>
          </div>
          <div className="md:col-span-4 aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/40">
            <img
              src={collection.coverImage}
              alt={collection.title}
              className="w-full h-full object-cover filter grayscale-[20%]"
            />
          </div>
        </div>
      </div>

      {/* Collection Gallery */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h2 className="font-display text-2xl font-bold">Photographs in this Collection</h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {photos.length} item{photos.length !== 1 ? "s" : ""}
          </span>
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] py-6 italic">No photographs currently assigned to this collection.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
