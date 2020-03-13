import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function GetStarted({ navigation }) {
  const pressHandler = () => {
    navigation.push("PhoneInput");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exireText}>exire</Text>
      <Text>Going out made simple</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center"
  },
  exireText: {
    marginTop: 75,
    fontSize: 42,
    color: "#007aff"
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
    fontSize: 18,
    fontWeight: "500"
  },
  bottom: {
    flex: 1,
    width: "85%",
    justifyContent: "flex-end",
    marginBottom: 45
  }
});
