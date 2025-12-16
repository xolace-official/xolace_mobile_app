import {
  Flame,
  Gift,
  HeartPulse,
  LibraryBig,
  PlusCircle,
  Settings2,
  ShieldCheck,
  TvMinimalPlay,
} from 'lucide-react-native';

import type { DrawerNavItemProps } from './drawer-nav-item';

export type DrawerRouteItem = {
  id: string;
  label: string;
  href: string;
  icon: DrawerNavItemProps['icon'];
  badgeLabel?: string;
  badgeVariant?: DrawerNavItemProps['badgeVariant'];
  badgeClassName?: string;
};

export const PRIMARY_NAV_ITEMS: DrawerRouteItem[] = [
  { id: 'fireside', label: 'Fireside', href: '/', icon: Flame },
  {
    id: 'collections',
    label: 'Collections',
    href: '/',
    icon: LibraryBig,
  },
  {
    id: 'confide',
    label: 'Confide',
    href: '/',
    icon: ShieldCheck,
    badgeLabel: 'New',
    badgeVariant: 'primary',
    badgeClassName: 'bg-[#4338ca]',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/',
    icon: Settings2,
  },
];

export const CAMPFIRE_ITEMS: DrawerRouteItem[] = [
  {
    id: 'campfire-create',
    label: 'Create Campfire',
    href: '/',
    icon: PlusCircle,
  },
  {
    id: 'campfire-manage',
    label: 'Manage Campfires',
    href: '/',
    icon: Settings2,
  },
];

export const HEALTH_SPACE_ITEMS: DrawerRouteItem[] = [
  {
    id: 'health-tips',
    label: 'Health Tips',
    href: '/',
    icon: HeartPulse,
    badgeLabel: 'New',
    badgeVariant: 'primary',
    badgeClassName: 'bg-[#4338ca]',
  },
  {
    id: 'glimpse',
    label: 'Glimpse',
    href: '/',
    icon: TvMinimalPlay,
    badgeLabel: 'New',
    badgeVariant: 'primary',
    badgeClassName: 'bg-[#4338ca]',
  },
];

export const HEALTH_SPACE_ROUTE: DrawerRouteItem = {
  id: 'health-space',
  label: 'Health Space',
  href: '/',
  icon: HeartPulse,
};

export const WHATS_NEW_ACTION = {
  label: "See What's New",
  icon: Gift,
  href: '/',
};
