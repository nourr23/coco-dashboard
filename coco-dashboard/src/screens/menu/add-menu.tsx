import {
  Button,
  ControlledInput,
  Text,
  View,
  Input,
  ScrollView,
} from "../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z
    .string({
      required_error: "le titre  est un champ obligatoire",
    })
    .min(1),
  description: z
    .string({
      required_error: "La description  est un champ obligatoire",
    })
    .min(1),
  price: z
    .string({
      required_error: "Le prix un champ obligatoire",
    })
    .min(1),
  image_url: z
    .string({
      required_error: "l`URL de l`image est un champ obligatoire",
    })
    .min(1),
});

type MenuInput = {
  title: string;
  description: string;
  price: string;
  image_url: string;
};

export type MenuFormProps = {
  onSubmit?: SubmitHandler<MenuInput>;
};

export const AddMenu = () => {
  const { params } = useRoute<any>();
  const navigation = useNavigation();
  console.log(params);

  const { handleSubmit, control, setValue, getValues } = useForm<MenuInput>({
    resolver: zodResolver(schema),
    defaultValues: params?.data
      ? {
          title: params.item.title,
          description: params.item.description,
          price: params.item.price,
          image_url: params.item.image_url,
        }
      : {},
  });
  const onSubmit = handleSubmit(async (data: MenuInput) => {
    if (params.item) {
      console.log("update", data);
    } else console.log("add", data);
  });
  return (
    <ScrollView className=" px-3 py-4  bg-white">
      <ControlledInput
        testID="title"
        control={control}
        name="title"
        label="Titre *"
        placeholder=""
      />
      <ControlledInput
        testID="description"
        control={control}
        name="description"
        label="Description *"
        placeholder=""
      />
      <ControlledInput
        testID="price"
        control={control}
        name="price"
        label="Price *"
        placeholder=""
      />
      <Button
        testID="save"
        label={params.item ? "Changer le menu" : "Ajouter le menu"}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        disabled={false}
        loading={false}
      />
    </ScrollView>
  );
};
