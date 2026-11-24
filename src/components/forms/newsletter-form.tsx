"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing to The Forgotten Album dispatch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription could not be processed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network connection error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg border border-amber-600/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-sm">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
        <p>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            required
            className="w-full pl-10 pr-4 py-2.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <span>Subscribe</span>
          )}
        </button>
      </div>
      {status === "error" && (
        <div className="flex items-center gap-1.5 text-xs text-rose-500 justify-center">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
