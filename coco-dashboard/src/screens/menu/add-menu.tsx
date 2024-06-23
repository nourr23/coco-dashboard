import { Button, ControlledInput, Text, View, ScrollView } from "../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";
import { UploadImage } from "../../ui/components/upload-image";

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
            <UploadImage
              folder_name="menus"
              image={image}
              onSetImage={(url: string) => setImage(url)}
            />
          </View>

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
