import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";

export const _borderRadius = 10;
export const _borderColor = "#28282B";
export const _borderCurve = "continuous";

export type TabItemProps<T extends string> = {
  label: string;
  icon: string;
  value: T;
  isActive: boolean;
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

export function TabItem<T extends string>({
  label,
  icon,
  onPress,
  onLayout,
  isActive,
}: TabItemProps<T>) {
  return (
    <Pressable
      className="flex-row items-center gap-2 px-3 py-2 border"
      style={styles.container}
      onLayout={onLayout}
      onPress={onPress}
    >
      <View className="w-4 h-4 items-center justify-center">
        <IconSymbol
          name={icon}
          size={14}
          color={isActive ? "#f5f5f5" : "#a1a1a4"}
        />
      </View>
      <Text
        className={isActive ? "text-sm font-medium text-foreground" : "text-sm font-medium text-muted-foreground"}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: _borderRadius,
    borderColor: _borderColor,
    borderCurve: _borderCurve as any,
  },
});
