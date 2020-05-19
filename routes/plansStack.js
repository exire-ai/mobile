import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Plans from "../screens/Plans";
import Venue from "../screens/venue";
import PlanDetail from "../screens/PlanDetail";
import CreatePlan from "../screens/CreatePlan";
import Styling from "../global/headerStyling"; //If we can get this to work it will highly optimize navigation througout app
import ProfileIcon from "../components/ProfileIcon";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

const screens = {
  Plans: {
    screen: Plans,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Plans",
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => <ProfileIcon navigation={navigation} />,
      };
    },
  },
  PlanDetail: {
    screen: PlanDetail,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Plans",
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => <ProfileIcon navigation={navigation} />,
      };
    },
  },
  CreatePlan: {
    screen: CreatePlan,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Plans",
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => <ProfileIcon navigation={navigation} />,
      };
    },
  },
  Venue: {
    screen: Venue,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
};

const PlansStack = createStackNavigator(screens, {
  initialRouteName: "Plans",
});

export default createAppContainer(PlansStack);
