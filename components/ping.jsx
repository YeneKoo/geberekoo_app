import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppColors } from "./constcolors";

export default function PingAni({ onPress }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setActive((prev) => (prev == 3 ? 0 : prev + 1));
    }, 600); // Change ping visibility every 1000ms (1 second)

    return () => {
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <View style={styles.container} className="relative w-full">
      <View
        className="absolute bottom-[17px] w-[40px] h-[40px] flex justify-center items-center rounded-full"
        style={{ backgroundColor: AppColors.main }}
      >
        <MaterialIcons
          name={"close"}
          size={35}
          color="white"
          onPress={onPress}
        />
      </View>
      <View className="flex gap-1">
        <View className="flex flex-row gap-1">
          {[1, 0].map((item, index) => (
            <View
              key={index}
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  item == active ? AppColors.main : AppColors.main + "22",
              }}
            />
          ))}
        </View>
        <View className="flex flex-row gap-1">
          {[2, 3].map((item, index) => (
            <View
              key={index}
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  item == active ? AppColors.main : AppColors.main + "22",
              }}
            />
          ))}
        </View>
      </View>
      <Text className="pt-2 font-bold">AI onwork please holdon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
