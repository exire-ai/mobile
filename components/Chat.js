import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";

export default function Chat({
  data
}) {
  var chat = (
    <TouchableOpacity style={{alignItems: 'center'}}>
      <View style={[chatsStyles.chatContainer]}>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <View style={chatsStyles.notification}></View>
        </View>
        <View style={{paddingLeft: 6, flexDirection: 'row', alignSelf: 'center'}}>
          <View style={[chatsStyles.profileImage, shadowStyles.shadowDown]}></View>
        </View>
        <View style={{flex: 1, paddingTop: 8, paddingLeft: 8}}>
          <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Text style={chatsStyles.name}>{data.name}</Text>
            <Text style={[chatsStyles.text, {paddingLeft: 27}]}>{data.time}</Text>
          </View>
          <Text style={[chatsStyles.text, { marginTop: -1}]}>{data.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  return chat;
}
