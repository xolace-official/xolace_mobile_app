import { Stack , router} from 'expo-router';
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Pressable, Text } from 'react-native';
import { Avatar, AvatarFallback , AvatarImage } from '@/src/components/ui/avatar';

const DiscoveryLayout = () => {
  const isGlassAvailable = isLiquidGlassAvailable();
  return (
    <Stack
    screenOptions={{
      headerShown: false,
      headerTitleAlign: "center",
    }}
    >
      <Stack.Screen 
      name="discovery" 
      options={{
      headerShown: true,
      headerTintColor: "white",
      headerTransparent: true,
      headerBlurEffect: !isGlassAvailable ? "dark" : undefined,
      headerLeft: () => (
        <Pressable className="rounded-b-full">
          <Avatar alt='Nathan' className='size-9'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <Text className="text-white">NA</Text>
            </AvatarFallback>
          </Avatar>
        </Pressable>
      ),  
      }} 
      
        />
    </Stack>
  )
}

export default DiscoveryLayout