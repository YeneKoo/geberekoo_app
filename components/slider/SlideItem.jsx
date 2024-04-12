import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

import { AppColors } from "../constcolors";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);
  const [selectedItem, setSelectedItem] = useState(0);
  const [readmore, setReadMore] = useState(false);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const btns = [
    {
      title: "Description",
      name: "description",
      color: AppColors.main,
    },
    {
      title: "cause",
      name: "biotech",
      color: AppColors.main,
    },
    {
      title: "symptom",
      name: "manage-search",
      color: AppColors.main,
    },
    {
      title: "treatment",
      name: "local-hospital",
      color: AppColors.main,
    },
  ];

  const selectedItems = [
    item.details.highlight,
    item.details.causes,
    item.details.symptoms,
    item.details.prevention,
  ];

  return (
    <View style={styles.container} className="pt-1  bg-white relative">
      <View className="flex justify-around items-center flex-row">
        {btns.map((items, index) => (
          <Pressable
            onPress={() => setSelectedItem(index)}
            key={index}
            className="flex justify-center items-center mt-[10px]"
          >
            <View
              className="border-2 px-4 py-3 rounded-md"
              style={{
                backgroundColor: AppColors.secondary,
                borderColor:
                  index == selectedItem ? AppColors.main : AppColors.secondary,
              }}
            >
              <MaterialIcons name={items.name} size={40} color={items.color} />
            </View>
            <Text
              style={{
                color: index == selectedItem ? "black" : "#00000044",
              }}
              className="capitalize mt-1 font-bold"
            >
              {items.title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View
        className="rounded-[8px] px-3 pt-[20px] pb-[20px] m-2 mt-3"
        style={{ backgroundColor: AppColors.secondary }}
      >
        <Text
          className="font-semibold"
          style={{ color: AppColors.main + "dc" }}
        >
          {selectedItem == 0 ? (
            readmore ? (
              <Text className="leading-6">
                {selectedItems[selectedItem] + " "}
                <Text
                  className="text-blue-600 font-bold"
                  onPress={() => setReadMore(!readmore)}
                >
                  read less
                </Text>
              </Text>
            ) : (
              <Text className="leading-6">
                {selectedItems[selectedItem].split(".", 2).join(".") + " "}
                <Text
                  className="text-blue-600 font-bold"
                  onPress={() => setReadMore(!readmore)}
                >
                  read more
                </Text>
              </Text>
            )
          ) : (
            selectedItems[selectedItem]?.map((item, index) => (
              <Text key={index}>
                {index + 1}. {item}
                {index === selectedItems[selectedItem].length - 1 ? "" : "\n\n"}
              </Text>
            ))
          )}
        </Text>
        {/* <Markdown>{selectedItems[selectedItem]}</Markdown> */}
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    // height: height,
  },
});
