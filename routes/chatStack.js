import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigationStyles } from '../global/navigationStyles';
import React from 'react';
import Chat from '../screens/chat';
import Profile from '../screens/profile';
import Venue from '../screens/venue';
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
        headerTitleAlign: 'center',
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
  },
  Venue: {
    screen: Venue,
    navigationOptions: ({navigation}) => {
      return {
        title: ' ',
        headerTransparent: true,
        gestureEnabled: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={navigationStyles.icon}>
            <Icon
              name='times'
              color='#FFF'
              size={32}
              style={{
                textShadowColor: '#000',
                shadowOpacity: 1,
                shadowRadius: 5,
                textShadowOffset:{width: 5,height: 2}
              }}
            />
          </TouchableOpacity>
        ),
      }
    }
  }
  // Drawer: { screen: Drawer }
};

const ChatStack = createStackNavigator(screens);
export default ChatStack;
