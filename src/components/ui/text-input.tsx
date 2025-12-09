import { cn } from '@/src/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import {
    Platform,
    TextInput,
    View,
    type TextInputProps,
} from 'react-native';
import { useCSSVariable } from 'uniwind';

/**
 * Input container variants using CSS variables for automatic theme support.
 * The container wraps the input + optional addons.
 */
const inputContainerVariants = cva(
  // Base styles
  cn(
    'flex-row items-center w-full',
    Platform.select({
      web: 'transition-[color,box-shadow,border-color]',
    })
  ),
  {
    variants: {
      variant: {
        outline: cn(
          'border border-border bg-background',
          Platform.select({
            web: 'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          })
        ),
        soft: cn(
          'bg-muted border-0',
          Platform.select({
            web: 'focus-within:ring-ring/50 focus-within:ring-[3px]',
          })
        ),
        subtle: cn(
          'border border-border bg-muted',
          Platform.select({
            web: 'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          })
        ),
        underline: cn(
          'border-b border-border bg-transparent rounded-none',
          Platform.select({
            web: 'focus-within:border-ring',
          })
        ),
      },
      size: {
        xs: 'h-7 px-2',
        sm: 'h-9 px-2.5',
        md: 'h-12 px-3',
        lg: 'h-14 px-4',
        xl: 'h-16 px-4',
        '2xl': 'h-[72px] px-5',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      error: {
        true: cn(
          'border-destructive',
          Platform.select({
            web: 'focus-within:border-destructive focus-within:ring-destructive/20',
          })
        ),
        false: '',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    compoundVariants: [
      // Underline shouldn't have border radius
      {
        variant: 'underline',
        radius: ['sm', 'md', 'lg', 'xl', 'full'],
        className: 'rounded-none',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'md',
      radius: 'lg',
      error: false,
      disabled: false,
    },
  }
);

/**
 * Input text styles
 */
const inputTextVariants = cva(
  // Base styles
  cn(
    'flex-1 text-foreground bg-transparent py-1 bg-red-500 items-center flex flex-row items-center',
    Platform.select({
      web: 'outline-none',
      native: 'py-0', // Remove default padding on native
    })
  ),
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm h-8',
        md: 'text-base h-10',
        lg: 'text-lg',
        xl: 'text-xl h-14',
        '2xl': 'text-xl h-16',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<TextInputProps, 'editable'>,
    VariantProps<typeof inputContainerVariants> {
  /** Additional className for the container */
  className?: string;
  /** Additional className for the input element */
  inputClassName?: string;
  /** Element to render on the left side (icon, button, etc.) */
  leftAddon?: React.ReactNode;
  /** Element to render on the right side (icon, button, etc.) */
  rightAddon?: React.ReactNode;
  /** Show error styling */
  error?: boolean;
  /** Disable the input */
  disabled?: boolean;
}

/**
 * A robust, theme-aware TextInput component built with Uniwind.
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter text..." />
 *
 * @example
 * // With variants
 * <Input variant="soft" size="lg" placeholder="Search..." />
 *
 * @example
 * // With left addon (search icon)
 * <Input
 *   leftAddon={<SearchIcon size={20} className="text-muted-foreground" />}
 *   placeholder="Search..."
 * />
 *
 * @example
 * // With right addon (password toggle)
 * <Input
 *   secureTextEntry={showPassword}
 *   rightAddon={
 *     <Pressable onPress={() => setShowPassword(!showPassword)}>
 *       <EyeIcon size={20} />
 *     </Pressable>
 *   }
 *   placeholder="Password"
 * />
 *
 * @example
 * // With error state
 * <Input error placeholder="Invalid input" />
 *
 * @example
 * // Underline variant
 * <Input variant="underline" placeholder="Email address" />
 */
export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      className,
      inputClassName,
      variant = 'outline',
      size = 'md',
      radius = 'lg',
      error = false,
      disabled = false,
      leftAddon,
      rightAddon,
      placeholderTextColor,
      ...props
    },
    ref
  ) => {
    // Get placeholder color from CSS variable for theme support
    const mutedForeground = useCSSVariable('--color-muted-foreground');
    const destructive = useCSSVariable('--color-destructive');

    // Use destructive color for placeholder when in error state
    const resolvedPlaceholderColor =
      placeholderTextColor ??
      (error
        ? ((destructive as string) ?? '#ef4444')
        : ((mutedForeground as string) ?? '#9ca3af'));

    return (
      <View
        className={cn(
          inputContainerVariants({ variant, size, radius, error, disabled }),
          className
        )}
      >
        {leftAddon && (
          <View className="mr-2 items-center justify-center">
            {leftAddon}
          </View>
        )}

        <TextInput
          ref={ref}
          className={cn(inputTextVariants({ size }), inputClassName)}
          placeholderTextColor={resolvedPlaceholderColor}
          editable={!disabled}
          {...props}
        />

        {rightAddon && (
          <View className="ml-2 items-center justify-center">
            {rightAddon}
          </View>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

// Export variants for external use (e.g., custom input compositions)
export { inputContainerVariants, inputTextVariants };
