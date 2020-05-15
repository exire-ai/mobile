import { createStackNavigator, TransitionPresets } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator} from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import React from "react";
import { TouchableOpacity, Image, useColorScheme } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

// View / Stack / Component Imports
import DiscoverStack from "./discoverStack";
import PlansStack from "./plansStack";
import ChatsStack from "./chatsStack";
import Drawer from "../components/Drawer";

const screens = {
  Discover: {
    screen: DiscoverStack,
    navigationOptions: ({ navigation }) => {
      return {
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
      return {
        title: "",
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
  headerShown: false,
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
  },
  swipeEnabled: true,
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

const HomeStack = createStackNavigator({
  HomeTab: {
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
            onPress={() => {
              console.log("open")
              navigation.toggleDrawer()
            }
          }
            style={navigationStyles.icon}
          >
            <Icon
              name="user-circle"
              color={colorScheme.primaryText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
        ),
      };
    },
  },
});

const MainDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  }
},
{
  hideStatusBar: true,
  drawerBackgroundColor: colorScheme.componentBackground,
  overlayColor: 'rgba(100,100,100,0.6)',
  contentComponent: Drawer
});

export default createAppContainer(MainDrawerNavigator);