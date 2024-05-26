import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Account,
  AccountInformation,
  RestaurantInformation,
  AccountSecurity,
  Histroy,
  Settings,
} from "../screens";

const Stack = createNativeStackNavigator<AccountStackParamList>();
export type AccountStackParamList = {
  Account: undefined;
  // Post: { id: number };
  AccountInformation: undefined;
  RestaurantInformation: undefined;
  AccountSecurity: undefined;
  Histroy: undefined;
  Settings: undefined;
};

export const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerTitle: "Compte",
          }}
        />
        <Stack.Screen
          name="AccountInformation"
          component={AccountInformation}
          options={{
            headerTitle: "Information général",
          }}
        />
        <Stack.Screen
          name="RestaurantInformation"
          component={RestaurantInformation}
          options={{
            headerTitle: "Les information du resto",
          }}
        />
        <Stack.Screen
          name="AccountSecurity"
          component={AccountSecurity}
          options={{
            headerTitle: "Sécurité",
          }}
        />
        <Stack.Screen
          name="Histroy"
          component={Histroy}
          options={{
            headerTitle: "Historiques",
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: "Paramètre",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
