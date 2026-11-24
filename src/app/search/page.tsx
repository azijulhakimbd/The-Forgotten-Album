import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { searchArchive, GlobalSearchResult } from "@/lib/data";
import { Search, Compass, ArrowRight, Calendar, BookOpen, User, MapPin, Building, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Search the Historical Archive",
  description: "Search across photographs, long-form stories, historical figures, archaeological landmarks, and epochal events.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = await searchParams;
  const query = resolved.q || "";
  const results = query ? await searchArchive(query) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Search the Archive
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl">
          Search across photographs, historical essays, personalities, lost places, events, and collections.
        </p>

        {/* Search form */}
        <form action="/search" method="GET" className="pt-4 max-w-xl flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by person, location, year, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-sm transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {query ? (
        <div className="space-y-4">
          <div className="text-xs font-mono text-[var(--text-muted)]">
            Found {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;<span className="text-amber-500">{query}</span>&rdquo;
          </div>

          {results.length === 0 ? (
            <div className="py-16 text-center rounded-xl border border-dashed border-[var(--border-color)] p-8">
              <Compass className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-muted)]">No historical artifacts matched your query. Try searching for &ldquo;Wright&rdquo;, &ldquo;Curie&rdquo;, &ldquo;Paris&rdquo;, or &ldquo;Egypt&rdquo;.</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-color)]">
              {results.map((res) => (
                <Link
                  key={`${res.type}-${res.id}`}
                  href={res.href}
                  className="flex items-center gap-4 py-4 group hover:bg-amber-500/5 px-3 rounded-lg transition-colors"
                >
                  {res.imageUrl && (
                    <div className="w-16 h-16 rounded overflow-hidden bg-black/40 flex-shrink-0">
                      <img src={res.imageUrl} alt={res.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                        {res.type}
                      </span>
                      <h3 className="font-display text-base font-semibold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors truncate">
                        {res.title}
                      </h3>
                    </div>
                    {res.subtitle && (
                      <p className="text-xs text-[var(--text-muted)] truncate mt-1">
                        {res.subtitle}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 py-8">
          <p className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
            Suggested Research Inquiries
          </p>
          <div className="flex flex-wrap gap-2">
            {["Wright Brothers", "Apollo 11", "Marie Curie", "Nikola Tesla", "Petra", "Endurance", "San Francisco Earthquake", "Daguerreotype"].map((t) => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className="px-3 py-1.5 rounded-full border border-[var(--border-color)] text-xs hover:border-amber-500 transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
