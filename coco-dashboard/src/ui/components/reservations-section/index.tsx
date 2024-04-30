import { ScrollView } from "../../core";
import { ReservationCard } from "../reservation-card";

export const ReservationSection = ({ day }: any) => {
  const BOOKING_DATA = [
    {
      id: 1,
      name: "Mohamed Mansour",
      person_number: 6,
      total: "360.00",
      date: "20-07-2024",
      state: "accepted",
    },
    {
      id: 2,
      name: "Ibrahim Salem",
      person_number: 2,
      total: "120.00",
      date: "21-07-2024",
      state: "accepted",
    },
  ];
  return (
    <ScrollView className=" mt-2 mb-4">
      {BOOKING_DATA.map((item: any) => (
        <ReservationCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};
