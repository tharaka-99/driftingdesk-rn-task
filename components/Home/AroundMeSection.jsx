import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { WithLocalSvg } from "react-native-svg/css";

const { height, width } = Dimensions.get("window");

const locations = [
  {
    id: 1,
    latitude: 6.885394, // Example location 1
    longitude: 79.970246,
    name: "Kate",
    image: require("../../assets/images/Kate.jpeg"),
    isOnline: true, // Kate is online
  },
  {
    id: 2,
    latitude: 6.888614, // Example location 2
    longitude: 79.966449,
    name: "Vanessa",
    image: require("../../assets/images/Vanessa.jpeg"),
    isOnline: false, // Vanessa is offline
  },
  {
    id: 3,
    latitude: 6.882422, // Example location 3
    longitude: 79.969965,
    name: "James",
    image: require("../../assets/images/James.jpeg"),
    isOnline: false, // James is online
  },
];

export default function AroundMeSection() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Request location permissions and watch user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Track location updates every 5 seconds or 10 meters movement
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // update every 5 seconds
          distanceInterval: 10, // update after user moves 10 meters
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation((prevLocation) => ({
            ...prevLocation,
            latitude,
            longitude,
          }));
        }
      );
    })();
  }, []);

  return (
    <View>
      {/* Section Header */}
      <View>
        <Text style={styles.aboutmeHeaderText}>Around me</Text>
      </View>
      <View>
        <Text style={styles.aboutmeSubText}>
          Hosts with <Text style={{ color: "#FFA500" }}>“Vegetarian”</Text>{" "}
          serving around you
        </Text>
      </View>

      {/* Map Section */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={location}
          region={location}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
            >
              <View style={styles.markerContainer}>
                {/* Display Online Tag if User is Online */}
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {loc.isOnline && (
                    <View style={styles.onlineTag}>
                      <WithLocalSvg
                        width={width * 0.05}
                        height={width * 0.05}
                        asset={require("../../assets/images/svg/online-display.svg")}
                      />
                      <Text style={styles.onlineText}>
                        {" "}
                        Connect with{" "}
                        <Text style={{ fontFamily: "PoppinsSemiBold" }}>
                          {loc.name}
                        </Text>
                        👋
                      </Text>
                    </View>
                  )}
                  {/* Display User Profile Image */}
                  <Image
                    source={loc.image}
                    style={[
                      styles.markerImage,
                      { borderColor: loc.isOnline ? "#FF7F50" : "#FFFFFF" }, // Green border if online, white if offline
                    ]}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutmeHeaderText: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
  },
  aboutmeSubText: {
    paddingVertical: 5,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: "rgba(108, 114, 127, 1)",
  },
  container: {
    width: "100%",
    height: height * 0.5,
    marginBottom: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    overflow: "hidden",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular marker
    borderWidth: 3,
  },
  onlineTag: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: -45,
    backgroundColor: "#FF7F50",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    zIndex: 1,
  },
  onlineText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  markerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.1,
    width: width * 0.7,
  },
});
