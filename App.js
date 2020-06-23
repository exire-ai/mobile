import React, { useState } from "react";
import MainStack from "./routes/mainStack";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

import { decode, encode } from "base-64";
const getFonts = () =>
  Font.loadAsync({
    "karla-regular": require("./assets/fonts/Karla-Regular.ttf"),
    "karla-bold": require("./assets/fonts/Karla-Bold.ttf"),
    "Reg": require("./assets/fonts/Nunito-Regular.ttf"),
    "SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
    "Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "Light": require("./assets/fonts/Nunito-Light.ttf"),
    // "Light" : require("./assets/fonts/H-Light.otf"),
    // "Reg" : require("./assets/fonts/H-Reg.otf"),
    // "SemiBold" : require("./assets/fonts/H-SemiBold.otf"),
    // "Bold" : require("./assets/fonts/H-Bold.otf")
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
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
