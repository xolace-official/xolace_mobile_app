import { Stack } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, View } from "react-native";

import { FilterBottomSheet } from "@/src/features/campfire/manage/filter-bottom-sheet";
import { useMockJoinedCampfires } from "@/src/features/campfire/manage/hooks/use-mock-joined-campfires";
import { JoinedCampfireCard } from "@/src/features/campfire/manage/join-campfire-card";
import { CampfireFilter, UserCampfireFavoriteJoin } from "@/src/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { LegendListRef } from "@legendapp/list";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { Divider, SkeletonGroup } from "heroui-native";
import { SquareDashedMousePointer } from "lucide-react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { withUniwind } from "uniwind";
import { AppText } from "../builders/app-text";
import { LargeTitle } from "../shared/large-title";
import { SearchBar } from "../shared/search-bar";

const UniSquareDashedMousePointer = withUniwind(SquareDashedMousePointer);

// Animation constants tuned to match WhatsApp proportions
const _searchBarHeight = 36;
const _searchBarMarginBottomMin = 12;
const _searchBarMarginBottomMax = 36;
const _searchBarMarginBottomDistance =
  _searchBarMarginBottomMax - _searchBarMarginBottomMin;
const _searchBarAnimationDistance =
  _searchBarHeight + _searchBarMarginBottomDistance;

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

  // Reset scroll position and animation value when loading starts
  // This prevents layout shifts caused by the container padding reacting to stale scroll position
  useEffect(() => {
    if (isLoading) {
      offsetY.value = 0;
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [isLoading, offsetY]);

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

  const renderItem = useCallback(
    ({ item }: { item: UserCampfireFavoriteJoin }) => {
      return <JoinedCampfireCard campfire={item} />;
    },
    [],
  );

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
          data={isLoading ? [] : campfires}
          renderItem={renderItem}
          keyExtractor={(item) => item.campfireId}
          onScroll={scrollHandler}
          scrollEventThrottle={1000 / 60}
          ListHeaderComponent={ListHeader}
          ListHeaderComponentStyle={{ paddingTop: headerHeight }}
          ListEmptyComponent={isLoading ? LoadingComponent : EmptyComponent}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider variant="thin" />}
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
