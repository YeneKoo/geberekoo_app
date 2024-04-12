import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

import Popup from "../components/popup";
import Result from "../components/result";
import { getResult } from "../api/api";
import { AppColors } from "../components/constcolors";

export default function App() {
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [active, setActive] = useState(0);
  const [labletext, setLableText] = useState(1);
  const [showpopup, setShowPopup] = useState(false);
  const [showresult, setShowResult] = useState(false);
  const [imgurl, setImgUrl] = useState(null);
  const [localimgurl, setLocalImgUrl] = useState(null);
  const [offline, setOffline] = useState(false);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [w, setWidth] = useState(0);
  const [h, setHeight] = useState(0);
  const [aiResult, setAIResult] = useState(null);
  const [scrolledWidth, setScrolledWidth] = useState(0);

  const horizonal_lists1 =
    "botanist, Gardener, Ecologist, Horticulturist, Adventurer";
  const horizonal_lists2 = "coffee, wheat, corn, bean, teff";

  const [maxd, setMaxD] = useState("3");
  const [st, setST] = useState(".95");
  const [planttype, setplantType] = useState(horizonal_lists1);
  const [domain, setDomain] = useState(
    "https://api-test-geberekoo.onrender.com/upload-image"
  );
  const [webdomain, setWebDomain] = useState(
    "https://api-test-geberekoo.onrender.com/docs#/default/upload_image_upload_image_post"
  );

  const windowHeight = useWindowDimensions().height;

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleTorch() {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
    console.log(flash);
  }

  const detecttype = labletext == 1 ? "lable" : "text";

  const domain_w_query =
    domain +
    `?maxd=${maxd}&st=${st}&plant=${
      planttype.split(", ")[active]
    }&detecttype=${detecttype}&w=${w}&h=${h}`;

  const SendImg = async (imgurl) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imgurl,
      name: "photo.png",
      type: "image/png",
    });
    const res = await getResult(domain_w_query, formData);
    console.log(res.data.message);
    if (res.data) {
      setImgUrl(imgurl);
      console.log("lll res", res.data);
      setAIResult(res.data);
    } else {
      Alert.alert("sth went wronge try again");
    }
  };

  const ReSendImg = async () => {
    setImgUrl(null);
    SendImg(localimgurl);
  };

  async function takePhoto() {
    if (camera) {
      setImgUrl(null);
      setShowResult(true);
      const data = await camera.takePictureAsync(null);
      if (data) {
        setHeight(data.height);
        setWidth(data.width);
        setLocalImgUrl(data.uri);
        SendImg(data.uri);
        // console.log(data);
      }
    }
  }

  const selectImg = async () => {
    DocumentPicker.getDocumentAsync({ type: "image/*" })
      .then((res) => {
        setImgUrl(null);
        setShowResult(true);
        SendImg(res.assets[0].uri);
      })
      .catch((err) => console.log(err));
  };

  function itemClick(index) {
    setActive(index);
    // console.log(index);
  }

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      console.log(offline);
      setOffline(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  const iconName = ["seed", "grain", "corn", "grain", "leaf"];

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return null;
    }
  };

  const getData = async (key) => {
    await AsyncStorage.getItem(key)
      .then((res) => {
        if (res !== null) {
          return res;
        }
      })
      .catch((e) => {
        return null;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const maxdData = await getData("maxd");
      const webdomainData = await getData("webdomain");
      const stData = await getData("st");
      const domainData = await getData("domain");
      const planttypeData = await getData("planttype");
      console.log(maxd, webdomain, stData, domainData, planttype);

      maxdData && setMaxD(maxdData);
      webdomainData && setWebDomain(webdomainData);
      stData && setST(stData);
      domainData && setDomain(domainData);
      planttypeData && setplantType(planttypeData);
    };

    fetchData();
  }, []);

  const savetoLocalStorage = async () => {
    await storeData("maxd", maxd);
    await storeData("webdomain", webdomain);
    await storeData("st", st);
    await storeData("domain", domain);
    await storeData("planttype", planttype);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={styles.container}
        className="felx h-full justify-center items-center"
      >
        <Text
          style={{ textAlign: "center" }}
          className="text-[#2B2A26] pb-[20px]"
        >
          GebereKoo needs access to the camera
        </Text>
        <Pressable
          onPress={requestPermission}
          className="flex justify-center items-center h-[7vh] w-1/2 rounded-[10px] border-2 border-[#2B2A26]"
          style={{ backgroundColor: AppColors.secondary }}
        >
          <Text style={{ color: AppColors.main }}>Grant Permission </Text>
        </Pressable>
        <StatusBar hidden={true} />
      </View>
    );
  }

  return (
    <View style={[{ flex: 1, minHeight: Math.round(windowHeight) }]}>
      <View className="h-[65%] w-full flex justify-center items-center">
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          className="absolute w-full h-full top-0"
          type={type}
          flashMode={flash}
        />
        <MaterialIcons name={"add"} size={24} color="white" />

        <View className="absolute top-[25px] w-full flex flex-row justify-between px-[9px] items-center">
          <View className="w-[50px]"></View>
          <Text className="text-[30px] text-white uppercase mb-[140px]"></Text>
          <View className="flex bg-[#F5EFE844] rounded-lg pb-[17px] justify-center items-center flex-col w-[48px] gap-y-[17px]">
            <MaterialIcons
              name={!showpopup ? "settings" : "arrow-downward"}
              size={24}
              color="white"
              onPress={() => setShowPopup(!showpopup)}
            />
            <MaterialIcons
              name="flip-camera-ios"
              size={24}
              color="white"
              onPress={toggleCameraType}
            />
            <MaterialIcons
              name={flash ? "light-mode" : "dark-mode"}
              size={24}
              color="white"
              onPress={toggleTorch}
            />
            <Link
              href={{
                pathname: "/chat",
                params: { topic: "bacon", domain: webdomain, from: "backend" },
              }}
              asChild
            >
              <MaterialIcons name={"network-ping"} size={24} color="white" />
            </Link>
          </View>
        </View>
      </View>
      <View
        className={`h-[35%] border-t-4 ${
          !offline ? "border-green-500" : "border-red-500"
        }`}
      >
        <View className="h-[69%] flex justify-center items-center">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={(e) =>
              setScrolledWidth((e.nativeEvent.contentOffset.x / 190) * 100)
            }
          >
            {planttype.split(", ").map((item, index) => (
              <Pressable
                className="flex justify-center items-center"
                key={index}
                onPress={() => itemClick(index)}
              >
                <View
                  style={{
                    backgroundColor: AppColors.secondary,
                    borderColor:
                      active == index ? AppColors.main : AppColors.main + "44",
                  }}
                  className={`flex justify-center items-center h-[70px] min-w-[90px] m-[10px] border-2 rounded-[8px]`}
                >
                  <MaterialCommunityIcons
                    name={
                      iconName.length - 1 >= index ? iconName[index] : "leaf"
                    }
                    size={42}
                    color={AppColors.main}
                  />
                </View>
                <Text
                  className="capitalize font-bold"
                  style={{ color: active == index ? "#2B2A26" : "#2B2A2644" }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View className="w-full h-[20%] flex justify-center items-center">
            <View
              className="h-[10px] gap-2 flex flex-row justify-between items-center"
              // style={{ backgroundColor: AppColors.secondary }}
            >
              {planttype.split(", ").map((item, index) => (
                <View
                  className="w-[10px] rounded-full h-[10px]"
                  key={index}
                  style={{
                    backgroundColor:
                      index == active ? AppColors.main : AppColors.main + "44",
                  }}
                ></View>
              ))}
            </View>
          </View>
        </View>

        <View
          style={{ backgroundColor: AppColors.main }}
          className="w-[85%] flex rounded-2xl px-3 flex-row justify-between items-center h-[23%] mx-[7.5%] my-[2.5%]"
        >
          <Pressable onPress={() => selectImg()}>
            <MaterialIcons name="image" size={40} color="white" />
          </Pressable>
          <Pressable onPress={() => takePhoto()}>
            <MaterialIcons name="camera" size={40} color="white" />
          </Pressable>
          <Pressable
            onPress={() =>
              imgurl
                ? setShowResult(!showresult)
                : alert("please capture or upload photo to check again")
            }
          >
            <MaterialIcons name="flip-camera-android" size={40} color="white" />
          </Pressable>
        </View>
      </View>
      {showpopup && (
        <View className="absolute top-[10%] w-full flex justify-center items-center">
          <Popup
            maxd={maxd}
            webdomain={webdomain}
            st={st}
            domain={domain}
            planttype={planttype}
            setMaxD={(txt) => setMaxD(txt)}
            setWebDomain={(txt) => setWebDomain(txt)}
            setST={(txt) => setST(txt)}
            setDomain={(txt) => setDomain(txt)}
            setplantType={(txt) => setplantType(txt)}
            onPress={() => {
              savetoLocalStorage();
              setShowPopup(!showpopup);
            }}
          />
        </View>
      )}
      {showresult && (
        <View className="absolute top-[0%] w-full flex justify-center items-center">
          <Result
            data={aiResult}
            imgurl={imgurl}
            onClose={() => setShowResult(!showresult)}
            webdomain={webdomain}
          />
        </View>
      )}
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
