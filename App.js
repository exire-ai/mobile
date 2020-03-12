import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import users from "./functions/users";
import SignInStack from "./routes/signInStack";

export default function App() {
  return <SignInStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24
  }
});
