import React from "react";
import Link from "next/link";
import { getStories } from "@/lib/data";
import { Plus, Edit, BookOpen, ExternalLink, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminStoriesPage() {
  const { stories, total } = await getStories({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Story & Editorial CMS
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Publishing, drafting, and reviewing historical magazine essays ({total} total stories).
          </p>
        </div>

        <Link
          href="/admin/stories/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors shadow-sm w-fit"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write New Historical Story</span>
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Story</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Reading Time</th>
              <th className="px-4 py-3">Published Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded overflow-hidden bg-black/40 flex-shrink-0">
                      <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 max-w-sm">
                      <p className="font-semibold text-[var(--text-primary)] truncate font-sans text-xs">
                        {story.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{story.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {story.authorName || "Eleanor Vance"}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {story.readingTimeMinutes} min
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {formatDate(story.publishDate)}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {story.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/stories/${story.slug}`}
                      target="_blank"
                      className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-amber-500"
                      title="View Article"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/stories/${story.id}/edit`}
                      className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-muted)] hover:text-amber-500"
                      title="Edit Story"
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
  );
}
