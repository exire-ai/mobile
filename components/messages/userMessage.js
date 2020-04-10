import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { messageStyles } from '../../global/messageStyles';

export function UserMessage({
  message,
  spaceAbove,
  spaceBelow
}) {
  return (
    <View
        style={[
            messageStyles.ownerMessage,
            { marginBottom: spaceBelow, marginTop: spaceAbove },
        ]}
    >
        <View style={[messageStyles.message, { backgroundColor: '#007aff' }]}>
            <Text
            style={[
                messageStyles.messsageText,
                { color: '#fff', alignSelf: 'flex-end' },
            ]}
            >
                {message}
            </Text>
        </View>
    </View>
  );
}