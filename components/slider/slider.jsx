import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";
import { AppColors } from "../constcolors";

const Slider = ({ data }) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const Slides = [
    {
      details: {
        highlight: data?.description ?? "sth",
        causes: data?.causes ?? "sth",
        symptoms: data?.symptoms ?? "sth",
        prevention: data?.prevention_or_treatment_mechanisms ?? "sth",
      },
    },
  ];

  const res_plant_health = data?.status == "red" ? data?.disease : "healthy";
  const plant_health = data?.common_name ?? data?.plant_name;

  const plant_names = [
    data?.plant_name,
    res_plant_health,
    data?.scientific_name,
    data?.genus,
  ];

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    console.log("viewableItems", viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const example = ["Healthy", "Rust", "Phoma", "Dinge Waklama"];

  return (
    <View className="flex justify-center items-center relative">
      <View className="flex justify-center items-center bg-white w-full h-[45px] mt-[25px]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="h-[40px] flex gap-x-2 flex-row w-full justify-between items-center px-2">
            {plant_names.map((item, index) => (
              <View
                key={index}
                style={{
                  // backgroundColor:
                  //   data?.status == "red"
                  //     ? index === 1
                  //       ? "#ff000011"
                  //       : "rgb(22, 163, 74)"
                  //     : "rgb(22, 163, 74)",
                  borderColor:
                    data?.status == "red"
                      ? index === 1
                        ? "#ff0000"
                        : "rgb(22, 163, 74)"
                      : "rgb(22, 163, 74)",
                  // backgroundColor: AppColors.main,
                }}
                className="rounded-[25px] border-2 h-full flex justify-center items-center px-4 font-bold text-lg "
              >
                <Text
                  className="font-bold text-sm capitalize "
                  style={{
                    color:
                      data?.status == "red"
                        ? index === 1
                          ? "#ff0000"
                          : "rgb(22, 163, 74)"
                        : "rgb(22, 163, 74)",
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* <Pagination data={Slides} scrollX={scrollX} index={index} /> */}
      <View className="absolute flex justify-center items-center  bg-white top-[-15px] rounded-t-xl w-full h-[15px]"></View>
      <View
        className="absolute flex justify-center items-center  top-[-39px] rounded-[28px] px-[50px] h-[45px]"
        style={{ backgroundColor: AppColors.main }}
      >
        <Text className="font-bold text-lg uppercase text-white">
          {plant_health}
        </Text>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
