import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Reservations } from "../screens";

const Stack = createNativeStackNavigator<ReservationStackParamList>();
export type ReservationStackParamList = {
  Reservations: undefined;
  // Post: { id: number };
  //   AddMenu: undefined;
};

export const ReservationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Reservations"
          component={Reservations}
          options={{
            headerTitle: "Les reservations",
          }}
        />
        {/* <Stack.Screen
            name="AddMenu"
            component={AddMenu}
            options={{
              headerTitle: "Ajouter un menu",
            }}
          /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};
