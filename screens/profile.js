import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import plans from "../functions/plans";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import { FlatList } from "react-native-gesture-handler";
import { userProperties } from "../global/userProperties";

const nameDict = {
  artmuseums: "Art",
  museums: "Museums",
  wine_bars: "Wine",
  speakeasies: "Speakeasies",
  japanese: "Japanese",
  bars: "Bars",
  barbeque: "Barbeque",
  extreme: "Extreme",
  cafe: "Cafe",
  bakeries: "Bakeries",
  danceclubs: "Clubs",
  tea: "Tea",
  chinese: "Chinese",
  newamerican: "American",
  poke: "Poke",
  acaibowl: "Acai",
  burgers: "Burgers",
  dancing: "Dancing",
  pizza: "Pizza",
  yoga: "Yoga",
  karaoke: "Karaoke",
  icecream: "Ice Cream",
  arcades: "Arcades",
  mexican: "Mexican",
  oriental: "Oriental",
  sushi: "Sushi",
  markets: "Markets",
  parks: "Parks",
  sandwiches: "Sandwiches",
  artgalleries: "Galleries",
  gelato: "Gelato",
  italian: "Italian",
  spa: "Spa",
  cocktailbars: "Cocktails",
  pubs: "Pubs",
  rockclimbing: "Rock Climbing",
};

const colorList = [
  {
    background: "#5f4b8bff",
    text: "#e69a8dff",
  },
  {
    background: "#cdb599ff",
    text: "#42eaddff",
  },
  {
    background: "#00a4ccff",
    text: "#f95700ff",
  },
  {
    background: "#00203fff",
    text: "#adefd1ff",
  },
  {
    background: "#d6ed17ff",
    text: "#606060ff",
  },
  {
    background: "#89abe3ff",
    text: "#fcf6f5ff",
  },
  {
    background: "#ffd662ff",
    text: "#00539cff",
  },
  {
    background: "#ce4a7eff",
    text: "#1c1c1bff",
  },
  {
    background: "#df6589ff",
    text: "#3c1053ff",
  },
];

var categoryData = (categories) => {
  var newArray = [];
  // console.log(categories);
  for (category in categories) {
    var temp = {
      code: categories[category],
      title: nameDict[categories[category]],
      color:
        colorList[
          category < colorList.length
            ? category
            : Math.floor(Math.random() * colorList.length)
        ],
    };
    newArray.push(temp);
  }
  return newArray;
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: require("../assets/bilbo.png"),
      user: this.props.navigation.state.params,
      categories: categoryData(this.props.navigation.state.params.categories),
    };
    AsyncStorage.getItem("userID").then((value) => {
      this.state.userID = value;
    });
    this.state.name = userProperties.name;
  }

  componentDidMount() {
    Keyboard.dismiss();
    // users.getCategories(this.state.profile.userID, categories => {
    //   if (categories) {
    //     this.setState({
    //       categories: categoryData(categories)
    //     })
    //   }
    // })
  }

  updateCategories = () => {
    plans.getAllCategories((categories) => {
      users.getCategories(this.state.userID, (userCategories) => {
        this.props.navigation.navigate("ActivityPreference", {
          userID: this.state.userID,
          categories: categories,
          userCategories: userCategories,
        });
      });
    });
  };

  updateName = () => {
    //TODO: Send Name value to database to store on user
    let name = this.state.name;
    console.log("Updating user " + this.state.userID + " with name " + name);
    users.updateName(this.state.userID, name, (data) => {
      console.log("Success: " + data);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.top}
        >
          <View
            style={{
              height: "68%",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 1,
            }}
          >
            <Image
              source={this.state.profile}
              style={{
                marginTop: "14%",
                height: Math.round(Dimensions.get("window").height) * 0.15,
                width: Math.round(Dimensions.get("window").height) * 0.15,
                borderRadius:
                  Math.round(Dimensions.get("window").height) * 0.075,
              }}
            />
          </View>
          <View
            style={{
              height: "32%",
              width: "80%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              style={[signInStyles.headerText, { color: "#fff" }]}
              value={this.state.name}
              placeholder={"Set your name"}
              placeholderTextColor={"#feb"}
              returnKeyType={"done"}
              onChangeText={(text) => this.setState({ name: text })}
              onSubmitEditing={this.updateName}
            />
            {/* <Text style={[signInStyles.headerText, { color: "#fff" }]}>
              Frodo Baggins
            </Text> */}
            <TouchableOpacity
              style={styles.button}
              onPress={this.updateCategories}
            >
              <Text style={styles.buttonText}>Update Categories</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 0.65,
            width: "94%",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Text
            style={[
              signInStyles.headerText,
              { textAlign: "left", width: "100%", fontSize: 24, top: 10 },
            ]}
          >
            Interests
          </Text>
          <FlatList
            style={{ top: 10, width: "100%" }}
            numColumns={3}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-around" }}
            data={this.state.categories}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 8 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: item.color.background,
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    borderRadius: 8,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 1,
                  }}
                >
                  <Text style={[styles.buttonText, { color: item.color.text }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  top: {
    flex: 0.35,
    backgroundColor: "#007aff",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  button: {
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 28,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontFamily: "karla-bold",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
