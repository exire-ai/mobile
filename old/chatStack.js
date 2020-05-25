import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity, Text, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { navigationStyles } from "../global/navigationStyles";
import React from "react";
import Chat from "../screens/chat";
import Profile from "../screens/profile";
import Venue from "../screens/venue";
import users from "../functions/users";
// import Drawer from "../components/Drawer";

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: "exire",
        headerStyle: navigationStyles.header,
        headerTitleStyle: [navigationStyles.headerTitle, { fontSize: 32 }],
        headerTitleAlign: "center",
        gestureEnabled: false,
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("DrawerOpen")}
            style={navigationStyles.icon}
          >
            <Icon
              name="bars"
              color="#FFF"
              size={24}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
              }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => {
              AsyncStorage.getItem("userID").then((value) => {
                users.get(value, (data) => {
                  navigation.navigate("Profile", data);
                });
              });
            }}
            style={navigationStyles.icon}
          >
            <Icon
              name="user"
              color="#FFF"
              size={24}
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
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        title: " ",
        headerTransparent: true,
        gestureEnabled: true,
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Chat")}
            style={navigationStyles.icon}
          >
            <Icon
              name="times"
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
        headerRight: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => {
              AsyncStorage.setItem("userID", "");
              AsyncStorage.setItem("name", "");
              navigation.navigate("GetStarted");
            }}
            style={navigationStyles.icon}
          >
            <Text style={[navigationStyles.headerTitle, { fontSize: 20 }]}>
              Logout
            </Text>
          </TouchableOpacity>
        ),
      };
    },
  },
  Venue: {
    screen: Venue,
    navigationOptions: ({ navigation }) => {
      return {
        title: " ",
        headerTransparent: true,
        gestureEnabled: true,
        headerLeft: () => (
          <TouchableOpacity activeOpacity={.5}
            onPress={() => navigation.navigate("Chat")}
            style={navigationStyles.icon}
          >
            <Icon
              name="times"
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
  // Drawer: { screen: Drawer }
};

const ChatStack = createStackNavigator(screens, {
  mode: "modal",
});
export default ChatStack;
