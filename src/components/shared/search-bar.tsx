import { IconSymbol } from "../ui/icon-symbol";
import React, { FC } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TextField } from "heroui-native";

type Props = {
  offsetY: SharedValue<number>;
  height: number;
  marginBottomMin: number;
  marginBottomMax: number;
  style?: Omit<ViewStyle, "height" | "margin" | "marginBottom">;
};

export const SearchBar: FC<Props> = ({
  offsetY,
  height,
  marginBottomMin,
  marginBottomMax,
  style,
}) => {
  // Two-stage collapse: (1) height shrinks to 0 within `height` px scroll, (2) margin reduces to compact spacing
  // Keeps layout stable and visually mirrors WhatsApp's search collapse behavior
  const rHeightStyle = useAnimatedStyle(() => {
    return {
      // Height interpolation: 0 → height scroll maps to height → 0, clamped to avoid negative heights
      height: interpolate(offsetY?.value ?? 0, [0, height], [height, 0], Extrapolation.CLAMP),
      // Margin interpolation: stays at max while height collapses, then eases to min after height reaches 0
      // Input: [0, height, height + (max-min)] → Output: [max, max, min]
      marginBottom: interpolate(
        offsetY?.value ?? 0,
        [0, height, height + marginBottomMax - marginBottomMin],
        [marginBottomMax, marginBottomMax, marginBottomMin],
        Extrapolation.CLAMP
      ),
    };
  });

  const rOpacityStyle = useAnimatedStyle(() => {
    return {
      // Content fades quickly to avoid clipped text during height collapse
      // Input: [0, height/4] → Output: [1, 0], clamped to keep it hidden afterwards
      opacity: interpolate(offsetY?.value ?? 0, [0, height / 4], [1, 0], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View
      className="bg-field rounded-xl justify-center"
      // Style exclusions ensure height/margins are driven only by animated styles
      style={[rHeightStyle, styles.container, style]}
    >
      <Animated.View className="justify-center h-full" style={rOpacityStyle}>
        <TextField>
          <TextField.Input placeholder="Search" className=" text-lg font-semibold">
            <TextField.InputStartContent className="pointer-events-none">
              <IconSymbol name="magnifyingglass" size={16} color="gray" />
            </TextField.InputStartContent>
          </TextField.Input>
        </TextField>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // iOS 16+ continuous curves; inexpensive and matches native feel
    borderCurve: "continuous",
  },
  searchIcon: {
    position: "absolute",
    left: 8,
  },
});
