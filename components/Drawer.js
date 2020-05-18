import { SafeAreaView } from "react-navigation";
import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text, ImageBackground, AsyncStorage, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    AsyncStorage.getItem("profilePhoto").then((value) => {
      if (value != null && value != "") {
        this.setState({
          profile: { uri: value }
        })
      }
    })
  }

  logout = () => {
    AsyncStorage.multiSet([["name", ""], ["userID", ""]], () => {
      this.props.navigation.navigate("SignInStack");
    });
  };

  render() {
    return (
      <View style={{height: '100%'}}>
        <View style={drawerStyles.container}>
          <Text style={drawerStyles.logoText}>exire</Text>
          <Image
            style={drawerStyles.icon}
            source={require("../assets/icons/exire.png")}
          />
          <TouchableOpacity
            onPress={() => {
              console.log("settings")
            }
          }
            style={[shadowStyles.shadowRight, {position: 'absolute', right: 15}]}
          >
        <Icon
          name="gear"
          color={colorScheme.inactiveButton}
          size={32}
        />
          </TouchableOpacity>
        </View>
        <View style={{height: 170, width: '100%'}}>
        <View
              style={[shadowStyles.shadowDown, {alignItems: 'center', justifyContent: 'center', paddingVertical: 10}]}
            >
              <ImageBackground
                source={this.state.profile}
                style={drawerStyles.profile}
                imageStyle={{
                  borderRadius: 65
                }}
              >
                <TouchableOpacity
                  style={{width: '100%', height: '100%'}}
                  onPress={() => console.log("profile")}
                >
                </TouchableOpacity>
              </ImageBackground>
              <Text style={[drawerStyles.largeText]}>{this.state.name}</Text>
            </View>
            <View style={drawerStyles.profileInfo}>
              <View style={{alignItems: 'center'}}>
                <Text style={[drawerStyles.mediumText]}>{this.state.friends}</Text>
                <Text style={[drawerStyles.smallText]}>Friends</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={[drawerStyles.mediumText]}>{this.state.points}</Text>
                <Text style={[drawerStyles.smallText]}>Points</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={[drawerStyles.mediumText]}>{this.state.plans}</Text>
                <Text style={[drawerStyles.smallText]}>Plans</Text>
              </View>
            </View>
        </View>
      </View>
    );
  }
}
