import React from "react";
import { Users, ShieldCheck, Key, UserCheck } from "lucide-react";
import { SEED_ADMIN_USER } from "@/db/seed-data";

export default function AdminUsersPage() {
  const staff = [
    {
      id: SEED_ADMIN_USER.id,
      name: SEED_ADMIN_USER.name,
      email: SEED_ADMIN_USER.email,
      role: "super_admin",
      status: "Active",
      lastLogin: "Just now",
    },
    {
      id: "u-2",
      name: "Marcus Aurelius Vance",
      email: "archivist.marcus@theforgottenalbum.org",
      role: "editor",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "u-3",
      name: "Clara Bowden",
      email: "author.clara@theforgottenalbum.org",
      role: "author",
      status: "Active",
      lastLogin: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            User Roles & RBAC Clearance
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Manage curator permissions, editorial review authority, and staff credentials.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase text-[10px]">
            <tr>
              <th className="px-4 py-3">Curator / User</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Assigned Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3 text-right">Clearance Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {staff.map((u) => (
              <tr key={u.id} className="hover:bg-amber-500/5 transition-colors">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)] font-sans">{u.name}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{u.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-emerald-500">{u.status}</td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{u.lastLogin}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-amber-500 hover:underline">Modify Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
