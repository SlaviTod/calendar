import { useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

import { AuthContext } from '@/contexts/AuthContext';
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { commonStyles, containers } from '@/styling/common';
import { ApiEndpoints, ChangePassForm, ElbetitsaApiCalls } from '@/types';
import { IconButton } from '../buttons/IconButton';
import { ThemeButton } from '../buttons/ThemeButton/ThemeButton';
import { ThemedInput } from '../themed/themed-input';
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";
import { PassValidationSchema } from './passValidationSchema';


export const ChangePass = ({
  handleSuccess,
}: { handleSuccess: () => void }) => {

  const { user } = useContext(AuthContext);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isSend, setIsSend] = useState(false);

  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.changePass], params: [user.userId] })

  const onSubmit = async (values: ChangePassForm) => {
    setIsSend(true);
    try {
      const { oldPass, password } = values;
      await requester({
        ...requestArgs,
        formData: { oldPass, password },
      });
      Alert.alert(t('warning'), t('pass_change_msg_success'), [{
        text: t('close')
      }])
      handleSuccess();
    } catch (err: Error | unknown) {
      // @ts-expect-error ​
      Alert.alert(t('error'), `${t('pass_change_msg_error')}. ${err instanceof Error ? t(err.message) + '. ' : ''}${t('tryAgain')}`, [{
        text: t('close')
      }])
      console.log('Change Pass error', err);
      setIsSend(false);
    }
  }

  const [hideOldPass, setHideOldPass] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const handleOldPassClick = () => {
    setHideOldPass((st) => !st);
  }
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
          oldPass: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={PassValidationSchema(t)}
        onSubmit={values => onSubmit(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (<>
          <ThemedView style={[containers.form, { marginBottom: 300 }]}>

            <ThemedView style={[containers.inputWr, containers.passContainer]}>
              <ThemedInput
                style={commonStyles.inputPass}
                type="password"
                hideText={hideOldPass}
                placeholder={t('password')}
                value={values.oldPass}
                onBlur={handleBlur('oldPass')}
                onChangeText={handleChange('oldPass')}
              />
              <IconButton
                style={commonStyles.iconPass}
                name={hidePass ? 'eye-off' : 'eye'}
                size={30}
                onPressHandler={handleOldPassClick} />
            </ThemedView>
            {errors.password && touched.password &&
              <ThemedText type="error" >{errors.password}</ThemedText>}


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


            <ThemeButton
              buttonStyle={[commonStyles.themedButtonWithIcon]}
              handler={() => handleSubmit()}
              disabled={isSend}
              iconName="save"
              iconSize={26}
              iconColor={commonStyles.themedButtonWithIcon.color}
              textStyle={commonStyles.subtitle}
              buttonText={t('save')}
            />

          </ThemedView>
        </>)}
      </Formik>
    </KeyboardAvoidingView>
  </>);
}
