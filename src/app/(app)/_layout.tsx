import { SearchTransitionContext, useSearchTransition } from '@/src/context/search-transition-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AppLayout = () => {
  const searchTransition = useSearchTransition();

  return (
    <SearchTransitionContext.Provider value={searchTransition}>
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(x)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen 
          name="(modals)/search-modal" 
          options={{ 
            presentation: 'containedTransparentModal',
            headerShown: false,
            animation: 'fade',
            animationDuration: 250,
          }} 
        />

        <Stack.Screen
          name="(post-creation)"
          options={{
            presentation: "card",
            animation: "slide_from_right",
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SearchTransitionContext.Provider>
  )
}

export default AppLayout