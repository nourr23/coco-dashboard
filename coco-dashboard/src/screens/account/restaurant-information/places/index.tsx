import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "../../../../ui";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { Alert } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";

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
    getTables();
  }, []);

  const getTables = async () => {
    try {
      setTablesList([]);
      setLoading(true);
      let { data: tables, error } = await supabase.from("tables").select("*");
      setTablesList(tables);
      console.log("test tables", tablesList);
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
          <ScrollView className=""></ScrollView>
        </>
      )}
    </View>
  );
};
