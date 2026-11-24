import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getEvents, getEras } from "@/lib/data";
import { Calendar, Clock, MapPin, Compass, ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Interactive Historical Timeline",
  description:
    "A chronological journey through world history: explore major events, scientific breakthroughs, and defining cultural shifts from ancient times to the modern era.",
};

interface TimelinePageProps {
  searchParams: Promise<{
    event?: string;
    era?: string;
    q?: string;
  }>;
}

export default async function TimelinePage({ searchParams }: TimelinePageProps) {
  const resolvedParams = await searchParams;
  const activeEventSlug = resolvedParams.event || "";
  const activeEraId = resolvedParams.era || "";
  const searchQuery = (resolvedParams.q || "").toLowerCase().trim();

  const [allEvents, eras] = await Promise.all([
    getEvents(),
    getEras(),
  ]);

  let filteredEvents = allEvents;
  if (activeEraId) {
    filteredEvents = filteredEvents.filter((e) => e.eraId === activeEraId);
  }
  if (searchQuery) {
    filteredEvents = filteredEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(searchQuery) ||
        e.summary.toLowerCase().includes(searchQuery) ||
        e.description.toLowerCase().includes(searchQuery)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <FadeIn distance={20}>
        <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Interactive Chronological Atlas</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            The Historical Timeline
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Navigate centuries of pivotal transformations. Every event is verified against primary archives and accompanied by historical documentation.
          </p>

          {/* Era Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <Link
              href="/timeline"
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                !activeEraId
                  ? "bg-amber-600 text-stone-950 font-semibold"
                  : "border border-[var(--border-color)] text-[var(--text-muted)] hover:border-amber-500"
              }`}
            >
              All Eras
            </Link>
            {eras.map((era) => (
              <Link
                key={era.id}
                href={`/timeline?era=${era.id}`}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  activeEraId === era.id
                    ? "bg-amber-600 text-stone-950 font-semibold"
                    : "border border-[var(--border-color)] text-[var(--text-muted)] hover:border-amber-500"
                }`}
              >
                {era.name}
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Timeline Stream */}
      {filteredEvents.length === 0 ? (
        <div className="py-20 text-center rounded-xl border border-dashed border-[var(--border-color)] p-8">
          <p className="text-sm text-[var(--text-muted)]">No historical events found for this selection.</p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-600 before:via-amber-500/40 before:to-transparent">
          {filteredEvents.map((event, index) => {
            const isTarget = event.slug === activeEventSlug;
            return (
              <FadeIn key={event.id} direction="right" distance={25} delay={Math.min(index * 0.05, 0.3)}>
                <div
                  id={event.slug}
                  className={`relative group transition-all duration-300 ${
                    isTarget ? "ring-2 ring-amber-500 rounded-2xl p-2 bg-amber-500/5" : ""
                  }`}
                >
                  {/* Year Marker Milestone Dot */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[43px] top-6 w-4 h-4 rounded-full border-2 ${
                      isTarget
                        ? "bg-amber-400 border-amber-600 scale-125 shadow-lg shadow-amber-500/50"
                        : "bg-[var(--bg-primary)] border-amber-600 group-hover:scale-125 group-hover:bg-amber-500 transition-all"
                    }`}
                  />

                  {/* Event Card */}
                  <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 shadow-sm hover:shadow-xl hover:border-amber-600/50 transition-all">
                    <div className="md:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-amber-600 dark:text-amber-400">
                        <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {event.eventDate} ({event.datePrecision})
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {event.summary}
                      </p>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-2 border-t border-[var(--border-color)]/60">
                        {event.description}
                      </p>
                    </div>

                    <div className="md:col-span-4 relative aspect-[16/10] rounded-lg overflow-hidden bg-black/40">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover filter grayscale-[15%] group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
