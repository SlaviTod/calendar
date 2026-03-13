import { StyleProp, ViewStyle } from 'react-native';

import { RequiredStar } from '../ui/required-star';
import { ThemedInput, ThemedInputProps } from './themed-input';
import { ThemedView } from './themed-view';


export type MyInputProps = ThemedInputProps & {
  wrapperStyle: StyleProp<ViewStyle>,
  showRequired?: boolean,
  isRequired?: boolean;
};


export function MyInput({
  wrapperStyle,
  style,
  lightColor,
  darkColor,
  hideText = false,
  showRequired = false,
  isRequired = false,
  editable = true,
  type = 'default',
  placeholder,
  value,
  multiline,
  onBlur,
  onChangeText,
  ...otherProps }: MyInputProps) {

  return (
    <>
      <ThemedView style={[wrapperStyle, { position: 'relative'}]}>
        {isRequired && showRequired && <RequiredStar />}
        <ThemedInput
          style={style}
          placeholder={placeholder}
          value={value}
          multiline={multiline}
          onBlur={onBlur}
          onChangeText={onChangeText}
          {...otherProps}
        />
      </ThemedView>
    </>
  );
}
