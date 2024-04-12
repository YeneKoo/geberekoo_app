import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AppColors } from "./constcolors";

export default function Popup({
  setMaxD,
  maxd,
  setST,
  st,
  setDomain,
  setWebDomain,
  domain,
  webdomain,
  setplantType,
  planttype,
  onPress,
}) {
  return (
    <View
      style={{ borderColor: AppColors.main }}
      className="bg-white border-2 w-[95%] p-[10px] flex rounded-md relative"
    >
      <View className="mt-[2px]">
        <Text>Max Detection</Text>
        <TextInput
          defaultValue={maxd}
          onChangeText={setMaxD}
          className="border-2 pl-[10px] mt-[10px] rounded-md h-[7vh] focus:mb-3"
          style={{ borderColor: AppColors.secondary }}
        />
      </View>
      <View className="mt-[10px]">
        <Text>scoreThreshold</Text>
        <TextInput
          defaultValue={st}
          onChangeText={setST}
          className="border-2 pl-[10px] mt-[10px] rounded-md h-[7vh]"
          style={{ borderColor: AppColors.secondary }}
        />
      </View>
      <View className="mt-[10px]">
        <Text>Web End Point</Text>
        <TextInput
          defaultValue={webdomain}
          onChangeText={setWebDomain}
          className="border-2 pl-[10px] mt-[10px] rounded-md h-[7vh]"
          style={{ borderColor: AppColors.secondary }}
        />
      </View>
      <View className="mt-[10px]">
        <Text>Backend End Point</Text>
        <TextInput
          defaultValue={domain}
          onChangeText={setDomain}
          className="border-2 pl-[10px] mt-[10px] rounded-md h-[7vh]"
          style={{ borderColor: AppColors.secondary }}
        />
      </View>
      <View className="mt-[10px] mb-[2px]">
        <Text>Plant Type</Text>
        <TextInput
          defaultValue={planttype}
          onChangeText={setplantType}
          className="border-2 pl-[10px] mt-[10px] rounded-md h-[7vh]"
          style={{ borderColor: AppColors.secondary }}
        />
      </View>
      <View
        className="absolute top-[7px] w-[30px]  flex justify-center items-center rounded-sm  h-[30px] right-[7px]"
        style={{ backgroundColor: AppColors.main }}
      >
        <MaterialIcons
          name={"close"}
          size={24}
          color="white"
          onPress={onPress}
        />
      </View>
    </View>
  );
}
