import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import ReviewDetails from "../screens/reviewDetails";
// import Header from "../shared/header";
import React from "react";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStarted from "../screens/getStarted";
import PhoneInput from "../screens/phoneInput";
import TextVerification from "../screens/textVerification";
import ActivityPreference from "../screens/activityPreference";
import FoodPreference from "../screens/foodPreference";
// import SignIn from "../screens/signIn"

const screens = {
  GetStarted: {
    screen: GetStarted,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
  // SignIn: {
  //   screen: SignIn,
  //   navigationOptions: () => {
  //     return {
  //       headerShown: true,
  //     };
  //   }
  // },
  PhoneInput: {
    screen: PhoneInput,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Phone Number',
        headerStyle: { backgroundColor: '#007aff' },
        headerTitleStyle: { color: '#FFF',fontFamily: 'nunito-semibold', fontSize: 24, fontWeight: '500'},
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={{paddingLeft: 8}}>
            <Icon
              name='chevron-left'
              color='#FFF'
              size={32}
            />
          </TouchableOpacity>
        ),
      }
    }
  },
  TextVerification: {
    screen: TextVerification,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Verification',
        headerStyle: { backgroundColor: '#007aff' },
        gestureEnabled: false,
        headerTitleStyle: { color: '#FFF', fontSize: 24, fontWeight: '500'},
      }
    }
  },
  ActivityPreference: {
    screen: ActivityPreference,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Activities',
        headerStyle: { backgroundColor: '#007aff' },
        gestureEnabled: false,
        headerTitleStyle: { color: '#FFF', fontSize: 24, fontWeight: '500'},
      }
    }
  },
  FoodPreference: {
    screen: FoodPreference,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Food',
        headerStyle: { backgroundColor: '#007aff' },
        headerTitleStyle: { color: '#FFF', fontSize: 24, fontWeight: '500'},
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('ActivityPreference')} style={{paddingLeft: 8}}>
            <Icon
              name='chevron-left'
              color='#FFF'
              size={32}
            />
          </TouchableOpacity>
          ),
      }
    }
  },

};

const SignInStack = createStackNavigator(screens);

export default createAppContainer(SignInStack);
