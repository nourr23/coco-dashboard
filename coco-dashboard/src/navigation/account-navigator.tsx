import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Account,
  AccountInformation,
  RestaurantInformation,
  AccountSecurity,
  Histroy,
  Settings,
  PlacesForm,
  Places,
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
  PlacesForm: undefined;
  Places: undefined;
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
        <Stack.Screen
          name="PlacesForm"
          component={PlacesForm}
          options={{
            headerTitle: "Ajouter un type",
          }}
        />
        <Stack.Screen
          name="Places"
          component={Places}
          options={{
            headerTitle: "Les types des tables",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
