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
  first_name: z
    .string({
      required_error: "le nom  est un champ obligatoire",
    })
    .min(1),
  last_name: z
    .string({
      required_error: "Le prénom des tables est un champ obligatoire",
    })
    .min(1),
  email: z
    .string({
      required_error: "l`adresse mail est un champ obligatoire",
    })
    .min(1),
  phone: z
    .string({
      required_error: "le numér de téléphone est un champ obligatoire",
    })
    .min(1),
});
type AccountInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};
export type AccountFormProps = {
  onSubmit?: SubmitHandler<AccountInput>;
};
export const AccountInformation = () => {
  const [thumbnail, setThumbnail] = useState("");

  const navigation = useNavigation();

  const { handleSubmit, control, setValue, getValues } = useForm<AccountInput>({
    resolver: zodResolver(schema),
    // defaultValues: params?.data
    //   ? {
    //       title: params.item.title,
    //       tables_number: params.item.tables_number,
    //       thumbnail: params.item.thumbnail,
    //     }
    //   :
    // {},
  });
  const onSubmit = handleSubmit(async (data: AccountInput) => {
    // if (params.item) {
    //   console.log("update", data);
    // } else console.log("add", data);
  });
  return (
    <ScrollView className=" px-3 py-4 bg-white">
      <ControlledInput
        testID="first_name"
        control={control}
        name="first_name"
        label="Nom *"
        placeholder="Entrez votre nom"
      />
      <ControlledInput
        testID="last_name"
        control={control}
        name="last_name"
        label="Prénom *"
        placeholder="Entrez votre prénom"
      />
      <ControlledInput
        testID="email"
        control={control}
        name="email"
        label="Email *"
        placeholder="Entrez votre email"
      />
      <ControlledInput
        testID="phone"
        control={control}
        name="phone"
        label="Numéro de téléphone *"
        placeholder="Entrez votre numéro"
      />
      <Button
        testID="save"
        label={"Modifier"}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        disabled={false}
        loading={false}
      />
    </ScrollView>
  );
};
