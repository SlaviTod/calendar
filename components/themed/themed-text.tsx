import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'mini' | "linkMini" | "error";
};


export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  let color: string; 
  
  switch (type) {
    case 'default':
    case 'defaultSemiBold':
    case 'title':
    case 'subtitle':
    case 'mini':
      color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
      break;
    case 'link':
    case 'linkMini': 
      color = useThemeColor({ light: lightColor, dark: darkColor }, 'link');
      break;
    case 'error': 
      color = useThemeColor({ light: lightColor, dark: darkColor }, 'notification');
      break;
  }

    

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'mini' ? styles.mini : undefined,
        type === 'error' ? styles.default : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
  linkMini: {
    lineHeight: 30,
    fontSize: 12,
  },
  mini: {
    fontSize: 12,
  },
});
