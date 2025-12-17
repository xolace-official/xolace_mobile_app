// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/components/filter-bottom-sheet.tsx
import { forwardRef, useMemo } from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/builders/app-text";
import { useThemeColor } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { CampfireFilter } from "@/src/types";

interface FilterBottomSheetProps {
  activeFilter: CampfireFilter;
  onFilterChange: (filter: CampfireFilter) => void;
}

export const FilterBottomSheet = forwardRef<
  BottomSheet,
  FilterBottomSheetProps
>(({ activeFilter, onFilterChange }, ref) => {
  const themeColorForeground = useThemeColor("overlay-foreground");
  const themeColorBackground = useThemeColor("overlay");

  const snapPoints = useMemo(() => [280], []);
  const insets = useSafeAreaInsets();

  const filters: { value: CampfireFilter; label: string }[] = [
    { value: "all", label: "All Campfires" },
    { value: "favorites", label: "Favorites" },
  ];

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      detached
      bottomInset={insets.bottom + 32}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
        />
      )}
      backgroundStyle={{
        backgroundColor: themeColorBackground,
      }}
      handleIndicatorStyle={{
        backgroundColor: themeColorForeground,
      }}
    >
      <BottomSheetView className="flex-1 px-6">
        <View className="mb-6">
          <View className="bg-muted-foreground/20 mb-4 h-1 w-16 self-center rounded-full" />
          <AppText className="text-foreground text-center text-2xl font-bold">
            Select Filter
          </AppText>
        </View>

        <View className="gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                onPress={() => onFilterChange(filter.value)}
                className={`rounded-2xl border p-4 active:opacity-70 ${
                  isActive
                    ? "bg-accent border-white/10"
                    : "border-white/10 bg-overlay/95"
                }`}
              >
                <AppText
                  className={`text-base font-medium ${
                    isActive ? "text-accent-foreground" : "text-foreground"
                  }`}
                >
                  {filter.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

FilterBottomSheet.displayName = "FilterBottomSheet";
