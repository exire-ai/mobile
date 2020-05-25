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
import ChatInfo from "../screens/ChatInfo";

// Style Imports
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

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
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Chats")}
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
        headerRight: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("ChatInfo", {data: navigation.getParam("data")})}
            style={[{paddingBottom: 4, paddingRight: 16}]}
          >
            <Icon
              name="info-circle"
              color={colorScheme.primaryText}
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
          <TouchableOpacity activeOpacity={.5}
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
  ChatInfo: {
    screen: ChatInfo,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: navigation.getParam("data").name,
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
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
};

const ChatsStack = createStackNavigator(screens, {
  initialRouteName: "Chats",
  defaultNavigationOptions: {
    // tabBarVisible: false,
  },
});

export default createAppContainer(ChatsStack);
