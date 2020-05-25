import { SafeAreaView, withNavigation } from "react-navigation";
import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text, ImageBackground, AsyncStorage, Dimensions, TextInput, Keyboard, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { RNS3 } from "react-native-s3-upload";
import plans from "../functions/plans";
import users from "../functions/users";

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import { drawerStyles } from "../global/drawerStyles";

const cuteDogs = [
  "https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp",
  "https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
  "https://cdn.sanity.io/images/0vv8moc6/dvm360/81e9bbc1fe445afd4c888497d6e8e4d8abcd9029-450x274.jpg",
  "https://t2.ea.ltmcdn.com/en/images/5/1/4/types_and_breeds_of_husky_dogs_1415_orig.jpg",
  "https://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogelog.jpg"
]

export default class Drawer extends Component {
  state = {
    profile: require("../assets/profile.jpg"),
    name: "Hayden",
    points: "4,300",
    plans: "32",
    friends: []
  };
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((value) => {
      this.state.userID = value;
    });
    AsyncStorage.getItem("name").then((value) => {
      if (value != null && value != "") {
        this.setState({
          name: value
        })
      }
    })
    AsyncStorage.getItem("profileImg").then((value) => {
      if (value != null && value != "") {
        this.setState({
          profile: { uri: value }
        })
      }
    })
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      users.getFriends(value, data => {
        this.setState({ friends: data })
      })
    });
  }

  logout = () => {
    AsyncStorage.multiSet([["name", ""], ["userID", ""], ["number", ""], ["profileImg", ""]], () => {
      this.props.navigation.navigate("SignInStack");
    });
  };

  updateName = () => {
    AsyncStorage.setItem("name", this.state.name);
    users.updateName(this.state.userID, this.state.name, (data) => {
      console.log("Success: " + data);
    });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      var file = {
        uri: result.uri,
        name: this.state.userID + ".png",
        type: "image/png"
      }
      var options = {
        keyPrefix: "uploads/",
        bucket: "exirevideo",
        region: "us-east-2",
        accessKey: "AKIA2KE66HVRD2Y6W6UZ",
        secretKey: "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",
        successActionStatus: 201
      }
      var temp = "https://www.nrecosite.com/img/img-loading.gif"
      this.setState({ image: temp });
      this.setState({
        profile: { uri: temp }
      })
      RNS3.put(file, options).then(response => {
        console.log(response)
        if (response.status !== 201) {
          console.log("error")
        } else {
          this.setState({ image: response.body.postResponse.location });
          AsyncStorage.setItem("profileImg", response.body.postResponse.location)
          this.setState({
            profile: { uri: response.body.postResponse.location }
          })
        }
      })
    };
  }

  // make work on android
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  profileChange = async () => {
    AsyncStorage.getItem("profile", data => {
      if (data == null || data == "") {
        this.getPermissionAsync()
        this.pickImage()
      } else {
        this.getPermissionAsync()

        this.pickImage()
      }
    })
  }

  updateCategories = () => {
    plans.getAllCategories((categories) => {
      users.getCategories(this.state.userID, (userCategories) => {
        this.props.navigation.navigate("SignInStack");
        this.props.navigation.navigate("ActivityPreference", {
          userID: this.state.userID,
          categories: categories,
          userCategories: userCategories,
        })
      });
    });
  };

  render() {
    return (
      <View style={{ height: "100%" }}>
        <View style={drawerStyles.container}>
          <Text style={drawerStyles.logoText}>exire</Text>
          <Image
            style={drawerStyles.icon}
            source={require("../assets/icons/exire.png")}
          />
          <TouchableOpacity activeOpacity={.5}
            onPress={this.updateCategories}
            style={[shadowStyles.shadowRight, { position: "absolute", right: 15 }]}
          >
            <Icon
              name="gear"
              color={colorScheme.inactiveButton}
              size={32}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 170, width: "100%" }}>
          <View
            style={[shadowStyles.shadowDown, { alignItems: "center", justifyContent: "center", paddingVertical: 10 }]}
          >
            <ImageBackground
              source={this.state.profile}
              style={drawerStyles.profile}
              imageStyle={{
                borderRadius: 65
              }}
            >
              <TouchableOpacity activeOpacity={.5}
                style={{ width: "100%", height: "100%" }}
                onPress={this.profileChange}
              >
              </TouchableOpacity>
            </ImageBackground>
            <TextInput
              style={[drawerStyles.largeText]}
              value={this.state.name}
              placeholder={"Set Name"}
              placeholderTextColor={colorScheme.veryLight}
              returnKeyType={"done"}
              onChangeText={(text) => this.setState({ name: text })}
              onSubmitEditing={this.updateName}
            />
          </View>
          <View style={[drawerStyles.profileInfo, { height: 10 }]}>
            {/* <View style={drawerStyles.profileInfo}>
            <View style={{ alignItems: "center" }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.friends}</Text>
              <Text style={[drawerStyles.smallText]}>Friends</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.points}</Text>
              <Text style={[drawerStyles.smallText]}>Points</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.plans}</Text>
              <Text style={[drawerStyles.smallText]}>Plans</Text>
            </View> */}
          </View>
          <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={drawerStyles.largeText}>Friends</Text>
            <FlatList
              style={{ width: "100%" }}
              contentContainerStyle={{ marginTop: 5 }}
              data={this.state.friends}
              showsVerticalScrollIndicator={false}
              keyExtratctor={(item, index) => "number" + item.number}
              renderItem={({ item, index }) => (
                <TouchableOpacity activeOpacity={.5} style={{ height: 70, backgroundColor: colorScheme.veryLight, width: "100%", alignItems: "center", borderRadius: 15, flexDirection: "row", paddingHorizontal: 10 }}>
                  <View style={[{ height: 50, width: 50, borderRadius: 25, overflow: "hidden" }, shadowStyles.shadowDown]}>
                    <ImageBackground source={{ uri: cuteDogs[Math.floor(Math.random() * cuteDogs.length)] }} style={{ width: 50, height: 50 }}>
                    </ImageBackground>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: "nunito-bold", color: colorScheme.darkText, fontSize: 17 }}>{
                      item.name == "" ?
                        "Pending"
                        : item.userID == this.state.userID ? "You" : item.name
                    }</Text>
                    <Text style={{ fontFamily: "nunito-semibold", color: colorScheme.darkText, fontSize: 16, paddingTop: -3 }}>
                      {item.number != 1000 ?
                        ("(" + item.number.toString().substring(0, 3) + ") " + item.number.toString().substring(3, 6) + "-" + item.number.toString().substring(6, 10))
                        : ""
                      }</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
