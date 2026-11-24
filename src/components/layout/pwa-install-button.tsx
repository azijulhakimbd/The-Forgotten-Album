"use client";

/**
 * PWA Install Button — works across all device/browser combinations:
 *
 * • Android/Chrome/Edge: listens for `beforeinstallprompt` event → shows native prompt
 * • iOS Safari: detects standalone mode and shows "Add to Home Screen" instructions
 * • Desktop Chrome/Edge: same `beforeinstallprompt` path as Android
 * • Already installed: hides automatically
 */

import React, { useEffect, useState } from "react";
import { Download, Share, X, Smartphone, Monitor } from "lucide-react";

type InstallState =
  | "idle"          // detecting…
  | "prompt"        // Chrome/Android/Edge — native prompt available
  | "ios"           // iOS Safari — show manual instructions
  | "installed"     // already running as standalone PWA
  | "unsupported";  // browser cannot install

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

export function PwaInstallButton() {
  const [state, setState] = useState<InstallState>("idle");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosModal, setShowIosModal] = useState(false);

  useEffect(() => {
    // Already installed as standalone PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setState("installed");
      return;
    }

    // iOS Safari detection
    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window.navigator as { standalone?: boolean }).standalone;
    if (isIos) {
      setState("ios");
      return;
    }

    // Chrome / Edge / Android — capture beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setState("prompt");
    };
    window.addEventListener("beforeinstallprompt", handler);

    // If neither iOS nor prompt fired within 3s assume unsupported
    const timeout = setTimeout(() => {
      setState((prev) => (prev === "idle" ? "unsupported" : prev));
    }, 3000);

    // Track successful install
    window.addEventListener("appinstalled", () => {
      setState("installed");
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timeout);
    };
  }, []);

  const handleInstall = async () => {
    if (state === "ios") {
      setShowIosModal(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setState("installed");
    setDeferredPrompt(null);
  };

  // Hide when already installed or truly unsupported
  if (state === "installed" || state === "unsupported") return null;

  return (
    <>
      {/* Install Button */}
      <button
        onClick={handleInstall}
        aria-label="Install The Forgotten Album app"
        className={`
          group inline-flex items-center gap-2 px-3 py-1.5 rounded
          border border-amber-600/50 hover:border-amber-500
          bg-amber-500/10 hover:bg-amber-500/20
          text-amber-700 dark:text-amber-400
          text-xs font-mono tracking-wide
          transition-all duration-200
          ${state === "idle" ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        {state === "ios" ? (
          <Share className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <Download className="w-3.5 h-3.5 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
        )}
        <span>Install App</span>
        {state === "ios" ? (
          <Smartphone className="w-3 h-3 opacity-60" />
        ) : (
          <Monitor className="w-3 h-3 opacity-60" />
        )}
      </button>

      {/* iOS Instructions Modal */}
      {showIosModal && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowIosModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIosModal(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Emblem */}
            <div className="flex justify-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/The Forgotten Album Emblem.png"
                alt="The Forgotten Album"
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl border border-amber-600/40 object-cover"
              />
            </div>

            <h3 className="font-display text-lg font-bold text-center text-[var(--text-primary)] mb-1">
              Install The Forgotten Album
            </h3>
            <p className="text-xs text-[var(--text-muted)] text-center mb-5">
              Add this archive to your Home Screen for a full-screen experience.
            </p>

            <ol className="space-y-3 text-sm text-[var(--text-primary)]">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold">1</span>
                <span>
                  Tap the{" "}
                  <Share className="inline w-4 h-4 text-blue-500 mx-0.5 -mt-0.5" />
                  <strong> Share</strong> button at the bottom of Safari.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold">2</span>
                <span>
                  Scroll down and tap{" "}
                  <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold">3</span>
                <span>
                  Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner.
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIosModal(false)}
              className="mt-6 w-full py-2 rounded border border-amber-600/50 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold hover:bg-amber-500/20 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
