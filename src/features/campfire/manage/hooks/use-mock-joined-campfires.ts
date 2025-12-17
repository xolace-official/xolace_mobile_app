// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/hooks/use-mock-joined-campfires.ts
import { useEffect, useMemo, useState } from "react";

import type { CampfireFilter, UserCampfireFavoriteJoin } from "@/src/types";

const MOCK_CAMPFIRES: UserCampfireFavoriteJoin[] = [
  {
    campfireId: "1",
    name: "x/KTU Chaper",
    slug: "ktu-chaper",
    description: "This is the best isnt it then",
    members: 4,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-01-15T10:00:00Z",
    role: "camper",
  },
  {
    campfireId: "2",
    name: "Health Minines",
    slug: "health-minines",
    description: "This is a community for health discussions and wellness tips",
    members: 12,
    purpose: "support circle",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-01-20T14:30:00Z",
    role: "firekeeper",
  },
  {
    campfireId: "3",
    name: "x/ktu diaries",
    slug: "ktu-diaries",
    description: "KTU Diaries is where campus life unfolds",
    members: 16,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-02-01T09:15:00Z",
    role: "camper",
    favoritedAt: "2024-02-05T12:00:00Z",
  },
  {
    campfireId: "4",
    name: "Creative Tech Hub",
    slug: "creative-tech-hub",
    description: "A space for creative technologists to share and collaborate",
    members: 23,
    purpose: "creative outlet",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-02-10T16:45:00Z",
    role: "firestarter",
    favoritedAt: "2024-02-10T16:45:00Z",
  },
  {
    campfireId: "5",
    name: "Study Squad",
    slug: "study-squad",
    description: "Group study sessions and academic support",
    members: 8,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-02-15T11:20:00Z",
    role: "camper",
  },
  {
    campfireId: "6",
    name: "Deep Talk Club",
    slug: "deep-talk-club",
    description:
      "A safe space for deep, meaningful conversations about life and philosophy.",
    members: 15,
    purpose: "support circle",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-02-20T18:00:00Z",
    role: "camper",
    favoritedAt: "2024-02-21T09:00:00Z",
  },
  {
    campfireId: "7",
    name: "Design Systems",
    slug: "design-systems",
    description:
      "Discussing UI/UX patterns, accessibility, and component libraries.",
    members: 42,
    purpose: "creative outlet",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-02-25T14:20:00Z",
    role: "firestarter",
  },
  {
    campfireId: "8",
    name: "Weekend Hikers",
    slug: "weekend-hikers",
    description:
      "Planning outdoor adventures and trail explorations for the weekend.",
    members: 30,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-01T08:15:00Z",
    role: "camper",
  },
  {
    campfireId: "9",
    name: "Book Worms",
    slug: "book-worms",
    description:
      "Monthly book reviews and reading challenges for literature lovers.",
    members: 12,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-03-05T19:30:00Z",
    role: "firekeeper",
    favoritedAt: "2024-03-06T10:00:00Z",
  },
  {
    campfireId: "10",
    name: "Indie Hackers",
    slug: "indie-hackers",
    description:
      "Building profitable side projects and bootstrapping startups.",
    members: 150,
    purpose: "creative outlet",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-03-10T11:00:00Z",
    role: "camper",
    favoritedAt: "2024-03-10T11:05:00Z",
  },
  {
    campfireId: "11",
    name: "Midnight Coders",
    slug: "midnight-coders",
    description: "Late night coding sessions, coffee, and debugging together.",
    members: 55,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-12T23:45:00Z",
    role: "camper",
  },
  {
    campfireId: "12",
    name: "Yoga & Meditation",
    slug: "yoga-and-meditation",
    description:
      "Mindfulness practices and virtual yoga sessions for inner peace.",
    members: 20,
    purpose: "support circle",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-15T06:30:00Z",
    role: "camper",
  },
  {
    campfireId: "13",
    name: "Startup Founders",
    slug: "startup-founders",
    description:
      "Pitch decks, funding strategies, and networking for founders.",
    members: 89,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-03-18T15:10:00Z",
    role: "firestarter",
    favoritedAt: "2024-03-19T09:20:00Z",
  },
  {
    campfireId: "14",
    name: "Gaming Lounge",
    slug: "gaming-lounge",
    description:
      "Casual gaming nights, esports discussion, and looking for group.",
    members: 200,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-20T20:00:00Z",
    role: "camper",
  },
  {
    campfireId: "15",
    name: "Plant Parents",
    slug: "plant-parents",
    description:
      "Indoor gardening tips, plant propagation, and green thumb advice.",
    members: 33,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-03-22T13:40:00Z",
    role: "camper",
    favoritedAt: "2024-03-22T13:45:00Z",
  },
  {
    campfireId: "16",
    name: "Photography Club",
    slug: "photography-club",
    description: "Sharing shots, gear talk, and weekly photo challenges.",
    members: 45,
    purpose: "creative outlet",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-25T10:15:00Z",
    role: "camper",
  },
  {
    campfireId: "17",
    name: "Music Producers",
    slug: "music-producers",
    description:
      "Beat making, mixing, mastering, and music theory discussions.",
    members: 28,
    purpose: "creative outlet",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-03-28T17:50:00Z",
    role: "firekeeper",
  },
  {
    campfireId: "18",
    name: "Fitness Freaks",
    slug: "fitness-freaks",
    description: "Gym partners, workout plans, and nutrition advice.",
    members: 60,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-04-01T07:00:00Z",
    role: "camper",
    favoritedAt: "2024-04-01T07:05:00Z",
  },
  {
    campfireId: "19",
    name: "Cooking 101",
    slug: "cooking-101",
    description: "Sharing recipes, cooking techniques, and food photos.",
    members: 25,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-04-05T18:30:00Z",
    role: "camper",
  },
  {
    campfireId: "20",
    name: "Language Exchange",
    slug: "language-exchange",
    description: "Practice speaking new languages with native speakers.",
    members: 18,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-04-08T12:00:00Z",
    role: "camper",
  },
  {
    campfireId: "21",
    name: "Crypto Traders",
    slug: "crypto-traders",
    description: "Market analysis, blockchain tech, and trading strategies.",
    members: 300,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-04-10T09:30:00Z",
    role: "camper",
    favoritedAt: "2024-04-10T09:35:00Z",
  },
  {
    campfireId: "22",
    name: "Pet Lovers",
    slug: "pet-lovers",
    description: "Cute pet photos, training tips, and animal care discussions.",
    members: 50,
    purpose: "support circle",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-04-12T16:15:00Z",
    role: "camper",
    favoritedAt: "2024-04-12T16:20:00Z",
  },
  {
    campfireId: "23",
    name: "Movie Buffs",
    slug: "movie-buffs",
    description:
      "Film criticism, movie recommendations, and cinema appreciation.",
    members: 40,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-04-15T21:00:00Z",
    role: "firestarter",
  },
  {
    campfireId: "24",
    name: "Sustainable Living",
    slug: "sustainable-living",
    description:
      "Eco-friendly tips, zero waste lifestyle, and environmental issues.",
    members: 22,
    purpose: "growth group",
    iconURL: undefined,
    isFavorite: false,
    isJoined: true,
    joinedAt: "2024-04-18T10:45:00Z",
    role: "camper",
  },
  {
    campfireId: "25",
    name: "Digital Nomads",
    slug: "digital-nomads",
    description:
      "Remote work lifestyle, travel tips, and coworking recomendations.",
    members: 77,
    purpose: "general discussion",
    iconURL: undefined,
    isFavorite: true,
    isJoined: true,
    joinedAt: "2024-04-20T14:50:00Z",
    role: "camper",
    favoritedAt: "2024-04-20T14:55:00Z",
  },
];

export function useMockJoinedCampfires(
  searchQuery: string,
  filter: CampfireFilter,
) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery, filter]);

  const campfires = useMemo(() => {
    let filtered = MOCK_CAMPFIRES;

    // Apply filter
    if (filter === "favorites") {
      filtered = filtered.filter((c) => c.isFavorite);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [searchQuery, filter]);

  return { campfires, isLoading };
}
