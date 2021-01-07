import React from 'react';
import { TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

// Style Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';
import { drawerStyles } from '../global/drawerStyles';

const logout = (navigation) => {
    Alert.alert(
        'Logout',
        "You'll have to log back in to access Exire!",
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Log Out',
                onPress: () => {
                    AsyncStorage.multiSet(
                        [
                            ['name', ''],
                            ['userID', '']
                        ],
                        () => {
                            navigation.navigate(
                                'SignInStack',
                                {},
                                NavigationActions.navigate({
                                    routeName: 'GetStarted'
                                })
                            );
                        }
                    );
                },
                style: 'destructive'
            }
        ],
        {
            cancelable: true
        }
    );
};

export default function Logout({ navigation }) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[drawerStyles.bottomButton, { backgroundColor: '#fff' }]}
            onPress={() => logout(navigation)}
        >
            <Icon name="sign-out" color={'red'} size={20} />
            <Text style={[drawerStyles.bottomButtonText]}>Logout</Text>
        </TouchableOpacity>
    );
}
