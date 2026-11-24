import React from "react";
import { getCollections } from "@/lib/data";
import { Layers, Plus } from "lucide-react";

export default async function AdminCollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Curated Collections Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Assembling themed photography portfolios and retrospective series ({collections.length} collections).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Collection Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Photographs Included</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {collections.map((col) => (
              <tr key={col.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-black/40 flex-shrink-0">
                    <img src={col.coverImage} alt={col.title} className="w-full h-full object-cover" />
                  </div>
                  <span>{col.title}</span>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{col.slug}</td>
                <td className="px-4 py-3 text-amber-500 font-bold">{col.photoCount || 12} items</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {col.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-amber-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
