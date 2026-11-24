"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam === "unauthorized" ? "Administrative clearance required." : "");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const fillCuratorDemo = () => {
    setEmail("curator@theforgottenalbum.org");
    setPassword("AdminPass123!");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-amber-600/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Curator Access Portal
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Secure clearance required for archival management
          </p>
        </div>

        {/* Demo Shortcut Card */}
        <div className="p-3.5 rounded-lg border border-amber-600/30 bg-amber-500/10 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
              Demo Curator Credentials
            </span>
            <button
              type="button"
              onClick={fillCuratorDemo}
              className="text-amber-600 dark:text-amber-400 font-mono text-[11px] hover:underline font-semibold"
            >
              Autofill Form
            </button>
          </div>
          <p className="font-mono text-[11px] text-[var(--text-muted)] truncate">
            curator@theforgottenalbum.org • AdminPass123!
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-rose-600/40 bg-rose-500/10 text-rose-500 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
              Curator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="curator@theforgottenalbum.org"
                className="w-full pl-9 pr-4 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-mono uppercase text-[var(--text-muted)]">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Clearance...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[var(--border-color)]">
          <p className="text-xs text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
              Create Research Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
