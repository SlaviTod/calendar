import { AuthContext } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function ProtectedLayout() {

    const { isLoggedIn, isReady } = useContext(AuthContext);
    
    if (isReady && !isLoggedIn) {
      return <Redirect href='/login' />
    }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </>
  );
}
