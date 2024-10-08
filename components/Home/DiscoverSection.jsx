import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { WithLocalSvg } from "react-native-svg/css";

const { width } = Dimensions.get("window"); // Get the screen width

export default function DiscoverSection() {
  const iconSize = width * 0.05;
  return (
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
            asset={require("../../assets/images/svg/location_icon.svg")}
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
            asset={require("../../assets/images/svg/dropdown-icon.svg")}
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
            asset={require("../../assets/images/svg/search-icon.svg")}
          />
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <WithLocalSvg
            width={width * 0.1}
            height={width * 0.1}
            asset={require("../../assets/images/svg/filter-icon.svg")}
          />
        </View>
      </View>
    </View>
  );
}
