import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { PaginationDots } from "@/src/features/onboarding.tsx/components/pagination-dots";
import { BottomGlow } from "@/src/features/onboarding.tsx/components/bottom-glow";
import { OnboardingSlideContainer } from "@/src/features/onboarding.tsx/components/onboarding-slide-container";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import { Welcome } from "@/src/features/onboarding.tsx/components/slides/welcome";
import { SafeSpace } from "@/src/features/onboarding.tsx/components/slides/safe-space";
import { FindYourPeople } from "@/src/features/onboarding.tsx/components/slides/find-your-people";
import { GrowAndHeal } from "@/src/features/onboarding.tsx/components/slides/grow-and-heal";
import { NotMedicalAdvice } from "@/src/features/onboarding.tsx/components/slides/not-medical-advice";
import { AnimatedIndexContext } from "@/src/features/onboarding.tsx/lib/animated-index-context";

// longevity-deck-onboarding-animation 🔽

/**
 * Creates an animated Pressable component to enable spring animations on button.
 * Required because Pressable isn't natively animatable - see Reanimated docs:
 * https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent
 */
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Color palette for bottom glow gradient, one color per slide.
 * Interpolated via HSV color space for smooth transitions between slides.
 */
const PALETTE = ["#321A48", "#192444", "#44382A", "#1C3F2D", "#391C1D"];

const TOTAL_SLIDES = 5;

export const Onboarding = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  /**
   * Shared values that drive all animations:
   * - scrollOffsetX: Raw pixel offset from scroll (for future use)
   * - activeIndex: Normalized slide index (0-4), computed from scroll position
   */
  const scrollOffsetX = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  /**
   * Handles scroll events and updates shared values on the UI thread.
   * activeIndex calculation: offsetX / width converts pixel position to slide index.
   * This runs at 60fps via scrollEventThrottle={16} for smooth animations.
   */
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offsetX = event.contentOffset.x;
    scrollOffsetX.set(offsetX);
    activeIndex.set(offsetX / width);
  });

  /**
   * Animates "I understand" button fade-in on the last slide.
   * Interpolation: [beforeLastIndex, lastIndex] → [0, 1] opacity
   * CLAMP prevents opacity > 1 if user scrolls beyond last slide.
   * pointerEvents: "none" prevents taps before button is visible.
   */
  const rButtonStyle = useAnimatedStyle(() => {
    const beforeLastIndex = TOTAL_SLIDES - 2;
    const lastIndex = TOTAL_SLIDES - 1;

    return {
      opacity: interpolate(
        activeIndex.get(),
        [beforeLastIndex, lastIndex],
        [0, 1],
        Extrapolation.CLAMP
      ),
      pointerEvents: activeIndex.get() === lastIndex ? "auto" : "none",
    };
  }, [width]);

  return (
    <AnimatedIndexContext value={{ activeIndex }}>
      <View className="flex-1 bg-[#161522]" style={{ paddingBottom: insets.bottom + 8 }}>
        <BottomGlow palette={PALETTE} width={width} height={height} activeIndex={activeIndex} />

        {/* scrollEventThrottle={16} ensures scroll events fire at ~60fps (1000ms/16ms).
            Critical for smooth animation - lower values = more events = smoother motion. */}
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 40 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <OnboardingSlideContainer
            title={"Welcome to \n Xolace."}
            description="Every story matters here. Xolace is your digital campfire, a gentle space to breathe out, check in with yourself, and share what’s on your heart at your own pace."
          >
            <Welcome />
          </OnboardingSlideContainer>
          <OnboardingSlideContainer
            title={"Your Safe,\nPrivate Space."}
            description="Post with a nickname, choose what you share, and speak freely without fear of judgment or being “found out.” "
          >
            <SafeSpace />
          </OnboardingSlideContainer>
          <OnboardingSlideContainer
            title={"Find Your\nPeople."}
            description="Join Campfires - focused spaces for real, honest conversations. Connect with others who get what you’re going through, swap stories, and feel less alone in what you’re facing."
          >
            <FindYourPeople />
          </OnboardingSlideContainer>
          <OnboardingSlideContainer
            title={"Grow & Heal\nTogether."}
            description="Take small steps with daily prompts, supportive replies, and gentle check-ins. Give support, receive it back, and build healthier habits over time, one moment, one post, one conversation at a time. "
          >
            <GrowAndHeal />
          </OnboardingSlideContainer>
          <OnboardingSlideContainer
            title={"Xolace is support,\nnot medical advice."}
            description={"Xolace is a peer-support and self-reflection space, not a diagnosis tool, and not an emergency service. If you’re in crisis or feel unsafe, contact local emergency services or a trusted crisis line in your country.\n\n Tap “I understand” to continue."}
          >
            <NotMedicalAdvice />
          </OnboardingSlideContainer>
        </Animated.ScrollView>

        <View className="gap-5 px-5 pt-5">
          <PaginationDots numberOfDots={TOTAL_SLIDES} activeIndex={activeIndex} />
          <AnimatedPressable
            className="h-[50px] rounded-full bg-white justify-center items-center"
            style={[rButtonStyle, styles.borderCurve]}
          >
            <Text className="text-black text-xl font-medium">I understand</Text>
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedIndexContext>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
});

// longevity-deck-onboarding-animation 🔼
