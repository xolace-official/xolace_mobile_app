import type { StyleProp, ViewStyle } from "react-native";

export type OnValueChangedEventPayload = {
  value: string;
};

export type OnFocusChangedEventPayload = {
  isFocused: boolean;
};

export type FeaturedSuggestion = {
  title: string;
  imageUrl: string;
};

export type AnimatedInputViewProps = {
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  disableMainAction?: boolean;
  suggestions?: FeaturedSuggestion[];
  onValueChanged?: (event: { nativeEvent: OnValueChangedEventPayload }) => void;
  onFocusChanged?: (event: { nativeEvent: OnFocusChangedEventPayload }) => void;
  onPressImageGallery?: () => void;
  onPressMainAction?: () => void;
  onPressSecondIcon?: () => void;
  style?: StyleProp<ViewStyle>;
};
