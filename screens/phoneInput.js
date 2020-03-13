import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
// import TextVerification from "./textVerification";
import { signInStyles } from "../global/signInStyles";

export default function PhoneInput({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>What's your phone number?</Text>
      <TextInput style={signInStyles.input} keyboardType={"phone-pad"} />
      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.75}
        onPress={() => navigation.navigate("TextVerification")}
      >
        <View>
          <Text style={styles.buttonText}>Send</Text>
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
  sendButton: {
    backgroundColor: "#007aff",
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  }
});
