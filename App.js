import React, { useState } from 'react';
import MainStack from './routes/mainStack';
import { BackdropProvider } from 'react-native-propel-kit';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import User from './providers/UserContext';

firebase.initializeApp(firebaseConfig);

import { decode, encode } from 'base-64';
import { SafeAreaProvider } from 'react-native-safe-area-view';
const getFonts = () =>
    Font.loadAsync({
        'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
        'karla-bold': require('./assets/fonts/Karla-Bold.ttf'),
        Reg: require('./assets/fonts/Nunito-Regular.ttf'),
        SemiBold: require('./assets/fonts/Nunito-SemiBold.ttf'),
        Bold: require('./assets/fonts/Nunito-Bold.ttf'),
        Light: require('./assets/fonts/Nunito-Light.ttf')
    });

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    if (!global.btoa) {
        global.btoa = encode;
    }

    if (!global.atob) {
        global.atob = decode;
    }
    if (fontsLoaded) {
        return <MainStack />;
    } else {
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <BackdropProvider>
                    <User>
                        <SafeAreaProvider>
                            <AppLoading
                                startAsync={getFonts}
                                onFinish={() => setFontsLoaded(true)}
                            />
                        </SafeAreaProvider>
                    </User>
                </BackdropProvider>
            </TouchableWithoutFeedback>
        );
    }
}
