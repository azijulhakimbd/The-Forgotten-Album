import React from "react";
import Link from "next/link";
import { getPhotos, getCategories } from "@/lib/data";
import { Plus, Search, Eye, Edit, Trash2, Camera, ExternalLink } from "lucide-react";

export default async function AdminPhotosPage() {
  const [{ photos, total }, categories] = await Promise.all([
    getPhotos({ limit: 50 }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Photo Management CMS
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Cataloging, editing, and curating historical photography assets ({total} total photographs).
          </p>
        </div>

        <Link
          href="/admin/photos/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors shadow-sm w-fit"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload / Catalog Photograph</span>
        </Link>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Artifact</th>
                <th className="px-4 py-3">Date / Location</th>
                <th className="px-4 py-3">Photographer</th>
                <th className="px-4 py-3">Source & License</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {photos.map((photo) => (
                <tr key={photo.id} className="hover:bg-amber-500/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden bg-black/40 flex-shrink-0">
                        <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="font-semibold text-[var(--text-primary)] truncate font-sans text-xs">
                          {photo.title}
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{photo.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    <p className="font-medium text-[var(--text-primary)]">{photo.datePhotographed}</p>
                    <p className="text-[11px] truncate">{photo.location}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    <p className="truncate max-w-[120px]">{photo.photographer}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    <p className="truncate max-w-[140px]">{photo.sourceName}</p>
                    <p className="text-[10px] text-emerald-500">{photo.license}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {photo.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/archive/${photo.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-amber-500"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/photos/${photo.id}/edit`}
                        className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-amber-500"
                        title="Edit Photograph"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
