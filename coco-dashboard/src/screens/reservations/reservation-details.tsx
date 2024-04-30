import { View, Text, TouchableOpacity } from "../../ui";
import { useRoute } from "@react-navigation/native";

export const ReservationDetails = () => {
  const { params } = useRoute<any>();
  return (
    <View className=" py-4 px-3 flex-1 bg-white">
      <View className=" w-full h-[260px] justify-center items-center">
        <Text>Image here</Text>
      </View>
      <Text className=" text-success-500 font-bold text-lg">Full Name</Text>
      <Text className=" text-neutral-500 text-base mt-1">6 personnes</Text>
      <Text className=" text-neutral-500 text-base mt-1">liste menu</Text>
      <Text className=" text-neutral-500 text-base mt-1">
        Date: "2024-06-05"
      </Text>
      <Text className=" text-green-500 font-bold text-lg mt-1 items-center">
        price DTN
      </Text>
      <View className=" mt-4 flex-row w-full justify-between">
        <Text className=" text-neutral-400 font-bold text-lg">Accepté</Text>
        <TouchableOpacity className="rounded-[7px] px-4 py-1 border-neutral-300 bg-white border-[1px]">
          <Text className=" font-bold text-danger-400 text-lg">Annuler </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
