// src/context/query-provider.tsx
"use client";

import type { ReactNode } from "react";
import React, { useMemo, useState } from "react";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";

import { CACHE_CONFIG } from "@/src/config/cache.config";
import { createXolaceQueryPersister } from "@/src/utils/query-persister";

/**
 * Create and configure the QueryClient instance
 * - Mobile-friendly defaults
 * - No global refetchInterval
 * - offlineFirst network mode
 */
const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: CACHE_CONFIG.defaultStaleTime,
        gcTime: CACHE_CONFIG.gcTime,

        refetchOnWindowFocus: CACHE_CONFIG.refetch.onWindowFocus,
        refetchOnReconnect: CACHE_CONFIG.refetch.onReconnect,
        refetchOnMount: CACHE_CONFIG.refetch.onMount,

        retry: CACHE_CONFIG.retry.count,
        retryDelay: CACHE_CONFIG.retry.delay,

        networkMode: "offlineFirst",
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
        networkMode: "offlineFirst",
      },
    },
  });
};

export function QueryProvider({ children }: { children: ReactNode }) {
  // Keep stable instances for the lifetime of the app
  const [queryClient] = useState(() => createQueryClient());

  /**
   * IMPORTANT:
   * - Pass a stable, user-scoped persister to avoid cache bleeding across users.
   * - For now we scope as "anon" until you wire your Supabase auth listener
   *   to provide a real profile/user id.
   *
   * When you’re ready, replace `userId: null` with something like:
   *   const userId = useAppStore((s) => s.userId) OR from Supabase session
   */
  const persister = useMemo(
    () =>
      createXolaceQueryPersister({
        userId: null, // TODO: replace with real user id when available
        buster: "xolace-cache-v1", // bump when you need to invalidate all persisted caches
      }),
    [],
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: CACHE_CONFIG.persistence.maxAge,
        dehydrateOptions: {
          /**
           * V1 rule: Persist only successful queries.
           * Next step: add exclusions (notifications, inbox/messages, reports, etc.)
           * and/or meta.persist === false.
           */
          shouldDehydrateQuery: (query) => query.state.status === "success",
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
