import * as Haptics from "expo-haptics";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";

export type NotificationFilterMode = "status" | "time";
export type NotificationStatusFilter = "all" | "important" | "unread" | "read";
export type NotificationTimeFilter = "all" | "today" | "week" | "month";

export type NotificationFilterOption<T extends string> = {
  value: T;
  label: string;
  icon: string;
};

export const statusFilterOptions: NotificationFilterOption<NotificationStatusFilter>[] =
  [
    { value: "all", label: "All", icon: "bell.badge" },
    { value: "important", label: "Important", icon: "exclamationmark.circle" },
    { value: "unread", label: "Unread", icon: "envelope.badge" },
    { value: "read", label: "Read", icon: "envelope.open" },
  ];

export const timeFilterOptions: NotificationFilterOption<NotificationTimeFilter>[] =
  [
    { value: "all", label: "All time", icon: "calendar" },
    { value: "today", label: "Today", icon: "sun.max" },
    { value: "week", label: "This week", icon: "calendar.badge.clock" },
    { value: "month", label: "This month", icon: "calendar.badge.exclamationmark" },
  ];

type NotificationFilterContextValue = {
  filterMode: NotificationFilterMode;
  setFilterMode: (mode: NotificationFilterMode) => void;
  selectedStatus: NotificationStatusFilter;
  setSelectedStatus: (status: NotificationStatusFilter) => void;
  selectedTimeRange: NotificationTimeFilter;
  setSelectedTimeRange: (range: NotificationTimeFilter) => void;
};

const NotificationFilterContext = createContext<
  NotificationFilterContextValue | undefined
>(undefined);

export function NotificationFilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterMode, setFilterMode] =
    useState<NotificationFilterMode>("status");
  const [selectedStatus, setSelectedStatus] =
    useState<NotificationStatusFilter>("all");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<NotificationTimeFilter>("all");

  const handleModeChange = useCallback((mode: NotificationFilterMode) => {
    Haptics.selectionAsync();
    setFilterMode(mode);
  }, []);

  const handleStatusChange = useCallback(
    (status: NotificationStatusFilter) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedStatus(status);
      handleModeChange("status");
    },
    [handleModeChange]
  );

  const handleTimeChange = useCallback(
    (range: NotificationTimeFilter) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedTimeRange(range);
      handleModeChange("time");
    },
    [handleModeChange]
  );

  const value = useMemo<NotificationFilterContextValue>(
    () => ({
      filterMode,
      setFilterMode: handleModeChange,
      selectedStatus,
      setSelectedStatus: handleStatusChange,
      selectedTimeRange,
      setSelectedTimeRange: handleTimeChange,
    }),
    [
      filterMode,
      selectedStatus,
      selectedTimeRange,
      handleModeChange,
      handleStatusChange,
      handleTimeChange,
    ]
  );

  return (
    <NotificationFilterContext.Provider value={value}>
      {children}
    </NotificationFilterContext.Provider>
  );
}

export function useNotificationFilter() {
  const context = useContext(NotificationFilterContext);
  if (!context) {
    throw new Error(
      "useNotificationFilter must be used within a NotificationFilterProvider"
    );
  }
  return context;
}
