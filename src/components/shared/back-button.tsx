import { router } from "expo-router";
import { Pressable } from "react-native";

import { ChevronLeft } from "lucide-react-native";
import { withUniwind } from "uniwind";

const ChevronLeftButton = withUniwind(ChevronLeft);

export const BackButton = () => {
  return (
    <Pressable onPress={() => router.back()}>
      <ChevronLeftButton size={32} className="text-foreground" />
    </Pressable>
  );
};
