import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Landmark, Heart, BookOpen, Camera, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "About The Forgotten Album",
  description: "Preserving history, uncovering forgotten stories, and bringing the past closer through verified photographs and visual storytelling.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <FadeIn distance={20}>
        <div className="text-center space-y-4 pb-8 border-b border-[var(--border-color)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/30 bg-amber-500/10 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Landmark className="w-3.5 h-3.5" />
            <span>Curatorial Manifesto</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Where Forgotten Memories Come Alive.
          </h1>
          <p className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-light leading-relaxed">
            The Forgotten Album is a digital museum archive and editorial storytelling platform dedicated to safeguarding historical photography and reviving untold moments that shaped human civilization.
          </p>
        </div>
      </FadeIn>

      {/* Mission Body */}
      <div className="prose prose-invert max-w-none text-base sm:text-lg text-[var(--text-primary)] leading-relaxed space-y-6 font-light">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Our Preservation Mission
        </h2>
        <p>
          Billions of moments throughout human chronicle have been permanently lost to time. Yet, since the invention of the daguerreotype in 1839, light itself has granted humanity the ability to freeze reality: the dust of Civil War battlefields, the strained breath of polar explorers on Antarctic ice, the quiet concentration of physicists at Brussels summits, and the vanished streetcars of Victorian metropolises.
        </p>
        <p>
          Unlike generic social feeds or fragmented image boards, <strong>The Forgotten Album</strong> treats photography as sacred historical testimony. We maintain rigorous provenance tracking: cross-referencing photographer identities, camera types, exposure dates, geolocation coordinates, and public domain repositories such as the Library of Congress, the US National Archives (NARA), the Bibliothèque nationale de France (BnF), and the British Museum.
        </p>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 not-prose">
          <StaggerItem className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <Camera className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-base">Archival Integrity</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              We never fabricate dates, locations, or photographer attributions. Every artifact is verified against official state and museum registries.
            </p>
          </StaggerItem>
          <StaggerItem className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-base">Long-Form Storytelling</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Photographs do not exist in a vacuum. We pair visual records with thoroughly researched historical narrative essays.
            </p>
          </StaggerItem>
          <StaggerItem className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] space-y-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="font-display font-bold text-base">Public Domain Commitment</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Dedicated to celebrating humanity&apos;s shared visual commons, making public domain heritage accessible to all generations without paywalls.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          The Curatorial Standard
        </h2>
        <p>
          Our archive embraces an editorial design inspired by museum exhibition halls and high-end literary magazines: sepia undertones, aged parchment textures, archival dividing rules, and typography built around classical serif aesthetics.
        </p>
      </div>

      {/* Navigation CTA */}
      <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/archive"
          className="px-6 py-3 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs transition-colors"
        >
          Explore the Photography Archive
        </Link>
        <Link
          href="/sources"
          className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline"
        >
          Read Archival Sources & Attribution Policy →
        </Link>
      </div>
    </div>
  );
}
