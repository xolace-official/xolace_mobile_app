import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
//import { isLiquidGlassAvailable } from "expo-glass-effect";

import { useAppTheme } from "../providers/app-theme-context";
import { useThemeColor } from "heroui-native";
import { Platform } from "react-native";

/**
 * Hook that provides reusable large header screen options
 */
export function useNormalHeaderOptions(): NativeStackNavigationOptions {
  //const isGlassAvailable = isLiquidGlassAvailable();
   const { isDark } = useAppTheme();
  const themeColorForeground = useThemeColor('foreground');
  const themeColorBackground = useThemeColor('background');

  return {
    headerTitleAlign: 'center',
          headerTransparent: true,
          headerBlurEffect: isDark ? 'dark' : 'light',
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: undefined,
              android: themeColorBackground,
            }),
          },
          contentStyle: {
            backgroundColor: themeColorBackground,
          },
  };
}
