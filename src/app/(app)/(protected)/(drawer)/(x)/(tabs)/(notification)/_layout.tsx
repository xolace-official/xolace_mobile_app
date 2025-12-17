import React from 'react'
import { Stack } from 'expo-router';
import { useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { Avatar, AvatarFallback , AvatarImage } from '@/src/components/ui/avatar';
import { AppText } from '@/src/components/builders/app-text';

const NotificationLayout = () => {
  const navigation = useNavigation() as any;
  return (
    <Stack
    screenOptions={{
      headerShown: true,
    }}
    >

      <Stack.Screen
        name="index"
        options={{
          title: 'Notifications',
          headerShown: true,
          headerLeft: () => (
        <Pressable onPress={() => navigation.openDrawer()} className="rounded-b-full">
          <Avatar alt='Nathan' className='size-9'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              <AppText className="text-white">NA</AppText>
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

export default NotificationLayout