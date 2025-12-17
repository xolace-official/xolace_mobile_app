import { View } from 'react-native';

import { Button, cn } from 'heroui-native';
import { withUniwind } from 'uniwind';

import type { DrawerNavItemProps } from './drawer-nav-item';

interface DrawerFooterActionProps {
  label: string;
  icon: DrawerNavItemProps['icon'];
  onPress: () => void;
  isDarkMode?: boolean;
}

export function DrawerFooterAction({
  label,
  icon,
  onPress,
  isDarkMode = false,
}: DrawerFooterActionProps) {
  const IconComponent = withUniwind(icon);

  return (
    <View
      className={cn(
        'mt-6 rounded-3xl border px-4 py-4',
        isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5',
      )}
    >
      <Button
        onPress={onPress}
        variant='primary'
      >
        <IconComponent className="text-accent-foreground" size={20} />
        <Button.Label>{label}</Button.Label>
      </Button>
    </View>
  );
}
