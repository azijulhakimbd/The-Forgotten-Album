import React from "react";
import Link from "next/link";
import {
  Camera,
  BookOpen,
  FolderOpen,
  Mail,
  Eye,
  TrendingUp,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { getPhotos, getStories, getCategories } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [{ photos, total: totalPhotos }, { stories, total: totalStories }, categories] =
    await Promise.all([
      getPhotos({ limit: 100 }),
      getStories({ limit: 100 }),
      getCategories(),
    ]);

  const totalViews = photos.reduce((acc, p) => acc + p.viewCount, 0) + stories.reduce((acc, s) => acc + s.viewCount, 0);

  const stats = [
    { label: "Total Photographs", value: totalPhotos, icon: Camera, color: "text-amber-500", href: "/admin/photos" },
    { label: "Published Stories", value: totalStories, icon: BookOpen, color: "text-emerald-500", href: "/admin/stories" },
    { label: "Archival Categories", value: categories.length, icon: FolderOpen, color: "text-blue-500", href: "/admin/categories" },
    { label: "Newsletter Subscribers", value: "2,840", icon: Mail, color: "text-purple-500", href: "/admin/newsletter" },
    { label: "Total Archival Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-amber-500", href: "/admin/analytics" },
    { label: "Preservation Status", value: "Optimal", icon: CheckCircle2, color: "text-emerald-500", href: "/admin/settings" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Curatorial Dashboard
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Welcome back, Eleanor Vance. Managing archival assets & publishing workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/photos/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photograph</span>
          </Link>
          <Link
            href="/admin/stories/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded border border-[var(--border-color)] hover:border-amber-500 text-xs font-mono transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Draft Story</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-amber-600/50 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Photos & Publishing Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Popular & Recent Photos */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h2 className="font-display text-lg font-bold">Recent Photographic Catalogings</h2>
            <Link href="/admin/photos" className="text-xs font-mono text-amber-500 hover:underline">
              View All Photos
            </Link>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {photos.slice(0, 5).map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded overflow-hidden bg-black/40 flex-shrink-0">
                    <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs text-[var(--text-primary)] truncate">{p.title}</p>
                    <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                      {p.datePhotographed} • {p.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                    {p.status}
                  </span>
                  <Link
                    href={`/admin/photos/${p.id}/edit`}
                    className="text-xs font-mono text-amber-500 hover:underline px-2 py-1"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curatorial Activity & Stories */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h2 className="font-display text-lg font-bold">Editorial Pipeline</h2>
            <Link href="/admin/stories" className="text-xs font-mono text-amber-500 hover:underline">
              All Stories
            </Link>
          </div>

          <div className="space-y-3">
            {stories.slice(0, 4).map((s) => (
              <div key={s.id} className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-500 uppercase font-semibold">
                    {s.readingTimeMinutes} min read
                  </span>
                  <span className="text-[10px] font-mono uppercase text-emerald-500">
                    {s.status}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)] line-clamp-1">
                  {s.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pt-1">
                  <span>Author: {s.authorName || "Staff"}</span>
                  <Link href={`/admin/stories/${s.id}/edit`} className="text-amber-500 hover:underline">
                    Edit Essay →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
