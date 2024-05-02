import {
  Button,
  ControlledInput,
  Text,
  View,
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
  password: z
    .string({
      required_error: "Ce champ est obligatoire",
    })
    .min(4),
  confirm_password: z
    .string({
      required_error: "Ce champ est obligatoire",
    })
    .min(4),
});

type SecurityInput = {
  password: string;
  confirm_password: string;
};
export type SecurityFormProps = {
  onSubmit?: SubmitHandler<SecurityInput>;
};

export const AccountSecurity = () => {
  const [thumbnail, setThumbnail] = useState("");

  const navigation = useNavigation();

  const { handleSubmit, control, setValue, getValues } = useForm<SecurityInput>(
    {
      resolver: zodResolver(schema),
      // defaultValues: params?.data
      //   ? {
      //       title: params.item.title,
      //       tables_number: params.item.tables_number,
      //       thumbnail: params.item.thumbnail,
      //     }
      //   :
      // {},
    }
  );
  const onSubmit = handleSubmit(async (data: SecurityInput) => {
    // if (params.item) {
    //   console.log("update", data);
    // } else console.log("add", data);
  });

  return (
    <ScrollView className="bg-white px-3 py-4">
      <Text className=" text-success-500 font-bold text-lg my-3">
        Changez votre mot de passe
      </Text>
      <ControlledInput
        testID="password"
        control={control}
        name="password"
        label="Mot de passe *"
        placeholder=""
        secureTextEntry={true}
      />
      <ControlledInput
        testID="confirm_password"
        control={control}
        name="confirm_password"
        label="Confirmez votre mot de passe *"
        placeholder=""
        secureTextEntry={true}
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
