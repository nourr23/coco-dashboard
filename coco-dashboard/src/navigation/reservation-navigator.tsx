import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Reservations, ReservationDetails } from "../screens";

const Stack = createNativeStackNavigator<ReservationStackParamList>();
export type ReservationStackParamList = {
  Reservations: undefined;
  // Post: { id: number };
  ReservationDetails: undefined;
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
        <Stack.Screen
          name="ReservationDetails"
          component={ReservationDetails}
          options={{
            headerTitle: "Détails de la réservation",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
