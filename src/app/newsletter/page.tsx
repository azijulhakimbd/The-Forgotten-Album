import React from "react";
import { Metadata } from "next";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { History, Mail, CheckCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "The Historical Dispatch — Weekly Newsletter",
  description: "Subscribe to receive remarkable photographs and forgotten stories from the past in your inbox every Sunday.",
};

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 pb-8 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <History className="w-3.5 h-3.5" />
          <span>Sunday Curatorial Dispatch</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          History Deserves to Be Remembered.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mx-auto font-light leading-relaxed">
          Join thousands of historians, archivists, and history enthusiasts who receive our Sunday morning chronicle.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-12 shadow-2xl space-y-6 text-center">
        <h2 className="font-display text-2xl font-bold">Subscribe to the Archive</h2>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
          Delivered every Sunday at 8:00 AM UTC. One high-resolution archival photograph, one long-form story, and three rare historical moments from that week in history.
        </p>

        <NewsletterForm />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono text-left">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>High-res uncompressed public domain scans</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Fact-checked historical provenance</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>No sponsor spam. 1-click unsubscribe anytime.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
