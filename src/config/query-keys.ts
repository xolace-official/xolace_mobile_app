// src/config/query-keys.ts

export type FeedFilterOption = "latest" | "popular" | "trending" | "campfires";

export const queryKeys = {
  // Feed
  feed: {
    all: ["feed"] as const,
    list: (args: { filter: FeedFilterOption; cursor?: string | null; campfireId?: string | null }) =>
      [...queryKeys.feed.all, "list", args] as const,
  },

  // Posts
  posts: {
    all: ["posts"] as const,
    detail: (postId: string) => [...queryKeys.posts.all, "detail", postId] as const,
    comments: (postId: string, args?: { cursor?: string | null }) =>
      [...queryKeys.posts.all, "comments", postId, args ?? {}] as const,
  },

  // Campfires
  campfires: {
    all: ["campfires"] as const,
    list: (args?: { query?: string; cursor?: string | null }) =>
      [...queryKeys.campfires.all, "list", args ?? {}] as const,
    detail: (campfireId: string) => [...queryKeys.campfires.all, "detail", campfireId] as const,
    members: (campfireId: string, args?: { cursor?: string | null }) =>
      [...queryKeys.campfires.all, "members", campfireId, args ?? {}] as const,
  },

  // Daily prompts + responses (you already have daily_prompts/prompt_responses)
  dailyPrompts: {
    all: ["dailyPrompts"] as const,
    today: () => [...queryKeys.dailyPrompts.all, "today"] as const,
    byDate: (isoDate: string) => [...queryKeys.dailyPrompts.all, "date", isoDate] as const,
  },

  // Health tips
  healthTips: {
    all: ["healthTips"] as const,
    list: (args?: { tag?: string; cursor?: string | null }) =>
      [...queryKeys.healthTips.all, "list", args ?? {}] as const,
    detail: (tipId: string) => [...queryKeys.healthTips.all, "detail", tipId] as const,
  },

  // Videos
  videos: {
    all: ["videos"] as const,
    list: (args?: { cursor?: string | null }) => [...queryKeys.videos.all, "list", args ?? {}] as const,
    detail: (videoId: string) => [...queryKeys.videos.all, "detail", videoId] as const,
  },

  // Notifications (we’ll likely avoid persisting these later)
  notifications: {
    all: ["notifications"] as const,
    list: (args?: { cursor?: string | null }) =>
      [...queryKeys.notifications.all, "list", args ?? {}] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
