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
import { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { supabase } from "../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { FileObject } from "@supabase/storage-js";
import { Session } from "@supabase/supabase-js";
import Feather from "@expo/vector-icons/Feather";

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
  // image_url: z
  //   .string({
  //     required_error: "l`URL de l`image est un champ obligatoire",
  //   })
  //   .min(1),
});

type MenuInput = {
  title: string;
  description: string;
  price: string;
  // image_url: string;
};

export type MenuFormProps = {
  onSubmit?: SubmitHandler<MenuInput>;
};

export const AddMenu = () => {
  const [loading, setLoading] = useState(true);
  const [loadingImgae, setLoadingImgae] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [image, setImage] = useState("");
  const [imageBorder, setImageBorder] = useState(true);
  const { params } = useRoute<any>();
  const navigation = useNavigation();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    params.item && setImage(params.item.image_url);
    console.log(params.item);
  }, []);

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    try {
      setLoading(true);
      let { data: restaurants, error } = await supabase
        .from("restaurants")
        .select("id");

      if (error) {
        throw error;
      } else {
        setRestaurantId(restaurants && restaurants[0].id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        setImageBorder(true);
        setLoadingImgae(true);
        const img = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: "base64",
        });
        const filePath = `${session?.user.id}/${new Date().getTime()}.${
          img.type === "image" ? "png" : "mp4"
        }`;
        const contentType = img.type === "image" ? "image/png" : "video/mp4";
        const { error } = await supabase.storage
          .from("menus")
          .upload(filePath, decode(base64), { contentType });
        const { data } = supabase.storage.from("menus").getPublicUrl(filePath);

        if (error) {
          console.log("if error", error);
        } else {
          setImage(data?.publicUrl);
          setLoadingImgae(false);
        }
      } catch (error) {
        console.log("catch error", error);
        setLoadingImgae(false);
      } finally {
        console.log("finaly error", image);
        setLoadingImgae(false);
      }
    }
  };
  const { handleSubmit, control, setValue, getValues } = useForm<MenuInput>({
    resolver: zodResolver(schema),
    defaultValues: params?.item
      ? {
          title: params.item.title,
          description: params.item.description,
          price: params.item.price.toString(),
          // image_url: params.item.image_url,
        }
      : {},
  });
  const onSubmit = handleSubmit(async (payload: MenuInput) => {
    if (params.item) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("menu")
          .update({
            title: payload.title,
            description: payload.description,
            price: payload.price,
            image_url: image,
          })
          .eq("id", params.item.id)
          .select();
        if (error) {
          throw error;
        } else {
          Alert.alert("Menu modifié");
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    } else {
      if (image) {
        try {
          setLoading(true);
          const { data, error, status } = await supabase
            .from("menu")
            .upsert([
              {
                title: payload.title,
                description: payload.description,
                price: payload.price,
                image_url: image,
                restaurant_id: restaurantId,
              },
            ])
            .select();
          if (error && status !== 406) {
            throw error;
          } else {
            Alert.alert("Menu ajouté", "", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      } else {
        setImageBorder(false);
      }
    }
  });

  const confirmDelete = () => {
    Alert.alert(
      "Supprimer le menu",
      "Es-tu sûr de vouloir supprimer ce menu!",
      [{ text: "OK", onPress: () => deleteMenu() }]
    );
  };
  const deleteMenu = async () => {
    try {
      setLoading(true);
      const { error, status } = await supabase
        .from("menu")
        .delete()
        .eq("id", params.item.id);

      if (error && status !== 406) {
        throw error;
      } else {
        Alert.alert("Menu action", "Le menu a été supprimé", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className=" px-3 pt-4 bg-white">
      {loading ? (
        <LoaderScreen />
      ) : (
        <View className=" pb-8">
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
            className=" h-[800px]"
            multiline
            numberOfLines={4}
          />
          <ControlledInput
            testID="price"
            control={control}
            name="price"
            label="Price *"
            placeholder=""
            keyboardType="numeric"
          />
          <View
            className={`${!image ? "border" : ""}
            ${
              !imageBorder ? "border-danger-500" : "border-neutral-500"
            } w-full items-center border-dashed h-[180px]`}
          >
            {loadingImgae ? (
              <LoaderScreen />
            ) : image ? (
              <View className=" w-full items-center">
                <Image
                  source={{ uri: image }}
                  width={340}
                  resizeMode="center"
                  height={180}
                />
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={pickImage}
                  className=" h-full w-full items-center justify-center relative"
                >
                  {!imageBorder && (
                    <View className=" w-full py-4 absolute bottom-[0px] left-4">
                      <Text className=" text-danger-500 my-2 text-xs">
                        l`URL de l`image est un champ obligatoire
                      </Text>
                    </View>
                  )}
                  <Feather name="camera" size={94} color="#737373" />
                </TouchableOpacity>
              </>
            )}
          </View>

          {image && (
            <TouchableOpacity
              onPress={pickImage}
              className=" rounded-lg w-full my-1 py-2 text-neutral-500 items-center border border-green-500"
            >
              <Text className=" text-green-500 font-bold">Changer l'image</Text>
            </TouchableOpacity>
          )}
          <Button
            testID="save"
            label={params.item ? "Modifier" : "Ajouter le menu"}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={false}
            loading={false}
          />
          {params.item ? (
            <Button
              testID="save"
              label={"Supprimer"}
              onPress={confirmDelete}
              variant="danger"
              disabled={false}
              loading={false}
            />
          ) : null}
        </View>
      )}
    </ScrollView>
  );
};
