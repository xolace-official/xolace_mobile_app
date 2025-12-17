import React, { FC, use } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { AnimatedIndexContext } from "../../../lib/animated-index-context";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from "react-native-reanimated";
import { BASE_SPRING_CONFIG } from "../../../lib/constants";
import { SlideItemProps } from "../../../lib/types";
import { blurhash } from "@/src/constants/image";

export const StoneCard: FC<SlideItemProps> = ({ index }) => {
  const { width: screenWidth } = useWindowDimensions();
  const lottieSize = screenWidth * 0.7;

  const { activeIndex } = use(AnimatedIndexContext);

  const rContainerStyle = useAnimatedStyle(() => {
    /**
     * translateX: Card enters from right (40% screen width), centers, then exits left.
     * Interpolation: [index-0.25, index, index+1] → [screenWidth/2.5, 0, -screenWidth]
     * Starts earlier (index-0.25) for smoother entry transition.
     */
    const translateX = interpolate(
      activeIndex.get(),
      [index - 0.25, index, index + 1],
      [screenWidth / 2.5, 0, -screenWidth],
      Extrapolation.CLAMP
    );
    /**
     * rotate: Straightens card from 4° tilt to 0° as slide becomes active.
     * Interpolation: [index, index+0.5] → [4deg, 0deg]
     */
    const rotate = interpolate(
      activeIndex.get(),
      [index, index + 0.5],
      [4, 0],
      Extrapolation.CLAMP
    );
    /**
     * scale: Slightly shrinks card (1 → 0.97) as slide becomes active.
     * Interpolation: [index, index+0.5] → [1, 0.97]
     */
    const scale = interpolate(
      activeIndex.get(),
      [index, index + 0.5],
      [1, 0.97],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: withSpring(translateX, BASE_SPRING_CONFIG) },
        { rotate: withSpring(`${rotate}deg`, BASE_SPRING_CONFIG) },
        { scale: withSpring(scale, BASE_SPRING_CONFIG) },
      ],
    };
  });

  return (
    <Animated.View
      style={[rContainerStyle, styles.borderCurve]}
      className="absolute top-[10%] left-[50%] w-[42%] aspect-[1/1.4] rounded-3xl items-center justify-center gap-10 bg-stone-300 overflow-hidden"
    >
      <Image
        source={require("@/assets/images/onboarding/onboarding2.png")}
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
