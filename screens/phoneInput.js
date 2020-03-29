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
        <View style={signInStyles.textContainer}>
          <Text style={signInStyles.headerText}>What's your number?</Text>
          <Text style={signInStyles.subHeaderText}>We just need your number for verification and won't spam you or sell your data.</Text>
        </View>
      <TextInput style={signInStyles.input}
          keyboardType={"phone-pad"}
          placeholder='(123)-456-7890'
          textAlign={'center'}
          autoFocus={true}
      />
      <TouchableOpacity
        style={signInStyles.button}
        activeOpacity={0.75}
        onPress={() => navigation.navigate("TextVerification")}
      >
        <View>
          <Text style={signInStyles.buttonText}>Send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: 'center'
  }
});
