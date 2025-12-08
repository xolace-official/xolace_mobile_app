import { Stack } from 'expo-router'

const CheckinLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="checkin" options={{ headerShown: false }} />
    </Stack>
  )
}

export default CheckinLayout