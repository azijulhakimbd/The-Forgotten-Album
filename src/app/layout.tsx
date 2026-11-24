import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SearchProvider } from "@/components/layout/search-dialog";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: {
    default: "The Forgotten Album — Where Forgotten Memories Come Alive",
    template: "%s | The Forgotten Album",
  },
  description:
    "A digital museum archive and historical storytelling magazine uncovering rare photographs, lost civilizations, and pivotal moments of world history.",
  keywords: [
    "historical photography",
    "world history archive",
    "vintage photographs",
    "ancient civilizations",
    "historical moments",
    "rare photos",
  ],
  authors: [{ name: "The Forgotten Album Curatorial Team" }],
  openGraph: {
    title: "The Forgotten Album — Historical Photography & Storytelling",
    description: "Preserve history, uncover forgotten stories, and bring the past closer through photography.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col film-grain antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <ThemeProvider>
          <SearchProvider>
            <Suspense fallback={<div className="h-16 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]" />}>
              <PublicNavbar />
            </Suspense>
            <main className="flex-1 w-full">{children}</main>
            <PublicFooter />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
