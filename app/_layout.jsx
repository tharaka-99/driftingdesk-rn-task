import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";
import * as Font from "expo-font";
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons/Octicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 70;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const animatedValue = useSharedValue(0);

  // This callback should always be defined, but we can wait until the fonts are loaded to execute it
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Effect to hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, onLayoutRootView]);

  // Ensure we call this hook unconditionally
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(animatedValue.value, { duration: 300 }) },
      ],
    };
  });

  // Use a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarContainer,
        tabBarShowLabel: false,
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <Animated.View style={[styles.tabContainer, animatedStyles]}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            if (["+not-found", "_sitemap"].includes(route.name)) return null;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isFocused
                      ? "rgba(255, 165, 0, 1)"
                      : "transparent",
                  },
                ]}
              >
                <Ionicons
                  name={getIconName(route.name)}
                  size={isFocused ? 30 : 24}
                  color={
                    isFocused
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 127, 80, 1)"
                  }
                />
                {/* <Text
                  style={{
                    color: isFocused ? "#ff6347" : "#222",
                    fontSize: 12,
                  }}
                >
                  {label}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )}
    >
      <Tabs.Screen name="Home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="index" options={{ tabBarLabel: "Location" }} />
      <Tabs.Screen name="Friends" options={{ tabBarLabel: "Friends" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
      <Tabs.Screen name="Message" options={{ tabBarLabel: "Message" }} />
    </Tabs>
  );
}

const getIconName = (routeName) => {
  switch (routeName) {
    case "Home":
      return "home-outline";
    case "index":
      return "compass-outline";
    case "Friends":
      return "add-outline";
    case "profile":
      return "people-outline";
    case "Message":
      return "chatbubble-outline";
    default:
      return "help-outline";
  }
};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 0, // Hide default tab bar
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    height: TAB_BAR_HEIGHT,
    borderRadius: 35,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    // marginHorizontal: 10,
    // paddingVertical: 8,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
