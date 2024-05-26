import { useState } from "react";
import { View, Text } from "../../../ui";
import { AccountButton } from "../../../ui/components/account-button";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-ui-lib";
export const Settings = () => {
  const navigation = useNavigation();
  const [notificationsToggle, setNotificationsToggle] = useState(false);
  return (
    <View className=" flex-1 bg-white px-3 py-4">
      <AccountButton title="Notifications">
        <Switch
          value={notificationsToggle}
          onValueChange={() => setNotificationsToggle((prev) => !prev)}
          onColor="#10b981"
        />
      </AccountButton>
      <AccountButton title="Language">
        <Text className=" text-neutral-400 text-sm">Français</Text>
      </AccountButton>
    </View>
  );
};
