import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import plans from "../functions/plans";
import Modal from "react-native-modal";

export default function PhoneInput({ navigation }) {
  const [number, setNumber] = React.useState("");
  const [errorMsg, changeErrorMsg] = React.useState("#fff");
  const [loadingVisible, setLoadingVisible] = React.useState(false);

  const nextTapped = () => {
    Keyboard.dismiss();
    let text = number;
    console.log(text);
    if (text.length == 10) {
      Keyboard.dismiss();
      setLoadingVisible(true);
      users.phoneAuth(text, (data) => {
        setLoadingVisible(false);
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
      <Modal
        isVisible={loadingVisible}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            width: 200,
            height: 45,
            backgroundColor: "white",
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={signInStyles.subHeaderText}>Loading</Text>
          <ActivityIndicator size="small" color="black" />
        </View>
      </Modal>
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
        autoFocus={false}
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
