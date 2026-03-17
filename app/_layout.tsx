import '@/translator/setup';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { myDarkTheme, myLightTheme } from '@/styling/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(protected)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? myDarkTheme : myLightTheme}>
        <DataProvider>
          <AuthProvider>
            <Stack>
                <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{
                  title: 'LogIn',
                  headerShown: false,
                  animation: 'none',
                }} />
                <Stack.Screen name='register' options={{
                  title: 'Join us',
                  headerShown: false,
                  animation: 'none',
                }} />
                <Stack.Screen name="logout" options={{
                  title: 'LogOut',
                  headerShown: false,
                  animation: 'none',
                }} />

            </Stack>
          </AuthProvider>
        </DataProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
