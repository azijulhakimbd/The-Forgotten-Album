"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Globe, User, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <header className="h-14 border-b border-[var(--border-color)] bg-[var(--bg-card)] px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
          Archival Management Control Center
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)] hover:border-amber-500 hover:text-amber-500 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Live Archive</span>
        </Link>

        <ThemeToggle />

        <div className="flex items-center gap-2 pl-3 border-l border-[var(--border-color)]">
          <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-500">
            EV
          </div>
          <span className="text-xs font-mono hidden sm:inline-block">Eleanor Vance</span>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded text-[var(--text-muted)] hover:text-rose-500 transition-colors ml-1"
            title="Log out of Curator CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
