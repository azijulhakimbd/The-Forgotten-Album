import React from "react";
import { MessageSquare, Check, X, ShieldAlert } from "lucide-react";

export default function AdminCommentsPage() {
  const comments = [
    {
      id: "c-1",
      author: "Prof. Arthur Davies",
      content: "The glass plate negative clearly shows Wilbur Wright with his hand in his coat pocket, verifying the freezing temperature on the dunes.",
      artifact: "Wright Flyer First Flight 1903",
      status: "approved",
      date: "2026-11-23",
    },
    {
      id: "c-2",
      author: "Helena Rostova",
      content: "The Pavillon Curie laboratory still holds her electrometer. Wonderful to see this high-resolution scan.",
      artifact: "Marie Curie Laboratory Paris 1912",
      status: "approved",
      date: "2026-11-22",
    },
    {
      id: "c-3",
      author: "Anonymous Reader",
      content: "Is there any surviving audio of Lincoln reading the Gettysburg address?",
      artifact: "President Abraham Lincoln on Antietam",
      status: "pending",
      date: "2026-11-24",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Reader Comment Moderation
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Review, approve, and moderate reader annotations on photographs and stories.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Comment Text</th>
              <th className="px-4 py-3">Archival Target</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {comments.map((c) => (
              <tr key={c.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans">{c.author}</td>
                <td className="px-4 py-3 text-[var(--text-muted)] max-w-xs truncate font-sans text-xs">{c.content}</td>
                <td className="px-4 py-3 text-amber-500 truncate max-w-[150px]">{c.artifact}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold ${
                      c.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-2 py-1 rounded bg-emerald-600/15 text-emerald-500 hover:bg-emerald-600/30 text-[11px]">
                      Approve
                    </button>
                    <button className="px-2 py-1 rounded bg-rose-600/15 text-rose-500 hover:bg-rose-600/30 text-[11px]">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
