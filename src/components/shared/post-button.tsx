import { TabsContext } from "@/src/providers/tab-provider";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { usePathname } from "expo-router";
import React, { FC, useContext, useEffect, useRef } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../ui/button";
import { router } from "expo-router";

// x-floating-action-button-animation 🔽

const DURATION = 200;

export const PostButton: FC = () => {
  const { isAddButtonVisible } = useContext(TabsContext);

  const pathname = usePathname();
  const isMessagesScreen = useRef(false);

  const addButtonScale = useSharedValue(1);

  const bounceTheButton = () => {
    addButtonScale.value = withSequence(
      withTiming(1.1, { duration: DURATION / 2 }),
      withTiming(1, { duration: DURATION / 2 }),
    );
  };

  useEffect(() => {
    if (pathname === "/x/messages" && !isMessagesScreen.current) {
      bounceTheButton();
      isMessagesScreen.current = true;
    } else if (pathname !== "/x/messages" && isMessagesScreen.current) {
      bounceTheButton();
      isMessagesScreen.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const rAddButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isAddButtonVisible ? 1 : 0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.quad),
      }),
      pointerEvents: isAddButtonVisible ? "auto" : "none",
      transform: [
        {
          scale: isAddButtonVisible
            ? withSequence(
                withTiming(1.1, { duration: DURATION / 2 }),
                withTiming(1, { duration: DURATION / 2 }),
              )
            : withTiming(0.9, { duration: DURATION / 2 }),
        },
      ],
    };
  });

  return (
    <Animated.View style={rAddButtonStyle}>
      <Button
        variant="default"
        size={"icon"}
        radius={"full"}
        fullWidth={false}
        className="bg-segment"
        onPress={() => router.push("/(app)/(protected)/(post-creation)")}
      >
        <AntDesign name="plus" size={20} color="#fff" />
      </Button>
    </Animated.View>
  );
};

// x-floating-action-button-animation 🔼
