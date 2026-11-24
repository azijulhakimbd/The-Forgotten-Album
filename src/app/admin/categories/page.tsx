import React from "react";
import { getCategories } from "@/lib/data";
import { FolderOpen, Plus, Edit } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Category Taxonomy Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Manage archival taxonomies, icons, and classification descriptions ({categories.length} categories).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-black/40 flex-shrink-0">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{c.name}</span>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{c.slug}</td>
                <td className="px-4 py-3 text-[var(--text-muted)] max-w-sm truncate">{c.description}</td>
                <td className="px-4 py-3 text-amber-500 font-bold">{c.photoCount || 20}</td>
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
