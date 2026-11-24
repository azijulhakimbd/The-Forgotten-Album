"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Camera,
  BookOpen,
  FolderOpen,
  Compass,
  Calendar,
  Users,
  MapPin,
  Layers,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  BarChart3,
  Settings,
  ExternalLink,
  ChevronRight,
  Shield,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Photos", href: "/admin/photos", icon: Camera },
    { label: "Stories", href: "/admin/stories", icon: BookOpen },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Categories", href: "/admin/categories", icon: FolderOpen },
    { label: "Eras", href: "/admin/eras", icon: Compass },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Personalities", href: "/admin/personalities", icon: Users },
    { label: "Places", href: "/admin/places", icon: MapPin },
    { label: "Collections", href: "/admin/collections", icon: Layers },
    { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { label: "Comments", href: "/admin/comments", icon: MessageSquare },
    { label: "User Roles", href: "/admin/users", icon: Shield },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col justify-between flex-shrink-0 min-h-screen">
      <div>
        {/* Admin Brand Header */}
        <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-amber-600/40 bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400 font-display font-bold text-sm">
              FA
            </div>
            <div>
              <p className="font-display font-bold text-sm text-[var(--text-primary)]">Curator CMS</p>
              <p className="text-[10px] font-mono text-[var(--text-muted)] -mt-0.5">The Forgotten Album</p>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="p-1 rounded text-[var(--text-muted)] hover:text-amber-500"
            title="View Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-0.5 max-h-[calc(100vh-140px)] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                  isActive
                    ? "bg-amber-600 text-stone-950 font-bold shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
        <p>Curator Access Level: <strong className="text-amber-500">Super Admin</strong></p>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">Platform v2.4 Archival</p>
      </div>
    </aside>
  );
}
