"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, Era } from "@/types";
import { Filter, SlidersHorizontal, X } from "lucide-react";

interface PhotoFiltersProps {
  categories: Category[];
  eras: Era[];
}

export function PhotoFilters({ categories, eras }: PhotoFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentEra = searchParams.get("era") || "";
  const currentSort = searchParams.get("sort") || "latest";
  const currentSearch = searchParams.get("q") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/archive?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/archive");
  };

  const hasActiveFilters = Boolean(currentCategory || currentEra || currentSearch || currentSort !== "latest");

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Title & Filter Count */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--text-primary)]">
            Archive Filter Controls
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-500 hover:underline font-mono ml-2"
            >
              <X className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Live Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            defaultValue={currentSearch}
            placeholder="Search keywords or titles..."
            onChange={(e) => {
              const val = e.target.value;
              const timer = setTimeout(() => {
                updateParam("q", val);
              }, 400);
              return () => clearTimeout(timer);
            }}
            className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
          />
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Category
          </label>
          <select
            value={currentCategory}
            onChange={(e) => updateParam("category", e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Era Dropdown */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Historical Era
          </label>
          <select
            value={currentEra}
            onChange={(e) => updateParam("era", e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All Eras</option>
            {eras.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Sorting Order
          </label>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
          >
            <option value="latest">Latest Published</option>
            <option value="oldest">Oldest Date Taken</option>
            <option value="most_viewed">Most Viewed</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
}
