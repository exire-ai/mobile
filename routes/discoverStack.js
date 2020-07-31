import React from "react";
import {
  createStackNavigator,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Discover from "../screens/Discover";
import Venue from "../screens/venue";
import DateTime from "../screens/DateTime";
import BookingInvite from "../screens/BookingInvite";
import ReviewPurchase from "../screens/ReviewPurchase";
import SelectPlan from "../screens/SelectPlan";

import ProfileIcon from "../components/ProfileIcon";

import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

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
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Discover")}
            style={[navigationStyles.icon]}
          >
            <Icon
              name="chevron-left"
              color={colorScheme.primaryText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
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
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Discover")}
            style={[navigationStyles.icon]}
          >
            <Icon
              name="chevron-left"
              color={colorScheme.primaryText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
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
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Discover")}
            style={[navigationStyles.icon]}
          >
            <Icon
              name="chevron-left"
              color={colorScheme.primaryText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
      };
    },
  }
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
