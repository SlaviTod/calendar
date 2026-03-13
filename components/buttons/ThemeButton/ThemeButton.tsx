import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

type ThemeButtonProps = {
  buttonStyle: StyleProp<ViewStyle>,
  disabled?: boolean,
  iconName: any,
  iconSize: number,
  iconColor: string,
  textStyle: StyleProp<TextStyle>,
  buttonText: string;
  handler: () => void,
}

export const ThemeButton = ({
  buttonStyle,
  disabled = false,
  iconName,
  iconSize,
  iconColor,
  textStyle,
  buttonText,
  handler,
}: ThemeButtonProps) => {


  return (
    <Pressable style={buttonStyle} onPress={handler} disabled={disabled}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      {buttonText && <Text style={textStyle}>{buttonText}</Text>}
    </Pressable>
  );
}