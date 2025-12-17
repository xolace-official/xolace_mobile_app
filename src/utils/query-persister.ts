// src/utils/query-persister.ts
/**
 * Xolace React Query Cache Persister (MMKV-backed)
 *
 * Goals:
 * - Cross-session cache (faster cold start, better poor-network UX)
 * - Safe expiration via maxAge
 * - Throttled writes (avoid spamming MMKV)
 * - User-scoped cache to prevent “previous user” cache bleed
 *
 * Notes:
 * - This persister is async to match TanStack Persister interface.
 * - We store ONE key per user (or "anon") so switching accounts is safe.
 */

import type {
  Persister,
  PersistedClient,
} from "@tanstack/react-query-persist-client";
import { CACHE_CONFIG } from "@/src/config/cache.config";
import { mmkvStorage } from "@/src/store/storage/mmkv"; // <- your existing adapter

// ---- simple throttle (leading + trailing) ----
function createThrottled<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void | Promise<void>,
  waitMs: number,
) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: TArgs | null = null;

  const run = async (args: TArgs) => {
    last = Date.now();
    pendingArgs = null;
    await fn(...args);
  };

  return async (...args: TArgs) => {
    const now = Date.now();
    const remaining = waitMs - (now - last);

    // execute immediately
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      await run(args);
      return;
    }

    // schedule trailing run
    pendingArgs = args;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        if (pendingArgs) {
          // fire and forget; persister is best-effort
          void run(pendingArgs);
        }
      }, remaining);
    }
  };
}

// ---- storage helpers (MMKV adapter assumed sync; wrap in Promise) ----
const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return mmkvStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    mmkvStorage.setItem(key, value);
  },
  async removeItem(key: string): Promise<void> {
    mmkvStorage.removeItem(key);
  },
};

export type PersisterScope = {
  /**
   * Use a stable per-user identifier (e.g. profiles.id).
   * If null/undefined, we treat as "anon".
   */
  userId?: string | null;

  /**
   * Cache buster: bump this when you change query shapes or want to discard old cache.
   * Example: app build hash, schema version, etc.
   */
  buster?: string;
};

const baseKey = CACHE_CONFIG.persistence.storageKey;
const maxAge = CACHE_CONFIG.persistence.maxAge;
const throttleMs = CACHE_CONFIG.persistence.throttleTime;

const userKey = (userId?: string | null) => `${baseKey}:${userId ?? "anon"}`;

/**
 * Create a persister instance scoped to a user (recommended).
 * If user changes, create a new persister for that user (or clear old cache).
 */
export function createXolaceQueryPersister(scope: PersisterScope = {}): Persister {
  const key = userKey(scope.userId);

  const persist = createThrottled(async (client: PersistedClient) => {
    try {
      const toStore: PersistedClient = {
        ...client,
        // ensure buster is always set (helps with cache invalidation later)
        buster: scope.buster ?? client.buster ?? "",
      };

      await storage.setItem(key, JSON.stringify(toStore));
    } catch (error) {
      console.warn("[XolaceQueryPersister] persistClient failed:", error);
    }
  }, throttleMs);

  return {
    persistClient: async (client: PersistedClient) => {
      await persist(client);
    },

    restoreClient: async (): Promise<PersistedClient | undefined> => {
      try {
        const raw = await storage.getItem(key);
        if (!raw) return undefined;

        const parsed = JSON.parse(raw) as PersistedClient;

        // Validate shape
        if (typeof parsed?.timestamp !== "number" || Number.isNaN(parsed.timestamp)) {
          await storage.removeItem(key);
          return undefined;
        }

        // Enforce expiration
        const age = Date.now() - parsed.timestamp;
        if (age > maxAge) {
          await storage.removeItem(key);
          return undefined;
        }

        // Enforce buster if provided (prevents “old app version cache” issues)
        const expectedBuster = scope.buster ?? "";
        if (expectedBuster && parsed.buster !== expectedBuster) {
          await storage.removeItem(key);
          return undefined;
        }

        return parsed;
      } catch (error) {
        console.warn("[XolaceQueryPersister] restoreClient failed:", error);
        // if corrupt, discard
        try {
          await storage.removeItem(key);
        } catch {
          // ignore
        }
        return undefined;
      }
    },

    removeClient: async (): Promise<void> => {
      try {
        await storage.removeItem(key);
      } catch (error) {
        console.warn("[XolaceQueryPersister] removeClient failed:", error);
      }
    },
  };
}

/**
 * Clear persisted query cache for a user (or anon).
 * Use on logout (important) or "reset cache" actions.
 */
export async function clearXolaceQueryCache(userId?: string | null): Promise<void> {
  try {
    await storage.removeItem(userKey(userId));
  } catch (error) {
    console.warn("[XolaceQueryPersister] clear cache failed:", error);
  }
}

/**
 * Optional: cache metadata for debugging
 */
export async function getXolaceQueryCacheMetadata(userId?: string | null): Promise<{
  exists: boolean;
  timestamp?: number;
  age?: number;
  isExpired?: boolean;
  buster?: string;
} | null> {
  try {
    const raw = await storage.getItem(userKey(userId));
    if (!raw) return { exists: false };

    const parsed = JSON.parse(raw) as PersistedClient;
    if (typeof parsed?.timestamp !== "number" || Number.isNaN(parsed.timestamp)) {
      return { exists: true, isExpired: true };
    }

    const age = Date.now() - parsed.timestamp;
    return {
      exists: true,
      timestamp: parsed.timestamp,
      age,
      isExpired: age > maxAge,
      buster: parsed.buster,
    };
  } catch (error) {
    console.warn("[XolaceQueryPersister] metadata failed:", error);
    return null;
  }
}
