import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { WithLocalSvg } from "react-native-svg/css";

const { width } = Dimensions.get("window"); // Get the screen width

const iconSize = width * 0.05; // Define icon size based on screen width
const largeIconSize = width * 0.1; // Define large icon size

export default function DiscoverSection() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.locationContainer}>
          <WithLocalSvg
            width={iconSize}
            height={iconSize}
            asset={require("../../assets/images/svg/location_icon.svg")}
          />
          <Text style={styles.locationText}>Germany</Text>
          <WithLocalSvg
            width={iconSize}
            height={iconSize}
            asset={require("../../assets/images/svg/dropdown-icon.svg")}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Discover</Text>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <View style={styles.iconWrapper}>
          <WithLocalSvg
            width={largeIconSize}
            height={largeIconSize}
            asset={require("../../assets/images/svg/search-icon.svg")}
          />
        </View>
        <View style={styles.iconWrapper}>
          <WithLocalSvg
            width={largeIconSize}
            height={largeIconSize}
            asset={require("../../assets/images/svg/filter-icon.svg")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  locationText: {
    fontFamily: "PoppinsMedium",
    fontSize: 12,
    marginHorizontal: 4,
  },
  titleContainer: {
    marginRight: "auto",
  },
  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconWrapper: {
    paddingHorizontal: 5,
  },
});
