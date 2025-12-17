import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

// Helper to render icon
const Icon = ({ name, color, size }: { name: any; color: string; size: number }) => (
  <Feather name={name} size={size} color={color} />
);

export const sections = [
  {
    title: "Recent",
    data: [
      { id: "1", title: "Project Phoenix", icon: "clock" },
      { id: "2", title: "Q3 Roadmap", icon: "clock" },
      { id: "3", title: "Design System", icon: "clock" },
    ],
  },
  {
    title: "Suggested",
    data: [
      { id: "4", title: "My Issues", icon: "circle" },
      { id: "5", title: "Active Cycles", icon: "grid" },
      { id: "6", title: "Backlog", icon: "grid" },
    ],
  },
  {
    title: "Trending",
    data: [
      { id: "7", title: "Mobile App Refactor", icon: "trending-up" },
      { id: "8", title: "API Performance", icon: "zap" }, // Flame -> Zap (closest in Feather)
      { id: "9", title: "User Onboarding", icon: "star" },
    ],
  },
];

export const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
  <View className="px-4 py-2 mt-2">
    <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">{title}</Text>
  </View>
);

export const renderListItem = ({ item }: { item: any }) => {
  return (
    <View className="flex-row items-center px-4 py-3 gap-3 active:bg-white/5 mx-2 rounded-xl">
      <View className="w-8 h-8 items-center justify-center bg-white/5 rounded-lg">
        <Icon name={item.icon} size={16} color="#a3a3a3" />
      </View>
      <Text className="text-neutral-200 text-[15px] font-medium">{item.title}</Text>
    </View>
  );
};
