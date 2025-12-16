import { ReactNode, useCallback } from 'react';

import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';

import { Toaster } from 'sonner-native';

import { AppThemeProvider } from './app-theme-context';
import { ThemeSync } from '../utils/theme-sync';
import { PostCreationProvider } from './postCreationContext';
import { QueryProvider } from './query-provider';

export function RootProvider({ children }: { children: ReactNode }) {

    const contentWrapper = useCallback(
    (children: React.ReactNode) => (
      <KeyboardAvoidingView
        pointerEvents="box-none"
        behavior="padding"
        keyboardVerticalOffset={12}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
    []
  );

  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <AppThemeProvider>
          <ThemeSync />
          <KeyboardProvider>
            <PostCreationProvider>
              <HeroUINativeProvider
              config={{
            toast: {
              contentWrapper,
            },
          }}
              >
                {children}
              </HeroUINativeProvider>
            </PostCreationProvider>
          </KeyboardProvider>
          <Toaster />
        </AppThemeProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
