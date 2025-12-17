/* eslint-disable expo/no-dynamic-env-var */
// src/config/cache.config.ts

/**
 * Cache Configuration for Xolace
 *
 * - Centralized React Query cache tuning
 * - EXPO_PUBLIC_ env overrides (safe for client)
 * - Designed for mobile networks + “feels instant” UX
 */

const getEnvNumber = (key: string, fallback: number): number => {
  const value = process.env[key];
  if (value === undefined || value === "") return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const minutesToMs = (minutes: number): number => {
  // -1 means "never stale" (Infinity)
  if (minutes < 0) return Infinity;
  return minutes * 60 * 1000;
};

const secondsToMs = (seconds: number): number => {
  if (seconds < 0) return Infinity;
  return seconds * 1000;
};

// Defaults (minutes)
// Notes:
// - Feeds change often, so keep staleTime low.
// - Reference/metadata lists can be "never stale" (Infinity) and refreshed via invalidation/mutations.
const DEFAULT_STALE_TIME_MINUTES = 3;
const DEFAULT_GC_TIME_MINUTES = 24 * 60; // 24h

const DEFAULT_FEED_STALE_TIME_SECONDS = 60; // 1 min
const DEFAULT_POST_DETAIL_STALE_TIME_MINUTES = 5;
const DEFAULT_COMMENTS_STALE_TIME_SECONDS = 30;

const DEFAULT_CAMPFIRES_STALE_TIME_MINUTES = 10;
const DEFAULT_TAGS_STALE_TIME_MINUTES = -1; // rarely changes, refresh via invalidation
const DEFAULT_DAILY_PROMPTS_STALE_TIME_MINUTES = -1; // daily + invalidation is enough
const DEFAULT_HEALTH_TIPS_STALE_TIME_MINUTES = -1;

const DEFAULT_VIDEOS_STALE_TIME_MINUTES = 5;

// Notifications often contain sensitive text + need freshness.
// (We usually do NOT persist these later.)
const DEFAULT_NOTIFICATIONS_STALE_TIME_SECONDS = 15;

export const CACHE_CONFIG = {
  /**
   * Global query defaults (can be overridden per-query)
   */
  defaultStaleTime: minutesToMs(
    getEnvNumber("EXPO_PUBLIC_CACHE_STALE_TIME_MINUTES", DEFAULT_STALE_TIME_MINUTES),
  ),

  /**
   * How long unused cache stays in memory before GC
   * If we add persistence later, keep gcTime >= persistence.maxAge.
   */
  gcTime: minutesToMs(getEnvNumber("EXPO_PUBLIC_CACHE_GC_TIME_MINUTES", DEFAULT_GC_TIME_MINUTES)),

  /**
   * Resource-specific policies we know about today
   */
  feed: {
    // fast-moving + “feels live”
    staleTime: secondsToMs(
      getEnvNumber("EXPO_PUBLIC_FEED_CACHE_STALE_TIME_SECONDS", DEFAULT_FEED_STALE_TIME_SECONDS),
    ),
  },

  posts: {
    detailStaleTime: minutesToMs(
      getEnvNumber(
        "EXPO_PUBLIC_POST_DETAIL_CACHE_STALE_TIME_MINUTES",
        DEFAULT_POST_DETAIL_STALE_TIME_MINUTES,
      ),
    ),
    commentsStaleTime: secondsToMs(
      getEnvNumber(
        "EXPO_PUBLIC_COMMENTS_CACHE_STALE_TIME_SECONDS",
        DEFAULT_COMMENTS_STALE_TIME_SECONDS,
      ),
    ),
  },

  campfires: {
    staleTime: minutesToMs(
      getEnvNumber(
        "EXPO_PUBLIC_CAMPFIRES_CACHE_STALE_TIME_MINUTES",
        DEFAULT_CAMPFIRES_STALE_TIME_MINUTES,
      ),
    ),
  },

  tags: {
    staleTime: minutesToMs(
      getEnvNumber("EXPO_PUBLIC_TAGS_CACHE_STALE_TIME_MINUTES", DEFAULT_TAGS_STALE_TIME_MINUTES),
    ),
  },

  dailyPrompts: {
    staleTime: minutesToMs(
      getEnvNumber(
        "EXPO_PUBLIC_DAILY_PROMPTS_CACHE_STALE_TIME_MINUTES",
        DEFAULT_DAILY_PROMPTS_STALE_TIME_MINUTES,
      ),
    ),
  },

  healthTips: {
    staleTime: minutesToMs(
      getEnvNumber(
        "EXPO_PUBLIC_HEALTH_TIPS_CACHE_STALE_TIME_MINUTES",
        DEFAULT_HEALTH_TIPS_STALE_TIME_MINUTES,
      ),
    ),
  },

  videos: {
    staleTime: minutesToMs(
      getEnvNumber("EXPO_PUBLIC_VIDEOS_CACHE_STALE_TIME_MINUTES", DEFAULT_VIDEOS_STALE_TIME_MINUTES),
    ),
  },

  notifications: {
    staleTime: secondsToMs(
      getEnvNumber(
        "EXPO_PUBLIC_NOTIFICATIONS_CACHE_STALE_TIME_SECONDS",
        DEFAULT_NOTIFICATIONS_STALE_TIME_SECONDS,
      ),
    ),
  },

  /**
   * Global refetch policy (mobile-friendly)
   */
  refetch: {
    onWindowFocus: false,
    onReconnect: true,
    onMount: false,
  },

  retry: {
    count: 2,
    delay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 15000),
  },

  /**
   * Persistence settings (we’ll wire this later in the persister step)
   * Keep maxAge <= gcTime
   */
  persistence: {
    storageKey: "xolace-query-cache",
    maxAge: 24 * 60 * 60 * 1000, // 24h
    throttleTime: 1000,
  },
} as const;
