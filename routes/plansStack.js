import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
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
        headerShown: false,
        headerTintColor: "white",
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
            style={[navigationStyles.icon]}
          >
            <Icon
              name="chevron-left"
              color="#FFF"
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
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
        headerTintColor: "white",
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
