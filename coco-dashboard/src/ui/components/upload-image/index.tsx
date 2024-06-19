import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "../../core";
import { supabase } from "../../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert, Image } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { FileObject } from "@supabase/storage-js";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

export const UploadImage = ({ folder_name, image, onSetImage }: any) => {
  const [loadingImgae, setLoadingImgae] = useState(false);
  const [imageBorder, setImageBorder] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

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
          .from(folder_name)
          .upload(filePath, decode(base64), { contentType });
        const { data } = supabase.storage
          .from(folder_name)
          .getPublicUrl(filePath);

        if (error) {
          console.log("if error", error);
        } else {
          onSetImage(data?.publicUrl);
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
  return (
    <>
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
    </>
  );
};
