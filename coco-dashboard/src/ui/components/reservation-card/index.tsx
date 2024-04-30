import { View, Text, TouchableOpacity } from "../../../ui";
import { useNavigation } from "@react-navigation/native";

export const ReservationCard = ({ item }: any) => {
  const navigation = useNavigation();
  return (
    <View className=" px-5 py-3 my-2 w-full mi-h-[160px] rounded-[7px] border-neutral-300 bg-white border-[1px]">
      <View className=" flex-row justify-between w-full items-center">
        <Text className=" text-success-500 font-bold text-base">
          {item.name}
        </Text>
        <TouchableOpacity className=" flex-row items-center">
          <Text className=" text-[#84cc16] font-bold text-sm mr-2">
            {item.state}
          </Text>
          {/* <MaterialIcons name="check" size={20} color="#84cc16" /> */}
        </TouchableOpacity>
      </View>
      <Text className=" text-neutral-500 mt-2 ">
        {item.person_number} {" personnes"}
      </Text>

      <View className=" flex-row justify-between w-full items-center">
        <Text className=" font-bold text-neutral-500 mt-2 ">{"Total"}</Text>
        <Text className=" text-neutral-500 mt-2 ">
          {item.total} {" DNT"}
        </Text>
      </View>

      <View className=" flex-row justify-between w-full items-center">
        <Text className=" font-bold text-neutral-500 mt-2 ">{"Date"}</Text>
        <Text className=" text-neutral-500 mt-2 ">{item.date}</Text>
      </View>

      <TouchableOpacity
        className=" mt-3 flex-row items-center"
        onPress={() =>
          navigation.navigate("ReservationDetails", { id: item.id })
        }
      >
        <Text className=" text-[#84cc16] font-bold text-sm mr-2">
          Voir les détails
        </Text>
      </TouchableOpacity>
    </View>
  );
};
