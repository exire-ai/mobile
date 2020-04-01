import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import plans from "./functions/plans";
import MainStack from "./routes/mainStack";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const getFonts = () => Font.loadAsync({
    'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
    'karla-bold': require('./assets/fonts/Karla-Bold.ttf'),
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),  
    'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf')
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24
  }
});
