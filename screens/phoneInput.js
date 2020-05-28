import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import users from "../functions/users";
import { signInStyles } from "../global/signInStyles";
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import plans from "../functions/plans";
import Modal from "react-native-modal";
import { colorScheme } from "../global/colorScheme";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View style={{height: "100%", width: "100%", backgroundColor: colorScheme.footer}}>
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={.5} onPress={() => navigation.goBack()} style={[navigationStyles.icon, { width: "100%" }]}>
        <Icon
          name="chevron-left"
          color={colorScheme.lessDarkText}
          size={32}
          style={shadowStyles.shadowDown}
        />
      </TouchableOpacity>
      <View style={{ height: 500, width: "100%", alignItems: "center", justifyContent: "center" }}>
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
        <View style={{alignItems: "center"}}>
        <TextInput
          style={signInStyles.input}
          keyboardType={"phone-pad"}
          placeholder="(123)-456-7890"
          textAlign={"left"}
          autoFocus={false}
          autoCompleteType={"tel"}
          onChangeText={(val) => setNumber(val)}
          selectionColor={colorScheme.button}
          placeholderTextColor={colorScheme.veryLight}
        />
        </View>
      </View>
    </SafeAreaView>
    <KeyboardAvoidingView behavior={"padding"} style={{ flexDirection: "row", alignItems: "flex-end", width: "100%", backgroundColor: colorScheme.footer }}>
      <TouchableOpacity activeOpacity={.5}
        style={[shadowStyles.shadowDown, {
          backgroundColor: number.length > 9 ? colorScheme.button : colorScheme.activeButton,
          height: 55,
          width: 55,
          borderRadius: 27.5,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "82%",
          marginBottom: 20
        }]}
        onPress={nextTapped}
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
    height: "100%",
    width: "100%"
  },
});
