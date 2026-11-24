"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Landmark, Compass, Clock, BookOpen, Layers, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSearchDialog } from "./search-dialog";

export function PublicNavbar() {
  const pathname = usePathname();
  const { openSearch } = useSearchDialog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Archive", href: "/archive", icon: Landmark },
    { label: "Stories", href: "/stories", icon: BookOpen },
    { label: "Timeline", href: "/timeline", icon: Clock },
    { label: "Collections", href: "/collections", icon: Layers },
    { label: "Eras", href: "/eras", icon: Compass },
    { label: "About", href: "/about", icon: null },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-sm border-[var(--border-color)] py-2.5"
          : "bg-[var(--bg-primary)] border-[var(--border-color)]/50 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded border border-amber-600/40 bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-all duration-300">
            <span className="font-display text-xl font-bold tracking-tighter">FA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              THE FORGOTTEN ALBUM
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-[var(--text-muted)] -mt-1 hidden sm:inline-block">
              Historical Photography Archive
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-sm font-medium tracking-wide transition-all ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold"
                    : "text-[var(--text-primary)] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Search, Theme Toggle, Admin CMS link, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Global Search Button */}
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] hover:border-amber-500 text-xs text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            title="Search Archive (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline-block text-[10px] font-mono px-1 rounded bg-black/10 dark:bg-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Admin CMS Access Quick Link */}
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider border border-amber-600/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 transition-colors"
            title="Curator Admin CMS"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-[var(--text-primary)] hover:text-amber-600 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-base ${
                  isActive
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold"
                    : "text-[var(--text-primary)] hover:bg-amber-500/10"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-amber-500" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)] font-mono">Curator CMS</span>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono border border-amber-500/40 text-amber-600 dark:text-amber-400"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
