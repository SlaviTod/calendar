import { useThemeColor } from '@/hooks/use-theme-color';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { TFunction } from 'i18next';
import { Ref } from 'react';
import { StyleProp, TextStyle } from 'react-native';

export type ThemedInputProps = PickerProps & {
  lightColor?: string;
  darkColor?: string;
  selectedValue: any;
  optionsList: string[],
  label?: string;
  showChoose?: boolean,
  reference?: Ref<Picker<any>>;
  itemStyle?: StyleProp<TextStyle>,
  handleValueChange?: () => void,
  t?: TFunction<"translation", undefined>,
};

export function ThemedPicker({
  selectedValue,
  mode,
  style,
  enabled = true,
  optionsList,
  label,
  showChoose = false,
  lightColor,
  darkColor,
  itemStyle,
  reference,
  handleValueChange,
  t,
  ...otherProps }: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');


  return (<Picker
    selectedValue={selectedValue}
    mode={mode}
    style={style}
    onValueChange={(val) => handleValueChange}
    {...otherProps}
    ref={reference}
    dropdownIconColor={backgroundColor}
    dropdownIconRippleColor={backgroundColor}
  >
    {showChoose && <Picker.Item label={label} value={''} style={[{ color, backgroundColor }, style]} />}
    {/*  @ts-expect-error  */}
    {optionsList.map((el) => <Picker.Item key={el} label={t ? t(el) as string : el} value={el} style={[{ color, backgroundColor }, itemStyle]} />)}
  </Picker>);
}
