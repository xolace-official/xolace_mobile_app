import { ChevronIndicator } from "@/src/components/search/chevron-indicator";
import {
  renderListItem,
  renderSectionHeader,
  sections,
} from "@/src/components/search/mock-data";
import { SearchInput } from "@/src/components/search/search-input";
import { WithPullToRefresh } from "@/src/components/shared/with-pull-to-refresh";
import { SearchTransitionContext } from "@/src/context/search-transition-context";
import { use } from "react";
import { SectionList, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TRIGGER_THRESHOLD = 200;

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList as any,
) as unknown as typeof SectionList;

export const SearchModal = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { transitionProgress, onCloseSearchModal } = use(
    SearchTransitionContext,
  );

  const rListContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        transitionProgress.value,
        [1, 1.5],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            transitionProgress.value,
            [1, 1.5],
            [0, 20],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            transitionProgress.value,
            [1, 1.5],
            [1, 0.9],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      className="flex-1 bg-background" // Fallback to dark bg if global css differs
      style={[{ paddingTop: insets.top }, rListContainerStyle]}
    >
      <WithPullToRefresh
        refreshThreshold={TRIGGER_THRESHOLD}
        refreshing={false}
        onRefresh={onCloseSearchModal}
        refreshComponent={<ChevronIndicator />}
        lockRefreshViewOnRelease
        refreshComponentContainerClassName="mb-6"
      >
        <AnimatedSectionList
          sections={sections}
          keyExtractor={(item: any, index: number) => `${item.id}-${index}`}
          renderItem={renderListItem}
          renderSectionHeader={renderSectionHeader}
          SectionSeparatorComponent={() => <View className="h-6" />}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{
            paddingTop: 36,
            paddingBottom: height * 0.5,
          }}
        />
      </WithPullToRefresh>
      <SearchInput />
    </Animated.View>
  );
};
