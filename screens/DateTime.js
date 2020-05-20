import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  Linking,
  Button,
  Image,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { signInStyles } from "../global/signInStyles";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { shadow } from "react-native-paper";
// import { Button } from "react-native-paper";
import { navigationStyles } from "../global/navigationStyles";

export default class DateTime extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "green" }]}></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
