import { cn } from "@/src/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as Haptics from "expo-haptics";
import { SFSymbol } from "expo-symbols";
import { PressableScale } from "pressto";
import React, { useEffect, useMemo, useRef } from "react";
import { Alert, Animated, Platform, Text } from "react-native";
import { useCSSVariable, withUniwind } from "uniwind";
import { IconSymbol } from "./icon-symbol";

// Wrap PressableScale with Uniwind for className support
const StyledPressableScale = withUniwind(PressableScale);

/**
 * Button container variants using CSS variables for automatic theme support.
 * Uses class-variance-authority (cva) for type-safe variant management.
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  cn(
    "shrink-0 flex-row items-center justify-center gap-2 rounded-lg",
    Platform.select({
      web: "outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50",
    })
  ),
  {
    variants: {
      variant: {
        default: cn("bg-primary", Platform.select({ web: "hover:bg-primary/90" })),
        destructive: cn("bg-destructive", Platform.select({ web: "hover:bg-destructive/90" })),
        outline: cn(
          "border border-border bg-background",
          Platform.select({ web: "hover:bg-muted" })
        ),
        secondary: cn("bg-secondary", Platform.select({ web: "hover:bg-secondary/80" })),
        ghost: cn("bg-transparent", Platform.select({ web: "hover:bg-muted" })),
        link: "bg-transparent",
        soft: cn("bg-primary/10", Platform.select({ web: "hover:bg-primary/20" })),
      },
      size: {
        xs: "h-7 px-2.5",
        sm: "h-9 px-3",
        md: "h-12 px-4",
        lg: "h-14 px-5",
        xl: "h-16 px-6",
        "2xl": "h-[72px] px-7",
        icon: "h-10 w-10",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "lg",
      fullWidth: true,
    },
  }
);

/**
 * Button text variants - matches container variants for consistent styling.
 */
const buttonTextVariants = cva(
  // Base text styles
  cn("font-semibold", Platform.select({ web: "pointer-events-none transition-colors" })),
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-white",
        outline: "text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground",
        link: cn(
          "text-primary",
          Platform.select({ web: "underline-offset-4 group-hover:underline" })
        ),
        soft: "text-primary",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-xl",
        icon: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Icon size mapping based on button size
 */
const ICON_SIZES: Record<NonNullable<ButtonProps["size"]>, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 22,
  xl: 24,
  "2xl": 26,
  icon: 20,
};

interface ConfirmationAlert {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  /** Button text content */
  children?: React.ReactNode;
  /** Press handler */
  onPress: () => void;
  /** Disable the button */
  disabled?: boolean;
  /** Show loading spinner */
  loading?: boolean;
  /** Additional container className */
  className?: string;
  /** Additional text className */
  textClassName?: string;
  /** SF Symbol name (iOS-style icons) */
  symbol?: SFSymbol;
  /** Custom icon React node (for Lucide, custom SVGs, etc.) */
  icon?: React.ReactNode;
  /** Icon position when using symbol or icon */
  iconPosition?: "left" | "right";
  /** Enable haptic feedback on press */
  haptic?: boolean;
  /** Haptic feedback intensity */
  hapticStyle?: "light" | "medium" | "heavy";
  /** Optional confirmation dialog before executing onPress */
  confirmationAlert?: ConfirmationAlert;
}

/**
 * A robust, theme-aware Button component built with Uniwind and Pressto.
 *
 * @example
 * // Basic usage
 * <Button onPress={() => console.log('pressed')}>Click me</Button>
 *
 * @example
 * // With variants
 * <Button variant="destructive" size="lg" onPress={handleDelete}>Delete</Button>
 *
 * @example
 * // With SF Symbol icon
 * <Button symbol="plus" onPress={handleAdd}>Add Item</Button>
 *
 * @example
 * // With custom icon
 * <Button icon={<PlusIcon />} iconPosition="right" onPress={handleAdd}>Add</Button>
 *
 * @example
 * // Icon-only button
 * <Button size="icon" symbol="heart.fill" onPress={handleLike} />
 *
 * @example
 * // With loading state
 * <Button loading onPress={handleSubmit}>Submit</Button>
 *
 * @example
 * // With confirmation dialog
 * <Button
 *   variant="destructive"
 *   confirmationAlert={{
 *     title: 'Delete Item?',
 *     message: 'This action cannot be undone.',
 *     confirmText: 'Delete',
 *   }}
 *   onPress={handleDelete}
 * >
 *   Delete
 * </Button>
 */
