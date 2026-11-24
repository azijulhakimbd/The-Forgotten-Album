import React from "react";
import Link from "next/link";
import { Photo } from "@/types";
import { MapPin, Calendar, Eye, Bookmark } from "lucide-react";

export function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <article className="group relative flex flex-col rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden transition-all duration-300 hover:border-amber-600/50 hover:shadow-xl">
      {/* Photograph Image */}
      <Link href={`/archive/${photo.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 block">
        <img
          src={photo.thumbnailUrl || photo.imageUrl}
          alt={photo.altText || photo.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
          loading="lazy"
        />
        {/* Subtle vintage vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Date badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-amber-300/90 border border-amber-500/20">
          {photo.datePhotographed}
        </div>

        {/* Featured badge if applicable */}
        {photo.featured && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-amber-600/90 text-stone-950 font-mono text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
      </Link>

      {/* Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-1.5 font-mono">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span className="truncate">{photo.location}</span>
          </div>

          <Link href={`/archive/${photo.slug}`}>
            <h3 className="font-display font-semibold text-base leading-snug text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
              {photo.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {photo.shortDescription}
          </p>
        </div>

        {/* Footer info: Photographer & Views */}
        <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span className="truncate max-w-[150px]">By {photo.photographer}</span>
          <div className="flex items-center gap-1 text-[var(--text-muted)]">
            <Eye className="w-3 h-3" />
            <span>{photo.viewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
