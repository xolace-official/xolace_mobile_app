import { useLargeHeaderOptions } from '@/src/hooks/useLargeHeaderOptions';
import { Stack } from 'expo-router';

const DiscoveryLayout = () => {
  const largeHeaderOptions = useLargeHeaderOptions();
  return (
    <Stack
    screenOptions={{
      headerShown: false,
      headerTitleAlign: "center",
    }}
    >
      <Stack.Screen name="discovery" options={{
       headerShown: true,
      headerTintColor: "white",
      headerTransparent: true,
      }} 
        
        />
    </Stack>
  )
}

export default DiscoveryLayout