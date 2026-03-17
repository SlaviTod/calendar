import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, useColorScheme } from "react-native";

import { commonStyles, containers, pickerStyles } from '@/styling/common';
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";

import { AuthContext } from '@/contexts/AuthContext';
import { ApiEndpoints, ElbetitsaApiCalls, OneTimePrivateEvents, PrivateEvent, PrivateEventResponse, PrivateEventType, PrivateEventUpdateRequest, RepetitiveEvents, Role } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';
import { MyInput } from '../themed/my-input';
import { ThemedPicker } from '../themed/themed-picker';
import { EventValidationSchema } from './eventValidationSchema';

import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { calendarDarkTheme, calendarLightTheme } from '@/styling/calendarTheme';
import { DateTime } from 'luxon';
import { Calendar } from 'react-native-calendars';
import { TimePicker } from '../pickers/TimePicker';
import { ThemedSwitch } from '../themed/themed-switch';
import { RequiredStar } from '../ui/required-star';

const privateEventsType: PrivateEventType[] = [OneTimePrivateEvents.oneTimeRehearsal, OneTimePrivateEvents.publicEvent, OneTimePrivateEvents.trip, OneTimePrivateEvents.other];
const privateEventsTypeForAdminAndConductor: PrivateEventType[] = [...privateEventsType, RepetitiveEvents.recurringRehearsal];

const daysOfTheWeek: string[] = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7',];


type EventProps = {
  event: PrivateEvent;
}

