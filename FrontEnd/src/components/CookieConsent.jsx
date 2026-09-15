import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

/**
 * CookieConsent
 * Full-width bottom bar, Accept/Decline, stored in localStorage.
 * Mount this ONCE in your root layout (e.g. App.jsx), outside of <Routes>,
 * so it persists across every page.
 *
 * Requires: lucide-react
 */

const STORAGE_KEY = "cookie-consent"; // stores "accepted" | "declined"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      // trigger the slide-up transition on next frame
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setEntered(true)),
      );
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setEntered(false);
    // wait for the exit transition before unmounting
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 transition-all duration-300 ease-out sm:px-6"
      style={{
        transform: entered ? "translateY(0)" : "translateY(100%)",
        opacity: entered ? 1 : 0,
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#091424] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3 sm:items-center">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
            <Cookie className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            We use cookies to improve your browsing experience and analyze site
            traffic. By clicking "Accept", you agree to our use of cookies.
          </p>
        </div>

        <div className="flex w-full flex-shrink-0 gap-3 sm:w-auto">
          <button
            onClick={() => handleChoice("declined")}
            className="flex-1 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/20 hover:text-white sm:flex-none"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2.5 text-sm font-semibold text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all hover:from-emerald-300 hover:to-teal-400 sm:flex-none"
          >
            Accept
          </button>
        </div>

        {/* Optional close (X) — treated the same as Decline */}
        <button
          onClick={() => handleChoice("declined")}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 sm:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
