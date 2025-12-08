import { Stack } from 'expo-router'

const DiscoveryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="discovery" options={{ headerShown: false }} />
    </Stack>
  )
}

export default DiscoveryLayout