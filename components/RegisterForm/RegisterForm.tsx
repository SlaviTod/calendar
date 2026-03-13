import { useNavigation, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";

import { commonStyles, containers } from '@/styling/common';
import { IconButton } from '../buttons/IconButton';
import { ThemedInput } from '../themed/themed-input';
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";

import { AuthContext } from '@/contexts/AuthContext';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { ApiEndpoints, ElbetitsaApiCalls, LoginResponse, RegisterRequest } from '@/types';
import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';
import { RegisterValidationSchema } from './registerValidationSchema';


export const RegisterForm = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { logIn } = useContext(AuthContext);
  const router = useRouter();

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.register] });

  const onSubmit = async (values: RegisterRequest) => {
    setIsSend(true);
    try {
      const res: LoginResponse = await requester({
        ...requestArgs,
        formData: values,
      });

      Alert.alert(t('warning'), `${t('registration_msg_success')}`, [{
        text: t('oKey')
      }])
      logIn(res);
      router.dismissTo('/profile');
    } catch (err: Error | unknown) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('registration_msg_error')}. ${err instanceof Error ? t(err.message) : ''}. ${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Log error', err);
      setIsSend(false);
    }
  }

  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [isSend, setIsSend] = useState(false);

  const handleEyeClick = () => {
    setHidePass((st) => !st);
  }

  const handleConfirmEyeClick = () => {
    setHideConfirmPass((st) => !st);
  }

  return (<>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterValidationSchema(t)}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (<>
          <ThemedView style={containers.form}>

            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                placeholder={t('firstName')}
                value={values.firstName}
                onBlur={handleBlur('firstName')}
                onChangeText={handleChange('firstName')}
              />
            </ThemedView>
            {errors.firstName && touched.firstName &&
              <ThemedText type="error" >{errors.firstName}</ThemedText>}

            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                placeholder={t('lastName')}
                value={values.lastName}
                onBlur={handleBlur('lastName')}
                onChangeText={handleChange('lastName')}
              />
            </ThemedView>
            {errors.lastName && touched.lastName &&
              <ThemedText type="error" >{errors.lastName}</ThemedText>}


            <ThemedView style={containers.inputWr}>
              <ThemedInput
                style={commonStyles.input}
                placeholder={t('email')}
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
              />
            </ThemedView>
            {errors.email && touched.email &&
              <ThemedText type="error" >{errors.email}</ThemedText>}


            <ThemedView style={[containers.inputWr, containers.passContainer]}>
              <ThemedInput
                style={commonStyles.inputPass}
                type="password"
                hideText={hidePass}
                placeholder={t('password')}
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              <IconButton
                style={commonStyles.iconPass}
                name={hidePass ? 'eye-off' : 'eye'}
                size={30}
                onPressHandler={handleEyeClick} />
            </ThemedView>
            {errors.password && touched.password &&
              <ThemedText type="error" >{errors.password}</ThemedText>}

            <ThemedView style={[containers.inputWr, containers.passContainer]}>
              <ThemedInput
                style={commonStyles.inputPass}
                type="password"
                hideText={hideConfirmPass}
                placeholder={t('cf_pass')}
                value={values.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                onChangeText={handleChange('confirmPassword')}
              />
              <IconButton
                style={commonStyles.iconPass}
                name={hideConfirmPass ? 'eye-off' : 'eye'}
                size={30}
                onPressHandler={handleConfirmEyeClick} />
            </ThemedView>
            {errors.confirmPassword && touched.confirmPassword &&
              <ThemedText type="error" >{errors.confirmPassword}</ThemedText>}


            <ThemedView style={containers.inlineLinkContainer}>
              <ThemedText type="mini">{t('login_msg_1')}</ThemedText>
              {/* TODO check */}
              <Pressable onPress={() => navigation.goBack()}>
                <ThemedText type="linkMini">{t('login_msg_btn')}</ThemedText>
              </Pressable>
              <ThemedText type="mini">{t('login_msg_2')}</ThemedText>
            </ThemedView>


            <ThemeButton
              buttonStyle={[commonStyles.themedButtonWithIcon]}
              handler={() => handleSubmit()}
              disabled={isSend}
              iconName="pencil"
              iconSize={26}
              iconColor={commonStyles.themedButtonWithIcon.color}
              textStyle={commonStyles.subtitle}
              buttonText={t('register')}
            />

          </ThemedView>
        </>)}
      </Formik>
    </KeyboardAvoidingView>
  </>);
}
