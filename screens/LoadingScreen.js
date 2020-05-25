import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, AsyncStorage } from "react-native";

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
    setTimeout( () => {
      AsyncStorage.getItem("userID").then((value) => {
        if (value != null && value != "") {
          this.props.navigation.navigate("HomeStack");
        } else {
          this.props.navigation.navigate("SignInStack");
        }
      })
    }, 300)
  };

  render() {
    return <View style={styles.container}>
      <Text style={{fontSize: 64, color: "#fff", fontFamily: "nunito-semibold"}}>exire</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3597e9"
  }
});
