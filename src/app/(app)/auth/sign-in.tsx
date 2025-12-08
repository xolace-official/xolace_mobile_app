import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { router } from 'expo-router'

const SignInScreen = () => {
  return (
    <View className='flex-1 items-center justify-center bg-background gap-2'>
      <Text>SignInScreen</Text>
      <Button onPress={() => console.log('pressed')}>
        Click me
      </Button>


      <Button variant="destructive" size="md" radius='full' haptic hapticStyle='heavy' className='px-10' fullWidth={false} onPress={() => console.log('pressed')}>
        Delete
      </Button>

<Button variant="outline" size="lg" onPress={() => console.log('pressed')}>
        Outline
      </Button>

<Button variant="secondary" size="lg" onPress={() => console.log('pressed')}>
        Secondary
      </Button>

<Button variant="ghost" size="lg" onPress={() => console.log('pressed')}>
        Ghost
      </Button>

<Button variant="soft" size="lg" onPress={() => console.log('pressed')}>
        Soft
      </Button>

      {/* link */}
      <Button variant="link" size="lg" onPress={() => router.push('/(app)/(tabs)')}>
        Link
      </Button>

      {/* With SF Symbol icon */}
      <Button symbol="plus" onPress={() => console.log('pressed')}>
        Add Item
      </Button>

      <Button size="icon" symbol="heart.fill" fullWidth={false} radius='full' onPress={() => console.log('pressed')} />
      <Button loading onPress={() => console.log('pressed')}>
        Submit
      </Button>

      <Button
  variant="destructive"
  confirmationAlert={{
    title: 'Delete Item?',
    message: 'This cannot be undone.',
    confirmText: 'Delete',
  }}
  onPress={() => console.log('pressed')}
>
  Delete
</Button>

    </View>
  )
}

export default SignInScreen