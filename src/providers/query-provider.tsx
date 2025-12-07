"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // sync every 10 minutes
      refetchInterval: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
