import { SafeAreaView, withNavigation } from "react-navigation";
import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text, ImageBackground, AsyncStorage, Dimensions, TextInput, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import plans from "../functions/plans";
import users from "../functions/users";

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import { drawerStyles } from "../global/drawerStyles";

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: require('../assets/profile.jpg'),
      name: "Hayden",
      friends: '75',
      points: '4,300',
      plans: '32'
    };
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

  logout = () => {
    AsyncStorage.multiSet([["name", ""], ["userID", ""], ["number",""], ["profileImg",""]], () => {
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
      this.setState({ image: result.uri });
      AsyncStorage.setItem("profileImg", result.uri)
      this.setState({
        profile: { uri: result.uri }
      })
    };
  }

  // make work on android
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  profileChange = async () => {
    AsyncStorage.getItem('profile', data => {
      if (data == null || data == '') {
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
      <View style={{ height: '100%' }}>
        <View style={drawerStyles.container}>
          <Text style={drawerStyles.logoText}>exire</Text>
          <Image
            style={drawerStyles.icon}
            source={require("../assets/icons/exire.png")}
          />
          <TouchableOpacity
            onPress={ this.updateCategories }
            style={[shadowStyles.shadowRight, { position: 'absolute', right: 15 }]}
          >
            <Icon
              name="gear"
              color={colorScheme.inactiveButton}
              size={32}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 170, width: '100%' }}>
          <View
            style={[shadowStyles.shadowDown, { alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }]}
          >
            <ImageBackground
              source={this.state.profile}
              style={drawerStyles.profile}
              imageStyle={{
                borderRadius: 65
              }}
            >
              <TouchableOpacity
                style={{ width: '100%', height: '100%' }}
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
          <View style={drawerStyles.profileInfo}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.friends}</Text>
              <Text style={[drawerStyles.smallText]}>Friends</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.points}</Text>
              <Text style={[drawerStyles.smallText]}>Points</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[drawerStyles.mediumText]}>{this.state.plans}</Text>
              <Text style={[drawerStyles.smallText]}>Plans</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
