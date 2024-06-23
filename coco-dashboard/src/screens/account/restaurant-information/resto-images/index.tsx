import { createRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "../../../../ui";
import { supabase } from "../../../../lib/supabase";
import { Alert, useWindowDimensions } from "react-native";
import { UploadImage } from "../../../../ui/components/upload-image";
import { Carousel, Image } from "react-native-ui-lib";

export const RestoImages = () => {
  const [restaurantId, setRestaurantId] = useState(0);
  const { width } = useWindowDimensions();
  const carousel = createRef<typeof Carousel>();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [restoImages, setRestoImages] = useState<Array<any>>([]);
  useEffect(() => {
    getRestaurantImages();
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

  const getRestaurantImages = async () => {
    setRestoImages([]);
    try {
      setLoading(true);
      const { data: resto_images, error } = await supabase
        .from("resto_images")
        .select("*");

      if (error) {
        throw error;
      } else {
        setRestoImages(resto_images);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      //   setImage("")
    }
  };
  const deleteRestImage = async (id: any) => {
    try {
      setLoading(true);
      const { error, status } = await supabase
        .from("resto_images")
        .delete()
        .eq("id", id);

      if (error && status !== 406) {
        throw error;
      } else {
        Alert.alert("Resto action", "L'image a été supprimé", [
          { text: "OK", onPress: () => getRestaurantImages() },
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
  const addRestoImage = async (image_url: any) => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("resto_images")
        .upsert([
          {
            is_main: false,
            restaurant_id: restaurantId,
            url: image_url,
          },
        ])
        .select();
      if (error && status !== 406) {
        throw error;
      } else {
        Alert.alert("Image ajouté", "", [
          { text: "OK", onPress: () => getRestaurantImages() },
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
    <View>
      <View className=" my-2">
        {restoImages.length > 0 ? (
          <>
            <Text className=" text-green-500 font-bold mb-3">
              Liste des image
            </Text>
            <Carousel
              showCounter={true}
              ref={carousel}
              pageWidth={width - 32}
              initialPage={0}
              allowAccessibleLayout
            >
              {restoImages.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Supprimer le menu",
                        "Es-tu sûr de vouloir supprimer cette image!",
                        [
                          {
                            text: "Oui",
                            onPress: () => deleteRestImage(item.id),
                          },
                          {
                            text: "Cancel",
                            // onPress: () => deleteRestImage(item.id),
                          },
                        ]
                      )
                    }
                    activeOpacity={0.7}
                    key={index}
                    className=" "
                  >
                    <Image
                      style={{ borderRadius: 12, height: 190 }}
                      resizeMethod={"resize"}
                      //   resizeMode={"center"}
                      source={{
                        uri: `${item.url}`,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </Carousel>
          </>
        ) : (
          <></>
        )}
      </View>
      <View>
        <Text className=" text-green-500 font-bold mb-3">
          Ajouter une image
        </Text>
        <UploadImage
          folder_name="restaurant"
          image={image}
          onSetImage={(url: string) => addRestoImage(url)}
        />
      </View>

      {/* <TouchableOpacity
            // onPress={() => navigation.navigate("Places" as never)}
            className=" rounded-lg w-full my-1 py-2 text-neutral-500 items-center border border-green-500"
          >
            <Text className=" text-green-500 font-bold">Ajouter une image</Text>
          </TouchableOpacity> */}
    </View>
  );
};
