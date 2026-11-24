import type { Metadata } from "next";
import { Playfair_Display, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SearchProvider } from "@/components/layout/search-dialog";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      className={`${playfair.variable} ${geistSans.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col film-grain antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <ThemeProvider>
          <SearchProvider>
            <PublicNavbar />
            <main className="flex-1 w-full">{children}</main>
            <PublicFooter />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