export const UpdateEventForm = ({
  event,
}: EventProps) => {

  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();

  const router = useRouter();

  const { user } = useContext(AuthContext);

  const isAdmin = user.role === Role.admin;
  const isConductor = user.role === Role.conductor;


  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.updateEvent], params: [event.id.toString()] });

  const onSubmit = async (values: PrivateEventUpdateRequest) => {
    setIsSend(true);
    try {
      const res: PrivateEventResponse = await requester({
        ...requestArgs,
        formData: values,
      });

      Alert.alert(t('warning'), `${t('update_event_msg_success')}`, [{
        text: t('close')
      }])
      router.back();
      router.setParams({ needRefresh: values.start.toISOString() });
    } catch (err: Error | unknown) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('event_update_msg_error')}. ${err instanceof Error ? t(err.message) + '. ' : ''}${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Update Event error', err);
      setIsSend(false);
    }
  }

  const [showRequired, setShowRequired] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const [isSend, setIsSend] = useState(false);


  const toggleSwitch = () => {
    setShowRequired((st) => !st);
  }

  const toggleSwitchAdditional = () => {
    setShowAdditional((st) => !st);
  }

  const toggleSwitchEndTime = () => {
    setShowEndTime((st) => !st);
  }

  const prepareEndOfTheEvent = (start: Date, duration?: number) => {
    if (event.eventType === RepetitiveEvents.recurringRehearsal) return; // for trips ???
    return duration ?
      DateTime.fromJSDate(start).plus({ minute: duration }).toJSDate()
      : DateTime.fromJSDate(start).endOf('day').toJSDate();
  }

    const prepareAsJSONstartAt = (asJson: string, data: object) => {
    const oldVal = JSON.parse(asJson);
    return JSON.stringify({ ...oldVal, startAt: { ...oldVal?.startAt, ...data } });
  }

  const prepareAsJSON = (asJson: string, data: object) => {
    const oldVal = JSON.parse(asJson);
    return JSON.stringify({ ...oldVal, ...data });
  }


  return (<SafeAreaView>
    <ThemedSwitch
      name={'requiredSwitch'}
      onValueChange={toggleSwitch}
      value={showRequired}
    />
    <ThemedSwitch
      name={'addSwitch'}
      onValueChange={toggleSwitchAdditional}
      value={showAdditional}
    />

    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Formik
          initialValues={{
            id: event?.id,
            eventType: event?.eventType,
            title: event?.title || null,
            description: event?.description || null,
            address: event?.address || null,
            city: event?.city || null,
            country: event?.country || null,
            mapLink: event?.mapLink || '',
            start: event?.start ? DateTime.fromISO(event.start).toJSDate() : undefined,
            end: event?.end ? DateTime.fromISO(event.end).toJSDate() : undefined,
            durationInMinutes: event?.durationInMinutes || 0,
            timeZone: event?.timeZone || '',
            asJson: JSON.stringify(event?.asJson) || '{}',
          } as PrivateEventUpdateRequest}
          validationSchema={EventValidationSchema(t)}
          onSubmit={values => onSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (<>
            <ThemedView style={[containers.form, { gap: 6, paddingHorizontal: 10, marginTop: 0, marginBottom: 300 }]}>

              <ThemedText style={commonStyles.label}>{t('eventType')}</ThemedText>
              <ThemedView style={[containers.inputWr, { paddingLeft: 10 }]}>
                {showRequired && <RequiredStar />}

                <ThemedPicker
                  selectedValue={values.eventType}
                  optionsList={isAdmin || isConductor ? privateEventsTypeForAdminAndConductor
                    : privateEventsType}
                  showChoose={values.eventType ? false : true}
                  style={pickerStyles.picker}
                  mode={"dropdown"}
                  label={t('select_msg')}
                  t={t}
                  onValueChange={(val) => setFieldValue('eventType', val)}
                />
              </ThemedView>

              <ThemedText style={commonStyles.label}>{values?.eventType === RepetitiveEvents.recurringRehearsal ?
                t('eventStart_r') : t('eventStart')}</ThemedText>
              <ThemedView style={[containers.inputWr, { borderColor: 'transparent', margin: 0 }, containers.flexCenter]}>
                {showRequired && <RequiredStar />}
                <ThemedText type="defaultSemiBold">
                  {DateTime.fromJSDate(values.start).toFormat('yyyy-MM-dd  HH:mm')}</ThemedText>
              </ThemedView>

              {(!values?.eventType || values?.eventType !== RepetitiveEvents.recurringRehearsal) && <>
                <ThemedText style={commonStyles.label}>{t('set_event_start_time')}</ThemedText>
                <ThemedView style={[containers.inputWr, { borderColor: 'transparent', margin: 0 }, containers.titleWithIconButton]}>
                  <TimePicker
                    value={values.start}
                    onChange={(date) => { setFieldValue('start', date); setFieldValue('end', prepareEndOfTheEvent(date)) }}
                  />
                </ThemedView>
              </>}


              {(values?.eventType === RepetitiveEvents.recurringRehearsal) && <>
                <ThemedText style={commonStyles.label}>{t('set_event_start_time_r')}</ThemedText>
                <ThemedView style={[containers.inputWr, { borderColor: 'transparent', margin: 0 }, containers.titleWithIconButton]}>
                  <TimePicker
                    startHour={event.asJson?.startAt?.hour || ''}
                    startMinutes={event.asJson?.startAt?.minute || ''}
                    value={values.start}
                    returnDateObjUnit={true}
                    onChangePart={(datePart) => setFieldValue('asJson', prepareAsJSONstartAt(values.asJson, datePart ))}
                  />
                </ThemedView>
              </>}

              <ThemedText style={commonStyles.label}>{t('durationInMinutes')}</ThemedText>
              <MyInput
                wrapperStyle={containers.inputWr}
                style={commonStyles.input}
                placeholder={t('durationInMinutes')}
                value={values.durationInMinutes.toString()}
                keyboardType="numeric"
                onBlur={handleBlur('durationInMinutes')}
                onChangeText={(min) => {
                  setFieldValue('durationInMinutes', Number(min));
                  setFieldValue('end', prepareEndOfTheEvent(values.start, Number(min)))
                }}
              />
              {errors.durationInMinutes && touched.durationInMinutes &&
                <ThemedText type="error" >{errors.durationInMinutes}</ThemedText>}


              {(values?.eventType === RepetitiveEvents.recurringRehearsal) && <>

                <ThemedText style={commonStyles.label}>{t('dayOfWeek')}</ThemedText>
                <ThemedView style={[containers.inputWr, { paddingLeft: 10 }]}>
                  {showRequired && <RequiredStar />}
                  <ThemedPicker
                    selectedValue={event.asJson?.dayOfTheWeek}
                    optionsList={daysOfTheWeek}
                    showChoose={values.asJson ? false : true}
                    style={pickerStyles.picker}
                    mode={"dropdown"}
                    label={t('dayOfWeek')}
                    t={t}

                    onValueChange={(val) => setFieldValue('asJson', prepareAsJSON(values.asJson, { dayOfTheWeek: val }))}
                  />
                </ThemedView>


                <ThemedView>
                  <ThemedText style={commonStyles.label}>{t('set_event_end_time_r')}</ThemedText>

                  <Pressable style={[containers.inputWr, commonStyles.title,
                  { margin: 0, padding: 0, height: 50, justifyContent: 'center' }]} onPress={() => toggleSwitchEndTime()}>
                    <ThemedText type="defaultSemiBold" style={{ margin: 0, padding: 0, alignSelf: 'center' }}>
                      {values.end ? DateTime.fromJSDate(values.end).toFormat('yyyy-MM-dd') : showEndTime}</ThemedText>
                  </Pressable>

                  {showEndTime && <ThemedView style={[containers.flexCenter]}>
                    <Calendar

                      hideDayNames={true}
                      style={[{ backgroundColor: 'transparent' }, { margin: 0, padding: 0, }]}
                      theme={colorScheme === 'dark' ? calendarDarkTheme : calendarLightTheme}
                      firstDay={i18n.language === 'bg' ? 1 : 0}
                      hideExtraDays={true}
                      disableAllTouchEventsForDisabledDays={true}
                      onDayPress={(day) => { setFieldValue('end', new Date(day.timestamp)); setShowEndTime(false) }}

                    />

                  </ThemedView>}
                </ThemedView>

              </>}

              {!!values.title && <ThemedText style={commonStyles.label}>{t('title')}</ThemedText>}
              <MyInput
                wrapperStyle={containers.inputWr}
                style={commonStyles.input}
                placeholder={t('title')}
                value={values.title || ''}
                onBlur={handleBlur('title')}
                onChangeText={handleChange('title')}
              />
              {errors.title && touched.title &&
                <ThemedText type="error" >{errors.title}</ThemedText>}

              {!!values.description && <ThemedText style={commonStyles.label}>{t('description')}</ThemedText>}
              <MyInput
                wrapperStyle={containers.inputWr}
                style={[commonStyles.input, (values.description?.length > 20 ? { height: 150 } : {})]}
                placeholder={t('description')}
                value={values.description || ''}
                multiline={values.description?.length > 20}
                onBlur={handleBlur('description')}
                onChangeText={handleChange('description')}
              />
              {errors.description && touched.description &&
                <ThemedText type="error" >{errors.description}</ThemedText>}


              {showAdditional && <>
                {!!values.address && <ThemedText style={commonStyles.label}>{t('address')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('address')}
                  value={values.address || ''}
                  onBlur={handleBlur('address')}
                  onChangeText={handleChange('address')}
                />
                {errors.address && touched.address &&
                  <ThemedText type="error" >{errors.address}</ThemedText>}


                {!!values.city && <ThemedText style={commonStyles.label}>{t('city')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('city')}
                  value={values.city || ''}
                  onBlur={handleBlur('city')}
                  onChangeText={handleChange('city')}
                />
                {errors.city && touched.city &&
                  <ThemedText type="error" >{errors.city}</ThemedText>}


                {!!values.country && <ThemedText style={commonStyles.label}>{t('country')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('country')}
                  value={values.country || ''}
                  onBlur={handleBlur('country')}
                  onChangeText={handleChange('country')}
                />
                {errors.country && touched.country &&
                  <ThemedText type="error" >{errors.country}</ThemedText>}


                {!!values.mapLink && <ThemedText style={commonStyles.label}>{t('mapLink')}</ThemedText>}
                <MyInput
                  wrapperStyle={containers.inputWr}
                  style={commonStyles.input}
                  placeholder={t('mapLink')}
                  value={values.mapLink}
                  onBlur={handleBlur('mapLink')}
                  onChangeText={handleChange('mapLink')}
                />
                {errors.mapLink && touched.mapLink &&
                  <ThemedText type="error" >{errors.mapLink}</ThemedText>}
              </>}


              <ThemeButton
                buttonStyle={[commonStyles.themedButtonWithIcon]}
                handler={handleSubmit}
                disabled={isSend}
                iconName="add"
                iconSize={26}
                iconColor={commonStyles.themedButtonWithIcon.color}
                textStyle={commonStyles.subtitle}
                buttonText={!event ? t('add_event') : t('update_event')}
              />

            </ThemedView>
          </>)}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>);
}
