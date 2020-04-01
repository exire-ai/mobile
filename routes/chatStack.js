import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import Chat from "../screens/chat";
import Profile from "../screens/profile";
// import Drawer from "../components/Drawer";

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => {
      return {
        headerShown: true,
        title: 'exire',
        headerStyle: { backgroundColor: '#007aff' },
        headerTitleStyle: { color: '#FFF', fontFamily: 'nunito-semibold', fontSize: 28, fontWeight: '500'},
        gestureEnabled: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={{paddingLeft: 16, paddingBottom: 4}}>
            <Icon
              name='bars'
              color='#FFF'
              size={24}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{paddingRight: 16, paddingBottom: 4}}>
            <Icon
              name='user'
              color='#FFF'
              size={24}
            />
          </TouchableOpacity>
        ),
      };
    }
  },
  Profile: {
    screen: Profile
  }
  // Drawer: { screen: Drawer }
};

const ChatStack = createStackNavigator(screens);
export default ChatStack;
