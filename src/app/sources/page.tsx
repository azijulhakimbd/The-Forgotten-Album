import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Shield, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Archival Sources & Attribution Standards",
  description: "Provenance documentation, public domain licensing protocols, and institutional repositories for The Forgotten Album.",
};

export default function SourcesPage() {
  const repositories = [
    {
      name: "Library of Congress (LOC)",
      description: "Prints and Photographs Division. Holding millions of historic glass plate negatives, daguerreotypes, Civil War collodion plates by Mathew Brady, and Farm Security Administration documentation.",
      url: "https://www.loc.gov/pictures/",
      coverage: "1840 – Present",
    },
    {
      name: "National Archives and Records Administration (NARA)",
      description: "Official record-keeper of United States historic documentation, presidential photography, military operations, and historical engineering achievements including the Panama Canal.",
      url: "https://www.archives.gov/",
      coverage: "1775 – Present",
    },
    {
      name: "Bibliothèque nationale de France (BnF Gallica)",
      description: "Digital library of the National Library of France preserving the earliest French photographic masterworks, Nadar portraits, and nineteenth-century Parisian views.",
      url: "https://gallica.bnf.fr/",
      coverage: "1839 – 20th Century",
    },
    {
      name: "Royal Geographical Society (RGS)",
      description: "Pioneering photographic records from the golden age of polar and Himalayan exploration, including Frank Hurley's Endurance negatives and Everest reconnaissance.",
      url: "https://www.rgs.org/",
      coverage: "1850 – 1950",
    },
    {
      name: "National Aeronautics and Space Administration (NASA)",
      description: "Public domain photography documenting Project Mercury, Gemini, the Apollo lunar surface landings, and robotic planetary probes.",
      url: "https://images.nasa.gov/",
      coverage: "1958 – Present",
    },
    {
      name: "Wikimedia Commons Public Domain Project",
      description: "Peer-reviewed repository of verified public domain visual heritage, scanned original prints, and museum photographic open-access releases.",
      url: "https://commons.wikimedia.org/",
      coverage: "Universal",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Provenance Protocols</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Sources & Attribution Policy
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          The Forgotten Album enforces unbending standards regarding historical integrity, photographic provenance, and public domain ethics.
        </p>
      </div>

      <div className="space-y-6 text-sm text-[var(--text-primary)] leading-relaxed font-light">
        <h2 className="font-display text-2xl font-bold">1. Public Domain & Rights Verification</h2>
        <p>
          Historical photographs published on The Forgotten Album are drawn strictly from verified public domain collections, works where copyright has legally expired (such as pre-1929 published works), official works of government agencies (such as works of the United States Government under 17 U.S.C. § 105), or items released under open museum access policies.
        </p>

        <h2 className="font-display text-2xl font-bold pt-4">2. Partner Repositories & Archives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose pt-2">
          {repositories.map((repo) => (
            <div key={repo.name} className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                  {repo.coverage}
                </span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-amber-500"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <h3 className="font-display font-bold text-base">{repo.name}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{repo.description}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold pt-6">3. Attribution Preservation</h2>
        <p>
          We never strip metadata or withhold original credit. Whenever available, each photo detail page documents the photographer&apos;s name, camera process (e.g. daguerreotype, albumen print, silver gelatin), original catalog accession number, and an active link back to the host institution.
        </p>
      </div>
    </div>
  );
}
