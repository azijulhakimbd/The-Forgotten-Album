"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, CheckCircle2 } from "lucide-react";

export default function AdminNewPhotoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [datePhotographed, setDatePhotographed] = useState("");
  const [datePrecision, setDatePrecision] = useState("exact");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [sourceName, setSourceName] = useState("Library of Congress");
  const [sourceUrl, setSourceUrl] = useState("https://www.loc.gov/");
  const [attribution, setAttribution] = useState("");
  const [license, setLicense] = useState("Public Domain");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85");
  const [caption, setCaption] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [status, setStatus] = useState("published");
  const [featured, setFeatured] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/photos");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
        <div>
          <Link
            href="/admin/photos"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Photos CMS</span>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Catalog New Historical Photograph
          </h1>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved to Archive Registry!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identification */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            1. Artifact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Photograph Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. First Flight of the Wright Flyer at Kitty Hawk"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="wright-flyer-first-flight"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Short Description / Overview
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Orville Wright pilots the machine into a freezing headwind as Wilbur looks on..."
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Detailed Historical Caption
            </label>
            <textarea
              rows={4}
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Full historical context, camera notes, plate process, and significance..."
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Date, Location & Photographer */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            2. Chronology & Provenance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Date Photographed
              </label>
              <input
                type="text"
                required
                value={datePhotographed}
                onChange={(e) => setDatePhotographed(e.target.value)}
                placeholder="1903-12-17 or 1865"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Date Precision
              </label>
              <select
                value={datePrecision}
                onChange={(e) => setDatePrecision(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              >
                <option value="exact">Exact (Day & Month)</option>
                <option value="approximate">Approximate (c. Year)</option>
                <option value="year_only">Year Only</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Photographer / Studio
              </label>
              <input
                type="text"
                required
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="John T. Daniels"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kill Devil Hills, North Carolina"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Country
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United States"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Archival Repository
              </label>
              <input
                type="text"
                required
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="Library of Congress"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Source URL
              </label>
              <input
                type="url"
                required
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://www.loc.gov/item/..."
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                License
              </label>
              <input
                type="text"
                required
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Public Domain"
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Media Asset & Publishing Status */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            3. Media & Publication Status
          </h3>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Image URL / Cloudinary Asset
            </label>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Workflow Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="published">Published to Archive</option>
                <option value="draft">Saved as Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="featured" className="text-xs font-mono uppercase text-[var(--text-primary)]">
                Feature on Homepage
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/photos"
            className="px-5 py-2.5 rounded border border-[var(--border-color)] text-xs font-mono hover:bg-black/5 dark:hover:bg-white/5"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Photograph to Archive</span>
          </button>
        </div>
      </form>
    </div>
  );
}
