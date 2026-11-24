import React from "react";
import { Mail, CheckCircle2, Download, Trash2 } from "lucide-react";

export default function AdminNewsletterPage() {
  const subscribers = [
    { email: "researcher@oxford.ac.uk", status: "active", date: "2026-11-20", source: "Homepage Hero" },
    { email: "archivist@loc.gov", status: "active", date: "2026-11-18", source: "Archive Detail" },
    { email: "museum_fellow@smithsonian.edu", status: "active", date: "2026-11-15", source: "Newsletter Page" },
    { email: "eleanor.vance@history.org", status: "active", date: "2026-11-12", source: "Curator Desk" },
    { email: "reader.curious@gmail.com", status: "active", date: "2026-11-10", source: "Editorial Essay" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Sunday Historical Dispatch mailing list (2,840 verified active subscribers).
          </p>
        </div>

        <button
          onClick={() => alert("Subscribers exported to CSV format.")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--border-color)] text-xs font-mono hover:border-amber-500 transition-colors w-fit"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Subscriber CSV</span>
        </button>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Subscriber Email</th>
              <th className="px-4 py-3">Subscription Origin</th>
              <th className="px-4 py-3">Confirmed Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {subscribers.map((s, idx) => (
              <tr key={idx} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{s.email}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{s.source}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{s.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-rose-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
