import React from "react";
import Link from "next/link";
import { Story } from "@/types";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  if (featured) {
    return (
      <article className="group relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:border-amber-600/50 hover:shadow-2xl">
        <Link href={`/stories/${story.slug}`} className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black/40 block">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-600 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider">
            Lead Story
          </div>
        </Link>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-500" />
                {formatDate(story.publishDate)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-500" />
                {story.readingTimeMinutes} min read
              </span>
            </div>

            <Link href={`/stories/${story.slug}`}>
              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {story.title}
              </h3>
            </Link>

            <p className="text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed">
              {story.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--text-muted)]">
              By {story.authorName || "Archival Staff"}
            </span>
            <Link
              href={`/stories/${story.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform"
            >
              <span>Read Essay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden transition-all duration-300 hover:border-amber-600/50 hover:shadow-xl">
      <Link href={`/stories/${story.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-black/40 block">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[11px] font-mono text-amber-300 border border-amber-500/20">
          {story.readingTimeMinutes} min read
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] mb-2 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-500" />
            {formatDate(story.publishDate)}
          </div>
          <Link href={`/stories/${story.slug}`}>
            <h3 className="font-display font-semibold text-lg leading-snug text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
              {story.title}
            </h3>
          </Link>
          <p className="mt-2 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
            {story.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            By {story.authorName || "Curatorial Staff"}
          </span>
          <Link
            href={`/stories/${story.slug}`}
            className="text-amber-600 dark:text-amber-400 font-mono text-xs hover:underline flex items-center gap-1"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
