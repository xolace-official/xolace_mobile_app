
import { View, Pressable, Text, ScrollView } from 'react-native'
import { Uniwind, useUniwind } from 'uniwind'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export const ThemeSwitcher = () => {
    const { theme, hasAdaptiveThemes } = useUniwind()
    const { colorScheme , setColorScheme } = useColorScheme()

  const themes = [
    { name: 'light', label: 'Light', icon: '☀️' },
    { name: 'dark', label: 'Dark', icon: '🌙' },
    { name: 'premium', label: 'Premium', icon: '💎' },
  ]
  const activeTheme = hasAdaptiveThemes ? 'system' : theme

  return (
    <View className="p-4 gap-4">
      <Text className="text-sm text-foreground">
        Current: {colorScheme}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {themes.map((t) => (
            <Pressable
              key={t.name}
              onPress={() => setColorScheme(t.name)}
              className={`
                px-4 py-3 rounded-lg items-center
                ${activeTheme === t.name ? 'bg-primary' : 'bg-card border border-border'}
              `}
            >
              <Text className={`text-2xl ${activeTheme === t.name ? 'text-white' : 'text-foreground'}`}>
                {t.icon}
              </Text>
              <Text className={`text-xs mt-1 ${activeTheme === t.name ? 'text-white' : 'text-foreground'}`}>
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}