"use client";

/**
 * Universal PWA Install Button — works across all device/browser combinations:
 *
 * • Android/Chrome/Edge: uses native `beforeinstallprompt`
 * • iOS Safari: guided "Add to Home Screen" instructions
 * • Desktop Chrome/Edge/Brave: native prompt or guided browser install
 * • Other desktop/mobile browsers: guided bookmarking/install instructions
 * • Full Framer Motion animated modal & transitions
 */

import React, { useEffect, useState } from "react";
import { Download, Share, X, Smartphone, Monitor, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "@/components/ui/motion";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already running as standalone PWA
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as { standalone?: boolean }).standalone === true;
      setIsStandalone(Boolean(isStandaloneMode));
    };

    checkStandalone();

    // iOS detection
    const iosDetected =
      /iphone|ipad|ipod/i.test(navigator.userAgent) &&
      !(window.navigator as { standalone?: boolean }).standalone;
    setIsIos(Boolean(iosDetected));

    // Listen for beforeinstallprompt event
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handlePrompt);

    // Track app installation
    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setInstalled(true);
        }
        setDeferredPrompt(null);
      } catch {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  // If already installed and running standalone, show a subtle active badge
  if (isStandalone || installed) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>App Installed</span>
      </div>
    );
  }

  return (
    <>
      {/* Install Button with Framer Motion hover */}
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Install The Forgotten Album application"
        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded border border-amber-600/50 hover:border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-mono tracking-wide transition-colors shadow-sm cursor-pointer"
      >
        {isIos ? (
          <Share className="w-3.5 h-3.5 flex-shrink-0" />
        ) : (
          <Download className="w-3.5 h-3.5 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
        )}
        <span>Install App</span>
        {isIos ? (
          <Smartphone className="w-3 h-3 opacity-60" />
        ) : (
          <Monitor className="w-3 h-3 opacity-60" />
        )}
      </motion.button>

      {/* Animated Installation Guidance Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Museum Brand Icon */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-amber-600/40 overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/The Forgotten Album Emblem.png"
                    alt="The Forgotten Album Emblem"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    Install The Forgotten Album
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Fast, offline-ready archival experience
                  </p>
                </div>
              </div>

              {/* Instructions depending on platform */}
              {isIos ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-700 dark:text-amber-300">
                    Safari on iOS / iPadOS detected
                  </div>
                  <ol className="space-y-3 text-sm text-[var(--text-primary)]">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">1</span>
                      <span>
                        Tap the{" "}
                        <Share className="inline w-4 h-4 text-blue-500 mx-0.5 -mt-0.5" />
                        <strong> Share</strong> button in Safari toolbar.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">2</span>
                      <span>
                        Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">3</span>
                      <span>
                        Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner to finish.
                      </span>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-700 dark:text-amber-300">
                    Desktop or Android Browser
                  </div>
                  <ol className="space-y-3 text-sm text-[var(--text-primary)]">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">1</span>
                      <span>
                        Look for the <strong>Install icon</strong> (<Download className="inline w-3.5 h-3.5 text-amber-500" />) on the right side of your browser address bar.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">2</span>
                      <span>
                        Or open the browser menu (<strong>⋮</strong> or <strong>⋯</strong>) and select <strong>&ldquo;Install The Forgotten Album&rdquo;</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-600/40 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold font-mono">3</span>
                      <span>
                        Confirm installation to launch as a dedicated standalone window.
                      </span>
                    </li>
                  </ol>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-lg border border-amber-600/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
