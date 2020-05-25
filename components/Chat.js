import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";

export default function Chat({
  name,
  time,
  message,
  navigate,
  imgURL
}) {
  const notification = false
  var chat = (
    <TouchableOpacity activeOpacity={.5}
      style={{ alignItems: "center" }}
      onPress={navigate}
    >
      <View style={[chatsStyles.chatContainer]}>
        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <View style={[chatsStyles.notification, { opacity: notification ? 100 : 0 }]}></View>
        </View>
        <View style={[{ paddingLeft: 6, flexDirection: "row" }, shadowStyles.shadowDown]}>
          <View style={[chatsStyles.profileImage]}>
            <ImageBackground source={{ uri: imgURL }} style={{ width: 48, height: 48 }}>
            </ImageBackground>
          </View>
        </View>
        <View style={{ flex: 1, paddingTop: 8, paddingLeft: 8 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
            <Text style={chatsStyles.name}>{name}</Text>
            <Text style={[chatsStyles.text, { position: "absolute", right: 10 }]}>{time}</Text>
          </View>
          <Text numberOfLines={1} style={[chatsStyles.text, { marginTop: -1 }]}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  return chat;
}
