import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import plans from './functions/plans';
import MainStack from './routes/mainStack';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// import * as firebase from 'firebase';
// import { firebaseConfig } from './config';

// firebase.initializeApp(firebaseConfig);
// console.log(firebaseConfig);

const getFonts = () => Font.loadAsync({
    'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
    'karla-bold': require('./assets/fonts/Karla-Bold.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold' : require('./assets/fonts/Nunito-Bold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded) {
    return (
       <MainStack />
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }


}
