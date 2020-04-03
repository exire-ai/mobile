import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigationStyles } from '../global/navigationStyles';
import React from 'react';
import Chat from '../screens/chat';
import Profile from '../screens/profile';
// import Drawer from '../components/Drawer';

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => {
      return {
        headerShown: true,
        title: 'exire',
        headerStyle: navigationStyles.header,
        headerTitleStyle: navigationStyles.headerTitle,
        gestureEnabled: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={navigationStyles.icon}>
            <Icon
              name='bars'
              color='#FFF'
              size={24}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={navigationStyles.icon}>
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
