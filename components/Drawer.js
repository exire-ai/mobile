import { SafeAreaView, withNavigation } from "react-navigation";
import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text, ImageBackground, AsyncStorage, TextInput, FlatList, Alert, InteractionManager } from "react-native";
import { NavigationEvents } from 'react-navigation';
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

export default class Drawer extends Component {
  state = {
    profile: "https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png",
    name: "Hayden",
    points: "4,300",
    plans: "32",
    friends: []
  };
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((value) => {
      this.getProfile(value)
      this.setState({
        userID: value
      });
    });
    AsyncStorage.getItem("name").then((value) => {
      if (value != null && value != "") {
        this.setState({
          name: value
        })
      }
    })
  }

  componentDidMount() {
    this.getFriends();
    this._interval = setInterval(() => {
      this.getFriends();
      console.log(this.state.profile)
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  getFriends = () => {
    AsyncStorage.getItem("userID").then((value) => {
      users.getFriends(value, data => {
        this.setState({ friends: data })
      })
    });
  }

  getProfile = userID => {
    users.get(userID, data => {
      if (data.profile !== null) {
        this.setState({ profile: data.profileImg })
      }
    })
  }

  updateName = () => {
    AsyncStorage.setItem("name", this.state.name);
    users.updateName(this.state.userID, this.state.name, (data) => {
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
        if (response.status !== 201) {
          console.log("error")
        } else {
          this.setState({ image: response.body.postResponse.location });
          AsyncStorage.setItem("profileImg", response.body.postResponse.location)
          this.setState({
            profile: { uri: response.body.postResponse.location }
          })
          users.updateProfileImg(this.state.userID, response.body.postResponse.location, result => {})
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
        {/* <NavigationEvents
          onDidFocus={this.getFriends}
        /> */}
        <View style={drawerStyles.container}>
          <Text style={drawerStyles.logoText}>exire</Text>
          <Image
            style={[shadowStyles.shadowDown, drawerStyles.icon]}
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
              source={{ uri: this.state.profile }}
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
              keyExtractor={(item, index) => "number" + item.number}
              renderItem={({ item, index }) => (
                <TouchableOpacity activeOpacity={.5} style={[shadowStyles.shadowDown, { height: 70, backgroundColor: colorScheme.veryLight, width: "100%", alignItems: "center", borderRadius: 15, flexDirection: "row", paddingHorizontal: 10 }]}>
                  <View style={[{ height: 50, width: 50, borderRadius: 25, overflow: "hidden" }, shadowStyles.shadowDown]}>
                    <ImageBackground source={{ uri: item.profileImg !== null ? item.profileImg : "https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png" }} style={{ width: 50, height: 50 }}>
                    </ImageBackground>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: "Bold", color: colorScheme.darkText, fontSize: 17 }}>{
                      item.name == "" ?
                        "Pending"
                        : item.userID == this.state.userID ? "You" : item.name
                    }</Text>
                    <Text style={{ fontFamily: "SemiBold", color: colorScheme.darkText, fontSize: 16, paddingTop: -3 }}>
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
