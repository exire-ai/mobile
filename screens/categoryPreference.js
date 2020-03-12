import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import Card from "../shared/card";

export default function CategoryPreference({ navigation }) {
  const [categories, setCategories] = useState([
    { title: "Sushi" },
    { title: "Parks" },
    { title: "Beaches" },
    { title: "Pizza" },
    { title: "Extreme" },
    { title: "Museums" },
    { title: "Dancing" }
  ]);

  const pressHandler = () => {
    //Modal to Home View 'Chat'
    // navigation.push("PhoneInput");
  };

  return (
    <View style={styles.container}>
      <Text style={{ margin: 15, fontSize: 22 }}>
        Select at least five categories
      </Text>
      <FlatList
        style={styles.list}
        numColumns={2}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.title}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.doneButton}>
        <Text style={{ color: "white" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center"
  },
  getStartedButton: {
    backgroundColor: "#007aff",
    height: 50,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  list: {
    flex: 1
  },
  item: {
    margin: 24,
    padding: 15,
    backgroundColor: "pink",
    width: 120,
    height: 120
  },
  doneButton: {
    backgroundColor: "#007aff",
    width: "100%",
    height: 80,
    alignItems: "center",
    paddingTop: 15
    // color: "white"
  },
  itemContent: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  itemText: {
    color: "white"
  }
});
