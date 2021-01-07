import {
    createStackNavigator,
    TransitionPresets
} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SignInStack from './signInStack';
// import ChatStack from "./chatStack";
import LoadingScreen from '../screens/LoadingScreen';
import MainDrawerNavigator from './homeStack';

const screens = {
    LoadingScreen: {
        screen: LoadingScreen,
        navigationOptions: () => {
            return {
                headerShown: false
            };
        }
    },
    SignInStack: {
        screen: SignInStack,
        navigationOptions: () => {
            return {
                gestureEnabled: false,
                headerShown: false
            };
        }
    },
    HomeStack: {
        screen: MainDrawerNavigator,
        navigationOptions: () => {
            return {
                gestureEnabled: false,
                headerShown: false
            };
        }
    }
};

const MainStack = createStackNavigator(screens, {
    initialRouteName: 'LoadingScreen',
    defaultNavigationOptions: {
        ...TransitionPresets.FadeFromBottomAndroid
    }
});

export default createAppContainer(MainStack);
