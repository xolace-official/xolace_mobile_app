import { StyleSheet, View } from 'react-native';

import { ThemeSwitcher } from '@/src/components/extras/theme-switcher';


export default function HomeScreen() {

  return (
    <View className='flex-1 flex-between bg-background pt-10'>
      <ThemeSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
