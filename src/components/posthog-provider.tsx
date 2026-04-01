"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hostname === "localhost") return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      console.warn("PostHog: No API key found");
      return;
    }

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: false,
      },
    });
    console.log("PostHog initialized successfully");
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
