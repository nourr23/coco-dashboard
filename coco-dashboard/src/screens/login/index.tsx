import { SubmitHandler, useForm } from "react-hook-form";
import { View, Text, ScrollView, ControlledInput, Button } from "../../ui";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../../lib/supabase";
import { Alert } from "react-native";

const schema = z.object({
  email: z
    .string({
      required_error: "l`adresse mail est un champ obligatoire",
    })
    .min(1),
  password: z
    .string({
      required_error: "le mot de passe est un champ obligatoire",
    })
    .min(6, "Le mot de passe doit être au moins de 6 caractères"),
});

type LoginInput = {
  email: string;
  password: string;
};

export type loginFormProps = {
  onSubmit?: SubmitHandler<LoginInput>;
};

export const Login = () => {
  const { handleSubmit, control, setValue, getValues } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit(async (user: LoginInput) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) Alert.alert(error.message);

    console.log("data user", data);
  });
  return (
    <ScrollView className=" bg-white px-3 py-4">
      <View className=" mt-16">
        <Text className=" text-success-500 font-bold text-xl text-center">
          login
        </Text>
        <View className=" mt-6">
          <ControlledInput
            testID="email"
            control={control}
            name="email"
            label="Email *"
            placeholder="Entrez votre email"
          />
          <ControlledInput
            testID="password"
            control={control}
            name="password"
            label="Mot de passe *"
            placeholder="Entrez votre numéro"
          />
          <Button
            testID="save"
            label={"Login"}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={false}
            loading={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};
