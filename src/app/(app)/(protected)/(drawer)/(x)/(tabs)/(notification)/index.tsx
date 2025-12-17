import { Notifications } from "@/src/components/screens/notifications";
import {
  NotificationFilterProvider,
  statusFilterOptions,
  timeFilterOptions,
  useNotificationFilter,
} from "@/src/context/NotificationFilterContext";
import { useNormalHeaderOptions } from "@/src/hooks/useNormalHeaderOptions";
import { Stack } from "expo-router";
import { SFSymbol } from "expo-symbols";

function NotificationContent() {
  const normalHeaderOptions = useNormalHeaderOptions();
  const { filterMode, selectedStatus, selectedTimeRange, setSelectedStatus, setSelectedTimeRange } =
    useNotificationFilter();

  const statusLabel =
    statusFilterOptions.find((option) => option.value === selectedStatus)?.label ?? "Status";
  const timeLabel =
    timeFilterOptions.find((option) => option.value === selectedTimeRange)?.label ?? "Time";

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
          ...normalHeaderOptions,
          unstable_headerRightItems: () => [
            {
              type: "menu",
              label: `Status: ${statusLabel}`,
              icon: {
                name: "bell.badge",
                type: "sfSymbol",
              },
              menu: {
                title: "Status filters",
                items: statusFilterOptions.map((option) => ({
                  type: "action" as const,
                  label: option.label,
                  icon: {
                    name: option.icon as SFSymbol,
                    type: "sfSymbol" as const,
                  },
                  onPress: () => {
                    setSelectedStatus(option.value);
                  },
                  state: filterMode === "status" && selectedStatus === option.value ? "on" : "off",
                })),
              },
            },
            {
              type: "menu",
              label: `Time: ${timeLabel}`,
              icon: {
                name: "calendar",
                type: "sfSymbol",
              },
              menu: {
                title: "Time filters",
                items: timeFilterOptions.map((option) => ({
                  type: "action" as const,
                  label: option.label,
                  icon: {
                    name: option.icon as SFSymbol,
                    type: "sfSymbol" as const,
                  },
                  onPress: () => {
                    setSelectedTimeRange(option.value);
                  },
                  state: filterMode === "time" && selectedTimeRange === option.value ? "on" : "off",
                })),
              },
            },
          ],
        }}
      />
      <Notifications />
    </>
  );
}

export default function NotificationScreen() {
  return (
    <NotificationFilterProvider>
      <NotificationContent />
    </NotificationFilterProvider>
  );
}
