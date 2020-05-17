import React, { Component } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Components Imports
import Chat from "../components/Chat";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";

export default function Search({}) {
  return (
    <View
      style={[{ width: "95%" }, chatsStyles.search, shadowStyles.shadowDown]}
    >
      <Icon
        name="search"
        color="#888"
        size={16}
        style={[shadowStyles.shadowDown, chatsStyles.icon]}
      />
      <TextInput
        style={chatsStyles.textInput}
        placeholder={"Search..."}
      ></TextInput>
    </View>
  );
}
