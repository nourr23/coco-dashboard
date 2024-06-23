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
import { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { supabase } from "../../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";
import { RestoImages } from "./resto-images";

const schema = z.object({
  name: z
    .string({
      required_error: "le titre  est un champ obligatoire",
    })
    .min(1),
});
type RestaurantInput = {
  name: string | undefined;
};
export type RestaurantFormProps = {
  onSubmit?: SubmitHandler<RestaurantInput>;
};
export const RestaurantInformation = () => {
  const [loading, setLoading] = useState(true);
  const [loadingImgae, setLoadingImgae] = useState(false);
  const [restaurantId, setRestaurantId] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  const navigation = useNavigation();

  const { handleSubmit, control, setValue, getValues } =
    useForm<RestaurantInput>({
      resolver: zodResolver(schema),
    });
  useEffect(() => {
    getRestaurant();
  }, []);
  const getRestaurant = async () => {
    try {
      setLoading(true);
      const { data: restaurants, error } = await supabase
        .from("restaurants")
        .select("id,name")
        .single();

      if (error) {
        throw error;
      } else {
        setRestaurantId(restaurants && restaurants.id);
        setValue("name", restaurants.name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = handleSubmit(async (payload: RestaurantInput) => {
    if (restaurantId) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("restaurants")
          .update({ name: payload.name })
          .eq("id", restaurantId)
          .select();
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      // need to be tested
      setLoading(true);
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("restaurants")
          .insert([{ name: payload.name }])
          .select();
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  });
  return (
    <ScrollView className=" bg-white px-3 py-4">
      {loading ? (
        <LoaderScreen />
      ) : (
        <>
          <ControlledInput
            testID="name"
            control={control}
            name="name"
            label="Name *"
            placeholder=""
          />
          {/* <TouchableOpacity onPress={pickImage} className=" my-4">
        <Text className=" text-success-500 font-bold">
          Choisissez une image
        </Text>
      </TouchableOpacity> */}
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
            label={restaurantId ? "Modifier le nom" : "Ajouter"}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={false}
            loading={false}
          />
          {/* liste des table */}
          <RestoImages />
        </>
      )}
    </ScrollView>
  );
};
