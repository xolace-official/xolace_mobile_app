import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Stack } from "expo-router";

import { LegendListRef } from "@legendapp/list";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SquareDashedMousePointer } from "lucide-react-native";
import { scheduleOnRN } from "react-native-worklets";
import { LargeTitle } from "../shared/large-title";
import { SearchBar } from "../shared/search-bar";
import { CampfireFilter } from "@/src/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMockJoinedCampfires } from "@/src/features/campfire/manage/hooks/use-mock-joined-campfires";
import { FilterBottomSheet } from "@/src/features/campfire/manage/filter-bottom-sheet";
import { withUniwind } from "uniwind";
import { AppText } from "../builders/app-text";
import { Skeleton, SkeletonGroup } from "heroui-native";

const UniSquareDashedMousePointer = withUniwind(SquareDashedMousePointer);

// Animation constants tuned to match WhatsApp proportions
const _searchBarHeight = 36;
const _searchBarMarginBottomMin = 12;
const _searchBarMarginBottomMax = 36;
const _searchBarMarginBottomDistance =
  _searchBarMarginBottomMax - _searchBarMarginBottomMin;
const _searchBarAnimationDistance =
  _searchBarHeight + _searchBarMarginBottomDistance;

const manageData = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  title: `Discovery Item ${i + 1}`,
  description: "Description for discovery item", // Added mock description
}));

type ManageItem = (typeof manageData)[number];

export const ManageCampfires = () => {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 55;
  const listRef = useRef<LegendListRef>(null);
  const offsetY = useSharedValue(0);

  // filters
  const [activeFilter, setActiveFilter] = useState<CampfireFilter>("all");
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Mock data hook - replace with actual data fetching
  const { campfires, isLoading } = useMockJoinedCampfires("", activeFilter);

  const joinedCount = useMemo(() => {
    return campfires.filter((c) => c.isJoined).length;
  }, [campfires]);

  const handleOpenFilter = () => {
    bottomSheetRef.current?.expand();
  };

  const handleFilterChange = (filter: CampfireFilter) => {
    setActiveFilter(filter);
    bottomSheetRef.current?.close();
  };

  const scrollToOffset = (offset: number) => {
    listRef.current?.scrollToOffset({ offset, animated: true });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      offsetY.value = y;
    },
    onEndDrag: ({ contentOffset: { y } }) => {
      // Snap behavior: settle either fully open (0) or fully collapsed
      if (y <= _searchBarHeight / 2) {
        scheduleOnRN(scrollToOffset, 0);
      }
      if (y > _searchBarHeight / 2 && y < _searchBarAnimationDistance) {
        scheduleOnRN(scrollToOffset, _searchBarAnimationDistance);
      }
    },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: interpolate(
        offsetY.value,
        [0, _searchBarAnimationDistance],
        [0, _searchBarAnimationDistance],
        Extrapolation.CLAMP,
      ),
    };
  });

  const ListHeader = useCallback(() => {
    return (
      <View className="px-5">
        <LargeTitle
          title="Manage Campfires"
          subtitle={`${joinedCount} Joined`}
          offsetY={offsetY}
          searchBarAnimationDistance={_searchBarAnimationDistance}
          className="mb-4"
        />
        <SearchBar
          offsetY={offsetY}
          height={_searchBarHeight}
          marginBottomMin={_searchBarMarginBottomMin}
          marginBottomMax={_searchBarMarginBottomMax}
        />
      </View>
    );
  }, [joinedCount, offsetY]);

  const renderItem = useCallback(({ item }: { item: ManageItem }) => {
    return (
      <View className="flex-row items-center mb-6 px-5">
        <View className="h-12 w-12 rounded-full bg-neutral-900 mr-3" />
        <View>
          <Text className="text-white text-base mb-1">{item.title}</Text>
          <View className="h-4 w-24 bg-neutral-900 rounded-full opacity-60" />
        </View>
      </View>
    );
  }, []);

  const EmptyComponent = () => {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <AppText className="text-center text-base text-muted-foreground">
          You haven&apos;t joined any campfires yet.
        </AppText>
      </View>
    );
  };

  const LoadingComponent = () => {
    return (
      <View className="flex-1 items-center justify-center py-5 gap-3 px-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SkeletonGroup
            key={item}
            isLoading={isLoading}
            isSkeletonOnly
            variant={"shimmer"}
            className="flex-row items-center gap-3"
          >
            <SkeletonGroup.Item className="size-12 rounded-xl" />
            <View className="flex-1 gap-1.5">
              <SkeletonGroup.Item className="h-4 w-full rounded-md" />
              <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
            </View>
          </SkeletonGroup>
        ))}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable className="pl-1" onPress={handleOpenFilter}>
              <UniSquareDashedMousePointer
                size={30}
                className="text-foreground"
              />
            </Pressable>
          ),
        }}
      />
      <Animated.View style={rContainerStyle} className="flex-1 bg-background">
        <AnimatedLegendList
          ref={listRef}
          data={isLoading ? [] : manageData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={scrollHandler}
          scrollEventThrottle={1000 / 60}
          ListHeaderComponent={ListHeader}
          ListHeaderComponentStyle={{ paddingTop: headerHeight }}
          ListEmptyComponent={isLoading ? LoadingComponent : EmptyComponent}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={72}
        />
      </Animated.View>

      <FilterBottomSheet
        ref={bottomSheetRef}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
    </>
  );
};
