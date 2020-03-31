import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import Chat from "../screens/chat";
// import Drawer from "../components/Drawer";

const screens = {
  Chat: {
    screen: Chat,
    navigationOptions: ({navigation}) => {
      return {
        headerShown: true,
        title: 'exire',
        headerStyle: { backgroundColor: '#007aff' },
        headerTitleStyle: { color: '#FFF', fontSize: 28, fontWeight: '500'},
        gestureEnabled: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} style={{paddingLeft: 16, paddingBottom: 4}}>
            <Icon
              name='bars'
              color='#FFF'
              size={28}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{paddingRight: 16, paddingBottom: 4}}>
            <Icon
              name='user'
              color='#FFF'
              size={28}
            />
          </TouchableOpacity>
        ),
      };
    }
  },
  // Drawer: { screen: Drawer }
};

const ChatStack = createStackNavigator(screens);
export default ChatStack;