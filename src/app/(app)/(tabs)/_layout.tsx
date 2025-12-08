import { Tabs } from 'expo-router';
import { BlurView } from "expo-blur";
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
import { Colors } from '@/src/constants/theme';


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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="discovery"
        options={{
          title: 'Discovery',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="checkin"
        options={{
          title: 'Checkin',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
