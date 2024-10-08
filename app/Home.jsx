import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.03,
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
