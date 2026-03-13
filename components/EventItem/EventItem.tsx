import { useThemeColor } from "@/hooks/use-theme-color";
import { commonStyles } from "@/styling/common";
import { Colors } from "@/styling/theme";
import { PublicEvent } from "@/types";
import { Image } from 'expo-image';
import { Link } from "expo-router";
import { DateTime } from 'luxon';
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../themed/themed-view";



const apiHost = process.env.EXPO_PUBLIC_API_URL;

export const EventItem = ({
  item,
}: { item: PublicEvent }) => {
  
  const color = useThemeColor({}, 'primary');
  const bgcolor = Colors.dark.background;
  

  return (
    <Link href={{ pathname: "/modal", params: { id: item.id } }} style={{ marginVertical: 10 }} >
      <ThemedView style={[styles.mainContainer, { borderColor: color }]}>
        <Image
          style={styles.imageBg}
          source={`${apiHost}${!!item.images?.length ? item.images[0] : '/public/images/borisova.jpg'}`}
        />
        <View style={styles.textContainer}>
          <View style={{ backgroundColor: bgcolor, padding: 5, borderRadius: 10 }}>
            <Text
              style={[commonStyles.titleText, { marginBottom: 5, textAlign: 'center', color: 'white' }]}>{item.CalendarEventDetails[0].title}</Text>
            <Text style={[commonStyles.subtitle, { marginBottom: 5, color: 'white' }]}>{DateTime.fromISO(item.start).setLocale('bg').toFormat('d LLLL yyyy')}, {item.CalendarEventDetails[0].city}</Text>
          </View>
        </View>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 184,
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    gap: 8,
    position: 'relative',
  },
  imageBg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
