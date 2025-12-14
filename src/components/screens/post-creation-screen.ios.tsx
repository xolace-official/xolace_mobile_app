import { Animated, Keyboard, Platform, Pressable, Text, TextInput, View } from "react-native";
// import { AudioLines, LayoutGrid, Mic, Plus, Search } from "lucide-react-native";
import { playgroundEntranceHaptic } from "@/lib/haptics-patterns.ios";
import CoreHaptics from "@/modules/native-core-haptics";
import { OptionsModal } from "@/src/features/post-creation/options-modal";
import { useMaxKeyboardHeight } from "@/src/hooks/use-max-keyboard-height";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { PressableScale } from "pressto";
import { useEffect, useRef, useState, use } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  KeyboardController,
  KeyboardStickyView,
  useKeyboardState,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import WithShimmer from "../shared/with-shimmer";
import { IconSymbol } from "../ui/icon-symbol";
import { CommunitySelectorPill } from "@/src/features/post-creation/community-pill";
import { TextToImageResult } from "../shared/text-to-image";
import { PostCreationContext } from "@/src/providers/postCreationContext";


const UniwindPressableScale = withUniwind(PressableScale);

// Swipe threshold in pixels: upward swipe must exceed -50px to trigger focus
// Negative Y translation indicates upward gesture direction
const SWIPE_UP_THRESHOLD = -50;

