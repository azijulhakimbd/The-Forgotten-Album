"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, Send } from "lucide-react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `https://theforgottenalbum.org/archive/${slug}`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Examine this historical artifact: "${title}" on The Forgotten Album`)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${url}`)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono uppercase text-[var(--text-muted)] flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Share:
      </span>
      {/* X / Twitter */}
      <button
        onClick={shareTwitter}
        className="p-2 rounded-full border border-[var(--border-color)] hover:border-amber-500 hover:text-amber-500 transition-colors"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      {/* Facebook */}
      <button
        onClick={shareFacebook}
        className="p-2 rounded-full border border-[var(--border-color)] hover:border-amber-500 hover:text-amber-500 transition-colors"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
      {/* WhatsApp */}
      <button
        onClick={shareWhatsApp}
        className="p-2 rounded-full border border-[var(--border-color)] hover:border-amber-500 hover:text-amber-500 transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
      {/* Copy link */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] hover:border-amber-500 text-xs font-mono transition-colors"
        title="Copy Link to Clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
