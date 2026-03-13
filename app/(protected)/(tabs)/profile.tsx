import { Redirect } from "expo-router";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { ChangePass } from "@/components/ChangePassForm/ChangePassForm";
// import { UserProfileForm } from "@/components/UserProfileForm/UserProfileForm";
import { IconButton } from "@/components/buttons/IconButton";
import { ProfileImage } from "@/components/buttons/ProfileImage";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { AuthContext } from "@/contexts/AuthContext";
import { commonFlexStyles, commonStyles, containers } from "@/styling/common";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

export default function Profile() {

  const { user, isLoggedIn, isReady } = useContext(AuthContext);

  const [isEditable, setIsEditable] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const { t } = useTranslation();


  if (isReady && !isLoggedIn) {
    Alert.alert(t('actionNeed'), t('notauth_sub'), [{
      text: t('goLogin')
    }]);
    return (<Redirect href="/login" />);
  }

  // if ([Role.user].includes(user.role)) {
  //   Alert.alert(t('actionNeed'), t('role_user_sub'), [{
  //     text: t('oKey')
  //   }]);
  // }

  // TODO use gallery or take photo 
  const uploadPhoto = () => {
    console.log("TODO upload image")
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
            avatarUrl={user.avatar}
            imageStyle={commonStyles.avatarPhoto}
            iconSize={220}
            handler={uploadPhoto}
          />

          <ThemedText type={'subtitle'}>{user.firstName} {user.lastName}</ThemedText>
          <ThemedText type={'defaultSemiBold'}>{t(user.role)} </ThemedText>
          <ThemedText type={'default'}>{user.email} </ThemedText>
          {user.voice && <ThemedText type={'default'}>{user.voice} </ThemedText>}

          {/* {isEditable && <UserProfileForm handleSuccess={() => setIsEditable(false)} />} */}

          {/* {changePass && <ChangePass handleSuccess={() => setChangePass(false)} />} */}

        </ThemedView>

      </ScrollView>
    </SafeAreaView>
  </>);
}
