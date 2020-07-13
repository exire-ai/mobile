import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Discover from "../screens/Discover";
import Venue from "../screens/venue";
import DateTime from "../screens/DateTime";
import BookingInvite from "../screens/BookingInvite";
import ReviewPurchase from "../screens/ReviewPurchase";
import SelectPlan from "../screens/SelectPlan";
import CreatePlan from "../screens/CreatePlan";

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
        gestureEnabled: false,
      };
    },
  },
  DateTime: {
    screen: DateTime,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerTintColor: "white",
      };
    },
  },
  BookingInvite: {
    screen: BookingInvite,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerTitle: "Invite",
        headerTintColor: "white",
      };
    },
  },
  ReviewPurchase: {
    screen: ReviewPurchase,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerTitle: "Review Purchase",
        headerTintColor: "white",
      };
    },
  },
  SelectPlan: {
    screen: SelectPlan,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerTitle: "Select Plan",
        headerTintColor: "white",
      };
    },
  },
  CreatePlan: {
    screen: CreatePlan,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerTitle: "Create Plan",
        headerTintColor: "white",
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
