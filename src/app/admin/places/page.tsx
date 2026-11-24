import React from "react";
import { getPlaces } from "@/lib/data";
import { MapPin, Plus } from "lucide-react";

export default async function AdminPlacesPage() {
  const places = await getPlaces();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Places & Landmarks Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Topographical ruins, ancient cities, and historic monuments ({places.length} places).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Place Name</th>
              <th className="px-4 py-3">Historical Name</th>
              <th className="px-4 py-3">Country / Region</th>
              <th className="px-4 py-3">Coordinates</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {places.map((p) => (
              <tr key={p.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-black/40 flex-shrink-0">
                    <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{p.name}</span>
                </td>
                <td className="px-4 py-3 text-amber-500">{p.historicalName || "—"}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{p.country}{p.region ? `, ${p.region}` : ""}</td>
                <td className="px-4 py-3 text-[var(--text-muted)] text-[10px]">
                  {p.latitude ? `${p.latitude}, ${p.longitude}` : "—"}
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
