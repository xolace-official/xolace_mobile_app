import { View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/src/components/ui/icon-symbol";

// perplexity-bottom-sheet-backdrop-animation 🔽

export type SourceTabKey = "image" | "camera" | "file";

const TABS: { key: SourceTabKey; label: string; Icon: any }[] = [
  { key: "image", label: "Image", Icon: 'photo.badge.plus' },
  { key: "camera", label: "Camera", Icon: 'camera' },
  { key: "file", label: "File", Icon: 'document.badge.plus' },
];

export const HorizontalTabs: React.FC = () => {
  return (
    <View className="flex-row gap-3 mt-4">
      {TABS.map(({ key, label, Icon }) => {
        return (
          <Pressable
            key={key}
            onPress={() => {
              // TODO: implement
            }}
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
