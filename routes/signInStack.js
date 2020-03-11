import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import ReviewDetails from "../screens/reviewDetails";
// import Header from "../shared/header";
import React from "react";
import GetStarted from "../screens/getStarted";
import PhoneInput from "../screens/phoneInput";
import TextVerification from "../screens/textVerification";
import CategoryPreference from "../screens/categoryPreference";

const screens = {
  GetStarted: {
    screen: GetStarted,
    navigationOptions: () => {
      return {
        headerShown: false
      };
    }
  },
  PhoneInput: {
    screen: PhoneInput,
    navigationOptions: {
      headerShown: true
    }
  },
  TextVerification: {
    screen: TextVerification
  },
  CategoryPreference: {
    screen: CategoryPreference
  }
};

const SignInStack = createStackNavigator(screens);

export default createAppContainer(SignInStack);
