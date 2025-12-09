import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useCSSVariable } from "uniwind";

/**
 * Hook that provides reusable large header screen options
 */
export function useLargeHeaderOptions(): NativeStackNavigationOptions {
  const isGlassAvailable = isLiquidGlassAvailable();
  const foreground = useCSSVariable("--color-foreground")

  return {
    headerTintColor: foreground as string,
    headerTransparent: true,
    headerBlurEffect: !isGlassAvailable ? "dark" : undefined,
    headerLargeStyle: {
      backgroundColor: "transparent",
    },
    headerLargeTitle: true,
  };
}
