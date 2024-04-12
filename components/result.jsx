import { View, Image, ScrollView, Text } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import PingAni from "./ping";
import { AppColors } from "./constcolors";
import Slider from "./slider/slider";

export default function Result({ imgurl, onClose, onChat, webdomain, data }) {
  const plant_health = data?.status == "red" ? "unhealthy" : "healthy";

  return (
    <View className="bg-white w-[100%] h-[100vh] flex justify-center items-center">
      {imgurl ? (
        <>
          <ScrollView>
            <View className="w-full h-full flex justify-center items-center">
              <View className="w-full h-[47vh] relative bg-gray-200">
                <Image
                  resizeMode="cover"
                  source={
                    imgurl
                      ? { uri: imgurl }
                      : require("../assets/Bard_Generated_Image (1).jpeg")
                  }
                  className="w-full h-full"
                />
                <View
                  className="absolute top-[7px] w-[30px] flex justify-center items-center rounded-sm  h-[30px]  right-[7px]"
                  style={{ backgroundColor: AppColors.main }}
                >
                  <MaterialIcons
                    name={"close"}
                    size={24}
                    color="white"
                    onPress={onClose}
                  />
                </View>
              </View>
              <View className="w-full">
                <Slider data={data} />
              </View>
              <View className="bg-white w-full h-auto px-2 pt-2 pb-3">
                <View className=" w-full rounded-[8px]">
                  <View
                    className="rounded-[5px] pl-[10px] flex justify-start flex-row h-[10vh] items-center"
                    style={{ backgroundColor: AppColors.secondary }}
                  >
                    <View
                      className="p-3 rounded-md"
                      style={{
                        backgroundColor:
                          data?.status == "red"
                            ? "#ff0000"
                            : "rgb(22, 163, 74)",
                      }}
                    >
                      <MaterialIcons
                        name={"health-and-safety"}
                        size={24}
                        color={"white"}
                      />
                    </View>
                    <View>
                      <Text className=" w-full px-2">
                        Status: {plant_health}
                      </Text>
                    </View>
                  </View>

                  <View
                    className="mt-4 rounded-[5px] pl-[10px] flex justify-start flex-row h-[10vh] items-center"
                    style={{ backgroundColor: AppColors.secondary }}
                  >
                    <View className="bg-blue-300 p-3 rounded-md">
                      <MaterialCommunityIcons
                        name={"temperature-celsius"}
                        size={24}
                        color={AppColors.main}
                      />
                    </View>
                    <View>
                      <Text className=" w-full px-2">
                        Temperature: {data?.temperature}
                      </Text>
                    </View>
                  </View>

                  <View
                    className="my-4 rounded-[5px] pl-[10px] flex justify-start flex-row h-[10vh] items-center"
                    style={{ backgroundColor: AppColors.secondary }}
                  >
                    <View className="bg-blue-300 p-3 rounded-md">
                      <MaterialCommunityIcons
                        name={"weather-partly-cloudy"}
                        size={24}
                        color={AppColors.main}
                      />
                    </View>
                    <View>
                      <Text className=" w-full px-2">
                        Humidity: {data?.humidity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            className="absolute bottom-[10px] w-[50px] h-[50px] flex justify-center items-center rounded-full right-[10px]"
            style={{ backgroundColor: AppColors.main }}
          >
            <Link
              href={{
                pathname: "/chat",
                params: { topic: "bacon", domain: webdomain },
              }}
              asChild
            >
              <MaterialIcons
                name={"wechat"}
                size={40}
                color="white"
                onPress={onChat}
              />
            </Link>
          </View>
        </>
      ) : (
        <PingAni onPress={onClose} />
      )}
    </View>
  );
}
