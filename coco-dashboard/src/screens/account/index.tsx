import { View, Text, ScrollView, TouchableOpacity } from "../../ui";
import { Avatar } from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AccountButton } from "../../ui/components/account-button";
import { getUser } from "../../lib/api";

export const Account = () => {
  const navigation = useNavigation();
  // const data = getUser()

  return (
    <View className=" bg-white py-4 flex-1">
      <ScrollView className=" px-3">
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
          headingTo={() =>
            navigation.navigate("RestaurantInformation" as never)
          }
          title="Restaurant"
        />
        <AccountButton
          headingTo={() => navigation.navigate("Places" as never)}
          title="Liste des tables"
        />
        <AccountButton
          headingTo={() => navigation.navigate("AccountSecurity" as never)}
          title="Sécurité"
        />
        <AccountButton
          headingTo={() => navigation.navigate("Histroy" as never)}
          title="Historiques"
        />
        <AccountButton
          headingTo={() => navigation.navigate("Settings" as never)}
          title="paramètre"
        />
      </ScrollView>
    </View>
  );
};
