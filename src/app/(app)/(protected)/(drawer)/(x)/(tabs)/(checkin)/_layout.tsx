import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useThemeColor } from "heroui-native";
import { useAppTheme } from "@/src/providers/app-theme-context";

const CheckinLayout = () => {
  const { isDark } = useAppTheme();
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  return (
    <Stack>
      <Stack.Screen
        name="checkin"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerTransparent: true,
          headerBlurEffect: isDark ? "dark" : "light",
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: undefined,
              android: themeColorBackground,
            }),
          },
        }}
      />
    </Stack>
  );
};

export default CheckinLayout;
