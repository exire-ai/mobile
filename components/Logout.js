import React from "react";
import { TouchableOpacity, Text, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from 'react-navigation'

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import { drawerStyles } from "../global/drawerStyles";

const logout = (navigation) => {
  AsyncStorage.multiSet([["name", ""], ["userID", ""]], () => {
    navigation.navigate("SignInStack", {}, NavigationActions.navigate({routeName: "GetStarted"}));
  });
};

export default function Logout({ navigation }) {
  return (
    <TouchableOpacity
      style={[drawerStyles.bottomButton, shadowStyles.shadowUp]}
      onPress={() => logout(navigation)}
    >
      <Icon
        name="sign-out"
        color={colorScheme.primaryText}
        size={24}
      />
      <Text style={drawerStyles.bottomButtonText}>Logout</Text>
    </TouchableOpacity>
  );
}
