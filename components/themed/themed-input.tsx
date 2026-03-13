import { useThemeColor } from '@/hooks/use-theme-color';
import { TextInput, TextInputProps } from 'react-native';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  hideText?: boolean;
  type?: 'default' | 'password';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  hideText = false,
  editable = true,
  type = 'default',
  multiline,
  ...otherProps }: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'placeholder');

  if (!editable) return (<TextInput style={[{ color: placeColor }, style]} multiline={multiline} {...otherProps} />);

  return (<TextInput secureTextEntry={hideText} placeholderTextColor={placeColor} style={[{ color }, style]} multiline={multiline} {...otherProps} />);
}
