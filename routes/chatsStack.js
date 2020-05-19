import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import Chats from "../screens/Chats";
import Chat from "../screens/chat";
import ProfileIcon from "../components/ProfileIcon";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";

const screens = {
  Chats: {
    screen: Chats,
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
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation, screenProps }) => {
      return {
        headerShown: true,
        headerShown: true,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
      };
    },
  },
};

const ChatsStack = createStackNavigator(screens, {
  initialRouteName: "Chats",
  // defaultNavigationOptions: {
  //   ...TransitionPresets.FadeFromBottomAndroid,
  // },
});

export default createAppContainer(ChatsStack);
