import {
  View,
  ScrollView,
  ControlledInput,
  TouchableOpacity,
  Text,
  Button,
} from "../../../../ui";
import { useNavigation, useRoute } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { supabase } from "../../../../lib/supabase";
import { LoaderScreen } from "react-native-ui-lib";
import { UploadImage } from "../../../../ui/components/upload-image";

const schema = z.object({
  name: z
    .string({
      required_error: "Le titre  est un champ obligatoire",
    })
    .min(1),
  capacity: z
    .string({
      required_error: "La capacité est un champ obligatoire",
    })
    .min(1),
  number: z
    .string({
      required_error: "Le nombre des tables est un champ obligatoire",
    })
    .min(1),
  price: z
    .string({
      required_error: "Le prix  est un champ obligatoire",
    })
    .min(1),
});
type PlacesInput = {
  name: string | undefined;
  capacity: string;
  number: string;
  price: string;
  // image_url: string;
};

export type PlacesFormProps = {
  onSubmit?: SubmitHandler<PlacesInput>;
};

export const PlacesForm = () => {
  const { params } = useRoute<any>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    params?.item && setImage(params.item.image_url);
  }, [params]);

  const { handleSubmit, control, setValue, getValues } = useForm<PlacesInput>({
    resolver: zodResolver(schema),
    defaultValues: params?.item
      ? {
          name: params.item.name,
          capacity: params.item.capacity.toString(),
          number: params.item.number,
          price: params.item.price.toString(),
          // image_url: params.item.image_url,
        }
      : {},
  });

  const onSubmit = handleSubmit(async (payload: PlacesInput) => {
    if (params?.item) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("tables")
          .update({
            name: payload.name,
            capacity: payload.capacity,
            price: payload.price,
            number: payload.number,
            image_url: image,
          })
          .eq("id", params.item.id)
          .select();
        if (error) {
          throw error;
        } else {
          Alert.alert("table modifié");
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
          .from("tables")
          .upsert([
            {
              name: payload.name,
              capacity: payload.capacity,
              price: payload.price,
              number: payload.number,
              image_url: image,
            },
          ])
          .select();
        if (error && status !== 406) {
          throw error;
        } else {
          Alert.alert("Table a été ajouté", "", [
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
    Alert.alert("Supprimer", "Es-tu sûr de vouloir supprimer cette table!", [
      { text: "OK", onPress: () => deleteMenu() },
    ]);
  };
  const deleteMenu = async () => {
    try {
      setLoading(true);
      const { error, status } = await supabase
        .from("tables")
        .delete()
        .eq("id", params.item.id);

      if (error && status !== 406) {
        throw error;
      } else {
        Alert.alert("Tables action", "La table a été supprimé", [
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
    <ScrollView className=" bg-white px-3 py-4">
      {loading ? (
        <LoaderScreen />
      ) : (
        <View className=" pb-7">
          <ControlledInput
            testID="name"
            control={control}
            name="name"
            label="Nom *"
            placeholder=""
          />
          <ControlledInput
            testID="capacity"
            control={control}
            name="capacity"
            label="Capacité *"
            placeholder=""
          />
          <ControlledInput
            testID="number"
            control={control}
            name="number"
            label="Nombre des tables *"
            placeholder=""
          />
          <ControlledInput
            testID="price"
            control={control}
            name="price"
            label="Prix *"
            placeholder=""
            keyboardType="numeric"
          />
          <UploadImage
            folder_name="tables"
            image={image}
            onSetImage={(url: string) => setImage(url)}
          />
          <Button
            testID="save"
            label={params ? "Modifier" : "Ajouter"}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            disabled={false}
            loading={false}
            // className=" mb-1"
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
