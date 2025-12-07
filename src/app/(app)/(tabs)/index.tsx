import { View } from 'react-native';

import { ThemeSwitcher } from '@/src/components/extras/theme-switcher';


export default function HomeScreen() {

  return (
    <View className='flex-1 flex-between bg-background pt-10'>
      <ThemeSwitcher />
    </View>
  );
}
