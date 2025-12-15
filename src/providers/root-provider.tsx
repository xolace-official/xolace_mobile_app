import { ReactNode } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { Toaster } from 'sonner-native';

import { GlobalThemeProvider } from '../hooks/theme-provider';
import { QueryProvider } from './query-provider';
import { PostCreationProvider } from './postCreationContext';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <GlobalThemeProvider>
          <KeyboardProvider>
            <PostCreationProvider>
              {children}
            </PostCreationProvider>
          </KeyboardProvider>
          <Toaster />
        </GlobalThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
