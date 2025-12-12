import { SearchTransitionContext } from "@/src/context/search-transition-context";
import { use } from "react";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

export const AnimatedTabsContainer = ({ children }: { children: React.ReactNode }) => {
  const { transitionProgress } = use(SearchTransitionContext);

  const rContainerStyle = useAnimatedStyle(() => {
    const progress = transitionProgress.value;
    
    // 0->1: Scale down (Open)
    // 1->2: Scale up (Close)
    return {
      transform: [
        {
          scale: interpolate(progress, [0, 1, 2], [1, 0.92, 1]),
        },
      ],
      opacity: interpolate(progress, [0, 1, 2], [1, 0.5, 1]),
      borderRadius: interpolate(progress, [0, 1, 2], [0, 24, 0]),
      overflow: 'hidden',
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Animated.View style={[{ flex: 1, backgroundColor: 'black' }, rContainerStyle]}>
            {children}
        </Animated.View>
    </View>
  );
};
