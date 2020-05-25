import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export function FormMessage({
  form,
  spaceBelow,
  spaceAbove
}) {
  var messageJSX = ( 
    <View style={[styles.container, { marginBottom: spaceBelow, marginTop: spaceAbove, }]}>
        <View style={{backgroundColor: "#dddddd", width: "100%", borderRadius: 16}}>
          <View style={{flexDirection: "row", borderBottomWidth: 1, borderColor: "#000"}}>
            <Icon
              name="book"
              color="#222"
              size={32}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, { flex: .85 }]}
              value={"What are you planning?"}
            />
          </View>
          <View style={{flexDirection: "row", borderBottomWidth: 1, borderColor: "#000"}}>
            <Icon
              name="calendar"
              color="#222"
              size={32}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, {flex: .35, borderRightWidth: 1, borderColor: "#000"}]}
              value={"Date and Time"}
            />
            <Icon
              name="money"
              color="#222"
              size={32}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, {flex: .35}]}
              value={"Price Range"}
            />
          </View>
          <View style={{flexDirection: "row", borderBottomWidth: 1, borderColor: "#000"}}>
            <Icon
              name="user"
              color="#222"
              size={32}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, {flex: .85}]}
              value={"People"}
            />
          </View>
          <View style={{flexDirection: "row"}}>
            <Icon
              name="map"
              color="#222"
              size={32}
              style={styles.icon}
            />
            <TextInput
              style={[styles.input, {flex: .85}]}
              value={"Region"}
            />
          </View>
        </View>
      </View>
  )
  return messageJSX;
}

const styles = StyleSheet.create({
  input : {
    height: 50,
    width: "100%"
  },
  icon: {
    flex: .15, 
    width: "100%", 
    textAlign: "center", 
    marginTop: 9
  },
  container: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    width: "95%", 
    paddingLeft: 7.5, 
    borderRadius: 16
  }
})
