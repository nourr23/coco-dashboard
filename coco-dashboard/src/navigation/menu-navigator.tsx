import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu, AddMenu } from "../screens";

const Stack = createNativeStackNavigator<MenuStackParamList>();
export type MenuStackParamList = {
  Menu: undefined;
  // Post: { id: number };
  AddMenu: { id: number }| undefined;
};

export const MenuNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            headerTitle: "Menu",
          }}
        />
        <Stack.Screen
          name="AddMenu"
          component={AddMenu}
          options={{
            headerTitle: "Ajouter un menu",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
