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
type RestaurantInput = {
  title: string;
  tables_number: string;
  thumbnail: string;
};
export type RestaurantFormProps = {
  onSubmit?: SubmitHandler<RestaurantInput>;
};
export const RestaurantInformation = () => {
  const [thumbnail, setThumbnail] = useState("");

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
      setThumbnail(result.assets[0].uri);
    }
  };
  const { handleSubmit, control, setValue, getValues } =
    useForm<RestaurantInput>({
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
  const onSubmit = handleSubmit(async (data: RestaurantInput) => {
    // if (params.item) {
    //   console.log("update", data);
    // } else console.log("add", data);
  });
  return (
    <ScrollView className=" bg-white px-3 py-4">
      <ControlledInput
        testID="title"
        control={control}
        name="title"
        label="Titre *"
        placeholder=""
      />
      <ControlledInput
        testID="tables_number"
        control={control}
        name="tables_number"
        label="Nombre des table *"
        placeholder=""
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={pickImage} className=" my-4">
        <Text className=" text-success-500 font-bold">
          Choisissez une image
        </Text>
      </TouchableOpacity>
      {thumbnail && (
        <View className=" w-full">
          <Image
            source={{ uri: thumbnail }}
            width={240}
            resizeMode="center"
            height={200}
          />
        </View>
      )}
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
