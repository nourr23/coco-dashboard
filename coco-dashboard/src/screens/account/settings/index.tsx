import { useState } from "react";
import { View, Text, TouchableOpacity } from "../../../ui";
import { AccountButton } from "../../../ui/components/account-button";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-ui-lib";
import { supabase } from "../../../lib/supabase";

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
      <TouchableOpacity
        className=" w-full px-4 shadow-sm shadow-black flex-row justify-between items-center py-4 my-3 rounded-[7px] border-neutral-200 bg-white border-[0.5px]"
        onPress={() => supabase.auth.signOut()}
      >
        <Text className=" text-neutral-500">Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
