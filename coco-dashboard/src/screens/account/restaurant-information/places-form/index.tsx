import { View, ScrollView } from "../../../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { supabase } from "../../../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";

const schema = z.object({
  name: z
    .string({
      required_error: "le titre  est un champ obligatoire",
    })
    .min(1),
});
type PlacesInput = {
  name: string | undefined;
  capacity: number;
  number: number;
  price: number;
  image_url: string;
};

export type PlacesFormProps = {
  onSubmit?: SubmitHandler<PlacesInput>;
};

export const PlacesForm = () => {
  const { handleSubmit, control, setValue, getValues } = useForm<PlacesInput>(
    {}
  );

  const onSubmit = handleSubmit(async (payload: PlacesInput) => {});

  
  return <ScrollView className=" bg-white px-3 py-4"></ScrollView>;
};
