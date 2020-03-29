import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Animated } from "react-native";

export default function GetStarted({ navigation }) {
  const pressHandler = () => {
    navigation.push("PhoneInput");
  };
  const imageHolder = [require('../assets/getStarted0.jpg'), require('../assets/getStarted1.jpg')]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  setTimeout(() => {
    setCurrentImageIndex(currentImageIndex == imageHolder.length - 1 ?
          0:
          currentImageIndex + 1
        )
  }, 5000)

  return (
    <ImageBackground source={imageHolder[currentImageIndex]} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.headerText}>exire</Text>
        <Text style={styles.subHeaderText}>Going out made simple</Text>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.75}
            onPress={pressHandler}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: "center"
  },
  headerText: {
    marginTop: 50,
    fontSize: 60,
    color: "#007aff",
    fontWeight: "600"
  },
  subHeaderText: {
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
