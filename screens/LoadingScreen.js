import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { analytics } from '../functions/mixpanel';
import users from '../functions/users';

export default class LoadingScreen extends Component {
    componentDidMount() {
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        TextInput.defaultProps = TextInput.defaultProps || {};
        TextInput.defaultProps.allowFontScaling = false;
        console.disableYellowBox = true;
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        AsyncStorage.getItem('userID').then((value) => {
            if (value != null && value != '') {
                users.doesExist(value, (result) => {
                    if (result) {
                        analytics.track('Logged In', { data: result });
                        this.props.navigation.navigate('HomeStack');
                    } else {
                        analytics.track('Get Started', {});
                        this.props.navigation.navigate('SignInStack');
                    }
                });
            } else {
                this.props.navigation.navigate('SignInStack');
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 64,
                        color: '#fff',
                        fontFamily: 'SemiBold'
                    }}
                >
                    exire
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3597e9'
    }
});
