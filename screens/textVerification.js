import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { signInStyles } from "../global/signInStyles";

export default function TextVerification({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("CategoryPreference");
  };

  return (
    <View style={styles.container}>
      <Text>Enter the verification code</Text>
      <TextInput style={signInStyles.input} keyboardType={"phone-pad"} />
      <TouchableOpacity
        style={signInStyles.sendButton}
        activeOpacity={0.75}
        onPress={pressHandler}
      >
        <View>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  }
});
