"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Search, X, Calendar, MapPin, BookOpen, User, Building, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { searchArchive, GlobalSearchResult } from "@/lib/data";
import { motion, AnimatePresence } from "@/components/ui/motion";

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearchDialog() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchDialog must be used within SearchProvider");
  return ctx;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchArchive(query);
        setResults(res);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const getIcon = (type: GlobalSearchResult["type"]) => {
    switch (type) {
      case "photo":
        return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case "story":
        return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
      case "personality":
        return <User className="w-3.5 h-3.5 text-blue-500" />;
      case "place":
        return <MapPin className="w-3.5 h-3.5 text-rose-500" />;
      case "event":
        return <Building className="w-3.5 h-3.5 text-purple-500" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  return (
    <SearchContext.Provider value={{ isOpen, openSearch, closeSearch }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm"
            onClick={closeSearch}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-xl border border-amber-900/40 bg-[var(--bg-card)] shadow-2xl overflow-hidden transition-all text-[var(--text-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[var(--border-color)]">
              <Search className="w-5 h-5 text-amber-500/80 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search historical photos, stories, places, events, eras..."
                className="w-full bg-transparent text-base focus:outline-none placeholder:text-[var(--text-muted)]"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery("")} className="p-1 text-[var(--text-muted)] hover:text-amber-500">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-xs font-mono rounded border border-[var(--border-color)] text-[var(--text-muted)]">
                ESC
              </kbd>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-96 overflow-y-auto p-3">
              {loading && (
                <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                  Consulting historical archives...
                </div>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                  No historical records found for &ldquo;<span className="text-amber-500">{query}</span>&rdquo;.
                </div>
              )}

              {!loading && query.length < 2 && (
                <div className="p-4 text-xs text-[var(--text-muted)]">
                  <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider font-mono">
                    Popular Inquiries
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Wright Brothers", "Marie Curie", "Machu Picchu", "Apollo 11", "Petra", "Shackleton", "Daguerreotype"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-2.5 py-1 rounded-full border border-[var(--border-color)] text-xs hover:border-amber-500/50 hover:bg-amber-500/10 transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="space-y-1">
                  <div className="px-2 py-1 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Found {results.length} archival match{results.length > 1 ? "es" : ""}
                  </div>
                  {results.map((res) => (
                    <Link
                      key={`${res.type}-${res.id}`}
                      href={res.href}
                      onClick={closeSearch}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-500/10 transition-colors group"
                    >
                      {res.imageUrl ? (
                        <div className="w-12 h-12 rounded bg-black/20 overflow-hidden flex-shrink-0 relative">
                          <img
                            src={res.imageUrl}
                            alt={res.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          {getIcon(res.type)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-1.5 py-0.5 rounded font-mono uppercase text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium">
                            {res.type}
                          </span>
                          <h4 className="text-sm font-medium truncate group-hover:text-amber-500 transition-colors">
                            {res.title}
                          </h4>
                        </div>
                        {res.subtitle && (
                          <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </SearchContext.Provider>
);
}
