import { View, Text, TouchableOpacity, ScrollView } from "../../../ui";
import { MaterialIcons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

export const CustomCalendar = ({props}:any) => {
    console.log('props', props)
  return (
    <Calendar
      // minDate={todayString}
      onDayPress={(day) => {
        console.log("selected day", day);
        //   setSelectedDate(day.dateString);
      }}
      // markedDates={{
      //   [selectedDate]: {
      //     selected: true,
      //     disableTouchEvent: true,
      //     selectedColor: "#22c55e",
      //     // selectedDotColor: "orange",
      //   },
      // }}
      arrowsHitSlop={30}
    />
  );
};
