import { Carousel } from "react-native-ui-lib";
import { View, Text, TouchableOpacity } from "../ui";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export const Home = () => {
  const HOME_DATA = [
    {
      id: 1,
      title: "résérvations",
      sub_title: "Voir les résérvations",
      icon: "people",
      icon_color: "green",
    },
    {
      id: 2,
      title: "menu",
      sub_title: "Régler le menu ",
      icon: "restaurant",
      icon_color: "orange",
    },
    {
      id: 3,
      title: "Historique",
      sub_title: "Voir les historiques ",
      icon: "manage-history",
      icon_color: "blue",
    },
    {
      id: 4,
      title: "Paramétres",
      sub_title: "Régler les paramétres",
      icon: "app-settings-alt",
      icon_color: "brown",
    },
  ];
  const BOOKING_DATA = [
    {
      id: 1,
      name: "Mohamed Mansour",
      person_number: 6,
      total: "360.00",
      date: "20-07-2024",
    },
    {
      id: 1,
      name: "Ibrahim Salem",
      person_number: 2,
      total: "120.00",
      date: "21-07-2024",
    },
  ];
  const MenuItem = ({ children, item }: any) => {
    return (
      <View>
        <TouchableOpacity className=" h-[150px] px-4 py-6 my-2 w-[170px] rounded-[7px] border-neutral-300 bg-white border-[1px]">
          <MaterialIcons name={item.icon} size={30} color={item.icon_color} />
          <Text className=" mt-2 font-bold text-neutral-700 text-[15px]">
            {item.title}
          </Text>
          <Text className=" mt-2 text-neutral-500 text-xs ">
            {item.sub_title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const BookingCard = ({ item }: any) => {
    return (
      <View className=" px-5 py-3 w-full mi-h-[160px] rounded-[7px] border-neutral-300 bg-white border-[1px]">
        <View className=" flex-row justify-between w-full items-center">
          <Text className=" text-success-500 font-bold text-base">
            {item.name}
          </Text>
          <TouchableOpacity className=" flex-row items-center">
            <Text className=" text-[#84cc16] font-bold text-sm mr-2">
              {" "}
              Accepter
            </Text>
            <MaterialIcons name="check" size={20} color="#84cc16" />
          </TouchableOpacity>
        </View>
        <Text className=" text-neutral-500 mt-2 ">
          {item.person_number} {" personnes"}
        </Text>

        <View className=" flex-row justify-between w-full items-center">
          <Text className=" font-bold text-neutral-500 mt-2 ">{"Total"}</Text>
          <Text className=" text-neutral-500 mt-2 ">
            {item.total} {" DNT"}
          </Text>
        </View>

        <View className=" flex-row justify-between w-full items-center">
          <Text className=" font-bold text-neutral-500 mt-2 ">{"Date"}</Text>
          <Text className=" text-neutral-500 mt-2 ">{item.date}</Text>
        </View>

        <TouchableOpacity className=" mt-3 flex-row items-center">
          <Text className=" text-[#84cc16] font-bold text-sm mr-2">
            Voir les détails
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View className=" py-6 px-4 bg-white flex-1">
      <Text className=" text-neutral-700 font-bold  text-lg mt-8">
        Welcome, admin
      </Text>
      <View className=" mt-3 flex-row justify-between flex-wrap">
        {HOME_DATA.map((item) => (
          <MenuItem key={item.id} item={item}></MenuItem>
        ))}
      </View>
      <View className=" flex-row justify-between items-center my-3">
        <Text className=" mt-3 font-bold text-success-500">
          Vous avez des résérvations
        </Text>
        <TouchableOpacity>
          <Text>Voir tout</Text>
        </TouchableOpacity>
        {/* <Feather name="arrow-right-circle" size={24} color="#86A7FC" /> */}
      </View>

      {/* <BookingCard item={BOOKING_DATA[0]}></BookingCard> */}
      {/* <Carousel>
        {BOOKING_DATA.map((item) => (
          <BookingCard key={item.id} item={item}></BookingCard>
        ))}
      </Carousel> */}
    </View>
  );
};
