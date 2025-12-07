import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Onboarding = () => {
  return (
    <View className="flex-1 flex-row-center">
      <Text>Onboarding</Text>
      <Link href="/(app)/(tabs)" className="text-blue-500">Go to home screen!</Link>
    </View>
  )
}

export default Onboarding