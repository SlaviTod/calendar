import { commonStyles } from "@/styling/common";
import { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { ThemedView } from "../themed/themed-view";
import { IconButton } from "./IconButton";
import { ImgButton } from "./ImgButton";

const apiHost = process.env.EXPO_PUBLIC_API_URL;

type ProfileImageProps = {
  avatarUrl: string | null,
  imageStyle: StyleProp<ImageStyle>,
  iconSize: number,
  showUpload?: boolean,
  selectedUrl?: string | null,
  style?: StyleProp<ViewStyle>;
  handler: () => void,
  saveHandler?: () => void,
}

export const ProfileImage = ({
  avatarUrl,
  imageStyle,
  iconSize,
  style,
  showUpload = false,
  selectedUrl,
  handler,
  saveHandler = () => {},
}: ProfileImageProps) => {


  return (
    <ThemedView >
      {avatarUrl && !selectedUrl && <ImgButton
        source={`${apiHost}${avatarUrl}`}
        imageStyle={imageStyle}
        handler={handler}
      />}
      {!!selectedUrl && <ImgButton
        source={selectedUrl}
        imageStyle={imageStyle}
        handler={handler}
      />}
      {showUpload && <IconButton style={commonStyles.camera} name="camera" size={30} onPressHandler={handler}/>}
      {showUpload && !!selectedUrl && <IconButton style={commonStyles.save} name="save" size={30} onPressHandler={saveHandler}/>}

      {!avatarUrl && <IconButton name="person-circle" style={style} size={iconSize} onPressHandler={handler} />}
    </ThemedView>
  );
}