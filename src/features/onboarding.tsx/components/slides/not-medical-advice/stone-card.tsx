import React, { FC, use } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { AnimatedIndexContext } from "../../../lib/animated-index-context";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from "react-native-reanimated";
import { BASE_SPRING_CONFIG } from "../../../lib/constants";
import { SlideItemProps } from "../../../lib/types";
import { Image } from "expo-image";
import { blurhash } from "@/src/constants/image";

export const StoneCard: FC<SlideItemProps> = ({ index }) => {
  const { width: screenWidth } = useWindowDimensions();
  const lottieSize = screenWidth * 0.7;

  const { activeIndex } = use(AnimatedIndexContext);

  const rContainerStyle = useAnimatedStyle(() => {
    /**
     * translateX: Card enters from right (25% screen width), centers, then exits left.
     * Interpolation: [index-1, index, index+1] → [screenWidth*0.25, 0, -screenWidth]
     * Subtle entry from right for smooth transition.
     */
    const translateX = interpolate(
      activeIndex.get(),
      [index - 1, index, index + 1],
      [screenWidth * 0.25, 0, -screenWidth],
      Extrapolation.CLAMP
    );
    /**
     * rotate: Card rotates from 2° to 4° then straightens to 0°.
     * Interpolation: [index-1, index, index+0.5] → [2deg, 4deg, 0deg]
     * Positive rotation creates clockwise tilt effect.
     */
    const rotate = interpolate(
      activeIndex.get(),
      [index - 1, index, index + 0.5],
      [2, 4, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: withSpring(translateX, BASE_SPRING_CONFIG) },
        { rotate: withSpring(`${rotate}deg`, BASE_SPRING_CONFIG) },
      ],
    };
  });

  return (
    <Animated.View
      style={[rContainerStyle, styles.borderCurve]}
      className="absolute top-[10%] left-[50%] w-[42%] aspect-[1/1.4] rounded-3xl items-center justify-center gap-10 bg-stone-300 overflow-hidden"
    >
    <Image
                   source={require("@/assets/images/onboarding/xolace-caution1.png")}
                   placeholder={{ blurhash }}
                   contentFit="contain"
                   transition={1000}
                   style={[{ width: lottieSize, height: lottieSize }]}
                 />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
});

// longevity-deck-onboarding-animation 🔼
