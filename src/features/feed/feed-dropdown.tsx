import { View, Text } from "react-native";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import type { IconSymbolName } from "@/src/components/ui/icon-symbol";

import {
  ZeegoDropdownMenuContent,
  ZeegoDropdownMenuItem,
  ZeegoDropdownMenuItemIcon,
  ZeegoDropdownMenuItemTitle,
  ZeegoDropdownMenuRoot,
  ZeegoDropdownMenuTrigger,
} from "@/src/components/ui/zeego-dropdown-menu";

export type FeedFilterOption = "latest" | "popular" | "trending" | "campfires";

interface FeedHeaderTitleDropdownProps {
  selected: FeedFilterOption;
  onSelect: (key: FeedFilterOption) => void;
}

const FILTER_OPTIONS = [
  {
    key: "latest" as const,
    title: "Latest",
    icon: "clock",
  },
  {
    key: "popular" as const,
    title: "Popular",
    icon: "flame",
  },
  {
    key: "trending" as const,
    title: "Trending",
    icon: "trending.up",
  },
  {
    key: "campfires" as const,
    title: "My Campfires",
    icon: "figure.2.and.child.holdinghands",
  },
];

export function FeedDropdown({
  selected,
  onSelect,
}: FeedHeaderTitleDropdownProps) {
  const selectedItem = FILTER_OPTIONS.find((item) => item.key === selected);

  return (
    <ZeegoDropdownMenuRoot>
      <ZeegoDropdownMenuTrigger>
        <View className="bg-muted/50 flex-row items-center gap-1.5 rounded-full border border-black/10 px-4 py-3 dark:border-white/10">
          <Text className="text-foreground text-xl font-semibold">
            {selectedItem?.title || "Campfire"}
          </Text>
          <IconSymbol name="chevron.down" size={16} color="white" />
        </View>
      </ZeegoDropdownMenuTrigger>

      <ZeegoDropdownMenuContent>
        {FILTER_OPTIONS.map((item) => (
          <ZeegoDropdownMenuItem
            key={item.key}
            onSelect={() => onSelect(item.key)}
          >
            <ZeegoDropdownMenuItemTitle>
              {item.title}
            </ZeegoDropdownMenuItemTitle>
            <ZeegoDropdownMenuItemIcon
              ios={{
                name: item.icon as IconSymbolName,
                pointSize: 18,
              }}
              androidIconName={getAndroidIconName(item.key)}
            />
          </ZeegoDropdownMenuItem>
        ))}
      </ZeegoDropdownMenuContent>
    </ZeegoDropdownMenuRoot>
  );
}

function getAndroidIconName(key: FeedFilterOption): string {
  const androidIconMap: Record<FeedFilterOption, string> = {
    latest: "schedule",
    popular: "whatshot",
    trending: "trending_up",
    campfires: "group",
  };

  return androidIconMap[key] || "feed";
}
