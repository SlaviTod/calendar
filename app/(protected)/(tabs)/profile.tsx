import * as ImagePicker from 'expo-image-picker';
import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChangePass } from "@/components/ChangePassForm/ChangePassForm";
import { UserProfileForm } from "@/components/UserProfileForm/UserProfileForm";
import { IconButton } from "@/components/buttons/IconButton";
import { ProfileImage } from "@/components/buttons/ProfileImage";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { AuthContext } from "@/contexts/AuthContext";
import { useRequesterArgs } from '@/hooks/useRequesterArgs';
import { requester } from '@/requester/requester';
import { commonFlexStyles, commonStyles, containers } from "@/styling/common";
import { ApiEndpoints, ElbetitsaApiCalls } from '@/types';

const apiHost = process.env.EXPO_PUBLIC_API_URL;

const validationRequirements = {
  allowedMimeTypes: ['image/jpg', 'image/jpeg', 'image/png'],
  allowedFileFormats: ['.jpg', '.jpeg', '.png'],
  sizeMax: (1 * 1024 * 1024),
  sizeMB: 1,
}

export default function Profile() {

  const { user, token, isLoggedIn, isReady, logIn } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const { t } = useTranslation();


  if (isReady && !isLoggedIn) {
    return (<Redirect href="/login" />);
  }

  // if ([Role.user].includes(user.role)) {
  //   Alert.alert(t('actionNeed'), t('role_user_sub'), [{
  //     text: t('oKey')
  //   }]);
  // }

  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);


  const requestArgs = useRequesterArgs({ request: ElbetitsaApiCalls[ApiEndpoints.uploadAvatar], params: [user.userId] });

  const uploadPhoto = async () => {
    setUploading(true);
    try {
      const res = await requester({
        ...requestArgs,
        formData: {
          avatar: image.base64!,
          mimeType: image.mimeType,
          fileName: image.fileName,
        },
      });

      if (res.avatar) {
        logIn({ user: { ...user, ...res }, token });
        Alert.alert(t('warning_s'), t('upload_avatar_msg_success'));
      }
    } catch (err) {
      // @ts-expect-error
      Alert.alert(t('error'), `${t('upload_avatar_msg_error')}. ${err instanceof Error ? t(err.message) : ''}. ${t('tryAgain')}`, [{
        text: t('oKey')
      }])
    } finally {
      setUploading(false);
      setImage(null);
    }
  }

  const selectImage = async () => {
    if (!uploading) {

      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(t('permission_required'), t('permission_required_msg'));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        // allowsEditing: true,
        // aspect: [3, 3],
        base64: true,
        quality: 0.01,
      });

      if (!result.canceled) {
        if (!validationRequirements.allowedMimeTypes.includes(result.assets[0].mimeType || ' ')) {
          Alert.alert(t('warning'), `${t('not_allowed_FileType__msg_error')}. ${t('allowed_FT')}: ${validationRequirements.allowedFileFormats.join(', ')}. ${t('tryAgain')}`);
          return;
        }
        if (result.assets[0].fileSize && result.assets[0].fileSize > validationRequirements.sizeMax) {
          Alert.alert(t('warning'), `${t('not_allowed_size__msg_error')} ${validationRequirements.sizeMB} MB. ${t('tryAgain')}`);
          return;
        }
        setImage(result.assets[0]);
      } else {
        Alert.alert(t('warning'), t('select_err_msg'));
      }
    }
  }

  return (<>
    <SafeAreaView>
      <ScrollView>
        <ThemedView style={[containers.mainContainer]}>
          <ThemedView style={[containers.titleWithIconButton, { gap: 50 }]}>
            <ThemedText type={'subtitle'}>{t('profile_sub')}</ThemedText>
            <ThemedView style={commonFlexStyles.row}>
              <IconButton type="FontAwesome6" name="edit" size={26} onPressHandler={() => setIsEditable(st => !st)} />
              <IconButton name="lock-open" size={26} onPressHandler={() => setChangePass(st => !st)} />
            </ThemedView>
          </ThemedView>
          <ProfileImage
            avatarUrl={user?.avatar}
            imageStyle={commonStyles.avatarPhoto}
            iconSize={220}
            showUpload={true}
            selectedUrl={image?.uri}
            handler={selectImage}
            saveHandler={uploadPhoto}
          />

          <ThemedText type={'subtitle'}>{user.firstName} {user.lastName}</ThemedText>
          <ThemedText type={'defaultSemiBold'}>{t(user.role)} </ThemedText>
          <ThemedText type={'default'}>{user.email} </ThemedText>
          {user.voice && <ThemedText type={'default'}>{user.voice} </ThemedText>}

          {isEditable && <UserProfileForm handleSuccess={() => setIsEditable(false)} />}

          {changePass && <ChangePass handleSuccess={() => setChangePass(false)} />}

        </ThemedView>

      </ScrollView>
    </SafeAreaView>
  </>);
}
