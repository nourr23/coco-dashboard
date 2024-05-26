import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Home } from "../screens";
import { MenuNavigator } from "./menu-navigator";
import { ReservationNavigator } from "./reservation-navigator";
import { AccountNavigator } from "./account-navigator";
import { useColorScheme } from "nativewind";
import colors from "../ui/theme/colors";

type TabParamList = {
  Home: undefined;
  ReservationNavigator: undefined;
  MenuNavigator: undefined;
  AccountNavigator: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabsIcons: TabIconsType = {
  Home: (props: SvgProps) => (
    <Ionicons name="home-outline" size={22} color={props.color} />
  ),
  ReservationNavigator: (props: SvgProps) => (
    <MaterialIcons name="table-restaurant" size={24} color={props.color} />
  ),
  MenuNavigator: (props: SvgProps) => (
    <MaterialCommunityIcons name="food-turkey" size={24} color={props.color} />
  ),
  AccountNavigator: (props: SvgProps) => (
    <MaterialIcons name="person" size={24} color={props.color} />
  ),
  // EshopNavigator: (props: SvgProps) => (
  //   <MaterialIcons name="storefront" size={22} color={props.color} />
  // ),
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: "Home",
    component: Home,
    label: "Accueil",
  },
  {
    name: "ReservationNavigator",
    component: ReservationNavigator,
    label: "Reservations",
  },
  {
    name: "MenuNavigator",
    component: MenuNavigator,
    label: "Menu",
  },
  {
    name: "AccountNavigator",
    component: AccountNavigator,
    label: "Compte",
  },
];

type BarIconType = {
  name: keyof TabParamList;
  color: string;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const TabNavigator = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor:
          colorScheme === "dark" ? colors.charcoal[400] : colors.neutral[400],
        tabBarIcon: ({ color }) => <BarIcon name={route.name} color={color} />,
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                tabBarTestID: `${name}-tab`,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
