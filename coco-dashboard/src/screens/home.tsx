import { View, Text, TouchableOpacity } from "../ui";

export const Home = () => {
  return (
    <View className=" py-6 px-4 bg-white flex-1">
      <Text className=" text-neutral-700 font-bold  text-lg mt-8">
        Welcome, admin
      </Text>
      <View className=" mt-3 flex-row justify-between">
        <TouchableOpacity className=" h-[170px] w-[170px] rounded-[7px] border-neutral-300 bg-white border-[1px]"></TouchableOpacity>
        <TouchableOpacity className=" h-[170px] w-[170px] rounded-[7px] border-neutral-300 bg-white border-[1px]"></TouchableOpacity>
      </View>
      <View className=" mt-3 flex-row justify-between">
        <View className=" h-[170px] w-[170px] rounded-[7px] border-neutral-300 bg-white border-[1px]"></View>
        <View className=" h-[170px] w-[170px] rounded-[7px] border-neutral-300 bg-white border-[1px]"></View>
      </View>
    </View>
  );
};
