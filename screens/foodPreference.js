import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import ProgressiveImage from "../components/ProgressiveImage";
import { signInStyles } from "../global/signInStyles";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import users from "../functions/users"


function Category({
  key,
  title,
  ogUrl,
  lowUrl,
  url,
  code,
  selected,
  onSelect,
}) {
  function renderSelectedImage() {
    if (selected) {
      return (
        <View
          style={[{
            width: 35,
            height: 35,
            backgroundColor: colorScheme.activeButton,
            position: "absolute",
            right: 10,
            top: 10,
            borderRadius: 17.5
          }, shadowStyles.shadowDown]}
        >
          <Icon
            name="check"
            color={colorScheme.primaryText}
            size={28}
            style={[shadowStyles.shadowDown, { paddingLeft: 3, paddingTop: 4 }]}
          />
        </View>
      );
    } else {
      return (<View
        style={{
          height: 20,
          width: 20,
          position: "absolute",
          right: 10,
          top: 10,
          width: "100%"
        }}
      />)
    }
  }

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity activeOpacity={.5} activeOpacity={.5} onPress={() => onSelect(key)}>
        <ProgressiveImage
          thumbnailSource={{ uri: lowUrl }}
          source={{ uri: url }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
          resizeMode="cover"
        />
        <View
          style={[
            styles.itemContent,
            {
              backgroundColor: selected ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.15)",
              blurRadius: selected ? 1 : 0,
            },
          ]}
        >
          {renderSelectedImage()}
          <Text style={styles.itemText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default class CategoryPreference extends React.Component {
  constructor(props) {
    super(props);
    var categoryData = this.props.navigation.state.params.categoryData;
    var userCategories = this.props.navigation.state.params.userCategories;

    var food = [
      "chinese",
      "sushi",
      "burgers",
      "pubs",
      "mexican",
      "poke",
      "italian",
      "sandwiches",
      "pizza",
      "icecream",
      "bakeries",
      "barbeque",
      "gelato",
      "newamerican",
      "tea",
      "acaibowl",
      "cafe",
      "japanese",
    ];

    var formatData = () => {
      var categories = [];
      var j = 0;
      for (var i = 0; i < categoryData.length; i++) {
        if (food.includes(categoryData[i].code)) {
          categories.push({
            title: categoryData[i].title,
            id: j,
            ogUrl: categoryData[i].url,
            lowUrl:
              "https://exirevideo.s3.us-east-2.amazonaws.com/" +
              categoryData[i].code +
              "low.jpg",
            url:
              "https://exirevideo.s3.us-east-2.amazonaws.com/" +
              categoryData[i].code +
              ".jpg",
            selected: userCategories.includes(categoryData[i].code),
            code: categoryData[i].code,
          });
          j++;
        }
      }
      return categories;
    };

    var priorSelected = () => {
      var selectedCategories = [];
      for (var i = 0; i < categoryData.length; i++) {
        if (food.includes(categoryData[i].code)) {
          if (userCategories.includes(categoryData[i].code)) {
            selectedCategories.push(categoryData[i].code);
          }
        }
      }
      return selectedCategories;
    };

    this.state = {
      categories: formatData(),
      selectedCategories: priorSelected(),
      newSelected: []
    };
  }

  next = (selected) => {
    if (selected.length > 2) {
      var temp = this.props.navigation.state.params.selected
      selected = temp.concat(selected);
      var userID = this.props.navigation.state.params.userID;
      users.updateCategories(userID, selected, () => {
        AsyncStorage.setItem("userID", userID);
        this.props.navigation.navigate("HomeStack");
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={[
            { width: "100%", paddingHorizontal: 50, paddingVertical: 10, textAlign: "center", fontFamily: "SemiBold", fontSize: 19, color: colorScheme.darkText},
          ]}
        >
          Choose at least 3 interests to set up your recommendations
        </Text>
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.categories}
          extraData={this.state.selected}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category
              key={item.key}
              title={item.title}
              localUrl={"../assets/categories/" + item.code + ".jpg"}
              url={item.url}
              ogUrl={item.ogUrl}
              lowUrl={item.lowUrl}
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
                  selectedCategories: newSelected,
                });
              }}
            />
          )}
        />
        <View behavior={"padding"} style={{ flexDirection: "row", alignItems: "flex-end", position: "absolute",
              right: 20,
              bottom: 20 }}>
          <TouchableOpacity activeOpacity={.5}
            style={[shadowStyles.shadowDown, {
              backgroundColor: this.state.selectedCategories.length > 2 ? colorScheme.button : colorScheme.activeButton,
              height: 65,
              width: 65,
              borderRadius: 32.5,
              alignItems: "center",
              justifyContent: "center"
            }]}
            onPress={() => { this.next(this.state.selectedCategories) }}
          >
            <Icon
              name="chevron-right"
              color="#FFF"
              size={36}
              style={[shadowStyles.shadowDown, { paddingLeft: 3, paddingTop: 3 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.componentBackground,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  item: {
    margin: 24,
    padding: 15,
    backgroundColor: "pink",
  },
  doneButton: {
    width: "100%",
    height: 80,
    alignItems: "center",
    paddingTop: 15,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    height: 195,
    overflow: "hidden",
  },
  itemContent: {
    width: "100%",
    aspectRatio: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemText: {
    fontFamily: "SemiBold",
    color: "white",
    fontSize: 26,
    marginHorizontal: 8,
    textAlign: "center",
    marginTop: 85
  },
  list: {
    flex: 1,
    width: "97%",
    alignContent: "center",
    paddingRight: 5
  },
});

