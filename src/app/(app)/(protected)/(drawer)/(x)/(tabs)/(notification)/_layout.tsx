import React from 'react'
import { Stack } from 'expo-router';

const NotificationLayout = () => {
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