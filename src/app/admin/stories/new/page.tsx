"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";

export default function AdminNewStoryPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState(7);
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85");
  const [status, setStatus] = useState("published");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/admin/stories");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
        <div>
          <Link
            href="/admin/stories"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-amber-500 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories CMS</span>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Write New Historical Story
          </h1>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Story Published!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Story Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Twelve Seconds Over the Dunes: Conquering the Sky"
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-display text-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Subtitle / Deck
            </label>
            <input
              type="text"
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="The untold meticulous engineering and winter trial at Kill Devil Hills..."
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Estimated Reading Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={readingTime}
                onChange={(e) => setReadingTime(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Editorial Excerpt
            </label>
            <textarea
              rows={2}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief introductory summary presented in card previews..."
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              required
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Full Article Content
            </label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full historical narrative essay here..."
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 font-serif leading-relaxed"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/stories"
            className="px-5 py-2.5 rounded border border-[var(--border-color)] text-xs font-mono"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Story to Magazine</span>
          </button>
        </div>
      </form>
    </div>
  );
}
