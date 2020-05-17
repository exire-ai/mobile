import React from 'react';
import { View, Text} from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme'
import { messagesStyles } from '../global/messagesStyles';

export function Message({
  name,
  message,
  time,
}) {
  if (message.includes('@Emma')) {
    var temp = message.split("@Emma")
  } else {
    var temp = message.split("@emma")
  }

  if (temp.length == 2) {
    message = (
      <Text style={[messagesStyles.text, { marginTop: -1}]}>
        <Text>{temp[0]}</Text>
        <Text style={{fontFamily: 'nunito-bold'}}>@Emma</Text>
        <Text>{temp[1]}</Text>
      </Text>
    )
  } else {
    message = (
      <Text style={[messagesStyles.text, { marginTop: -1}]}>{message}</Text>
    )
  }
  var MessageObj = (
    <View style={[messagesStyles.chatContainer]}>
    <View style={{paddingLeft: 6, flexDirection: 'row'}}>
      <View style={[messagesStyles.profileImage, shadowStyles.shadowDown]}></View>
    </View>
    <View style={{flex: 1, paddingTop: 8, paddingLeft: 8}}>
      <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
        <Text style={messagesStyles.name}>{name}</Text>
        <Text style={[messagesStyles.text, {paddingLeft: 15, color: colorScheme.inactiveButton}]}>{time}</Text>
      </View>
      {message}
    </View>
  </View>
  )
  return MessageObj
}
