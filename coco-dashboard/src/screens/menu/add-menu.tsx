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
  const [restaurantId, setRestaurantId] = useState(0);
  const [image, setImage] = useState("");
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
      try {
        setLoading(true);
        const { data, error, status } = await supabase
          .from("menu")
          .insert([
            {
              title: payload.title,
              description: payload.description,
              price: payload.price,
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
    <ScrollView className=" px-3 py-4  bg-white">
      {loading ? (
        <LoaderScreen />
      ) : (
        <>
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
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={pickImage} className=" my-4">
            <Text className=" text-neutral-500 font-bold">
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
        </>
      )}
    </ScrollView>
  );
};

// const test = {
//   access_token:
//     "eyJhbGciOiJIUzI1NiIsImtpZCI6InhXRHFXc2VxRlZiTGFCS08iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE4MDEzODkxLCJpYXQiOjE3MTgwMTAyOTEsImlzcyI6Imh0dHBzOi8vZmV0aGVuaXhycm5kb3hmaW1peXkuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjUwYWZjZjA1LTZiMjEtNGQ4OC1hOGYxLWE3NDdhM2VjMTkyZCIsImVtYWlsIjoibm91ci5lZGFoZXIuam91aW5pQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzE3OTQ4MTk2fV0sInNlc3Npb25faWQiOiI2ODQwZTczZS1iOGJkLTQzN2EtOGY1ZC1jMTA5ZTY5ZmNkZmEiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.OG-83OSNXwxbRTV7NtGGBKtc_u4mTu7tYs37uggV6O8",
//   expires_at: 1718013891,
//   expires_in: 3600,
//   refresh_token: "YzHIdbVJDCd02STrWBsJiQ",
//   token_type: "bearer",
//   user: {
//     app_metadata: { provider: "email", providers: [Array] },
//     aud: "authenticated",
//     confirmed_at: "2024-05-25T09:25:21.550031Z",
//     created_at: "2024-05-25T09:25:21.536365Z",
//     email: "nour.edaher.jouini@gmail.com",
//     email_confirmed_at: "2024-05-25T09:25:21.550031Z",
//     id: "50afcf05-6b21-4d88-a8f1-a747a3ec192d",
//     identities: [[Object]],
//     is_anonymous: false,
//     last_sign_in_at: "2024-06-09T15:49:56.247866Z",
//     phone: "",
//     role: "authenticated",
//     updated_at: "2024-06-10T09:04:51.802506Z",
//     user_metadata: {},
//   },
// };
