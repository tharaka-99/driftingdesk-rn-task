import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WithLocalSvg } from "react-native-svg/css";

const { height, width } = Dimensions.get("window");

// Sample data
const DATA = [
  {
    id: "1",
    name: "Halima",
    age: 19,
    distance: "16 km away",
    city: "Berlin",
    imageUrl: require("../../assets/images/Halima.jpeg"),
    isOnline: true,
  },
  {
    id: "2",
    name: "Vanessa",
    age: 18,
    distance: "4,8 km away",
    city: "Munich",
    imageUrl: require("../../assets/images/Vanessa.jpeg"),
    isOnline: true,
  },
  {
    id: "3",
    name: "James",
    age: 20,
    distance: "2,2 km away",
    city: "Hanover",
    imageUrl: require("../../assets/images/James.jpeg"),
    isOnline: true,
  },
  {
    id: "r",
    name: "Kate",
    age: 21,
    distance: "16 km away",
    city: "koln",
    imageUrl: require("../../assets/images/Kate.jpeg"),
    isOnline: false,
  },
];

const windowWidth = Dimensions.get("window").width;

const NewUsersListSection = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={item.imageUrl}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={["rgba(75, 22, 76, 0)", "rgba(75, 22, 76, 1)"]}
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
        />
        {/* <View style={styles.overlay} /> */}
        <View style={styles.newBadge}>
          <Text style={styles.newText}>NEW</Text>
        </View>
        <View
          style={{
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.distance}>{item.distance}</Text>

          <Text style={styles.name}>
            {item.name}, {item.age}{" "}
            {item.isOnline && (
              <View>
                <WithLocalSvg
                  width={width * 0.02}
                  height={width * 0.02}
                  asset={require("../../assets/images/svg/online-tag-dot.svg")}
                />
              </View>
            )}
          </Text>

          <Text style={styles.city}>{item.city.toUpperCase()}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
  cardContainer: {
    width: 105,
    marginRight: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: 160,
    justifyContent: "flex-end",
    // padding: 10,
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay to make text more readable
  },
  newBadge: {
    backgroundColor: "#FF8700",
    borderWidth: 1,
    borderColor: "rgba(255, 165, 0, 1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  newText: {
    fontFamily: "PoppinsMedium",
    color: "#fff",
    fontSize: 11,
  },
  distance: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 32,
    fontFamily: "PoppinsSemiBold",
    color: "#ECECEC",
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 14,
  },
  name: {
    fontFamily: "PoppinsBold",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 19.6,
    marginBottom: 5,
  },
  city: {
    fontFamily: "PoppinsSemiBold",
    color: "#CCCCCC",
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2,
  },
});

export default NewUsersListSection;
