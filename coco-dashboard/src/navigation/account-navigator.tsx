import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Account, AccountInformation, RestaurantInformation } from "../screens";

const Stack = createNativeStackNavigator<AccountStackParamList>();
export type AccountStackParamList = {
  Account: undefined;
  // Post: { id: number };
  AccountInformation: undefined;
  RestaurantInformation: undefined;
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
      </Stack.Group>
    </Stack.Navigator>
  );
};
