import {
  Button,
  ControlledInput,
  Text,
  View,
  Input,
  ScrollView,
  TouchableOpacity,
} from "../../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "react-native";

const schema = z.object({
  title: z
    .string({
      required_error: "le titre  est un champ obligatoire",
    })
    .min(1),
  tables_number: z
    .string({
      required_error: "Le nombre des tables est un champ obligatoire",
    })
    .min(1),
  thumbnail: z
    .string({
      required_error: "l`URL de l`image est un champ obligatoire",
    })
    .min(1),
});
type AccountInput = {
  title: string;
  tables_number: string;
  thumbnail: string;
};
export type AccountFormProps = {
  onSubmit?: SubmitHandler<AccountInput>;
};
export const AccountInformation = () => {
  return(
    <ScrollView className=" px-3 py-4 bg-white">
      <Text>account information</Text>
    </ScrollView>
  )
}