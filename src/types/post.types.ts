import type { LucideIcon } from 'lucide-react-native';

export type PostMode = 'text' | 'voice';

export type MoodType = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
};