import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Access",
  description: "Terms and conditions governing the access and research usage of The Forgotten Album.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Terms of Access</h1>
        <p className="text-xs font-mono text-[var(--text-muted)]">Last Revised: November 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-[var(--text-primary)] leading-relaxed space-y-4 font-light">
        <p>
          By accessing The Forgotten Album, you agree to comply with our conditions of research usage and educational attribution.
        </p>

        <h3 className="font-display text-lg font-bold">1. Educational & Archival Use</h3>
        <p>
          The materials hosted on The Forgotten Album are presented for historical inquiry, scholarly research, journalism, and personal education.
        </p>

        <h3 className="font-display text-lg font-bold pt-4">2. Photographic Rights</h3>
        <p>
          Photographs displayed carry individual license declarations (predominantly Public Domain, US Government Works, or Open Museum Access). Users must review individual photo provenance fields before commercial reproduction.
        </p>

        <h3 className="font-display text-lg font-bold pt-4">3. Editorial Copyright</h3>
        <p>
          Original narrative historical essays, curated collections, and curatorial compilations authored by The Forgotten Album staff are protected under international copyright law.
        </p>
      </div>
    </div>
  );
}
