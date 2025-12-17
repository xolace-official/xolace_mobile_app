import { View } from 'react-native';
import { withUniwind } from 'uniwind';

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
  const IconComponent = withUniwind(icon);

  return (
    <Accordion
      selectionMode="multiple"
      variant="surface"
      defaultValue={defaultOpen ? value : undefined}
      className=" bg-transparent border-transparent"
      isDividerVisible={false}
    >
      <Accordion.Item key={value} value={value}>
            <Accordion.Trigger className='flex-1'>
                <View className='flex flex-row items-center justify-start gap-2 '>
                <IconComponent
                className={cn('text-foreground')}
                size={22}
              />
                <AppText
                  className={cn(
                    'text-base font-semibold',
                    isDarkMode ? 'text-white' : 'text-gray-900',
                  )}
                >
                  {title}
                </AppText>

                {
                    badgeLabel && (
                        <Chip
                        variant="secondary"
                        size='sm'
                      >
                       <Chip.Label>{badgeLabel}</Chip.Label>
                      </Chip>
                    )
                }
                </View>

                <Accordion.Indicator />
            </Accordion.Trigger>
        <Accordion.Content className="ml-3 px-1 py-1">
          <View className="gap-1 rounded-2xl">
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
