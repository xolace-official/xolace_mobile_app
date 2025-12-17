import { useRouter } from "expo-router";
import { createContext } from "react";
import { KeyboardController } from "react-native-keyboard-controller";
import {
  SharedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const DURATION = 700;

export interface SearchTransitionContextValue {
  transitionProgress: SharedValue<number>;
  onOpenSearchModal: () => void;
  onCloseSearchModal: () => void;
}

export const SearchTransitionContext =
  createContext<SearchTransitionContextValue>({
    transitionProgress: 0 as unknown as SharedValue<number>,
    onOpenSearchModal: () => {},
    onCloseSearchModal: () => {},
  });

export const useSearchTransition = () => {
  const transitionProgress = useSharedValue(0);
  const router = useRouter();

  const onOpenSearchModal = () => {
    // Kick off opening phase (0→1)
    transitionProgress.value = withSpring(1, { duration: DURATION });
    router.push("/(modals)/search-modal" as any);
  };

  const onCloseSearchModal = () => {
    // Closing phase (1→2) with reset to 0
    transitionProgress.value = withSpring(
      2,
      { duration: DURATION },
      (finished) => {
        if (finished) {
          transitionProgress.value = 0;
        }
      },
    );
    KeyboardController.dismiss();
    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      }
    }, DURATION / 1.5);
  };

  return { transitionProgress, onOpenSearchModal, onCloseSearchModal };
};
