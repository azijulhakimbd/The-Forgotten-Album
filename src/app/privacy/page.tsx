import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy commitments and subscriber data policy for The Forgotten Album.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 pb-6 border-b border-[var(--border-color)]">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="text-xs font-mono text-[var(--text-muted)]">Last Revised: November 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-[var(--text-primary)] leading-relaxed space-y-4 font-light">
        <p>
          The Forgotten Album values the privacy of historical researchers, students, and readers. We operate under minimal data collection principles.
        </p>

        <h3 className="font-display text-lg font-bold">1. Information We Collect</h3>
        <p>
          We collect personal information solely when you voluntarily provide it:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Newsletter Subscription:</strong> Your email address, used solely to transmit curatorial dispatches.</li>
          <li><strong>Account Registration:</strong> Your username, email, and password hash if you create a research profile.</li>
          <li><strong>Contact Form:</strong> Your name and message sent to curatorial staff.</li>
        </ul>

        <h3 className="font-display text-lg font-bold pt-4">2. Zero Commercial Monetization of Reader Data</h3>
        <p>
          We do not sell, rent, broker, or trade subscriber or visitor data with commercial advertising networks or data brokers.
        </p>

        <h3 className="font-display text-lg font-bold pt-4">3. Local Storage & Cookies</h3>
        <p>
          We utilize localized browser storage strictly to store your reading theme preference (Dark Archive vs Paper Light mode) and session tokens when signed into an account.
        </p>
      </div>
    </div>
  );
}
