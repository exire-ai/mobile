import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  AsyncStorage
} from "react-native";
import Card from "../shared/card";
import plans from "../functions/plans";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import firebase from "firebase";

function Category({ key, title, url, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(key)}
      style={styles.itemContainer}
    >
      <ImageBackground
        source={{ uri: url }}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
      >
        <View
          style={[
            styles.itemContent,
            {
              backgroundColor: selected ? "rgba(0,0,80,.75)" : "rgba(0,0,0,.35)"
            }
          ]}
        >
          <Text style={styles.itemText}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default class CategoryPreference extends React.Component {
  constructor(props) {
    super(props);
    var categoryData = this.props.navigation.state.params.categories

    var activities = ["dancing", "bars", "artgalleries", "extreme", "rockclimbing", "speakeasies", "yoga", "danceclubs", "karaoke", "arcades", "markets", "parks", "cocktailbars", "wine_bars", "spa", "museums"]
    
    var formatData = () => {
      // check if in activities
      var categories = [];
      var j = 0;
      for (var i = 0; i < categoryData.length; i++) {
        if (activities.includes(categoryData[i].code)) {
          categories.push({
            title: categoryData[i].title,
            id: j,
            url: categoryData[i].url,
            selected: false,
            code: categoryData[i].code
          });
          j++;
        }
      }
      return categories
    }

    this.state = {
      categories: formatData(),
      selectedCategories: [],
      categoryData: categoryData
    };
  }

  next = () => {
    this.props.navigation.navigate("FoodPreference", { number: this.props.navigation.state.params.number, categoryData: this.state.categoryData, selected: this.state.selectedCategories });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            signInStyles.subHeaderText,
            { padding: "5%", backgroundColor: "#eee", width: "100%" }
          ]}
        >
          Tell us what you are interested in!
        </Text>
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.categories}
          extraData={this.state.selected}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Category
              key={item.key}
              title={item.title}
              url={item.url}
              selected={item.selected}
              onSelect={() => {
                var newCategories = this.state.categories;
                newCategories[item.id].selected = !this.state.categories[
                  item.id
                ].selected;
                var newSelected = this.state.selectedCategories;
                if (newCategories[item.id].selected) {
                  newSelected.push(newCategories[item.id].code);
                } else {
                  const index = newSelected.indexOf(
                    newCategories[item.id].code
                  );
                  newSelected.splice(index, 1);
                }
                this.setState({
                  categories: newCategories,
                  selectedCategories: newSelected
                });
              }}
            />
          )}
        />
        <TouchableOpacity
          style={styles.doneButton}
          onPress={this.next}
        >
          <Text style={signInStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "pink"
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
    borderRadius: 16,
    margin: Dimensions.get("screen").width * 0.025,
    height: Dimensions.get("screen").width * 0.45,
    overflow: "hidden"
  },
  itemContent: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    fontFamily: "nunito-semibold",
    color: "white",
    fontSize: 28,
    fontWeight: "600",
    marginHorizontal: 8,
    textAlign: "center"
  },
  list: {
    flex: 1,
    width: "100%"
  }
});
