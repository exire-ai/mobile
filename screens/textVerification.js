import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, AsyncStorage, TouchableOpacity, KeyboardAvoidingView } from "react-native";
var uuid = require("uuid");
import _ from "lodash";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import Icon from "react-native-vector-icons/FontAwesome";
import SafeAreaView from 'react-native-safe-area-view';

export default function TextVerification({ navigation }) {
  const data = navigation.getParam("data").data;
  const userExist = navigation.getParam("userExist");

  const [value, changeText] = React.useState("");
  const [errorMsg, changeErrorMsg] = React.useState("#fff");

  var userID = uuid.v4();

  function onChangeText(text) {
    changeText(text);
    if (text == data.code) {
      if (!userExist) {
        navigation.navigate("Name", {
          userID: userID,
          number: data.number,
          categories: navigation.getParam("categories")
        })
      } else {
        users.getByNumber(data.number, (result) => {
          var profileImg = "https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png";
          AsyncStorage.setItem("userID", result.userID);
          AsyncStorage.setItem("name", result.name);
          AsyncStorage.setItem("number", data.number);
          AsyncStorage.setItem("profileImg", _.get(result, 'profileImg', profileImg));
          navigation.navigate("HomeStack");
        });
      }
    } else {
      changeErrorMsg(text.length > 5 ? "#8b0000" : "#fff");
    }
  }
  return (
        <View style={{height: "100%", width: "100%", backgroundColor: colorScheme.footer}}>
        <SafeAreaView style={[styles.container]}>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.goBack()} style={[navigationStyles.icon, { width: "100%", padding: 25 }]}>
            <Icon
              name="chevron-left"
              color={colorScheme.lessDarkText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
          <View style={{ height: 500, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={signInStyles.textContainer}>
              <Text style={signInStyles.headerText}>What's your code?</Text>
              <Text style={signInStyles.subHeaderText}>
              You should receive an SMS verification code shortly.
            </Text>
            </View>
            <View style={{alignItems: "center"}}>
            <TextInput
              style={signInStyles.input}
              style={signInStyles.input}
              keyboardType={"phone-pad"}
              placeholder="123456"
              textAlign={"left"}
              autoFocus={true}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              selectionColor={colorScheme.button}
              placeholderTextColor={colorScheme.veryLight}
            />
            </View>
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView behavior= {(Platform.OS === 'ios')? "padding" : null} style={{ flexDirection: "row", alignItems: "flex-end", width: "100%", backgroundColor: colorScheme.footer }}>
          <TouchableOpacity activeOpacity={.5}
            style={[shadowStyles.shadowDown, {
              backgroundColor: value.length > 5 ? colorScheme.button : colorScheme.primary,
              height: 55,
              width: 55,
              borderRadius: 27.5,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "82%",
              marginBottom: 20
            }]}
            onPress={console.log("next tapped")}
          >
            <Icon
              name="chevron-right"
              color="#FFF"
              size={33}
              style={[shadowStyles.shadowDown, { paddingLeft: 3, paddingTop: 3 }]}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.footer,
    alignItems: "center",
  },
});
