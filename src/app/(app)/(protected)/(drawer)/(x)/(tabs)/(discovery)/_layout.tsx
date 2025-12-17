import { Stack } from 'expo-router';
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Pressable, Text } from 'react-native';
import { Avatar, AvatarFallback , AvatarImage } from '@/src/components/ui/avatar';
import { useNavigation } from 'expo-router';

const DiscoveryLayout = () => {
  const navigation = useNavigation() as any;
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
        <Pressable onPress={() => navigation.openDrawer()} className="rounded-b-full">
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

              <Stack.Screen
        name="glimpse"
        options={{
          title: 'Glimpses',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="health-tips"
        options={{
          title: 'Health tips',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="campfire"
        options={{
          title: 'Campfire',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="collections"
        options={{
          title: 'Collections',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default DiscoveryLayout