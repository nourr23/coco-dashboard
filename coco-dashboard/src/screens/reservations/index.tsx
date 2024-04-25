import { View, Text, TouchableOpacity, ScrollView } from "../../ui";
import { MaterialIcons } from "@expo/vector-icons";
import { ReservationCard } from "../../ui/components/reservation-card";

export const Reservations = () => {
  const BOOKING_DATA = [
    {
      id: 1,
      name: "Mohamed Mansour",
      person_number: 6,
      total: "360.00",
      date: "20-07-2024",
      state: "accepted",
    },
    {
      id: 2,
      name: "Ibrahim Salem",
      person_number: 2,
      total: "120.00",
      date: "21-07-2024",
      state: "accepted",
    },
  ];
  return (
    <View className=" flex-1 bg-white px-3 py-4">
      <View className=" flex-row my-3 justify-between">
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#3b82f6" />
        </TouchableOpacity>
        <Text className=" font-bold text-success-500 text-xl">Aujourd'hui</Text>
        <TouchableOpacity>
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
      <ScrollView className=" mt-2">
        {BOOKING_DATA.map((item: any) => (
          <ReservationCard key={item.id} item={item}></ReservationCard>
        ))}

        {BOOKING_DATA.map((item: any) => (
          <ReservationCard key={item.id} item={item}></ReservationCard>
        ))}

        {BOOKING_DATA.map((item: any) => (
          <ReservationCard key={item.id} item={item}></ReservationCard>
        ))}
      </ScrollView>
      <View className=" absolutec bottom-10 self-center items-end w-full h-5 px-3">
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("AddMenu" as never, { item: null } as never)
          // }
          className=" justify-center items-center rounded-[30px] bg-white shadow-lg shadow-black h-[60px] w-[60px]"
        >
          <MaterialIcons name="calendar-month" size={32} color="#22c55e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
