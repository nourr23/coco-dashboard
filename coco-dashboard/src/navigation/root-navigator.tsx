import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./tab-navigator";
import { NavigationContainer } from "./navigation-container";
import { AuthNavigator } from "./auth-navigator";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Stack = createNativeStackNavigator();

export const Root = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "none",
      }}
    >
      <Stack.Group>
        {!session ? (
          <Stack.Screen name="App" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="App" component={TabNavigator} />
        )}
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
