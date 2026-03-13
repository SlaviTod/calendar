import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { containers } from "@/styling/common";
import { Colors, themeLight } from "@/styling/theme";
import { useTranslation } from "react-i18next";
import { Switch, SwitchProps } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";


type ThemedSwitchProps = SwitchProps & {
  name: string;
}

export const ThemedSwitch = ({
  name,
  value,
  onValueChange,
...otherProps 
}: ThemedSwitchProps) => {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

  return (<>
      <ThemedView style={[containers.flexCenter, { justifyContent: 'flex-end'}]}>
        {/* @ts-expect-error */}
        <ThemedText>{t(`${name}_${value}`)}</ThemedText>
        <Switch
            trackColor={{false: '#767577', true: themeLight}}
            thumbColor={value ? Colors[colorScheme ?? 'light'].primary : '#f4f3f4'}
            onValueChange={onValueChange}
            value={value}
          />
      </ThemedView>
  </>);
}