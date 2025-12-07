import React, { FC, use } from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import { AnimatedIndexContext } from "../../../lib/animated-index-context";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from "react-native-reanimated";
import { Image } from 'expo-image';
import { BASE_SPRING_CONFIG } from "../../../lib/constants";
import { SlideItemProps } from "../../../lib/types";

// longevity-deck-onboarding-animation 🔽

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const RedCard: FC<SlideItemProps> = ({ index }) => {
  const { width: screenWidth } = useWindowDimensions();
  const lottieSize = screenWidth * 0.7;

  const { activeIndex } = use(AnimatedIndexContext);

  const rContainerStyle = useAnimatedStyle(() => {
    /**
     * translateX: Red card moves right across multiple slides for extended animation.
     * Interpolation: [index, index+1, index+2] → [0, screenWidth, screenWidth*2]
     * Travels 2x screen width to create dramatic exit effect.
     */
    const translateX = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [0, screenWidth, screenWidth * 2],
      Extrapolation.CLAMP
    );
    /**
     * rotate: Dynamic rotation that changes direction (-2° → -4° → 3°).
     * Interpolation: [index, index+1, index+2] → [-2deg, -4deg, 3deg]
     * Creates a "spinning" effect as card moves across slides.
     */
    const rotate = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [-2, -4, 3],
      Extrapolation.CLAMP
    );
    /**
     * scale: Dramatic size change (1 → 0.98 → 1.2) as card moves.
     * Interpolation: [index, index+1, index+2] → [1, 0.98, 1.2]
     * Shrinks slightly then expands to 120% for emphasis.
     */
    const scale = interpolate(
      activeIndex.get(),
      [index, index + 1, index + 2],
      [1, 0.98, 1.2],
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
      className="absolute w-[45%] aspect-[1/1.4] top-0 left-[28%] rounded-3xl items-center justify-center gap-10 bg-red-500 overflow-hidden"
    >
      <Image
          source={require("@/assets/images/onboarding/onboarding1.png")}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          style={[styles.lottie, { width: lottieSize, height: lottieSize }]}
        />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
  lottie: {
    alignSelf: 'center'
  },
});

// longevity-deck-onboarding-animation 🔼
