import { useEffect } from "react";

import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";
import NetworkStatusBanner from "../components/shared/NetworkStatusBanner";

import { useAppStore } from "../store";
// import from packages
// import {
//   useAuthSession,
//   useAuthSyncStore,
//   useRegisterAutoRefresh,
// } from '@xolacekit/supabase';

// root provider
import { RootProvider } from "../providers/root-provider";
import "../../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// void SplashScreen.preventAutoHideAsync();

const isWeb = Platform.OS === "web";
if (!isWeb) {
  // no-void to avoid unhandled promise in RN debugger
  SplashScreen.preventAutoHideAsync();
}

function SplashController() {
  // const { isLoading } = useAuthSession();
  const _hasHydrated = useAppStore((s) => s._hasHydrated);
  useEffect(() => {
    if (!isWeb && _hasHydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [_hasHydrated]);
  return null;
}

export default function RootLayout() {
  // useRegisterAutoRefresh();
  // useAuthSyncStore();

  return (
    <RootProvider>
      <SplashController />
      <Slot />
      <NetworkStatusBanner />
    </RootProvider>
  );
}