export function Button({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = "default",
  size = "md",
  radius = "lg",
  fullWidth = true,
  className,
  textClassName,
  symbol,
  icon,
  iconPosition = "left",
  haptic = false,
  hapticStyle = "light",
  confirmationAlert,
}: ButtonProps) {
  // Get theme colors for icons using CSS variables
  const [primaryForeground, foreground, primary] = useCSSVariable([
    "--color-primary-foreground",
    "--color-foreground",
    "--color-primary",
  ]);

  // Loading spinner animation
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      const spin = () => {
        spinValue.setValue(0);
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ).start();
      };
      spin();
    } else {
      spinValue.stopAnimation();
    }
  }, [loading, spinValue]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const isDisabled = disabled || loading;
  const iconSize = ICON_SIZES[size ?? "md"];

  // Determine the icon color based on variant (with fallbacks for undefined CSS vars)
  const iconColor = useMemo((): string => {
    const defaultColor = "#ffffff";
    switch (variant) {
      case "default":
        return (primaryForeground as string) ?? defaultColor;
      case "destructive":
        return "#ffffff"; // text-white
      case "outline":
      case "ghost":
        return (foreground as string) ?? defaultColor;
      case "secondary":
        return (foreground as string) ?? defaultColor;
      case "link":
      case "soft":
        return (primary as string) ?? defaultColor;
      default:
        return (primaryForeground as string) ?? defaultColor;
    }
  }, [variant, primaryForeground, foreground, primary]);

  const handlePress = () => {
    if (isDisabled) return;

    // Haptic feedback
    if (haptic) {
      const hapticStyleMap = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy,
      };
      Haptics.impactAsync(hapticStyleMap[hapticStyle]);
    }

    // Confirmation alert
    if (confirmationAlert) {
      Alert.alert(confirmationAlert.title, confirmationAlert.message, [
        {
          text: confirmationAlert.cancelText || "Cancel",
          style: "cancel",
          onPress: confirmationAlert.onCancel,
        },
        {
          text: confirmationAlert.confirmText || "Confirm",
          style: "default",
          onPress: confirmationAlert.onConfirm || onPress,
        },
      ]);
    } else {
      onPress();
    }
  };

  // Render the icon (either SF Symbol or custom React node)
  const renderIcon = () => {
    if (loading) {
      return (
        <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
          <IconSymbol name="arrow.2.circlepath" size={iconSize} color={iconColor} />
        </Animated.View>
      );
    }

    if (symbol) {
      return <IconSymbol name={symbol} size={iconSize} color={iconColor} />;
    }

    if (icon) {
      return icon;
    }

    return null;
  };

  const iconElement = renderIcon();
  const showLeftIcon = iconElement && iconPosition === "left";
  const showRightIcon = iconElement && iconPosition === "right";
  const isIconOnly = !children && (symbol || icon || loading);

  return (
    <StyledPressableScale
      className={cn(
        buttonVariants({ variant, size: isIconOnly ? "icon" : size, radius, fullWidth }),
        isDisabled && "opacity-50",
        className
      )}
      onPress={isDisabled ? undefined : handlePress}
    >
      {showLeftIcon && iconElement}

      {children && (
        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>{children}</Text>
      )}

      {/* Icon-only mode: center the icon */}
      {isIconOnly && !showLeftIcon && !showRightIcon && iconElement}

      {showRightIcon && iconElement}
    </StyledPressableScale>
  );
}

// Export variants for external use (e.g., custom button compositions)
export { buttonTextVariants, buttonVariants };
