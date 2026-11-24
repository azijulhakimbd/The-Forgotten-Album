import React from "react";
import { getEvents } from "@/lib/data";
import { Calendar, Plus } from "lucide-react";

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Timeline Events Manager
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Cataloging historical events, dates, milestones, and timeline entries ({events.length} events).
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Event Title</th>
              <th className="px-4 py-3">Event Date</th>
              <th className="px-4 py-3">Precision</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans">
                  {ev.title}
                </td>
                <td className="px-4 py-3 text-amber-500 font-bold">{ev.eventDate}</td>
                <td className="px-4 py-3 text-[var(--text-muted)] uppercase text-[10px]">{ev.datePrecision}</td>
                <td className="px-4 py-3 text-[var(--text-muted)] max-w-sm truncate">{ev.summary}</td>
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
