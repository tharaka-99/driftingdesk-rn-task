import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";
import {
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Prevent splash screen auto-hiding
SplashScreen.preventAutoHideAsync();

// Constants
const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 70;

export default function TabLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  // Shared value for animation
  const animatedValue = useSharedValue(0);

  // Callback to hide splash screen when fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Trigger the layout effect after fonts load
  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded, onLayoutRootView]);

  // Animated styles for the tab bar
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(animatedValue.value, { duration: 300 }) },
      ],
    };
  });

  // Show a loading spinner while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.hiddenTabBar, // Hide default tab bar
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

            // Skip unwanted routes
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
              <TabButton
                key={route.key}
                isFocused={isFocused}
                onPress={onPress}
                onLongPress={onLongPress}
                routeName={route.name}
              />
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

// Separate TabButton component for better readability
const TabButton = ({ isFocused, onPress, onLongPress, routeName }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.tabButton,
        {
          backgroundColor: isFocused ? "rgba(255, 165, 0, 1)" : "transparent",
        },
      ]}
    >
      <Ionicons
        name={getIconName(routeName)}
        size={isFocused ? 30 : 24}
        color={isFocused ? "rgba(255, 255, 255, 1)" : "rgba(255, 127, 80, 1)"}
      />
    </TouchableOpacity>
  );
};

// Utility function to return the appropriate icon based on the route
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

// Styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenTabBar: {
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
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
