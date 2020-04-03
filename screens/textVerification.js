import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import users from '../functions/users';
var uuid = require("uuid");
import { signInStyles } from "../global/signInStyles";

export default function TextVerification({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("CategoryPreference");
  };
  const data = navigation.getParam('data').data;
  const userExist = navigation.getParam('userExist');

  const [value, changeText] = React.useState('');
  const [errorMsg, changeErrorMsg] = React.useState('#fff')

  var userID = uuid.v4();

  function onChangeText(text) {
    changeText(text);
    if (text == data.code) {
      if (!userExist) {
        users.createUser(userID, '', data.number, (result) => {
          navigation.navigate("ActivityPreference", {userID: userID, categories: navigation.getParam('categories')});
        })
      } else {
        users.getByNumber(data.number, (result) => {
          AsyncStorage.setItem("userID", result.userID)
          navigation.navigate("Chat");
        })
      }
    } else if (text.length > 6) {
      changeErrorMsg('#8b0000')
    } else if (text.length < 6) {
      changeErrorMsg('#fff')
    }
  }

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
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <View>
        <Text style={{color: errorMsg}}>Invalid Input, Please Try Again</Text>
      </View>
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