export const PostCreationScreen = () => {
  const { attachment, pickImageFromGallery } = use(PostCreationContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Tracks if text input was focused before modal opened - used to restore focus state
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  // Dynamic offset for KeyboardStickyView: when modal opens, this freezes the text input
  // at its current keyboard-elevated position, preventing visual jump
  const [keyboardOffsetClosed, setKeyboardOffsetClosed] = useState(0);
  const [value, setValue] = useState("");

  const insets = useSafeAreaInsets();

  const textInputRef = useRef<TextInput>(null);

  // Maximum keyboard height across all device configurations - used to calculate
  // the exact offset needed to freeze text input position when modal opens
  const maxKeyboardHeight = useMaxKeyboardHeight();

  const isKeyboardVisible = useKeyboardState((state) => state.isVisible);

    // Play playful entrance haptic on first load
  useEffect(() => {
    // Play the playful AI playground entrance haptic
    CoreHaptics.playPattern(playgroundEntranceHaptic).catch((error) => {
      console.error("Failed to play playground entrance haptic:", error);
    });
  }, []); // Empty dependency array means this runs once on mount

  // Restores text input focus after modal closes
  // When modal was opened while text input was focused, this effect restores keyboard focus
  // to maintain user's interaction context. setFocusTo("current") ensures the previously
  // focused input regains focus, and isTextInputFocused flag is reset to prevent re-triggering
  useEffect(() => {
    if (!isModalVisible && isTextInputFocused) {
      KeyboardController.setFocusTo("current");
      setIsTextInputFocused(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible]);

  // Resets keyboard offset when all conditions are cleared
  // After modal closes and keyboard dismisses, this clears the frozen position offset
  // that was applied to prevent visual jump. 200ms delay ensures keyboard animation
  // completes before resetting offset, preventing visual glitches during transition
  useEffect(() => {
    if (!isKeyboardVisible && !isModalVisible && !isTextInputFocused) {
      setTimeout(() => {
        setKeyboardOffsetClosed(0);
      }, 200);
    }
  }, [isKeyboardVisible, isModalVisible, isTextInputFocused]);

  // Pan gesture enables swipe-to-focus interaction: upward swipe focuses text input
  // runOnJS(true) ensures focus call executes on JS thread for reliability
  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationY <= SWIPE_UP_THRESHOLD) {
        setKeyboardOffsetClosed(0); // Reset sticky offset
        setTimeout(() => {
          textInputRef.current?.focus();
        }, 100); // Small delay to ensure gesture finishes
      }
    })
    .runOnJS(true);

      function dismissToHome() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/(x)/(tabs)/(feed)");
    }
  }

  return (
    <>
   {/* <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
          gestureEnabled: false,
          unstable_headerLeftItems: (props) => [
            {
              type: "button",
              onPress: () => {
                if (value.length > 0) {
                  Alert.alert(
                    "Clear Everything?",
                    "You're about to clear this session. This will remove all generated tattoos. Save anything you want to keep before continuing.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Clear Everything",
                        style: "destructive",
                        isPreferred: true,
                        onPress: () => {
                          // dismissToHome();
                        },
                      },
                    ]
                  );
                } else {
                  // dismissToHome();
                }
              },
              label: "Go Back",
              icon: {
                name: "xmark",
                type: "sfSymbol",
              },
              selected: false,
            },
          ],
        }}
      />  */}
    <GestureDetector gesture={panGesture}>
      <View
        className="flex-1 bg-background/95"
        style={{ paddingTop: insets.top + 20, paddingBottom: insets.bottom + 12 }}
      >
        <Pressable className="flex-1" onPress={Keyboard.dismiss}>
          {/* perplexity-home-header-animation 🔽 */}
          {/* Header row: BreathingIcon provides subtle pulsing animation to draw attention
          The breathing effect creates a gentle, non-intrusive visual cue */}
          <View className="flex-row px-5 items-center justify-between">
            <UniwindPressableScale
          className=" rounded-full"
          // Close uses spring for a natural deceleration and to stay consistent with the open motion
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            dismissToHome();
          }}
        >
          <Animated.View className="p-3 rounded-full bg-neutral-700">
            {Platform.OS === "ios" && (
              <View className="absolute h-8 w-8 self-center top-1.5 bg-neutral-800 rounded-full shadow-[0_0_6px_#0E0E0E]" />
            )}
            <IconSymbol name="xmark" size={18} color="#E5E7EB" />
          </Animated.View>
            </UniwindPressableScale>
            <IconSymbol name="square.grid.2x2" size={24} color="white" />
          </View>

          {/* community picker */}
          <View className="px-5 mt-5">
            <CommunitySelectorPill onPress={()=>{}}/>
          </View>

          {/* Logo section: Shimmer animation adds premium feel with gradient sweep
          delay=2s: waits before starting shimmer, duration=4s: sweep speed
          angle=75deg: diagonal gradient direction, colors: neutral gray palette */}
          <View className="pt-30 items-center justify-center px-5">
           <TextToImageResult
           attachment={attachment}
           />
          </View>
          {/* perplexity-home-header-animation 🔼 */}
        </Pressable>
        {/* KeyboardStickyView maintains text input position relative to keyboard
        closed: Dynamic offset freezes input at keyboard-elevated position when modal opens
        opened: Platform-specific spacing (Android: 36px, iOS: 24px) accounts for
        different keyboard behaviors and safe area handling */}
        <KeyboardStickyView
          offset={{ closed: keyboardOffsetClosed, opened: Platform.OS === "android" ? 36 : 24 }}
        >
          <Pressable
            onPress={()=>{}}
            style={{ borderCurve: "continuous" }}
            className="mx-6 mt-auto -mb-12 bg-cyan-950 rounded-3xl border border-cyan-800/50 items-center"
          >
            <Text className="text-cyan-500 mt-3 mb-14">Sign In</Text>
          </Pressable>

          <View
            style={{ borderCurve: "continuous" }}
            className="mx-4 p-3 bg-neutral-800 rounded-3xl border border-neutral-700/50"
          >
            <TextInput
              ref={textInputRef}
              value={value}
              onChangeText={setValue}
              placeholder="Ask anything..."
              placeholderTextColor="#737373"
              selectionColor="#ffffff"
              multiline
              numberOfLines={5}
              className="text-lg text-neutral-50 pt-4"
            />

            <View className="flex-row justify-between mt-5">
              <View className="flex-row items-center gap-3">
                {/* perplexity-bottom-sheet-backdrop-animation 🔽 */}
                {/* Modal opening handler: Freezes text input position to prevent visual jump
                Calculation breakdown:
                - -maxKeyboardHeight: Moves input up by keyboard height (negative = upward)
                - + insets.bottom: Accounts for device safe area at bottom
                - Platform offset: Android needs -70px (larger keyboard), iOS needs -10px
                Result: Input stays visually frozen at its keyboard-elevated position
                200ms delay before dismiss: Allows offset calculation to complete before
                keyboard animation starts, ensuring smooth transition */}
                <Pressable
                  onPress={() => {
                    if (textInputRef.current?.isFocused()) {
                      setIsTextInputFocused(true);
                      setKeyboardOffsetClosed(
                        -maxKeyboardHeight + insets.bottom - (Platform.OS === "android" ? 60 : 10)
                      );
                      setTimeout(() => KeyboardController.dismiss(), 200);
                    }
                    setIsModalVisible(true);
                  }}
                  className="p-2 rounded-full bg-neutral-700 items-center justify-center"
                >
                  <IconSymbol name="plus" size={18} color="white" />
                </Pressable>
                {/* perplexity-bottom-sheet-backdrop-animation 🔼 */}
                <Pressable
                  onPress={()=>{}}
                  className="p-2 rounded-full bg-neutral-700 items-center justify-center"
                >
                  <IconSymbol name="magnifyingglass" size={18} color="white" />
                </Pressable>
              </View>

              <View className="flex-row items-center gap-3">
                <Pressable
                  onPress={()=>{}}
                  className="p-2 rounded-full bg-neutral-700 items-center justify-center"
                >
                  <IconSymbol name="mic" size={18} color="white" />
                </Pressable>
                <Pressable
                  onPress={()=>{}}
                  className="p-2 rounded-full bg-cyan-400 items-center justify-center"
                >
                  <IconSymbol name="water.waves" size={18} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardStickyView>
        {/* perplexity-bottom-sheet-backdrop-animation 🔽 */}
        <OptionsModal pickImageFromGallery={pickImageFromGallery} isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        {/* perplexity-bottom-sheet-backdrop-animation 🔼 */}
      </View>
    </GestureDetector>
    </>
  );
}
