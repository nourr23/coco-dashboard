import { View, Text, ScrollView, TouchableOpacity } from "../../ui";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../lib/supabase";
import { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, Image } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";

export const Menu = () => {
  const navigation = useNavigation();
  const [menuList, setMenuList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMenu();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      setMenuList([]);
      setLoading(true);
      let { data: menu, error } = await supabase.from("menu").select("*");
      setMenuList(menu);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
    // setRestaurantId(restaurants && restaurants[0].id);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getMenu();
  }, []);

  const FoodCard = ({ item }: any) => {
    return (
      <View className=" shadow-md flex-row w-full px-2 py-1 my-2 items-center rounded-[7px] border-neutral-200 bg-white border-[1px]">
        <View className=" overflow-hidden h-[140px] w-[140px] rounded-[7px] bg-danger-100">
          {/* image */}
          <Image
            source={{ uri: item.image_url }}
            // width={'auto'}
            resizeMode="cover"
            height={140}
          />
        </View>
        <View className=" ml-2 flex-1">
          <View className=" flex-row justify-between">
            <Text className=" text-neutral-500 font-bold">{item.title}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddMenu", { item: item })}
            >
              <Foundation name="pencil" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={2}
            className=" leading-5 text-[13px] pr-2  text-neutral-300 my-2"
          >
            {item.description}
          </Text>
          <Text className=" text-green-500 font-bold mt -2">
            {item.price} {" DNT"}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View className=" flex-1 relative bg-white px-3 py-2">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <LoaderScreen />
        ) : (
          <>
            <View className=" ">
              {menuList &&
                menuList.map((item) => (
                  <FoodCard key={item.id} item={item}></FoodCard>
                ))}
            </View>
            <View className=" absolute bottom-12 self-center w-full h-5 px-3"></View>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddMenu" as never, { item: null } as never)
        }
        className=" w-full justify-center items-center rounded bg-green-500 h-[50px]"
      >
        <Text className=" text-xl text-white font-bold">Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};
