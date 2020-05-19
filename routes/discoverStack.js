import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Discover from "../screens/Discover";
import Venue from "../screens/venue";
import ProfileIcon from "../components/ProfileIcon";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";

const screens = {
  Discover: {
    screen: Discover,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => <ProfileIcon navigation={navigation} />,
      };
    },
  },
  Venue: {
    screen: Venue,
    navigationOptions: () => {
      return {
        tabBarVisible: false,
        headerShown: false,
      };
    },
  },
};

const DiscoverStack = createStackNavigator(screens, {
  initialRouteName: "Discover",
  // navigationOptions: ({ navigation }) => {
  //   let tabBarVisible = true;
  //   let routeName = navigation.state.routes[navigation.state.index].routeName;
  //   if (routeName == "ProductDetails") {
  //     tabBarVisible = false;
  //   }
  //   return {
  //     tabBarVisible,
  //   };
  // },
});

export default createAppContainer(DiscoverStack);
