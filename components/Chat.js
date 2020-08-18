import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Switch } from "react-native";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";
import { colorScheme } from "../global/colorScheme";

export default function Chat({
  name,
  time,
  message,
  imgURL,
  attachment,
  select,
  selected,
  navigate
}) {
  var chat = (
    <TouchableOpacity activeOpacity={.5}
      style={{ alignItems: "center", width: '100%', flexDirection: 'row' }}
      onPress={attachment ? select : navigate }
    >
      { attachment && (
        <View style={{ width: '12%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={[ { marginLeft: 7, marginTop: 7 }, shadowStyles.shadowDown, selected ?
            { borderRadius: 9, height: 18, width: 18, backgroundColor: colorScheme.primary }
            : { borderRadius: 9, height: 18, width: 18, borderWidth: 2, borderColor: colorScheme.lesserDarkText }
          ]}>
          </View>
        </View>
      )}
      <View style={[chatsStyles.chatContainer, attachment && { width: '88%', paddingLeft: 0 }]}>
        <View style={[{ flexDirection: "row" }, shadowStyles.shadowDown]}>
          <View style={[chatsStyles.profileImage]}>
            <ImageBackground source={{ uri: imgURL }} style={{ width: 48, height: 48 }}>
            </ImageBackground>
          </View>
        </View>
        <View style={{ flex: 1, paddingTop: 8, paddingLeft: 8 }}>
          <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
            <Text style={chatsStyles.name}>{name.length >= 26 ? name.slice(0, 25) + "..." : name}</Text>
            <Text style={[chatsStyles.text, { position: "absolute", right: 10 }]}>{time}</Text>
          </View>
          <Text numberOfLines={1} style={[chatsStyles.text, { marginTop: -1 }]}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  return chat;
}
