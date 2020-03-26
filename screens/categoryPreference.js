import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import Card from "../shared/card";
import plans from "../functions/plans";

function Category({ key, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(key)}
      style={[
        styles.itemContainer,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }
      ]}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

var reqMade = false;

export default function CategoryPreference({ navigation }) {
  // const [categories, setCategories] = useState([
  //   { title: "Sushi" },
  //   { title: "Parks" },
  //   { title: "Beaches" },
  //   { title: "Pizza" },
  //   { title: "Extreme" },
  //   { title: "Museums" },
  //   { title: "Dancing" }
  // ]);

  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      console.log("Selecting" + { id });

      setSelected(newSelected);
    },
    [selected]
  );

  const [categories, setCategories] = useState([]);

  // const [reqMade, setReqMade] = useState(false);

  if (!reqMade) {
    plans.getAllCategories(function(data) {
      console.log("Hello");
      // console.log(data[0]);
      console.log(data);
      var titles = [];
      for (var i = 0; i < data.length; i++) {
        titles.push({
          title: data[i].title,
          id: i
        });
      }
      console.log(titles);
      setCategories(titles);
    });
    reqMade = true;
  }

  const pressHandler = () => {
    //Modal to Home View 'Chat'
    // navigation.push("PhoneInput");
  };

  const doneTapped = () => {
    console.log("Done");
    navigation.navigate("ChatStack");
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
        extraData={selected}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        // extraData={selected}
        // contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item }) => (
          <Category
            key={item.key}
            title={item.title}
            selected={selected.get(item.id)}
            onSelect={onSelect}
          />
          // <TouchableOpacity style={styles.itemContainer}>
          //   <View style={styles.itemContent}>
          //     <Text style={styles.itemText}>{item.title}</Text>
          //   </View>
          // </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.doneButton} onPress={doneTapped}>
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
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    borderRadius: 16,
    overflow: "hidden"
  },
  itemContent: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "blue"
  },
  itemText: {
    color: "white"
  },
  list: {
    flex: 1,
    width: "100%"
  }
});
