import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { IconButton } from '@/components/buttons/IconButton';
import { ThemedText } from '@/components/themed/themed-text';
import { ThemedView } from '@/components/themed/themed-view';
import { DataContext } from '@/contexts/DataContext';
import { commonStyles, containers } from '@/styling/common';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const apiHost = process.env.EXPO_PUBLIC_API_URL;


export default function ModalScreen() {

  const item: any = useLocalSearchParams();

  const router = useRouter();

  const { events } = useContext(DataContext);
  const event = events.find(el => el.id == item.id);


  return (
    <SafeAreaView style={containers.mainContainer}>
      <ThemedView style={[containers.titleWithIconButton]}>
        <ThemedView>
          <ThemedText type="title" style={commonStyles.title}>{event?.CalendarEventDetails[0].title}</ThemedText>
          {event?.start && <ThemedText type="title">{DateTime.fromISO(event.start).setLocale('bg').toFormat('d LLLL yyyy')}</ThemedText>}
        </ThemedView>
        <IconButton name="return-up-back" size={26} onPressHandler={() => router.dismissTo('/')} />
      </ThemedView>
      <ScrollView>
        <ThemedView >
          <ThemedText type="subtitle">{event?.CalendarEventDetails[0].subTitle}</ThemedText>
          <ThemedText>{event?.CalendarEventDetails[0].description}</ThemedText>

          {/* TODO Expo Video (expo-video) */}
          <ScrollView horizontal={true}>
            <ThemedView style={styles.galleryContainer}>

              {!!event?.images?.length && event.images.map((imgUrl, index) =>
                <ThemedView style={styles.imageContainer} key={index}>
                  <Image
                    style={styles.imageBg}
                    source={`${apiHost}${imgUrl}`}
                  />
                </ThemedView>
              )}
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  imageContainer: {
    maxWidth: '98%',
    maxHeight: 200,
    height: 184,
    width: 300,
    marginTop: 20,
  },
  imageBg: {
    borderRadius: 5,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  galleryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    marginBottom: 50,
  },
});
