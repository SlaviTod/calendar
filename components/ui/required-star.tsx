import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export const RequiredStar = () => {
  return (
    <View style={[{ position: 'absolute', left: 0, top: 0 }]}>
      <Ionicons name="star" size={16} color="red" />
    </View>);
}