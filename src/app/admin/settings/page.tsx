"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState("The Forgotten Album");
  const [tagline, setTagline] = useState("Where forgotten memories come alive.");
  const [heroHeadline, setHeroHeadline] = useState("History is never truly forgotten.");
  const [contactEmail, setContactEmail] = useState("curator@theforgottenalbum.org");
  const [allowComments, setAllowComments] = useState(true);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com/theforgottenalbum");
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtube.com/@theforgottenalbum");
  const [twitterUrl, setTwitterUrl] = useState("https://x.com/forgottenalbum");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Curatorial Site Settings
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Global branding, social links, editorial toggles, and metadata configuration.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Identity */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            1. Brand Identity & Headings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-display font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Official Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Homepage Hero Headline
            </label>
            <input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
              Curator Contact Email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-mono text-xs"
            />
          </div>
        </div>

        {/* Social Media Integration Links */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            2. Social Profiles & Broadcast Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                X / Twitter URL
              </label>
              <input
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-1">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Community & Moderation Controls */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold border-b border-[var(--border-color)] pb-2">
            3. Engagement & Membership Toggles
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) => setAllowComments(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-xs font-mono uppercase text-[var(--text-primary)]">
                Enable Reader Comments on Historical Photographs & Essays
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allowRegistration}
                onChange={(e) => setAllowRegistration(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-xs font-mono uppercase text-[var(--text-primary)]">
                Allow Public Reader Research Profile Registration
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
