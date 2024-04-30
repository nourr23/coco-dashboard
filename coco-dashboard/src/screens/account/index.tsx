import { View, Text, ScrollView, TouchableOpacity } from "../../ui";
import { Avatar } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Account = () => {
  const navigation = useNavigation();
  const AccountButton = ({ title, headingTo }: any) => {
    return (
      <TouchableOpacity
        onPress={headingTo}
        activeOpacity={0.8}
        className=" w-full px-4 shadow-sm shadow-black flex-row justify-between items-center py-4 my-3 rounded-[7px] border-neutral-200 bg-white border-[0.5px]"
      >
        <Text className=" text-neutral-500 font-bold"> {title} </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color="#737373"
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView className=" bg-white px-3 py-4">
      <View className=" mt-4 self-center items-center justify-center w-full">
        <Avatar
          name="Nour jouini"
          size={120}
          useAutoColors
          labelColor="white"
        />
      </View>
      <Text className=" w-full text-center text-green-500 font-bold text-xl my-2">
        Nour jouini
      </Text>
      <AccountButton
        headingTo={() => navigation.navigate("AccountInformation" as never)}
        title="Information"
      />
      <AccountButton
        headingTo={() => navigation.navigate("RestaurantInformation" as never)}
        title="Restaurant"
      />
      <AccountButton title="Sécurité" />
      <AccountButton title="Historiques" />
      <AccountButton title="paramètre" />
    </ScrollView>
  );
};
