import { Redirect, useRouter } from "expo-router";
import { DateTime, Interval } from 'luxon';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { ThemeButton } from "@/components/buttons/ThemeButton/ThemeButton";
// import { TheCalendar } from "@/components/Calendar/ThemedCalendar";
// import { ThemedPicker } from "@/components/themed/themed-picker";
import { ThemedView } from "@/components/themed/themed-view";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";
import { useRequesterArgs } from "@/hooks/useRequesterArgs";
import { requester } from "@/requester/requester";
import { commonStyles, containers } from "@/styling/common";
import { ApiEndpoints, ElbetitsaApiCalls, GetPrivateEventsResponse, PrivateEvent, PrivateEventType, Role } from "@/types";
// import { DateData } from "react-native-calendars";
// import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { SafeAreaView } from "react-native-safe-area-context";


const authorizedForEventCreation: Role[] = [Role.admin, Role.conductor, Role.member];
const authorizedForEventUpdate: Role[] = [Role.admin, Role.conductor, Role.member];
const authorizedForEventDeletion: Role[] = [Role.admin, Role.conductor];

type Action = 'add_event' | 'update_event' | 'delete_event' | 'set_attendance' | 'cancel_rehearsal';

const actionList = {
  member: ['add_event', 'update_event', 'delete_event', 'set_attendance'],
  conductor: ['add_event', 'update_event', 'delete_event', 'cancel_rehearsal'],
  admin: ['add_event', 'update_event', 'delete_event', 'cancel_rehearsal', 'set_attendance'],
}


export type MyMarkedDates = {
  [key: string]: MyMarkingProps;
};
type MyMarkingProps = {
// type MyMarkingProps = MarkingProps & {
  eventType: PrivateEventType;
  eventId: number;
}


