import { View, Text, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { AppColors } from "../components/constcolors";
import WebSite from "../components/websiterender";

export default function Chat() {
  const params = useLocalSearchParams();
  console.log(params.domain);

  return (
    <>
      <View
        style={{
          backgroundColor: AppColors.secondary,
          borderColor: AppColors.main,
        }}
        className="w-full flex flex-row justify-between px-2 items-center h-[8vh] border-b-2"
      >
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={AppColors.main} />
        </Pressable>
        <Text className="font-bold text-[25px]">
          {params?.from == "backend" ? "Backend" : "Chat"}
        </Text>
        <Pressable
          onPress={() =>
            Alert.alert(
              "A chatbot designed specifically for farm-related questions."
            )
          }
        >
          <MaterialIcons
            name="question-mark"
            size={24}
            color={AppColors.main}
          />
        </Pressable>
      </View>
      <WebSite domain={params.domain} />
    </>
  );
}
