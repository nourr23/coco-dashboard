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
import { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { supabase } from "../../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";

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
  phone: z
    .string({
      required_error: "le numér de téléphone est un champ obligatoire",
    })
    .min(1),
});
type AccountInput = {
  first_name: string;
  last_name: string;
  phone: string;
};
export type AccountFormProps = {
  onSubmit?: SubmitHandler<AccountInput>;
};
export const AccountInformation = () => {
  // const data = getOwners()
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(0);

  const navigation = useNavigation();

  const { handleSubmit, control, setValue } = useForm<AccountInput>({
    resolver: zodResolver(schema),
    // defaultValues: async () => {

    // },
  });
  useEffect(() => {
    getAccountInformation();
  }, []);
  const getAccountInformation = async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("owners")
        .select(`id, first_name, last_name,phone`)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      setOwner(data?.id);
      setValue("first_name", data?.first_name);
      setValue("last_name", data?.last_name);
      setValue("phone", data?.phone);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = handleSubmit(async (data: AccountInput) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("owners")
        .update({
          first_name: data?.first_name,
          last_name: data?.last_name,
          phone: data?.phone,
        })
        .eq("id", owner)
        .select();

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  });
  return (
    <ScrollView className=" px-3 py-4 bg-white">
      {!loading && owner ? (
        <>
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
        </>
      ) : (
        <LoaderScreen />
      )}
    </ScrollView>
  );
};
