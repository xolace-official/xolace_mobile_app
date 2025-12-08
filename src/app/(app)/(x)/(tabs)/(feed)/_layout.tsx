import { Stack } from 'expo-router'

const FeedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default FeedLayout