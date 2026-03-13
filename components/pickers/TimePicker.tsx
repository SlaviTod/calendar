import { containers, pickerStyles } from "@/styling/common";
import { DateObjectUnits, DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { ThemedPicker } from "../themed/themed-picker";
import { ThemedText } from "../themed/themed-text";
import { ThemedView } from "../themed/themed-view";


const hoursList: string[] = ['17', '18', '19', '20', '21', '9', '10', '11', '12', '13', '14', '15', '16'];
const minutesList: string[] = ['00', '15', '30', '45'];

// TODO 
type TimePickerProps = {
  value: Date,
  returnDateObjUnit?: boolean;
  is24Hour?: boolean,
  minuteInterval?: number,
  startHour?: string | number,
  startMinutes?: string | number,
  onChange?: (date: Date) => void,
  onChangePart?: (date: DateObjectUnits) => void,
}


export const TimePicker = ({
  startHour,
  startMinutes,
  value,
  returnDateObjUnit = false,
  onChange = () => { },
  onChangePart = () => { },
}: TimePickerProps) => {


  const { t } = useTranslation();

  const handleHoursChange = (val: any) => {
    const hour = isNaN(val) ? 0 : Number(val)
    const day = DateTime.fromJSDate(value).set({ hour }).toJSDate();
    !returnDateObjUnit ? onChange(day) : onChangePart({ hour });
  }
  const handleMinutesChange = (val: any) => {
    const minute = isNaN(val) ? 0 : Number(val)
    const day = DateTime.fromJSDate(value).set({ minute }).toJSDate();
    !returnDateObjUnit ? onChange(day) : onChangePart({ minute });
  }

  return (<>
    <ThemedView style={[containers.titleWithIconButton, { width: '100%' }]}>

      <ThemedView style={[containers.titleWithIconButton]}>
        <ThemedView style={containers.timeInputWr}>
          <ThemedPicker
            selectedValue={startHour ? startHour : ''}
            optionsList={hoursList}
            style={containers.timeInputWr}
            itemStyle={pickerStyles.timePicker}
            mode={"dropdown"}
            showChoose={startHour ? false : true}
            label={startHour ? undefined : "..."}
            onValueChange={(val) => handleHoursChange(val as string)}
          />
        </ThemedView>
        <ThemedText>{t('h')}</ThemedText>
      </ThemedView>

      <ThemedView style={[containers.titleWithIconButton]}>
        <ThemedView style={containers.timeInputWr}>
          <ThemedPicker
            selectedValue={startMinutes ? startMinutes : ''}
            optionsList={minutesList}
            style={containers.timeInputWr}
            itemStyle={pickerStyles.timePicker}
            mode={"dropdown"}
            showChoose={startMinutes ? false : true}
            label={"..."}
            onValueChange={(val) => handleMinutesChange(val as string)}
          />
        </ThemedView>
        <ThemedText>{t('m')}</ThemedText>
      </ThemedView>
    </ThemedView>

  </>);
}