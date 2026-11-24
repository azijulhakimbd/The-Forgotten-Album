import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getStoryBySlug, getRelatedStories, getStories } from "@/lib/data";
import { StoryCard } from "@/components/stories/story-card";
import { ShareButtons } from "@/components/archive/share-buttons";
import { formatDate } from "@/lib/utils";
import { generateStorySchema } from "@/lib/seo/json-ld";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Quote,
} from "lucide-react";

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | The Forgotten Album`,
      description: story.excerpt,
      images: [{ url: story.coverImage }],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const [relatedStories, allStoriesResult] = await Promise.all([
    getRelatedStories(story.id, 2),
    getStories({ limit: 50 }),
  ]);

  const allStories = allStoriesResult.stories;
  const currentIndex = allStories.findIndex((s) => s.id === story.id);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex >= 0 && currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;
  const storyJsonLd = generateStorySchema(story);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      {/* Top Breadcrumbs & Previous/Next Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Link href="/" className="hover:text-amber-500">Home</Link>
          <span>/</span>
          <Link href="/stories" className="hover:text-amber-500">Stories</Link>
          <span>/</span>
          <span className="text-[var(--text-primary)] truncate max-w-xs">{story.title}</span>
        </nav>

        <div className="flex items-center gap-3 text-xs font-mono">
          {prevStory && (
            <Link
              href={`/stories/${prevStory.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border-color)] hover:border-amber-500 text-[var(--text-primary)] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Essay</span>
            </Link>
          )}
          {nextStory && (
            <Link
              href={`/stories/${nextStory.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--border-color)] hover:border-amber-500 text-[var(--text-primary)] transition-colors"
            >
              <span>Next Essay</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Article Header & Title */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-amber-600 dark:text-amber-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(story.publishDate)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {story.readingTimeMinutes} minute read
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            By {story.authorName || "Curatorial Staff"}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
          {story.title}
        </h1>

        <p className="text-lg sm:text-xl font-light text-[var(--text-muted)] italic leading-relaxed">
          {story.subtitle}
        </p>

        {/* Social Share Bar */}
        <div className="pt-2 flex justify-center">
          <ShareButtons title={story.title} slug={story.slug} />
        </div>
      </header>

      {/* Full-width Cover Historical Photograph */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[var(--border-color)] bg-black/40 shadow-2xl">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Article Body Layout: Main Article + Table of Contents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Table of contents sidebar on desktop */}
        <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6">
          <div className="sticky top-24 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5 pb-2 border-b border-[var(--border-color)]">
              <BookOpen className="w-4 h-4" />
              <span>Article Overview</span>
            </h3>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {story.excerpt}
            </p>

            {story.sections && story.sections.length > 0 && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                  Sections in this Essay
                </span>
                <ul className="space-y-1.5 text-xs">
                  {story.sections.map((sec, idx) => (
                    sec.heading && (
                      <li key={idx} className="text-amber-600 dark:text-amber-400 hover:underline">
                        <a href={`#section-${idx}`}>
                          {idx + 1}. {sec.heading}
                        </a>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {/* Archival Sources */}
            {story.sources && story.sources.length > 0 && (
              <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                  Archival References
                </span>
                <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                  {story.sources.map((src, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-amber-500">•</span>
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-500 hover:underline flex items-center gap-1"
                        >
                          <span>{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span>{src.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Main Article Content */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-8 text-base sm:text-lg leading-relaxed text-[var(--text-primary)]">
          {/* Main Content Paragraphs */}
          <div className="space-y-6 whitespace-pre-line font-light leading-relaxed">
            {story.content}
          </div>

          {/* Structured Editorial Sections (Quotes, Galleries, Subheadings) */}
          {story.sections && story.sections.map((sec, idx) => (
            <section key={idx} id={`section-${idx}`} className="space-y-4 pt-4 border-t border-[var(--border-color)]/60">
              {sec.heading && (
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-4">
                  {sec.heading}
                </h2>
              )}

              {sec.quote && (
                <blockquote className="my-6 p-6 rounded-xl border-l-4 border-amber-500 bg-amber-500/5 text-lg font-display italic text-[var(--text-primary)]">
                  <div className="flex items-start gap-2">
                    <Quote className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <p>&ldquo;{sec.quote}&rdquo;</p>
                      {sec.quoteAuthor && (
                        <cite className="block text-xs font-mono uppercase tracking-wider not-italic text-amber-600 dark:text-amber-400 mt-2">
                          — {sec.quoteAuthor}
                        </cite>
                      )}
                    </div>
                  </div>
                </blockquote>
              )}

              {sec.imageUrl && (
                <figure className="my-6 space-y-2 rounded-xl overflow-hidden border border-[var(--border-color)] bg-black/40">
                  <img
                    src={sec.imageUrl}
                    alt={sec.imageCaption || "Archival illustration"}
                    className="w-full aspect-[16/9] object-cover"
                  />
                  {sec.imageCaption && (
                    <figcaption className="p-3 text-xs font-mono text-[var(--text-muted)] text-center">
                      {sec.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              <p className="font-light leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
            </section>
          ))}

          {/* Story Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="pt-6 border-t border-[var(--border-color)] flex flex-wrap gap-2 items-center">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase">Index Tags:</span>
              {story.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-muted)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="pt-12 border-t border-[var(--border-color)] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold">Related Editorial Essays</h3>
            <Link href="/stories" className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStories.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
