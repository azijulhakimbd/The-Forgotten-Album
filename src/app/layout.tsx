import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SearchProvider } from "@/components/layout/search-dialog";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { ServiceWorkerRegistration } from "@/components/layout/service-worker-registration";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#12110F" },
    { media: "(prefers-color-scheme: light)", color: "#F4EBDD" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://theforgottenalbum.org"),
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Forgotten Album",
    startupImage: "/icons/apple-touch-icon.png",
  },
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-32x32.png",
  },
  openGraph: {
    title: "The Forgotten Album — Historical Photography & Storytelling",
    description: "Preserve history, uncover forgotten stories, and bring the past closer through photography.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Forgotten Album — Historical Photography Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Forgotten Album — Historical Photography & Storytelling",
    description: "Preserve history, uncover forgotten stories, and bring the past closer through photography.",
    images: ["/images/og-image.png"],
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
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
