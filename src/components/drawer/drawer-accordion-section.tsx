import { View, Text } from 'react-native';

import {
  Accordion,
  Chip,
  cn,
} from 'heroui-native';
import { AppText } from '../builders/app-text';

import { DrawerNavItem, DrawerNavItemProps } from './drawer-nav-item';

type DrawerAccordionItem = Pick<
  DrawerNavItemProps,
  | 'label'
  | 'icon'
  | 'onPress'
  | 'isActive'
  | 'badgeLabel'
  | 'badgeVariant'
  | 'badgeClassName'
> & { id: string };

export interface DrawerAccordionSectionProps {
  value: string;
  title: string;
  icon: DrawerNavItemProps['icon'];
  items: DrawerAccordionItem[];
  isDarkMode?: boolean;
  badgeLabel?: string;
  badgeClassName?: string;
  defaultOpen?: boolean;
}

export function DrawerAccordionSection({
  value,
  title,
  icon,
  items,
  isDarkMode = false,
  badgeLabel,
  badgeClassName,
  defaultOpen = true,
}: DrawerAccordionSectionProps) {
  const IconComponent = icon;

  return (
    <Accordion
      selectionMode="multiple"
      variant="surface"
      defaultValue={defaultOpen ? value : undefined}
      className="mb-2"
    >
      <Accordion.Item key={value} value={value}>
            <Accordion.Trigger>
                <IconComponent
                color={isDarkMode ? '#F9FAFB' : '#111827'}
                size={18}
              />
                <AppText
                  className={cn(
                    'text-base font-semibold',
                    isDarkMode ? 'text-white' : 'text-gray-900',
                  )}
                >
                  {title}
                </AppText>

                <Chip
                className={cn(
                  'rounded-full bg-[#F472B6]/90 px-2 py-0.5',
                  badgeClassName,
                )}
                variant="secondary"
              >
               <Chip.Label className="text-background text-base">Custom</Chip.Label>
              </Chip>
            </Accordion.Trigger>
        <Accordion.Content className="ml-4 border-l-2 border-gray-200 px-1 py-1 dark:border-gray-800">
          <View className="gap-2 rounded-2xl">
            {items.map((item) => (
              <DrawerNavItem
                key={item.id}
                {...item}
                isDarkMode={isDarkMode}
                depth={1}
              />
            ))}
          </View>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
