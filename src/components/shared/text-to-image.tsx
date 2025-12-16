import { BLURHASH } from "@/lib/image-cache";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Keyboard, View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { WithShimmer } from "./with-shimmer";
interface TextToImageResultProps {
  onRemoveImage?: (uri: string) => void;
  onRetry?: () => void;
  attachment: string | null;
}

export function TextToImageResult({
  onRemoveImage,
  onRetry,
  attachment,
}: TextToImageResultProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // function simulateTattoMachineVibrations() {
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  // }

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setIsKeyboardVisible]);


  return attachment ? (
    <Animated.View
      style={{
        flex: 1,
        paddingHorizontal: 0,
        gap: 12,
      }}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}
    >
        
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {attachment && (
          <View
            key={attachment}
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <Image
              source={{ uri: attachment }}
              placeholder={{ blurhash: BLURHASH }}
              cachePolicy="memory-disk"
              style={{
                width: "100%",
                height: 350,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "#71717a",
              }}
              contentFit="cover"
              contentPosition="center"
              transition={350}
            />
          </View>
        )}
      </View>
      {attachment && (
        <Text
          style={{ color: "#71717a", textAlign: "center" }}
        >
          Change styles, sizes, and colors to create your perfect tattoo
          {/* {lastGenerationUris.length === 1
            ? "Add one more to combine"
            : `${lastGenerationUris.length} images selected (max)`} */}
        </Text>
      )}
    </Animated.View>
  ) : (
    <WithShimmer
                  delay={2}
                  duration={4}
                  angle={75}
                  colors={{ start: "#D9D9DB", middle: "#71717a", end: "#D9D9DB" }}
                >
                  <Text className="text-2xl">No need to hold back</Text>
                </WithShimmer>
  );
}

// function LoadingChangingText({
//   lastGenerationUris,
// }: {
//   lastGenerationUris: string[];
// }) {
//   const hasImages = lastGenerationUris.length > 0;
//   const firstMessage = hasImages
//     ? "Updating your tattoo..."
//     : "Starting new tattoo...";
//   const messages = [
//     firstMessage,
//     "Tattoo machine is warming up...",
//     "Summoning the ink spirits...",
//     "Drawing inspiration from the universe...",
//     "Almost done brewing your masterpiece...",
//     "Adding a sprinkle of creativity...",
//     "Perfecting every pixel of your tattoo...",
//     "Injecting creativity into your skin...",
//     "Mixing the perfect shade of awesome...",
//     "Sharpening virtual needles...",
//     "Calibrating your tattoo vibes...",
//     "Consulting the tattoo oracle...",
//   ];

//   const [index, setIndex] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const showDuration = 2000; // how long the text stays visible
//     const transitionDuration = 1000; // matches AnimatedText exit duration

//     const interval = setInterval(() => {
//       setVisible(false); // trigger unmount animation

//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % messages.length);
//         setVisible(true); // remount with new text
//       }, transitionDuration);
//     }, showDuration + transitionDuration);

//     return () => clearInterval(interval);
//   }, [messages.length]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 32,
//         gap: 32,
//       }}
//     >
//       {hasImages && (
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             marginBottom: 16,
//           }}
//         >
//           {lastGenerationUris.slice(0, 3).map((uri, index) => (
//             <Image
//               key={uri}
//               source={{ uri }}
//               placeholder={{ blurhash: BLURHASH }}
//               cachePolicy="memory-disk"
//               style={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: 50,
//                 borderWidth: 2,
//                 borderColor: Color.yellow[700],
//                 marginRight: index < 2 ? -8 : 0,
//                 marginLeft: index < 2 ? -8 : 0,
//               }}
//               contentFit="cover"
//               contentPosition="center"
//               transition={350}
//             />
//           ))}
//         </View>
//       )}
//       {visible && (
//         <AnimatedText
//           key={index}
//           style={{ flex: hasImages ? 0.2 : 0.5 }}
//           text={messages[index]}
//         />
//       )}
//     </View>
//   );
// }
