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
      <View style={signInStyles.textContainer}>
        <Text style={signInStyles.headerText}>What's your code?</Text>
        <Text style={signInStyles.subHeaderText}>You should receive an SMS verification code shortly.</Text>
      </View>
      <TextInput style={signInStyles.input}
        keyboardType={"phone-pad"}
        placeholder='123456'
        textAlign={'center'}
        autoFocus={true}
      />
      <TouchableOpacity
        style={signInStyles.button}
        activeOpacity={0.75}
        onPress={pressHandler}
      >
        <View>
          <Text style={signInStyles.buttonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  }
});
