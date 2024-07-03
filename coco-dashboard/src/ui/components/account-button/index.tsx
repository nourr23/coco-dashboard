import React from "react";
import { TouchableOpacity, Text } from "../../core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const AccountButton = ({ title, headingTo, children }: any) => {
  return (
    <TouchableOpacity
      onPress={headingTo}
      activeOpacity={0.8}
      className=" w-full px-4 shadow-sm shadow-black flex-row justify-between items-center py-4 my-3 rounded-[7px] border-neutral-200 bg-white border-[0.5px]"
    >
      <Text className=" text-neutral-500">{title}</Text>
      {children ? (
        children
      ) : (
        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color="#737373"
        />
      )}
    </TouchableOpacity>
  );
};
