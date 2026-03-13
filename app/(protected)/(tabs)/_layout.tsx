import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';

import Header from '@/components/Header/Header';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/styling/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  // TODO replace with useThemeColor
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        header: (params) => <Header {...params} title='' />,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', 
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
