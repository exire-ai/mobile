import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import plans from "../functions/plans";

export default function PhoneInput({ navigation }) {
  const [number, setNumber] = React.useState("");
  const [errorMsg, changeErrorMsg] = React.useState("#fff");

  const nextTapped = () => {
    let text = number;
    console.log(text);
    if (text.length == 10) {
      users.phoneAuth(text, (data) => {
        if (data) {
          users.doesNumberExist(text, (userExist) => {
            var newData = {
              data: {
                code: data.code,
                number: text,
              },
            };
            if (!userExist) {
              plans.getAllCategories((categories) => {
                navigation.navigate("TextVerification", {
                  data: newData,
                  userExist: userExist,
                  categories: categories,
                });
              });
            } else {
              navigation.navigate("TextVerification", {
                data: newData,
                userExist: userExist,
              });
            }
          });
        } else {
          changeErrorMsg("#8b0000");
        }
      });
    } else {
      changeErrorMsg(text.length > 10 ? "#8b0000" : "#fff");
    }
  };

  return (
    <View style={styles.container}>
      <View style={signInStyles.textContainer}>
        <Text style={signInStyles.headerText}>What's your number?</Text>
        <Text style={signInStyles.subHeaderText}>
          We just need your number for verification and won't spam you or sell
          your data.
        </Text>
      </View>
      <TextInput
        style={signInStyles.input}
        keyboardType={"phone-pad"}
        placeholder="(123)-456-7890"
        textAlign={"center"}
        autoFocus={true}
        autoCompleteType={"tel"}
        onChangeText={(val) => setNumber(val)}
      />
      <TouchableOpacity style={signInStyles.button} onPress={nextTapped}>
        <Text style={signInStyles.buttonText}> Next </Text>
      </TouchableOpacity>
      <View>
        <Text style={{ color: errorMsg }}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
