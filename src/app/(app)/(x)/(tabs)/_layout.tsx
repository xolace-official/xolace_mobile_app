import { BlurView } from "expo-blur";
import { Tabs } from 'expo-router';
import React, { FC, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { Platform, Animated as RNAnimated, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HapticTab } from '@/src/components/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { TabsContext } from '@/src/providers/tab-provider';
import { PostButton } from "@/src/components/shared/post-button";


const _duration = 200;

export type RouteParams = {
  isBottomBlurVisible?: 'true' | 'false';
};

type AnimatedIconWrapperProps = {
  scale: SharedValue<number>;
};

const AnimatedIconWrapper: FC<PropsWithChildren<AnimatedIconWrapperProps>> = ({
  children,
  scale,
}) => {
  return (
    <Animated.View
      onTouchStart={() => {
        scale.value = withTiming(0.8);
      }}
      onTouchEnd={() => {
        scale.value = withTiming(1);
      }}
      style={{ transform: [{ scale }] }}
    >
      {children}
    </Animated.View>
  );
};


export default function TabLayout() {

    const {
    tabBarHeight,
    tabBarPaddingBottom,
    isBottomBlurVisible,
    setIsBottomBlurVisible,
    setIsAddButtonVisible,
  } = useContext(TabsContext);

   const homeIconScale = useSharedValue(1);
  const discoveryIconScale = useSharedValue(1);
  const checkinIconScale = useSharedValue(1);
  const notificationIconScale = useSharedValue(1);
  const exploreIconScale = useSharedValue(1);


    const tabBarOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    RNAnimated.timing(tabBarOpacity, {
      toValue: isBottomBlurVisible ? 1 : 0.25,
      duration: _duration,
      useNativeDriver: true,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottomBlurVisible]);


    const rBlurContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0, { duration: _duration }),
    };
  });

  const rFabStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0.25, { duration: _duration }),
    };
  });

  return (
    <>   
    <Tabs
      screenOptions={{
        headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "pink",
          tabBarInactiveTintColor: "#D9D9D9",
          tabBarStyle: {
            position: "absolute",
            left: 0,
            bottom: 0,
            elevation: 0,
            overflow: "hidden",
            height: tabBarHeight,
            paddingTop: 8,
            paddingBottom: tabBarPaddingBottom,
            borderTopWidth: 0.5,
            borderColor: "rgba(255, 255, 255, 0.1)",
            opacity: tabBarOpacity,
          },
          tabBarBackground: () => (
            <Animated.View style={[StyleSheet.absoluteFillObject, rBlurContainerStyle]}>
              {Platform.OS === "ios" ? (
                <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFillObject} />
              ) : (
                <View className="absolute inset-0 bg-neutral-950/95" />
              )}
            </Animated.View>
          ),
        tabBarButton: HapticTab,
      }}
       screenListeners={{
        tabPress: () => {
          setTimeout(() => {
            setIsBottomBlurVisible(true);
          }, 50);
        },
        focus: (e) => {
            if (e.target?.includes('checkin')) {
              setIsAddButtonVisible(false);
            } else {
              setIsAddButtonVisible(true);
            }
          },
      }}
      >
      <Tabs.Screen
        name="(feed)"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <AnimatedIconWrapper scale={homeIconScale}>
                {
                  focused && Platform.OS === "ios" ? (
                    <IconSymbol size={28} name="fireplace.fill" color={color} />
                  ) : focused ? (
                    <IconSymbol size={28} name="fireplace" color={color} />
                  ): (
                    <IconSymbol size={28} name="fireplace" color={color} />
                  )
                }
              </AnimatedIconWrapper>
            )
          },
        }}
      />

      <Tabs.Screen
        name="(discovery)"
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <AnimatedIconWrapper scale={discoveryIconScale}>
                <IconSymbol size={28} name="dot.radiowaves.left.and.right" color={color} />
              </AnimatedIconWrapper>
            )
          },
        }}
      />

      <Tabs.Screen
        name="(notification)"
        options={{
          tabBarIcon: ({ color , focused}) => {
            return (
              <AnimatedIconWrapper scale={notificationIconScale}>
                {
                  focused ? (
                    <IconSymbol size={28} name="bell.fill" color={color} />
                  ) : (
                    <IconSymbol size={28} name="bell" color={color} />
                  )
                }
              </AnimatedIconWrapper>
            )
          },
        }}
      />

      <Tabs.Screen
        name="(checkin)"
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <AnimatedIconWrapper scale={checkinIconScale}>
                {
                  focused ? (
                    <IconSymbol size={28} name="heart.text.square.fill" color={color} />
                  ) : (
                    <IconSymbol size={28} name="heart.text.square" color={color} />
                  )
                }
              </AnimatedIconWrapper>
            )
          },
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <AnimatedIconWrapper scale={exploreIconScale}>
                <IconSymbol size={28} name="paperplane.fill" color={color} />
              </AnimatedIconWrapper>
            )
          },
        }}
      />
    </Tabs>

     <Animated.View
        className="absolute right-4"
        style={[rFabStyle, { bottom: tabBarHeight + 12 }]}
      >
        <PostButton />
      </Animated.View>
    </>
  );
}
