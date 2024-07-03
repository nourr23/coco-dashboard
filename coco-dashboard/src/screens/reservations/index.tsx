import { View, Text, TouchableOpacity, ScrollView } from "../../ui";
import { MaterialIcons } from "@expo/vector-icons";
import { ReservationCard } from "../../ui/components/reservation-card";
import { Calendar, LocaleConfig } from "react-native-calendars";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ReservationSection } from "../../ui/components/reservations-section";
import { todayString } from "react-native-calendars/src/expandableCalendar/commons";

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

export const Reservations = () => {
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const calenderRef = useRef(null);

  const openCalendar = () => {
    bottomSheetRef.current?.expand();
  };
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    const start = formatDate(new Date());
    setSelectedDate(start);
  }, []);

  const formatDate = (date: any) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const getPreviousDate = () => {
    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const previousDate = new Date(previousDayInMilli);

    setSelectedDate(formatDate(previousDate));
  };

  const getNextDate = () => {
    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const nextDate = new Date(nextDayInMilli);

    setSelectedDate(formatDate(nextDate));
  };

  return (
    <View className=" flex-1 bg-white px-3 py-4">
      <View className=" flex-row my-3 justify-between">
        <TouchableOpacity onPress={() => getPreviousDate()}>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3b82f6" />
        </TouchableOpacity>
        <Text className=" font-bold text-success-500 text-xl">
          {selectedDate === "2024-04-29" ? "Aujourd'hui" : selectedDate}
        </Text>
        <TouchableOpacity onPress={() => getNextDate()}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={32}
            color="#3b82f6"
          />
        </TouchableOpacity>
      </View>
      <Text className=" font-bold text-neutral-500">
        Vous avez 8 tables réservées
      </Text>
      <ReservationSection />
      <View className=" absolute bottom-20 self-center items-end w-full h-5 px-3">
        <TouchableOpacity
          onPress={() => openCalendar()}
          className=" justify-center items-center rounded-[30px] bg-white shadow-lg shadow-black h-[60px] w-[60px]"
        >
          <MaterialIcons name="calendar-month" size={32} color="#22c55e" />
        </TouchableOpacity>
      </View>
      <BottomSheet
        style={{}}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        backgroundStyle={{ borderWidth: 1, borderColor: "#22c55e" }}
      >
        <BottomSheetView style={{}}>
          <Calendar
            ref={calenderRef}
            // minDate={todayString}
            onDayPress={(day) => {
              console.log("selected day", day);
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "#22c55e",
                // selectedDotColor: "orange",
              },
            }}
            arrowsHitSlop={30}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
