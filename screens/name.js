import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, AsyncStorage, TouchableOpacity, KeyboardAvoidingView } from "react-native";
var uuid = require("uuid");
import users from "../functions/users";
import chats from "../functions/chats";
import { signInStyles } from "../global/signInStyles";
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const cuteDogs = [
  "https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp",
  "https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
  "https://cdn.sanity.io/images/0vv8moc6/dvm360/81e9bbc1fe445afd4c888497d6e8e4d8abcd9029-450x274.jpg",
  "https://t2.ea.ltmcdn.com/en/images/5/1/4/types_and_breeds_of_husky_dogs_1415_orig.jpg",
  "https://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogelog.jpg"
]

export default function Name({ navigation }) {
  const number = navigation.getParam("number");
  const userID = navigation.getParam("userID");
  const categories = navigation.getParam("categories");

  function next() {
    users.createUser(userID, value, number, (result) => {
      var profileImg = cuteDogs[Math.floor(Math.random() * cuteDogs.length)]
      AsyncStorage.setItem("userID", userID);
      AsyncStorage.setItem("name", value);
      AsyncStorage.setItem("number", number);
      AsyncStorage.setItem("profileImg", profileImg)
      chats.createChat("Emma (Personal Concierge)", value, userID, number, profileImg, [], (docID, chatID) => {
        console.log(docID, chatID)
        navigation.navigate("ActivityPreference", {
          userID: userID,
          categories: categories,
          userCategories: [],
        });
      })
    });
  }

  const [value, changeText] = React.useState("");
  return (
        <View style={{height: "100%", width: "100%", backgroundColor: colorScheme.footer}}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("PhoneInput")} style={[navigationStyles.icon, { width: "100%" }]}>
            <Icon
              name="chevron-left"
              color={colorScheme.lessDarkText}
              size={32}
              style={shadowStyles.shadowDown}
            />
          </TouchableOpacity>
          <View style={{ height: 500, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={signInStyles.textContainer}>
              <Text style={signInStyles.headerText}>What's your name?</Text>
              <Text style={signInStyles.subHeaderText}>
              This is so your friends know it"s you.
            </Text>
            </View>
            <View style={{alignItems: "center"}}>
            <TextInput
              style={signInStyles.input}
              style={signInStyles.input}
              keyboardType={"name-phone-pad"}
              placeholder="Your Name"
              textAlign={"left"}
              autoFocus={true}
              onChangeText={(text) => changeText(text)}
              value={value}
              selectionColor={colorScheme.button}
              placeholderTextColor={colorScheme.veryLight}
            />
            </View>
          </View>
        </SafeAreaView>
        <KeyboardAvoidingView behavior={"padding"} style={{ flexDirection: "row", alignItems: "flex-end", width: "100%", backgroundColor: colorScheme.footer }}>
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
            onPress={next}
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
