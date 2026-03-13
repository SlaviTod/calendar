
import { useThemeColor } from '@/hooks/use-theme-color';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

export type IconType = 'Ionicons' | 'FontAwesome6';

export type ThemedIconProps = {
  name: any;
  size: number;
  type?: IconType;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ lightColor, darkColor, name, size, type = 'Ionicons' }: ThemedIconProps) {
  const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  if (type === 'Ionicons') return <Ionicons name={name} size={size} color={themeColor} />;
  if (type === 'FontAwesome6') return <FontAwesome6 name={name} size={size} color={themeColor} />;
}

