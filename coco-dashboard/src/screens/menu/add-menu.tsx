import {
  Button,
  ControlledInput,
  Text,
  View,
  Input,
  ScrollView,
  TouchableOpacity,
} from "../../ui";
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
  const [image, setImage] = useState("");

  const { params } = useRoute<any>();
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
      <TouchableOpacity onPress={pickImage} className=" my-4">
        <Text className=" text-success-500 font-bold">
          Choisissez une image
        </Text>
      </TouchableOpacity>
      {image && (
        <View className=" w-full">
          <Image
            source={{ uri: image }}
            width={240}
            resizeMode="center"
            height={200}
          />
        </View>
      )}
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
