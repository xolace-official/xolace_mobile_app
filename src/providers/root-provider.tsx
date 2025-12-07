import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { Toaster } from 'sonner-native';

import { GlobalThemeProvider } from '../hooks/theme-provider';
import { QueryProvider } from './query-provider';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <GlobalThemeProvider>
          <KeyboardProvider>{children}</KeyboardProvider>
          <Toaster />
        </GlobalThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
