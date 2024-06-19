import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, TouchableOpacity } from "../../../../ui";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { Alert } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";
import { TablesCard } from "../../../../ui/components/tables-card";

export const Places = () => {
  const navigation = useNavigation();
  const [tablesList, setTablesList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTables();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTables();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    getTables();
  }, []);

  const getTables = async () => {
    try {
      setTablesList([]);
      setLoading(true);
      let { data: tables, error } = await supabase
        .from("tables")
        .select("id, name,capacity, price, number, image_url");
      setTablesList(tables);
      console.log("test tables", tables);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
    // setRestaurantId(restaurants && restaurants[0].id);
  };
  return (
    <View className=" bg-white px-3 py-4 flex-1">
      {loading ? (
        <LoaderScreen />
      ) : (
        <>
          <ScrollView className="">
            {tablesList.map((item: any) => (
              <TablesCard key={item.id} item={item} />
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate("PlacesForm" as never, { item: null } as never)}
            className=" w-full justify-center items-center rounded bg-green-500 h-[50px]"
          >
            <Text className=" text-xl text-white font-bold">
              Ajouter un type
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
