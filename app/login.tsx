import { LoginForm } from '@/components/LoginForm/LoginForm';
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { commonStyles, containers } from '@/styling/common';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LogIn() {
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={require('@/assets/img/2025-4-Al-Nevski-0.jpg')}
          style={commonStyles.headerImage}
        />
        <ThemedView style={containers.mainContainer}>

          <ThemedView style={containers.titleWithIconButton}>
            <ThemedText type="title" style={commonStyles.title}>{t('login_sub')}</ThemedText>
          </ThemedView>

          <LoginForm />

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
