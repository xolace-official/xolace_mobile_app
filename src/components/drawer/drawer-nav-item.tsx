import { ComponentType, ReactNode } from "react";

import { Pressable, View } from "react-native";
import { AppText } from "../builders/app-text";
import { Chip } from "heroui-native";
import { withUniwind } from "uniwind";

import { cn } from "@/src/utils/cn";

type DrawerNavIcon = ComponentType<{
  color?: string;
  size?: number;
  className?: string;
}>;

export interface DrawerNavItemProps {
  label: string;
  icon: DrawerNavIcon;
  isActive?: boolean;
  onPress: () => void;
  isDarkMode?: boolean;
  badgeLabel?: string;
  badgeVariant?: "primary" | "secondary" | "tertiary" | "soft";
  badgeClassName?: string;
  trailing?: ReactNode;
  depth?: number;
}

export function DrawerNavItem({
  label,
  icon: Icon,
  isActive = false,
  onPress,
  isDarkMode = false,
  badgeLabel,
  badgeVariant = "primary",
  badgeClassName,
  trailing,
  depth = 0,
}: DrawerNavItemProps) {
  const IconComponent = withUniwind(Icon);

  const textColor = isActive ? "text-accent-foreground" : "text-foreground";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      className={cn(
        "flex-row items-center justify-between rounded-2xl py-2",
        isActive ? `bg-accent` : "bg-transparent",
      )}
      onPress={onPress}
      android_ripple={{
        color: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)",
      }}
      style={{ paddingLeft: depth > 0 ? 10 + depth * 8 : undefined }}
    >
      <View className="flex-row items-center gap-3 px-4">
        <View className="rounded-xl bg-transparent">
          <IconComponent
            className={cn(
              "text-foreground",
              isActive && "text-accent-foreground",
            )}
            size={22}
          />
        </View>
        <AppText className={cn("text-base font-semibold", textColor)}>
          {label}
        </AppText>
        {badgeLabel ? (
          <Chip variant={badgeVariant} size="sm">
            <Chip.Label>{badgeLabel}</Chip.Label>
          </Chip>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}
