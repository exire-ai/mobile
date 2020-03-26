import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import Chat from "../screens/chat";

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: () => {
      return {
        headerShown: true
      };
    }
  }
};

const ChatStack = createStackNavigator(screens);

export default createAppContainer(ChatStack);
