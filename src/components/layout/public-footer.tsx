"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Heart, Mail, ExternalLink } from "lucide-react";

export function PublicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded border border-amber-600/40 bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-display font-bold text-lg">
                FA
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                THE FORGOTTEN ALBUM
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              Where forgotten memories come alive. Dedicated to preserving world history, uncovering lost narratives, and presenting verified historical photographs in a digital museum environment.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-muted)] bg-[var(--bg-card)]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Archive Curated Daily • Public Domain Preserved</span>
              </div>
            </div>
          </div>

          {/* Column 1: Explore Archive */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
              The Archive
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/archive" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  All Photographs
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Themed Collections
                </Link>
              </li>
              <li>
                <Link href="/eras" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Browse by Era
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Historical Timeline
                </Link>
              </li>
              <li>
                <Link href="/places" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Lost Places & Landmarks
                </Link>
              </li>
              <li>
                <Link href="/personalities" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Historical Figures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Editorial Magazine */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
              Editorial Stories
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/stories" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Photo Essays
                </Link>
              </li>
              <li>
                <Link href="/categories/science-discovery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Science & Inventions
                </Link>
              </li>
              <li>
                <Link href="/categories/early-photography" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Early Photography
                </Link>
              </li>
              <li>
                <Link href="/categories/ancient-civilizations" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Ancient Civilizations
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Weekly Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & Attribution */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-3">
              Institutional
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Our Mission & Team
                </Link>
              </li>
              <li>
                <Link href="/sources" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Sources & Attribution
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Contact Curators
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  Terms of Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="archive-divider my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>© 2026 The Forgotten Album Archive. All archival rights & attributions documented.</span>
            <span className="hidden sm:inline text-[var(--border-color)]">·</span>
            <span className="font-mono">
              Crafted by{" "}
              <a
                href="https://azijul.pro.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
              >
                azijul.pro.bd
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/sources" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              <span>Public Domain Policy</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-[var(--border-color)] hover:border-amber-500 text-amber-600 dark:text-amber-400 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
