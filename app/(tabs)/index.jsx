import {
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import InterestSection from "../../components/Home/InterestSection";
import AroundMeSection from "../../components/Home/AroundMeSection";
import NewUsersListSection from "../../components/Home/NewUsersListSection";
import DiscoverSection from "../../components/Home/DiscoverSection";

const { height } = Dimensions.get("window"); // Get the screen width

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <DiscoverSection />
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
    fontSize: 34,
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
