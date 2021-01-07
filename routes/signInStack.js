import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { navigationStyles } from '../global/navigationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStarted from '../screens/getStarted';
import PhoneInput from '../screens/phoneInput';
import TextVerification from '../screens/textVerification';
import Name from '../screens/name';
import ActivityPreference from '../screens/activityPreference';
import FoodPreference from '../screens/foodPreference';
import { shadowStyles } from '../global/shadowStyles';

const screens = {
    GetStarted: {
        screen: GetStarted,
        navigationOptions: () => {
            return {
                headerShown: false
            };
        }
    },
    PhoneInput: {
        screen: PhoneInput,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: false
            };
        }
    },
    TextVerification: {
        screen: TextVerification,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: false
            };
        }
    },
    Name: {
        screen: Name,
        navigationOptions: ({ navigation }) => {
            return {
                headerShown: false
            };
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
                headerLeft: () => {
                    let tempFunc;
                    if (
                        navigation.dangerouslyGetParent().state.routes[0]
                            .routeName == 'GetStarted'
                    ) {
                        tempFunc = () => navigation.navigate('GetStarted');
                    } else {
                        tempFunc = () => navigation.goBack();
                    }
                    return (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={tempFunc}
                            style={navigationStyles.icon}
                        >
                            <Icon
                                name="chevron-left"
                                color="#FFF"
                                size={32}
                                style={shadowStyles.shadowDown}
                            />
                        </TouchableOpacity>
                    );
                }
            };
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
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()}
                        style={navigationStyles.icon}
                    >
                        <Icon
                            name="chevron-left"
                            color="#FFF"
                            size={32}
                            style={shadowStyles.shadowDown}
                        />
                    </TouchableOpacity>
                )
            };
        }
    }
};

const SignInStack = createStackNavigator(screens);

export default createAppContainer(SignInStack);
