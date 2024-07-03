import { View, Text, TouchableOpacity } from "../../core";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const TablesCard = ({ item }: any) => {
    const navigation = useNavigation();
  const { name, capacity, number, image_url, price } = item;
  return (
    <View className="border justify-between border-neutral-200 items-center flex-row my-2 p-3 rounded shadow-sm shadow-black bg-white">
      <View className=" items-start">
        <Text className=" text-neutral-500 capitalize">{name}</Text>
        <Text className=" text-neutral-500 capitalize">
          {capacity} places pour chaque table
        </Text>
        <Text className=" text-neutral-500 capitalize">{number} tables</Text>
        <Text className=" text-success-500 font-bold">{price} DT</Text>
        <TouchableOpacity 
        onPress={() => navigation.navigate("PlacesForm" as never, { item: item } as never)}
        className=" p-2 rounded mt-1 border border-success-500 ">
          <Text>Modifier</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: image_url }}
        // width={'auto'}
        // resizeMode="cover"
        height={80}
        width={80}
        style={{borderRadius:4}}
      />
    </View>
  );
};
