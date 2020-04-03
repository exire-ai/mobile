import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Animated, AsyncStorage } from "react-native";

export default class GetStarted extends React.Component {
  
  constructor(props) {
    super(props)
    AsyncStorage.getItem('userID').then((value) => {
      if (value != null && value != '') {
        this.props.navigation.navigate('Chat')
      }
    })
    this.state = {
      imageHolder: [require('../assets/getStarted0.jpg'), require('../assets/getStarted1.jpg')],
      currentIndex: 0
    }
    setInterval(() => {
      this.setState({currentIndex: this.state.currentIndex == this.state.imageHolder.length - 1 ? 0 : this.state.currentIndex + 1 })
    }, 5000)
  }

  render() {
    return (
      <ImageBackground source={this.state.imageHolder[this.state.currentIndex]} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.headerText}>exire</Text>
        <Text style={styles.subHeaderText}>Going out made simple</Text>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.75}
            onPress={() => { this.props.navigation.navigate('PhoneInput')}}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: "center"
  },
  headerText: {
    fontFamily: 'nunito-semibold',
    marginTop: 50,
    fontSize: 60,
    color: "#007aff",
    fontWeight: "600"
  },
  subHeaderText: {
    fontFamily: 'karla-regular',
    fontSize: 24,
    color: "#fff",
    fontWeight: "500"
  },
  getStartedButton: {
    backgroundColor: "#007aff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    fontFamily: 'karla-bold',
    color: "white",
    fontSize: 24,
    fontWeight: "500"
  },
  bottom: {
    flex: 1,
    width: "85%",
    justifyContent: "flex-end",
    marginBottom: 46
  }
});
