import { Button, ControlledInput, Text, View, Input } from "../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";

export const AddMenu = () => {
  const { params } = useRoute<any>();
  console.log(params);
  return (
    <View className=" flex-1 bg-white">
      <Text>add menu</Text>
    </View>
  );
};
