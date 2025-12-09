import { Notifications } from "@/src/components/screens/notifications";
import {
  NotificationFilterProvider,
  statusFilterOptions,
  timeFilterOptions,
  useNotificationFilter,
} from "@/src/context/NotificationFilterContext";
import { Stack } from "expo-router";
import { useLargeHeaderOptions } from "@/src/hooks/useLargeHeaderOptions";

function NotificationContent() {
  const largeHeaderOptions = useLargeHeaderOptions()
  const {
    filterMode,
    selectedStatus,
    selectedTimeRange,
    setSelectedStatus,
    setSelectedTimeRange,
  } = useNotificationFilter();

  const statusLabel =
    statusFilterOptions.find((option) => option.value === selectedStatus)
      ?.label ?? "Status";
  const timeLabel =
    timeFilterOptions.find((option) => option.value === selectedTimeRange)
      ?.label ?? "Time";

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
          ...largeHeaderOptions,
        headerLargeTitle: false,
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
                    name: option.icon,
                    type: "sfSymbol" as const,
                  },
                  onPress: () => {
                    setSelectedStatus(option.value);
                  },
                  state:
                    filterMode === "status" && selectedStatus === option.value
                      ? "on"
                      : "off",
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
                    name: option.icon,
                    type: "sfSymbol" as const,
                  },
                  onPress: () => {
                    setSelectedTimeRange(option.value);
                  },
                  state:
                    filterMode === "time" && selectedTimeRange === option.value
                      ? "on"
                      : "off",
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
