import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";

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

const renderGridItems = () => {
  const items = [];
  for (let i = 0; i < DATA.length; i += 2) {
    items.push(
      <View key={i} style={styles.columnContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{DATA[i].title}</Text>
        </View>
        {DATA[i + 1] && (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{DATA[i + 1].title}</Text>
          </View>
        )}
      </View>
    );
  }
  return items;
};

const firstRow = DATA.filter((item, index) => index % 2 === 0);
const secondRow = DATA.filter((item, index) => index % 2 !== 0);

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

const { width } = Dimensions.get("window");

export default function InterestSection() {
  const renderItemsInRows = (item) => {
    const rows = [];

    for (let i = 0; i < item.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <TouchableOpacity
            style={[
              styles.interestItem,
              item[i].selected ? styles.selected : null,
            ]}
          >
            <Text style={item[i].selected ? styles.selectedText : styles.text}>
              {item[i].title}
            </Text>
          </TouchableOpacity>

          {item[i + 1] && (
            <TouchableOpacity
              style={[
                styles.interestItem,
                item[i + 1].selected ? styles.selected : null,
              ]}
            >
              <Text
                style={item[i + 1].selected ? styles.selectedText : styles.text}
              >
                {item[i + 1].title}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return rows;
  };

  //   const firstRowItems = interests.filter((_, index) => index % 2 === 0);
  //   const secondRowItems = interests.filter((_, index) => index % 2 !== 0);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 24 }}>
          Interest
        </Text>
        <TouchableOpacity underlayColor="#FFA50050">
          <Text
            style={{
              fontFamily: "PoppinsMedium",
              fontSize: 16,
              color: "#FFA500",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
         

          {renderItemsInRows()}
        </ScrollView> */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // Stack items vertically
    marginRight: 10, // Add margin between columns
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26222B",
  },
  scrollContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // paddingVertical: 10,
  },
  interestItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 22, 76, 0.2)",
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 5,
    // flexWrap: "wrap",
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
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
  },
  //   scrollContainer: {
  //     paddingHorizontal: 10,
  //   },
  //   row: {
  //     flexDirection: "row",
  //     marginBottom: 10,
  //   },
  //   interestItem: {
  //     padding: 10,
  //     backgroundColor: "#f0f0f0",
  //     borderRadius: 5,
  //     marginHorizontal: 5,
  //   },
  //   selected: {
  //     backgroundColor: "#4CAF50",
  //   },
  //   text: {
  //     fontSize: 16,
  //     textAlign: "center",
  //   },
  //   selectedText: {
  //     color: "#fff",
  //     fontSize: 16,
  //     textAlign: "center",
  //   },
});
