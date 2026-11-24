import React from "react";
import { Metadata } from "next";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact the Curatorial Team",
  description: "Get in touch with the curators, researchers, and editorial staff at The Forgotten Album.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)] text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Inquiries & Submissions</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Contact the Curators
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg mx-auto">
          Have an archival inquiry, historical correction, photographic provenance detail, or partnership proposal? We welcome your message.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 sm:p-10 shadow-xl space-y-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Eleanor Vance"
                className="w-full px-3.5 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="curator@example.com"
                className="w-full px-3.5 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-[var(--text-primary)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
              Inquiry Subject
            </label>
            <select className="w-full px-3.5 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-[var(--text-primary)]">
              <option value="provenance">Archival Provenance & Attribution</option>
              <option value="correction">Historical Accuracy / Date Correction</option>
              <option value="photo-submission">Photograph Contribution</option>
              <option value="editorial">Editorial / Writing Inquiry</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
              Your Message
            </label>
            <textarea
              rows={5}
              required
              placeholder="Detail your inquiry, archival reference number, or correction notes..."
              className="w-full px-3.5 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-[var(--text-primary)]"
            />
          </div>

          <button
            type="button"
            className="w-full py-3 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Inquiry to Curatorial Desk</span>
          </button>
        </form>
      </div>
    </div>
  );
}
