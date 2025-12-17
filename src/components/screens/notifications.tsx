import { IconSymbol } from "@/src/components/ui/icon-symbol";
import {
  NotificationFilterMode,
  NotificationFilterOption,
  NotificationStatusFilter,
  NotificationTimeFilter,
  statusFilterOptions,
  timeFilterOptions,
  useNotificationFilter,
} from "@/src/context/NotificationFilterContext";
import { NotificationFilterTabs } from "@/src/features/notifications/filter-tabs";
import { LegendList } from "@legendapp/list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  important: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome to Xolace",
    body: "Thanks for joining the community. Let’s get you set up with a first post.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    important: true,
  },
  {
    id: "2",
    title: "Someone replied",
    body: "Alex left a reply on your thread. Tap to check the conversation.",
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    read: false,
    important: false,
  },
  {
    id: "3",
    title: "Weekly digest",
    body: "Here’s what you missed this week. Catch up on trending posts.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    important: false,
  },
  {
    id: "4",
    title: "Security reminder",
    body: "Update your recovery email to keep your account protected.",
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    important: true,
  },
  {
    id: "5",
    title: "Creator spotlight",
    body: "See the top creators of the month and follow their journeys.",
    timestamp: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    important: false,
  },
];

const getTimeAgo = (timestamp: string) => {
  const now = Date.now();
  const diffMs = now - new Date(timestamp).getTime();
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
};

const matchesStatus = (item: NotificationItem, status: NotificationStatusFilter) => {
  if (status === "all") return true;
  if (status === "important") return item.important;
  if (status === "unread") return !item.read;
  if (status === "read") return item.read;
  return true;
};

const matchesTimeRange = (item: NotificationItem, range: NotificationTimeFilter) => {
  if (range === "all") return true;

  const now = new Date();
  const createdAt = new Date(item.timestamp);
  const diffMs = now.getTime() - createdAt.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (range === "today") {
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return createdAt.getTime() >= startOfDay;
  }

  if (range === "week") {
    return diffMs <= 7 * oneDay;
  }

  if (range === "month") {
    return diffMs <= 30 * oneDay;
  }

  return true;
};

const getFilterOptions = (
  mode: NotificationFilterMode
): NotificationFilterOption<NotificationStatusFilter | NotificationTimeFilter>[] =>
  mode === "status" ? statusFilterOptions : timeFilterOptions;

export const Notifications = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 44;
  const bottomTabHeight = useBottomTabBarHeight();
  const { filterMode, selectedStatus, selectedTimeRange, setSelectedStatus, setSelectedTimeRange } =
    useNotificationFilter();

  const filteredNotifications = useMemo(() => {
    if (filterMode === "status") {
      return notifications.filter((notification) => matchesStatus(notification, selectedStatus));
    }

    return notifications.filter((notification) =>
      matchesTimeRange(notification, selectedTimeRange)
    );
  }, [filterMode, selectedStatus, selectedTimeRange]);

  const activeFilterValue = filterMode === "status" ? selectedStatus : selectedTimeRange;

  const handleFilterChange = (value: NotificationStatusFilter | NotificationTimeFilter) => {
    if (filterMode === "status") {
      setSelectedStatus(value as NotificationStatusFilter);
    } else {
      setSelectedTimeRange(value as NotificationTimeFilter);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <LegendList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="gap-2 pb-4">
            <View className="flex-between flex-row px-2">
              <Text className="text-lg font-semibold text-foreground">Filters</Text>
              <Text className="text-destructive">Delete All</Text>
            </View>
            <NotificationFilterTabs
              options={getFilterOptions(filterMode)}
              activeValue={activeFilterValue}
              onChange={handleFilterChange}
            />
          </View>
        }
        ListHeaderComponentStyle={{ marginBottom: 4 }}
        renderItem={({ item }) => <NotificationCard item={item} />}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle={{
          paddingBottom: bottomTabHeight,
          paddingVertical: 16,
          paddingTop: headerHeight + 20,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="text-base font-semibold text-foreground">Nothing here yet</Text>
            <Text className="text-sm text-muted-foreground">
              Adjust your filters or check back later.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        recycleItems
      />
    </View>
  );
};

const NotificationCard = ({ item }: { item: NotificationItem }) => {
  return (
    <Pressable
      className={`flex-row gap-3 rounded-2xl border border-divider px-4 py-2 ${item.read ? "bg-surface/30" : "bg-surface/70"}`}
    >
      <View
        className={`h-12 w-12 items-center justify-center rounded-xl ${
          item.important ? "bg-primary/20" : "bg-muted/40"
        }`}
      >
        <IconSymbol
          name={item.important ? "exclamationmark" : item.read ? "envelope.open" : "envelope.badge"}
          color={item.important ? "#ff99c8" : "#e5e5e5"}
          size={22}
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-start justify-between">
          <Text className="flex-1 text-base font-semibold text-foreground" numberOfLines={1}>
            {item.title}
          </Text>
          <Text className="ml-2 text-xs text-muted-foreground">{getTimeAgo(item.timestamp)}</Text>
        </View>
        <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={2}>
          {item.body}
        </Text>

        <View className="mt-1 flex-row items-center gap-2">
          <View
            className={`rounded-full px-2 py-1 ${item.important ? "bg-primary/20" : "bg-muted/50"}`}
          >
            <Text
              className={`text-xs font-semibold ${
                item.important ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {item.important ? "Important" : item.read ? "Read" : "Unread"}
            </Text>
          </View>
          {!item.read && <View className="h-2 w-2 rounded-full bg-primary" />}
        </View>
      </View>
    </Pressable>
  );
};
