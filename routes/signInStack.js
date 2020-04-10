import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { navigationStyles } from '../global/navigationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStarted from '../screens/getStarted';
import PhoneInput from '../screens/phoneInput';
import TextVerification from '../screens/textVerification';
import ActivityPreference from '../screens/activityPreference';
import FoodPreference from '../screens/foodPreference';

const screens = {
  GetStarted: {
    screen: GetStarted,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
  PhoneInput: {
    screen: PhoneInput,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Phone Number',
        headerStyle: navigationStyles.header,
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={navigationStyles.icon}>
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
        headerStyle: navigationStyles.header,
        gestureEnabled: false,
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: 'center',
      }
    }
  },
  ActivityPreference: {
    screen: ActivityPreference,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Activities',
        headerStyle: navigationStyles.header,
        gestureEnabled: false,
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: 'center',
        headerLeft: () => { return null }
      }
    }
  },
  FoodPreference: {
    screen: FoodPreference,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Food',
        headerStyle: navigationStyles.header,
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('ActivityPreference')} style={navigationStyles.icon}>
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
