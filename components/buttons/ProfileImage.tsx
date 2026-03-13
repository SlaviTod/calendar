import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { ThemedView } from "../themed/themed-view";
import { IconButton } from "./IconButton";
import { ImgButton } from "./ImgButton";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

type ProfileImageProps = {
  avatarUrl: string | null,
  imageStyle: StyleProp<ImageStyle>,
  iconSize: number,
  style?: StyleProp<ViewStyle>;
  handler: () => void,
}

export const ProfileImage = ({
  avatarUrl,
  imageStyle,
  iconSize,
  style,
  handler,
}: ProfileImageProps) => {


  return (
    <ThemedView >
      {avatarUrl && <ImgButton
        source={`${apiHost}${avatarUrl}`}
        imageStyle={imageStyle}
        handler={handler}
      />}
      {!avatarUrl && <IconButton name="person-circle" style={style} size={iconSize} onPressHandler={handler} />}
    </ThemedView>
  );
}