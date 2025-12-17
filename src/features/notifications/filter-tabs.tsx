import { NotificationFilterOption } from "@/src/context/NotificationFilterContext";
import React, { useRef, useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { TabIndicator } from "./tab-indicator";
import { TabItem } from "./tab-item";
import { useMeasureFlatListTabsLayout } from "./use-measure-flat-list-tabs-layout";

const _sidePadding = 16;
const _gap = 8;

type Props<T extends string> = {
  options: NotificationFilterOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
};

export function NotificationFilterTabs<T extends string>({
  options,
  activeValue,
  onChange,
}: Props<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === activeValue),
  );

  const { tabWidths, tabOffsets } = useMeasureFlatListTabsLayout({
    tabsLength: options.length,
    sidePadding: _sidePadding,
    gap: _gap,
  });

  const ref = useRef<FlatList<NotificationFilterOption<T>>>(null);
  const offsetX = useSharedValue(0);
  const [viewableItems, setViewableItems] = useState<ViewToken[]>([]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      offsetX.value = event.contentOffset.x;
    },
  });

  const handleItemPress = (index: number) => {
    onChange(options[index].value);

    const isPrevItemVisible = viewableItems.some(
      (item) => item.index === index - 1,
    );
    const isCurrentItemVisible = viewableItems.some(
      (item) => item.index === index,
    );

    const viewPosition = isPrevItemVisible ? 1 : 0;
    const viewOffset = isPrevItemVisible ? -_sidePadding : _sidePadding;

    if (!isCurrentItemVisible) {
      ref.current?.scrollToIndex({ index, viewPosition, viewOffset });
    }
  };

  return (
    <View className="mt-2">
      <TabIndicator
        activeIndex={activeIndex}
        tabBarOffsetX={offsetX}
        tabOffsets={tabOffsets}
        tabWidths={tabWidths}
      />
      <Animated.FlatList
        ref={ref}
        data={options}
        keyExtractor={(item) => item.value}
        renderItem={({ item, index }) => (
          <TabItem
            label={item.label}
            icon={item.icon}
            value={item.value}
            isActive={item.value === activeValue}
            onPress={() => handleItemPress(index)}
            onLayout={({ nativeEvent }) => {
              const { width } = nativeEvent.layout;

              tabWidths.modify((value) => {
                "worklet";
                value[index] = width;
                return value;
              });
            }}
          />
        )}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: _sidePadding,
          gap: _gap,
          paddingVertical: 2,
        }}
        extraData={activeValue}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={1000 / 60}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
          minimumViewTime: 16,
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          setViewableItems(viewableItems);
        }}
      />
    </View>
  );
}
