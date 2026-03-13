import { IconButton } from "@/components/buttons/IconButton";
// import { EventForm } from "@/components/EventForm/EventForm";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { commonStyles, containers } from "@/styling/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";



export default function CreateEvent() {

  const { t } = useTranslation();

  const params: any = useLocalSearchParams();

  const router = useRouter();


  return (
    <SafeAreaView style={containers.mainContainer}>

      <ThemedView style={containers.titleWithIconButton}>
        <ThemedText type="title" style={commonStyles.title}>{t('add_event')}</ThemedText>
        <IconButton name="return-up-back" size={26} onPressHandler={() => router.back()} />
      </ThemedView>

      {/* <EventForm date={params.date}/> */}
    </SafeAreaView>
  );
}