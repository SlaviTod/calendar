import { containers } from "@/styling/common";
import { Image } from 'expo-image';
import { ImageStyle, Pressable, StyleProp } from "react-native";



type ImgButtonProps = {
  source: string | null,
  imageStyle: StyleProp<ImageStyle>,
  handler: () => void,
}

export const ImgButton = ({
  source,
  imageStyle,
  handler
}: ImgButtonProps) => {

  return (
    <Pressable onPress={handler} style={containers.flexCenter}>
      <Image
        source={source}
        style={imageStyle}
      />
    </Pressable>
  );
}