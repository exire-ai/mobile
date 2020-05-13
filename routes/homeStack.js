import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import React from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// import Exire from "../assets/icons/exire.svg"

import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import Discover from "../screens/Discover";
import Plans from "../screens/Plans";
import Chats from "../screens/Chats";
import Exire from "../assets/icons/exire.svg";

const exire = require("../assets/icons/exire.svg");

const screens = {
  Discover: {
    screen: Discover,
    navigationOptions: ({ navigation }) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 42, height: 42, tintColor: tintColor }}
            source={require("../assets/icons/compass.png")}
          />
        ),
      };
    },
  },
  Plans: {
    screen: Plans,
    navigationOptions: ({ navigation }) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          // <Exire style={{ height: 24, width: 24,  }} />
          // <Icon
          //   name="home"
          //   size={36}
          //   color={tintColor}
          //   style={{ paddingRight: 45, marginTop: -5 }}
          // />
          <Image
            style={{ width: 36, height: 36, tintColor: tintColor }}
            source={require("../assets/icons/exire.png")}
          />
        ),
        //   <Icon
        //   name="comment"
        //   size={36}
        //   color={tintColor}
        //   style={{ paddingRight: 45, marginTop: -5 }}
        // />
        // <Image
        //   sytle={{ width: 24, height: 24 }}
        //   size={24}
        //   source={require("../assets/icons/exire.svg")}
        // />
        // <Exire />
      };
    },
  },
  Chats: {
    screen: Chats,
    navigationOptions: ({ navigation }) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 36, height: 36, tintColor: tintColor }}
            source={require("../assets/icons/chat.png")}
          />
        ),
      };
    },
  },
};

const HomeTab = createMaterialTopTabNavigator(screens, {
  initialRouteName: "Plans",
  tabBarPosition: "bottom",
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
  },
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: "#3597e9",
    inactiveTintColor: "#aaa",
    style: [shadowStyles.shadowUp, navigationStyles.footer],
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
    iconStyle: [
      shadowStyles.shadowDown,
      {
        height: 45,
        width: 110,
        alignItems: "center",
        shadowRadius: 0.3,
      },
    ],
  },
});

const HomeStack = createStackNavigator({
  MyTab: {
    screen: HomeTab,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: ["Discover", "Plans", "Chats"][navigation.state.index],
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => console.log(navigation)}
            style={navigationStyles.icon}
          >
            <Icon
              name="user-circle"
              color="#FFF"
              size={32}
              style={navigationStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
      };
    },
  },
});

export default createAppContainer(HomeStack);
