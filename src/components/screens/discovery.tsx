import { LegendListRef } from "@legendapp/list";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import React, { useCallback, useRef } from "react";
import { Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { LargeTitle } from "../shared/large-title";
import { SearchBar } from "../shared/search-bar";

// Animation constants tuned to match WhatsApp proportions
const _searchBarHeight = 36;
const _searchBarMarginBottomMin = 12;
const _searchBarMarginBottomMax = 36;
const _searchBarMarginBottomDistance =
  _searchBarMarginBottomMax - _searchBarMarginBottomMin;
const _searchBarAnimationDistance =
  _searchBarHeight + _searchBarMarginBottomDistance;

// Placeholder discovery items
const discoveryData = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  title: `Discovery Item ${i + 1}`,
  description: "Description for discovery item", // Added mock description
}));

type DiscoveryItem = (typeof discoveryData)[number];

export function Discovery() {
  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + 44;
  const listRef = useRef<LegendListRef>(null);
  const offsetY = useSharedValue(0);

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
      <View className="px-5 ">
        <LargeTitle
          title="Discover Campfires"
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
  }, [offsetY]);

  const renderItem = useCallback(({ item }: { item: DiscoveryItem }) => {
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

  return (
    <Animated.View style={rContainerStyle} className="flex-1 bg-background">
      <AnimatedLegendList
        ref={listRef}
        data={discoveryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={1000 / 60}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={{ paddingTop: headerHeight }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={72}
      />
    </Animated.View>
  );
}
