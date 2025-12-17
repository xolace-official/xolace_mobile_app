import { View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/src/components/ui/icon-symbol";

// perplexity-bottom-sheet-backdrop-animation 🔽

export type SourceTabKey = "image" | "camera" | "file";

export const HorizontalTabs: React.FC<{ onPressImageGallery?: () => void }> = ({
  onPressImageGallery,
}) => {
  const TABS: { key: SourceTabKey; label: string; Icon: any; onPress?: () => void }[] = [
    { key: "image", label: "Image", Icon: "photo.badge.plus", onPress: onPressImageGallery },
    { key: "camera", label: "Camera", Icon: "camera", onPress: () => {} },
    { key: "file", label: "File", Icon: "document.badge.plus", onPress: () => {} },
  ];

  return (
    <View className="flex-row gap-3 mt-4">
      {TABS.map(({ key, label, Icon, onPress }) => {
        return (
          <Pressable
            key={key}
            onPress={onPress}
            style={{ borderCurve: "continuous" }}
            className="flex-1 rounded-2xl px-4 py-6 items-center justify-center bg-neutral-700"
          >
            <IconSymbol size={20} name={Icon} color="white" />
            <Text className="mt-3 text-white font-medium">{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

// perplexity-bottom-sheet-backdrop-animation 🔼
