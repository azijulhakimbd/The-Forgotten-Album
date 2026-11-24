"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function AdminEditPhotoPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("First Flight of the Wright Flyer at Kitty Hawk");
  const [slug, setSlug] = useState("wright-flyer-first-flight-1903");
  const [datePhotographed, setDatePhotographed] = useState("1903-12-17");
  const [photographer, setPhotographer] = useState("John T. Daniels");
  const [location, setLocation] = useState("Kill Devil Hills, North Carolina");
  const [sourceName, setSourceName] = useState("Library of Congress");
  const [status, setStatus] = useState("published");

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
            Edit Archival Photograph
          </h1>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Photograph Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Date Photographed
              </label>
              <input
                type="text"
                required
                value={datePhotographed}
                onChange={(e) => setDatePhotographed(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Photographer
              </label>
              <input
                type="text"
                required
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm"
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
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/photos"
            className="px-5 py-2.5 rounded border border-[var(--border-color)] text-xs font-mono"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Update Photograph</span>
          </button>
        </div>
      </form>
    </div>
  );
}
