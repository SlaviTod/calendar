import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

import { AuthContext } from '@/contexts/AuthContext';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { commonStyles, containers } from '@/styling/common';
import { ApiEndpoints, ElbetitsaApiCalls, LoginRequest, LoginResponse } from '@/types';
import { IconButton } from '../buttons/IconButton';
import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';
import { ThemedInput } from '../themed/themed-input';
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";
import { LoginValidationSchema } from "./validateLoginForm";


export const LoginForm = () => {

  const { t } = useTranslation();

  const { logIn } = useContext(AuthContext);
  const router = useRouter();

  const [isSend, setIsSend] = useState(false);

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.login] });

  const onSubmit = async (values: LoginRequest) => {
    setIsSend(true);
    try {
      const res: LoginResponse = await requester({
        ...requestArgs,
        formData: values,
      });

      logIn(res);
      router.replace('/profile')
      // res.user.role === Role.user ? router.replace('/profile') : router.replace('/calendar');
    } catch (err: Error | unknown) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('login_msg_error')}. ${err instanceof Error ? t(err.message) : ''}. ${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Log error', err);
      setIsSend(false);
    }
  }

  const [hidePass, setHidePass] = useState(true);

  const handleEyeClick = () => {
    setHidePass((st) => !st);
  }

  return (<>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: '', password: '' } as LoginRequest}
        validationSchema={LoginValidationSchema(t)}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm }) => (<>
          <ThemedView style={[containers.form, { marginBottom: 350 }]}>

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


            <ThemedView style={containers.inlineLinkContainer}>
              <ThemedText type="mini">{t('register_msg_1')}</ThemedText>
              <Link href="/register" onPress={() => resetForm()}>
                <ThemedText type="linkMini">{t('register_msg_btn')}</ThemedText>
              </Link>
              <ThemedText type="mini">{t('register_msg_2')}</ThemedText>
            </ThemedView>

            <ThemeButton
              buttonStyle={commonStyles.themedButtonWithIcon}
              handler={() => handleSubmit()}
              disabled={isSend}
              iconName="log-in-outline"
              iconSize={26}
              iconColor={commonStyles.themedButtonWithIcon.color}
              textStyle={commonStyles.subtitle}
              buttonText={t('login')}
            />

          </ThemedView>
        </>)}
      </Formik >
    </KeyboardAvoidingView>
  </>);
}
