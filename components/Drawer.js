import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from './Navigation.js';
import Chat from '../screens/chat';

const getDrawerItem = navigation => (
  <NavBarItem
    iconName='bars'
    onPress={() => {
      if (navigation.state.index === 0) {
        // check if drawer is not open, then only open it
        navigation.navigate('DrawerOpen');
      } else {
        // else close the drawer
        navigation.navigate('DrawerClose');
      }
    }}
  />
);

const getDrawerIcon = (iconName, tintColor) => <Icon name={iconName} size={20} color={tintColor} />;

const homeDrawerIcon = ({ tintColor }) => getDrawerIcon('home', '#000');
const userDrawerIcon = ({ tintColor }) => getDrawerIcon('user', '#000');
const csDrawerIcon = ({ tintColor }) => getDrawerIcon('user-md', '#000');

const homeNavOptions = getDrawerNavigationOptions('Home', '#007aff', 'white', homeDrawerIcon);
const userNavOptions = getDrawerNavigationOptions('Users', '#007aff', 'white', userDrawerIcon);
const csNavOptions = getDrawerNavigationOptions('Customer Service', '#007aff', 'white', csDrawerIcon);

const Drawer = DrawerNavigator({
  HomeScreen: { screen: Chat, navigationOptions: homeNavOptions },
  UserScreen: { screen: Chat, navigationOptions: userNavOptions },
  CustomerServiceScreen: { screen: Chat, navigationOptions: csNavOptions },
}, getDrawerConfig(300, 'left'));

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('RNChat', '#007aff', 'white', getDrawerItem(navigation));

export default Drawer;