export default function CalendarScreen() {

  const { isLoggedIn, user } = useContext(AuthContext);
  const { privateEvents, recurring, setData } = useContext(DataContext);


  const { t } = useTranslation();

  if (!isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }

  const getMonthInterval = useCallback((date: Date) => {
    return Interval.fromDateTimes(DateTime.fromJSDate(date).startOf('month'), DateTime.fromJSDate(date).endOf('month'));
  }, [])

  const markRecurringEvents = useCallback((events: PrivateEvent[], currentMonth: Interval) => {
    let marked = {} as MyMarkedDates;

    if (events?.length) events.map((event) => {
      // @ts-expect-error
      const asJson: any = JSON.parse(event.asJson);
      const dayOfTheWeek = Number(asJson.dayOfTheWeek.charAt(3));
      const startOfTheMonthAsDayOfWeek = currentMonth.start?.weekday || 0; // 1 = Monday 7 = Sunday
      const diff = dayOfTheWeek - startOfTheMonthAsDayOfWeek;

      // for (let week = 1; week < 7; week += 1) {
      //   const weekEvent = currentMonth.start?.plus({ days: diff < 0 ? diff + (week + 1) * 7 : diff + week * 7 });
      //   if (weekEvent) {
      //     const checkEndOfMonth = Interval.fromDateTimes(weekEvent, currentMonth.end);
      //     if (!checkEndOfMonth.isValid) break;


      //     marked = {
      //       ...marked, [weekEvent.toFormat('yyyy-MM-dd')]: {
      //         eventId: event.id, eventType: event.eventType,
      //         selected: true, marked: true,
      //         selectedColor: 'orange'
      //       }
      //     };
      //   }
      // }
    })
    return marked;
  }, [])

  const markDates = useCallback((events: PrivateEvent[]) => {
    let marked = {} as MyMarkedDates;

    events.map((event) => {
      const dateString = DateTime.fromISO(event.start).toFormat('yyyy-MM-dd');

      // marked = { ...marked, [dateString]: { eventId: event.id, eventType: event.eventType, selected: true, marked: true, selectedColor: 'orange' } }
    })

    return marked;
  }, [])



  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(getMonthInterval(DateTime.now().toJSDate()));
  // const [selected, setSelected] = useState({} as DateData);

  const [showActionList, setShowActionList] = useState(false);
  const [actionList, setActionList] = useState([] as string[]);

  const [markedEventDates, setMarkedDates] = useState({} as MyMarkedDates);


  useEffect(() => {
    loadPrivateEvents();

  }, [calendarMonth])


  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.getPrivateEvents] });

  const loadPrivateEvents = useCallback(async () => {
    if (loading || !calendarMonth?.start || !calendarMonth?.end) return;
    setLoading(true);
    try {
      const res: GetPrivateEventsResponse = await requester({
        ...requestArgs,
        queryKeys: ['start', 'end'],
        queries: {
          start: calendarMonth.start?.toISO(),
          end: calendarMonth.end?.toISO(),
        }
      });
      setMarkedDates((st) => ({...markDates(res.events?.length ? res.events : []),
        ...markRecurringEvents(res.recurring as PrivateEvent[], calendarMonth)
      }));
      setData({ privateEvents: res.events, recurring: res.recurring });
    } catch (err) {
      console.log('Fetch private events error', err);
    } finally {
      setLoading(false);
    }
  }, [loading, calendarMonth])


  const inputRef = useRef(null);

  const handleOnDayPress = (day: any) => {
  // const handleOnDayPress = (day: DateData) => {
    // only for info and attendance
    const dayAfterToday = Interval.fromDateTimes(DateTime.now(), new Date(day.timestamp));

    // if (!dayAfterToday.isValid) {
    //   Alert.alert(t('warning'), t('eventTimeInvalid'), [{
    //     text: t('close')
    //   }]);
    // }
    // setSelected(day);

    //   // {"dateString": "2026-03-11", "day": 11, "month": 3, "timestamp": 1773187200000, "year": 2026}
  }

  const handleOnDayLongPress = (day: any) => {
  // const handleOnDayLongPress = (day: DateData) => {
    const dayAfterToday = Interval.fromDateTimes(DateTime.now(), new Date(day.timestamp));

    // if (!dayAfterToday.isValid) {
    //   Alert.alert(t('warning'), t('eventTimeInvalid'), [{
    //     text: t('close')
    //   }]);
    // }

    // setSelected(day);

    let eventsForTheDay: string[] = [];
    const markedDateStrings = Object.keys(markedEventDates);

    markedDateStrings.forEach(key => {
      if (key === day.dateString) eventsForTheDay.push(key);
    })
    const actionList = ['add_event',];
    if (eventsForTheDay.length) actionList.push('update_event', 'delete_event');

    // TODO check if event type 
    // if ([Role.admin, Role.conductor].includes(user.role)) actionList.push('cancel_rehearsal');
    setActionList(actionList);
    setShowActionList(true);
    // @ts-expect-error
    if (inputRef?.current) inputRef?.current?.focus();

  }


  const handleMonthChange = (day: any) => {
  // const handleMonthChange = (day: DateData) => {

    const dayAfterToday = Interval.fromDateTimes(DateTime.now(), new Date(day.timestamp));

    // if (!dayAfterToday.isValid) {
    //   Alert.alert(t('warning'), t('eventTimeInvalid'), [{
    //     text: t('close')
    //   }]);
    // }
    // setSelected(day);//
    setCalendarMonth(getMonthInterval(new Date(day.timestamp)))

    //   // {"dateString": "2026-03-11", "day": 11, "month": 3, "timestamp": 1773187200000, "year": 2026}
  }

  // TODO 
  const requestDeleteArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.deleteEvent] });

  const deleteEvent = async (eventId: number) => {
    try {
      const res: GetPrivateEventsResponse = await requester({
        ...requestDeleteArgs,
        url: `${requestDeleteArgs.url}/${eventId}`,
      });
      loadPrivateEvents();
      Alert.alert(t('warning'), t('delete_event_msg'), [{
        text: t('oKey')
      }]);
    } catch (err) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('delete_event_msg_err')}. ${err instanceof Error ? t(err.message) : ''}. ${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Fetch private events error', err);
    } finally {
      setLoading(false);
    }
  }

  const handleAction = (val: any) => {
    switch (val) {
      case 'add_event': {
        // router.navigate({ pathname: '/(protected)/(tabs)/calendar/add-event', params: { date: selected.dateString } })
        break;
      };
      case 'update_event':
        // router.navigate({
        //   pathname: '/(protected)/(tabs)/calendar/update-event',
        //   params: {
        //     id: markedEventDates[selected.dateString].eventId,
        //     type: markedEventDates[selected.dateString].eventType,
        //   }
        // })
        break;
      case 'delete_event':
        // deleteEvent(markedEventDates[selected.dateString].eventId);
        break;
      case 'set_attendance':
      case 'cancel_rehearsal':

    }
  }


  return (
    <SafeAreaView style={containers.mainContainer}>

      <ThemeButton
        buttonStyle={[commonStyles.themedButtonWithIcon]}
        // handler={() => router.navigate({ pathname: '/(protected)/(tabs)/calendar/add-event', params: { date: selected.dateString } })}
        handler={() => {console.log('')}}
        iconName="add"
        iconSize={26}
        iconColor={commonStyles.themedButtonWithIcon.color}
        textStyle={commonStyles.subtitle}
        buttonText={t('add_event')}
      />

      <ThemedView>
        {/* <ThemedPicker
          selectedValue={''}
          // @ts-expect-error
          optionsList={actionList[user?.role] || []}
          style={pickerStyles.picker}
          mode={"dropdown"}
          t={t}
          onValueChange={handleAction}
        /> */}
      </ThemedView>
      <ThemedView style={{ position: "relative" }}>
        {showActionList &&
          <ThemedView style={{ position: 'absolute', top: 100, left: 50, }}>
            {/* <ThemedPicker
              reference={inputRef}
              selectedValue={''}
              optionsList={actionList}
              style={pickerStyles.picker}
              mode={"dropdown"}
              t={t}
              onValueChange={handleAction}
            /> */}
          </ThemedView>}
        {/* <TheCalendar
          markedDates={markedEventDates}
          handleMonthChange={handleMonthChange}
          onDaySelect={handleOnDayPress}
          onLongDaySelect={handleOnDayLongPress}
        /> */}
      </ThemedView>

    </SafeAreaView>
  );
}