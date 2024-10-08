import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import LocationIcon from "../assets/images/location_icon.svg"; // Import your SVG file
import { WithLocalSvg } from "react-native-svg/css";
import InterestSection from "../components/Home/InterestSection";
import AroundMeSection from "../components/Home/AroundMeSection";
import NewUsersListSection from "../components/Home/NewUsersListSection";

const { width, height } = Dimensions.get("window"); // Get the screen width

export default function HomeScreen() {
  const iconSize = width * 0.05;
  return (
    <ScrollView style={styles.container}>
      {/* <LocationIcon width={iconSize} height={iconSize} /> */}
      {/* <LocationIcon width={50} height={50} /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <WithLocalSvg
              width={iconSize}
              height={iconSize}
              asset={require("../assets/images/location_icon.svg")}
            />
            <Text
              style={{
                fontFamily: "PoppinsMedium",
                fontSize: 12,
                // paddingHorizontal: 4,
                marginHorizontal: 4,
              }}
            >
              Germany
            </Text>
            <WithLocalSvg
              width={iconSize}
              height={iconSize}
              asset={require("../assets/images/svg/dropdown-icon.svg")}
            />
          </View>
          <View style={{ marginRight: "auto" }}>
            <Text
              style={{
                fontFamily: "PoppinsBold",
                fontSize: 24,
              }}
            >
              Discover
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingHorizontal: 5 }}>
            <WithLocalSvg
              width={width * 0.1}
              height={width * 0.1}
              asset={require("../assets/images/svg/search-icon.svg")}
            />
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <WithLocalSvg
              width={width * 0.1}
              height={width * 0.1}
              asset={require("../assets/images/svg/filter-icon.svg")}
            />
          </View>
        </View>
      </View>
      <NewUsersListSection />
      <InterestSection />
      <AroundMeSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.03,
    padding: 16,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // fontFamily: "PoppinsBold",
    fontSize: 34,
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
