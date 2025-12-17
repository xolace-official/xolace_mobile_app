// apps/xolace-app/app/(app)/(protected)/(drawer)/(tabs)/manage-campfires/components/filter-bottom-sheet.tsx
import { forwardRef, useMemo } from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/builders/app-text";
import { useThemeColor } from "heroui-native";

import type { CampfireFilter } from "@/src/types";

interface FilterBottomSheetProps {
  activeFilter: CampfireFilter;
  onFilterChange: (filter: CampfireFilter) => void;
}

export const FilterBottomSheet = forwardRef<
  BottomSheet,
  FilterBottomSheetProps
>(({ activeFilter, onFilterChange }, ref) => {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  const snapPoints = useMemo(() => [280], []);

  const filters: { value: CampfireFilter; label: string }[] = [
    { value: "all", label: "All Campfires" },
    { value: "favorites", label: "Favorites" },
  ];

  return (
    <BottomSheet
      ref={ref}
      index={-1}
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
                    ? "bg-primary/10 border-white/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <AppText
                  className={`text-base font-medium ${
                    isActive ? "text-primary" : "text-foreground"
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
