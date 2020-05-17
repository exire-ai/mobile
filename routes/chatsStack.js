import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Header, View } from 'react-native';
import Chats from '../screens/Chats';
import Chat from '../screens/Chat';

const screens = {
  Chats: {
    screen: Chats,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation, screenProps}) => {
      return {
        headerShown: true
      }
    }
  }
};

const ChatsStack = createStackNavigator(screens, {
  initialRouteName: 'Chats',
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  }
});

export default createAppContainer(ChatsStack);
