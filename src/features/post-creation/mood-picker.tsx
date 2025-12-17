import React, { memo, use, useCallback, useEffect, useRef } from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { moods } from "@/src/constants/mood";
import { PostCreationContext } from "@/src/providers/postCreationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Backdrop } from "./backdrop";

type MoodPickerProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export const MoodPicker = memo((props: MoodPickerProps) => {
  const ref = useRef<BottomSheet>(null);
  const { mood: selectedMood, setMood } = use(PostCreationContext);
  const insets = useSafeAreaInsets();

  const handleMoodSelect = (moodId: string) => {
    setMood(moodId);
    (ref as any)?.current?.close();
  };

  useEffect(() => {
    console.log("selected ", selectedMood);
  }, [selectedMood]);

  useEffect(() => {
    if (props.isVisible) {
      ref.current?.expand();
    } else {
      ref.current?.close();
    }
  }, [props.isVisible]);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    if (Platform.OS === "android") {
      return (
        // appearsOnIndex/disappearsOnIndex tie visibility to sheet index transitions for smooth fade
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
      );
    }
    return <Backdrop {...props} />;
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleStyle={styles.handleStyle}
      backgroundStyle={styles.backgroundStyle}
      onClose={() => props.setIsVisible(false)}
      detached
      bottomInset={insets.bottom + 12}
    >
      <BottomSheetView>
        <View className="w-[45] h-[6px] mt-2 rounded-full bg-white/30 self-center" />
        <View className="px-7 pb-5">
          <View className="flex-row items-center mt-2">
            <Text className="text-white text-xl font-medium flex-1">How are you feeling?</Text>
            <Pressable
              hitSlop={8}
              onPress={() => props.setIsVisible(false)}
              className="p-2 rounded-full bg-neutral-700 items-center justify-center"
            >
              <IconSymbol name="x.square" size={18} color="white" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-2">
              {moods.map((mood) => {
                const IconComponent = mood.icon;
                const isSelected = selectedMood === mood.id;

                return (
                  <Pressable
                    key={mood.id}
                    onPress={() => handleMoodSelect(mood.id)}
                    className="flex-row items-center gap-2 rounded-full px-4 py-3 active:opacity-80"
                    style={{
                      backgroundColor: isSelected ? "#2563eb" : "#1f2937",
                    }}
                  >
                    <IconComponent size={16} color="#fff" />
                    <Text className="font-medium text-white">{mood.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

MoodPicker.displayName = "MoodPicker";

const styles = StyleSheet.create({
  handleStyle: {
    display: "none",
  },
  backgroundStyle: {
    marginHorizontal: 16,
    backgroundColor: "#262626",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(64, 64, 64, 0.5)",
    borderCurve: "continuous",
  },
});
