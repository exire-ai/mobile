import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import SignInStack from "./signInStack";
import ChatStack from "./chatStack";


const screens = {
  SignInStack: {
    screen: SignInStack,
    navigationOptions: () => {
      return {
        headerShown: false
      };
    }
  },
  ChatStack: {
    screen: ChatStack,
    navigationOptions: () => {
      return {
        gestureEnabled: false,
        headerShown: false
      };
    }
  }
};

const MainStack = createStackNavigator(screens);

export default createAppContainer(MainStack);
