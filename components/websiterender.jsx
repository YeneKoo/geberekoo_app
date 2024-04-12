import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { AppColors } from "./constcolors";

export default function WebSite({ domain }) {
  const Spinner = () => (
    <View style={styles.activityContainer}>
      {/* <Image source={Logo} style={styles.LogoLoading} /> */}
      <ActivityIndicator size="large" color={AppColors.main} />
    </View>
  );
  if (!domain) return null;

  return (
    <>
      <WebView
        bounces={false}
        startInLoadingState={true}
        renderLoading={Spinner}
        javaScriptEnabled={true}
        style={styles.container}
        domStorageEnabled={true}
        useWebKit={true}
        mediaPlaybackRequiresUserAction={true}
        allowsInlineMediaPlayback={true}
        source={{ uri: domain }}
        allowsbackforwardnavigationgestures
        showsHorizontalScrollIndicator={false}
        scalesPageToFit
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    // backgroundColor: "#1e272d",
    height: "100%",
    width: "100%",
  },
});
