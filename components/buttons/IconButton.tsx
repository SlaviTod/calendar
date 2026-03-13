import { Pressable, StyleProp, ViewStyle } from "react-native";
import { IconType, ThemedIcon } from "../themed/themed-icon";


type IconButtonProps = {
  style?: StyleProp<ViewStyle>;
  name: string;
  type?: IconType;
  size: number;
  onPressHandler: () => void,
}

export const IconButton = ({
  style = {},
  name,
  size,
  type = 'Ionicons',
  onPressHandler,
}: IconButtonProps) => {

  return (
    <Pressable style={[{ paddingHorizontal: 10 }, style]} onPress={() => onPressHandler()}>
      <ThemedIcon name={name} size={size} type={type}/>
    </Pressable>
  )
}