import { View, Text, ScrollView } from "../../../ui";
import { CustomCalendar } from "../../../ui/components/calendar";

export const Histroy = () => {
  return (
    <ScrollView className="bg-white px-3 py-4">
      <Text>history</Text>
      <CustomCalendar/>
    </ScrollView>
  );
};
