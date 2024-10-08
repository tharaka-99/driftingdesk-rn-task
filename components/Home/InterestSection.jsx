import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

// Sample data for interests
const DATA = [
  { id: "1", title: "⚽️ BBQ", selected: false },
  { id: "2", title: "🍃 Homemade", selected: false },
  { id: "3", title: "🎵 Vegetarian", selected: true },
  { id: "4", title: "📸 Music", selected: false },
  { id: "5", title: "✍🏻 Breakfast", selected: false },
  { id: "6", title: "🗣 Garden", selected: false },
  { id: "7", title: "👗 Fashion", selected: false },
  // Add more items as needed
];

const { width } = Dimensions.get("window");

export default function InterestSection() {
  // Renders a row of interest items
  const renderRow = (rowData) => (
    <View style={styles.row}>
      {rowData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.interestItem, item.selected ? styles.selected : null]}
        >
          <Text style={item.selected ? styles.selectedText : styles.text}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Split DATA into two rows
  const firstRow = DATA.filter((_, index) => index % 2 === 0);
  const secondRow = DATA.filter((_, index) => index % 2 !== 0);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Interest</Text>
        <TouchableOpacity underlayColor="#FFA50050">
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          {renderRow(firstRow)}
          {renderRow(secondRow)}
        </View>
      </ScrollView>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
  },
  viewAllText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#FFA500",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row", // Stack items horizontally
    marginRight: 10, // Add margin between rows
  },
  interestItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 22, 76, 0.2)",
    borderRadius: 50,
    marginVertical: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "PoppinsMedium",
    color: "#F4987A",
    fontSize: 16,
  },
  selected: {
    backgroundColor: "#FFA533",
  },
  selectedText: {
    fontFamily: "PoppinsMedium",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
