import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import Chats from "../screens/Chats";
import Chat from "../screens/chat";
import Venue from "../screens/venue";
import CreateChat from "../screens/CreateChat";
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
        title: navigation.getParam("name"),
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chats')}
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
  Venue: {
    screen: Venue,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: false,
        gestureEnabled: false
      };
    },
  },
  CreateChat: {
    screen: CreateChat,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: "Create Chat",
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[navigationStyles.icon]}
          >
            <Icon
              name="chevron-left"
              color="#FFF"
              size={32}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
              }}
            />
          </TouchableOpacity>
        ),
      };
    },
  },
};

const ChatsStack = createStackNavigator(screens, {
  initialRouteName: "Chats",
  defaultNavigationOptions: {
    // tabBarVisible: false,
  },
});

export default createAppContainer(ChatsStack);
