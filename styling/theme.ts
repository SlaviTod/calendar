/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { Platform } from 'react-native';

const appThemeColor = 'orange';
const themePrimary = '#ffbb33';
export const themeLight = '#f9e79f';
const tintColorLight = '#ffaa00';
const tintColorDark = '#ffbb33';

export const Colors = {
  light: {
    primary: themePrimary,
    text: 'rgb(28, 28, 28)',
    background: '#ffffff',
    tint: tintColorLight,
    icon: themePrimary, 
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    link: themePrimary,
    placeholder: '#4d4d4d',
  },
  dark: {
    primary: appThemeColor,
    text: '#ffffff',
    background: 'rgb(1, 1, 1)',
    tint: tintColorDark,
    icon: appThemeColor,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
    link: appThemeColor,
    placeholder: '#9BA1A6',
  },
};

export const myLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: Colors.light.notification,
  },
}

export const myDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: Colors.dark.notification,
  },
};



export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
