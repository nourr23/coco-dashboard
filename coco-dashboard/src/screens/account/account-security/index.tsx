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
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Alert } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";

const schema = z
  .object({
    password: z
      .string({
        required_error: "Ce champ est obligatoire",
      })
      .min(6, "Ce champ doit contenir au moins 6 caractères"),
    confirm_password: z
      .string({
        required_error: "Ce champ est obligatoire",
      })
      .min(6, "Ce champ doit contenir au moins 6 caractères"),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });

type SecurityInput = {
  password: string;
  confirm_password: string;
};
export type SecurityFormProps = {
  onSubmit?: SubmitHandler<SecurityInput>;
};

export const AccountSecurity = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { handleSubmit, control, setValue, getValues } = useForm<SecurityInput>(
    {
      resolver: zodResolver(schema),
    }
  );
  const onSubmit = handleSubmit(async (data: SecurityInput) => {
    console.log(data);
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        throw error;
      } else {
        Alert.alert("Password changed", "", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
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
    <ScrollView className="bg-white px-3 py-4">
      {loading ? (
        <>
          <LoaderScreen />
        </>
      ) : (
        <>
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
        </>
      )}
    </ScrollView>
  );
};
