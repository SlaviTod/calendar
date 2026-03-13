import { IconButton } from "@/components/buttons/IconButton";
import { UpdateEventForm } from "@/components/EventForm/UpdateEventForm";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { DataContext } from "@/contexts/DataContext";
import { commonStyles, containers } from "@/styling/common";
import { RepetitiveEvents } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";



export default function UpdateEvent() {

  const { t } = useTranslation();

  const { privateEvents, recurring } = useContext(DataContext);

  const params: any = useLocalSearchParams();
  console.log("🚀 ~ UpdateEvent ~ params:", params)


  const event = params.type === RepetitiveEvents.recurringRehearsal ?
    recurring.find((el) => el.id == params.id)
    : privateEvents.find((el) => el.id == params.id)


  const router = useRouter();


  return (
    <SafeAreaView style={containers.mainContainer}>

      <ThemedView style={containers.titleWithIconButton}>
        <ThemedText type="title" style={commonStyles.title}>{t('update_event')}</ThemedText>
        <IconButton name="return-up-back" size={26} onPressHandler={() => router.back()} />
      </ThemedView>

      {event && <UpdateEventForm event={event} />}
    </SafeAreaView>
  );
}