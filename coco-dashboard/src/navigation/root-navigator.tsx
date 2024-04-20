import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./tab-navigator";
import { NavigationContainer } from "./navigation-container";
// import { AuthNavigator } from "./auth-navigator";

const Stack = createNativeStackNavigator();

export const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
      }}
    >
      <Stack.Group>
        <Stack.Screen name="App" component={TabNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
