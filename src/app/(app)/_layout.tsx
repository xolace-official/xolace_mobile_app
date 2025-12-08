import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AppLayout = () => {
  return (
    <>
    <Stack>
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
    <StatusBar style="auto" />
    </>
  )
}

export default AppLayout