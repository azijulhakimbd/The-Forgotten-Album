import React from "react";
import { BarChart3, TrendingUp, Eye, Users, Download, ArrowUpRight } from "lucide-react";
import { getPhotos, getStories } from "@/lib/data";

export default async function AdminAnalyticsPage() {
  const [{ photos }, { stories }] = await Promise.all([
    getPhotos({ limit: 10 }),
    getStories({ limit: 10 }),
  ]);

  const trafficTrends = [
    { month: "June", views: "48,200", growth: "+14%" },
    { month: "July", views: "62,500", growth: "+29%" },
    { month: "August", views: "74,100", growth: "+18%" },
    { month: "September", views: "89,400", growth: "+21%" },
    { month: "October", views: "108,300", growth: "+21%" },
    { month: "November", views: "124,800", growth: "+15%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Archival Analytics & Reader Engagement
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Privacy-respecting engagement metrics, view counts, and popular archival artifacts.
          </p>
        </div>
      </div>

      {/* Monthly Traffic Cards */}
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
        <h3 className="font-display text-lg font-bold">Six-Month Pageview Growth</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trafficTrends.map((t) => (
            <div key={t.month} className="p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{t.month}</span>
              <p className="font-display text-xl font-bold">{t.views}</p>
              <span className="text-[10px] font-mono text-emerald-500 font-semibold">{t.growth}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Photographs & Essays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Viewed Photographs */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-display text-lg font-bold flex items-center justify-between">
            <span>Top Viewed Photographs</span>
            <Eye className="w-4 h-4 text-amber-500" />
          </h3>
          <div className="divide-y divide-[var(--border-color)]">
            {photos.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3 truncate max-w-sm">
                  <span className="text-amber-500 font-bold">#{idx + 1}</span>
                  <span className="text-[var(--text-primary)] font-sans font-medium truncate">{p.title}</span>
                </div>
                <span className="text-[var(--text-muted)]">{p.viewCount.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Read Historical Stories */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 space-y-4">
          <h3 className="font-display text-lg font-bold flex items-center justify-between">
            <span>Top Read Historical Essays</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </h3>
          <div className="divide-y divide-[var(--border-color)]">
            {stories.slice(0, 5).map((s, idx) => (
              <div key={s.id} className="py-3 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3 truncate max-w-sm">
                  <span className="text-emerald-500 font-bold">#{idx + 1}</span>
                  <span className="text-[var(--text-primary)] font-sans font-medium truncate">{s.title}</span>
                </div>
                <span className="text-[var(--text-muted)]">{s.viewCount.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
