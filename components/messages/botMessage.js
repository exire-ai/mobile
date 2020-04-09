import React from "react";
import {
  Text,
  View,
} from "react-native";
import { messageStyles } from '../../global/messageStyles';

export function BotMessage({
  message,
  spaceAbove,
  spaceBelow
}) {
  return (
    <View
      style={{
        paddingLeft: 7.5,
        marginBottom: spaceBelow,
        marginTop: spaceAbove,
      }}
    >
      <View style={messageStyles.message}>
        <Text style={[messageStyles.messsageText, { alignSelf: "flex-start" }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}
