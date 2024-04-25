import { View, Text, ScrollView, TouchableOpacity } from "../../ui";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Menu = () => {
  const navigation = useNavigation();
  const FOOD_DATA = [
    {
      id: 1,
      title: "Pasta",
      description: "bla bla bla, bla bla bla",
      img_url: "",
      price: "30",
    },
    {
      id: 2,
      title: "Pasta",
      description: "bla bla bla, bla bla bla",
      img_url: "",
      price: "40",
    },
  ];
  const FoodCard = ({ item }: any) => {
    return (
      <View className=" shadow-md flex-row w-full px-2 py-1 my-2 items-center rounded-[7px] border-neutral-200 bg-white border-[1px]">
        <View className=" h-[140px] w-[140px] rounded-[7px] bg-danger-100">
          {/* image */}
        </View>
        <View className=" ml-2">
          <View className=" flex-row  justify-between">
            <Text className=" text-neutral-500 font-bold"> {item.title} </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddMenu", { item: item })}
            >
              <Foundation name="pencil" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <Text className=" text-neutral-300 mt-2"> {item.description} </Text>
          <Text className=" text-green-500 font-bold mt -2">
            {" "}
            {item.price} {" DTN"}{" "}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View className=" flex-1 relative">
      <ScrollView className=" bg-white px-3">
        <Text>Menu</Text>
        {FOOD_DATA.map((item) => (
          <FoodCard key={item.id} item={item}></FoodCard>
        ))}
      </ScrollView>
      <View className=" absolute bottom-12 self-center w-full h-5 px-3">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddMenu" as never, { item: null } as never)
          }
          className=" w-full justify-center items-center rounded bg-green-500 h-[50px]"
        >
          <Text className=" text-xl text-white font-bold">Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
