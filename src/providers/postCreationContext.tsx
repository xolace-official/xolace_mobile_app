import { cacheBase64Image, clearSessionCache } from "@/lib/image-cache";
import * as ImagePicker from "expo-image-picker";
import { useState, useCallback, createContext } from "react";
import { Alert } from "react-native";

export type PostDraftCommunity = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  memberCount?: number;
  avatar?: string;
};

export interface PostCreationContextValue {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  attachment: string | null;
  setAttachment: React.Dispatch<React.SetStateAction<string | null>>;
  community: PostDraftCommunity | null;
  setCommunity: React.Dispatch<React.SetStateAction<PostDraftCommunity | null>>;
  mood: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  is24hOnly: boolean;
  setIs24hOnly: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
  pickImageFromGallery: () => Promise<boolean>;
  handleShare: (fileUri?: string) => Promise<void>;
}

export const PostCreationContext = createContext<PostCreationContextValue>({
  prompt: "",
  setPrompt: () => {},
  content: "",
  setContent: () => {},
  attachment: null,
  setAttachment: () => {},
  community: null,
  setCommunity: () => {},
  mood: "",
  setMood: () => {},
  is24hOnly: false,
  setIs24hOnly: () => {},
  handleReset: () => {},
  pickImageFromGallery: () => Promise.resolve(false),
  handleShare: () => Promise.resolve(),
});

export function PostCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prompt, setPrompt] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [community, setCommunity] = useState<PostDraftCommunity | null>(null);
  const [is24hOnly, setIs24hOnly] = useState<boolean>(false);
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");

  //   async function handleShare(fileUri?: string) {
  //     if (!fileUri || !Share) {
  //       return;
  //     }

  //     try {
  //       // Convert file URI to base64 for sharing
  //       const base64Image = await getCachedImageAsBase64(fileUri);
  //       const appStoreUrl =
  //         "https://apps.apple.com/us/app/ai-tattoo-try-on/id6751748193";

  //       const shareResult = await Share.open({
  //         message: `I just got tattooed! Check out this photo \n🎨 Try it yourself: ${appStoreUrl}`,
  //         url: base64Image,
  //       });

  //       if (shareResult.dismissedAction) {
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Error sharing:", error);
  //     }
  //   }

  //   async function handleSave(fileUri?: string) {
  //     if (!fileUri) return;

  //     // Convert file URI to base64 for saving
  //     const base64Image = await getCachedImageAsBase64(fileUri);
  //     await saveBase64ToAlbum(base64Image, "png");

  //     toast.success("Image saved to gallery!", {
  //       dismissible: true,
  //       duration: 1_000,
  //     });
  //   }

  const handleShare = () => Promise.resolve();

  function handleReset() {
    if (!attachment) return;
    Alert.alert(
      "Reset Session?",
      "Are you sure you want to reset the session? This will clear all generated tattoos and start a new session.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "default",
          isPreferred: true,
          onPress: async () => {
            // Clear cached images from file system
            await clearSessionCache();

            setAttachment(null);
            setPrompt("");
          },
        },
      ],
    );
  }

  /**
   * Pick image from gallery
   * return false if the user cancels the picker
   * return true if the user selects an image
   * return false if there is an error
   */
  const pickImageFromGallery = useCallback(async (): Promise<boolean> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [3, 2],
        quality: 0.3,
        allowsMultipleSelection: false,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];
        if (selectedImage.base64) {
          // Cache the selected image and store the file URI
          const fileUri = await cacheBase64Image(selectedImage.base64, "png");

          // Check if an attachment already exists
          const hasAttachment = attachment !== null;

          if (hasAttachment) {
            // replace the attachment
            setAttachment(fileUri);
          } else {
            // set the attachment
            setAttachment(fileUri);
          }
        } else {
          Alert.alert("Error", "Failed to get image data");
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
      return false;
    }
  }, [attachment]);

  // Function to remove an image from the active group
  //   const removeImageFromActiveGroup = React.useCallback(
  //     (uri: string) => {
  //       if (activeGenerationIndex === undefined) return;

  //       setSessionGenerations((prev) => {
  //         const newGenerations = [...prev];
  //         const activeGroup = newGenerations[activeGenerationIndex];
  //         newGenerations[activeGenerationIndex] = activeGroup.filter(
  //           (u) => u !== uri
  //         );

  //         // If the group is now empty, remove it entirely
  //         if (newGenerations[activeGenerationIndex].length === 0) {
  //           newGenerations.splice(activeGenerationIndex, 1);
  //           setActiveGenerationIndex(undefined);
  //         }

  //         return newGenerations;
  //       });
  //     },
  //     [activeGenerationIndex]
  //   );

  return (
    <PostCreationContext.Provider
      value={{
        prompt,
        setPrompt,
        content,
        setContent,
        community,
        setCommunity,
        handleReset,
        pickImageFromGallery,
        handleShare,
        attachment,
        setAttachment,
        is24hOnly,
        setIs24hOnly,
        mood,
        setMood,
      }}
    >
      {children}
    </PostCreationContext.Provider>
  );
}
