import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ImageBackground
} from "react-native";
import Card from "../shared/card";
import plans from "../functions/plans";
import users from "../functions/users"
import { signInStyles } from "../global/signInStyles"

function Category({ key, title, url, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(key)}
      style={styles.itemContainer}
    >
      <ImageBackground source={{ uri: url}} style={{width: '100%', height: '100%', borderRadius: 8}}>
        <View style={[styles.itemContent, { backgroundColor: selected ? 'rgba(0,0,80,.75)' : 'rgba(0,0,0,.35)' }]}>
          <Text style={styles.itemText}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default class CategoryPreference extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }

    plans.getAllCategories( (data) => {
      var categories = []
      for (var i = 0; i < data.length; i++) {
        categories.push({
          title: data[i].title,
          id: i,
          url: data[i].url,
          selected: false
        })
      }
      this.setState({
        categories: categories
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[signInStyles.subHeaderText, { padding: '5%', backgroundColor: '#eee', width: '100%' }]}>
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
                var newCategories = this.state.categories
                newCategories[item.id].selected = !this.state.categories[item.id].selected
                this.setState({
                  categories: newCategories
                })
                }
              }
            />
          )}
        />
        <TouchableOpacity style={styles.doneButton} onPress={() => {
          // users.updateCategories(globalUser ID this.state.categories, () => {
            this.props.navigation.navigate('ChatStack')
          // })
        }}>
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
    margin: Dimensions.get('screen').width*.025,
    height: Dimensions.get('screen').width*.45,
    overflow: "hidden"
  },
  itemContent: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    fontFamily: 'nunito-semibold',
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
