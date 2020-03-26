import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import plans from "./functions/plans";
import SignInStack from "./routes/signInStack";
import ChatStack from "./routes/chatStack";
import MainStack from "./routes/mainStack";

export default function App() {
  // plans.getAllCategories(function(data) {
  //   // console.log("Hello")
  //   // console.log(data[0])
  // })
  return <MainStack />;
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
