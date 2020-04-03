import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";
import SignInStack from "./signInStack";
import ChatStack from "./chatStack";
import LoadingScreen from "../screens/LoadingScreen";


const screens = {
  // Causing Errors so Removing Temporarily
  // LoadingScreen: {
  //   screen: LoadingScreen,
  //   navigationOptions: () => {
  //     return {
  //       headerShown: false
  //     };
  //   }
  // },
  SignInStack: {
    screen: SignInStack,
    navigationOptions: () => {
      return {
        gestureEnabled: false,
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
