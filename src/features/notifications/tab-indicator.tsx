import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { _borderColor, _borderCurve, _borderRadius } from "./tab-item";

const _duration = 200;

type Props = {
  activeIndex: number;
  tabBarOffsetX: SharedValue<number>;
  tabWidths: SharedValue<number[]>;
  tabOffsets: SharedValue<number[]>;
};

export function TabIndicator({
  activeIndex,
  tabBarOffsetX,
  tabWidths,
  tabOffsets,
}: Props) {
  const rIndicatorStyle = useAnimatedStyle(() => {
    const indices = Object.keys(tabOffsets.value).map(Number);

    const left = withTiming(
      interpolate(activeIndex, indices, tabOffsets.value),
      { duration: _duration }
    );

    const width = withTiming(
      interpolate(activeIndex, indices, tabWidths.value),
      { duration: _duration }
    );

    return {
      left,
      width,
      transform: [{ translateX: -tabBarOffsetX.value }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute h-full bg-primary/15 border border-primary/30"
      style={[rIndicatorStyle, styles.container]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: _borderRadius,
    borderColor: _borderColor,
    borderCurve: _borderCurve as any,
  },
});
