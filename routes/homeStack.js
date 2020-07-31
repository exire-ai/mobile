import React from "react";
import {
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Image} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

// View / Stack / Component Imports
import DiscoverStack from "./discoverStack";
import PlansStack from "./plansStack";
import ChatsStack from "./chatsStack";
import Drawer from "../components/Drawer";
import Logout from "../components/Logout";

const screens = {
  Discover: {
    screen: DiscoverStack,
    navigationOptions: ({ navigation }) => {
      var tabBarVisible = false;
      let routeName = navigation.state.routes[navigation.state.index].routeName;
      if (routeName == "Discover" || routeName == "Plans" || routeName == "Chats") {
        tabBarVisible = true
      }
      return {
        tabBarVisible: tabBarVisible,
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 45, height: 45, tintColor: tintColor }}
            source={require("../assets/icons/compass.png")}
          />
        ),
      };
    },
  },
  Plans: {
    screen: PlansStack,
    navigationOptions: ({ navigation }) => {
      let routeName = navigation.state.routes[navigation.state.index].routeName;
      return {
        title: "",
        tabBarVisible: !(routeName == "PlanDetail" || routeName == "Venue"),
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={{ width: 36, height: 36, tintColor: tintColor }}
            source={require("../assets/icons/exire.png")}
          />
        ),
      };
    },
  },
  Chats: {
    screen: ChatsStack,
    navigationOptions: ({ navigation }) => {
      var tabBarVisible = false;
      let routeName = navigation.state.routes[navigation.state.index].routeName;
      if (routeName == "Discover" || routeName == "Plans" || routeName == "Chats") {
        tabBarVisible = true
      }
      return {
        tabBarVisible: tabBarVisible,
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
  headerShown: false,
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
  },
  swipeEnabled: true,
  timingConfig: 0,
  tabBarOptions: {
    activeTintColor: colorScheme.activeButton,
    inactiveTintColor: colorScheme.inactiveButton,
    style: [shadowStyles.shadowUp, navigationStyles.footer],
    indicatorStyle: {
      height: 0,
    },
    showIcon: true,
    iconStyle: [
      shadowStyles.shadowDown,
      {
        height: 45,
        alignItems: "center",
        shadowRadius: 0.3,
      },
    ],
  },
});

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeTab,
    },
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: colorScheme.componentBackground,
    overlayColor: "rgba(100,100,100,0.6)",
    contentComponent: ({ navigation }) => {
      return (
        <SafeAreaView
          style={[{ height: "100%", backgroundColor: colorScheme.footer }, shadowStyles.right]}
        >
          <Drawer />
          <Logout navigation={navigation} />
        </SafeAreaView>
      );
    },
  }
);

export default createAppContainer(MainDrawerNavigator);
