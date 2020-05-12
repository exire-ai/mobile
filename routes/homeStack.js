import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { View, TouchableOpacity, ImageBackground, AsyncStorage } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
// import Exire from "../assets/icons/exire.svg"

import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import Discover from '../screens/Discover';
import Plans from '../screens/Plans';
import Chats from '../screens/Chats';

const screens = {
  Discover: {
    screen: Discover,
    navigationOptions: ({navigation}) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="compass" size={45} color={tintColor} style={{paddingLeft: 45}} />
        ),
      }
    }
  },
  Plans: {
    screen: Plans,
    navigationOptions: ({ navigation }) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={45} color={tintColor} />
          // <Exire />
        ),
      }
    }
  },
  Chats: {
    screen: Chats,
    navigationOptions: ({ navigation }) => {
      return {
        title: "",
        tabBarIcon: ({ tintColor }) => (
            <Icon name="comment" size={45} color={tintColor} style={{paddingRight: 45, marginTop: -5}}/>
        ),
      }
    }
  }
}

const HomeTab = createMaterialTopTabNavigator(screens, {
  initialRouteName: 'Plans',
  tabBarPosition: 'bottom',
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid
  },
  tabBarOptions: {
    activeTintColor : '#3597e9',
    inactiveTintColor: '#6dbabe',
    style: [shadowStyles.shadowUp, navigationStyles.footer],
    indicatorStyle: {
      height: 0
    },
    showIcon: true,
    iconStyle: [shadowStyles.shadowDown, {
      height: 45,
      width: 110,
      alignItems: 'center',
      shadowRadius: .3
    }]
  }
});

const HomeStack = createStackNavigator({
  MyTab: {
    screen: HomeTab,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: ['Discover', 'Plans', 'Chats'][navigation.state.index],
        headerStyle: [shadowStyles.shadowDown, navigationStyles.header],
        headerTitleStyle: navigationStyles.headerTitle,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => console.log(navigation)} style={navigationStyles.icon}>
            <Icon
              name='user-circle'
              color='#FFF'
              size={32}
              style={navigationStyles.shadowDown}
            />
          </TouchableOpacity>
        )
      };
    },
  }
})

export default createAppContainer(HomeStack);
