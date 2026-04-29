"use client";

import { useEffect, useState } from "react";

const PASSWORD = "kindred-4-29-26";
const COOKIE_NAME = "kindred-auth";
const STORAGE_KEY = "kindred-auth";

export default function KindredPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Restore auth state from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "yes") {
        setAuthed(true);
      }
      setChecking(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      // Set cookie so the proxy lets /kindred-deck.html through
      document.cookie = `${COOKIE_NAME}=yes; path=/; max-age=86400; SameSite=Lax`;
      sessionStorage.setItem(STORAGE_KEY, "yes");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  if (checking) {
    return null;
  }

  if (authed) {
    return (
      <iframe
        src="/kindred-deck.html"
        title="Kindred deck"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F3] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[--color-muted] mb-3">
            Protected
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[--color-foreground]">
            Kindred deck
          </h1>
          <p className="mt-3 text-sm text-[--color-muted]">
            Enter the password to view.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-2.5 rounded-full border border-[#D2D2D7]/80 bg-white/80 backdrop-blur-sm text-sm text-[--color-foreground] placeholder:text-[--color-muted]/60 focus:outline-none focus:border-[--color-foreground]/40 transition-colors"
          />
          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-full bg-[--color-foreground] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View deck
          </button>
          {error && (
            <p className="text-xs text-center text-red-600 mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
