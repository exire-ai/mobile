import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';
import { messagesStyles } from '../global/messagesStyles';

export function Message({ name, message, time, imgURL }) {
    let temp;
    if (message.includes('@Emma')) {
        temp = message.split('@Emma');
    } else {
        temp = message.split('@emma');
    }

    if (temp.length == 2) {
        message = (
            <Text style={[messagesStyles.text, { marginTop: -1 }]}>
                <Text>{temp[0]}</Text>
                <Text style={{ fontFamily: 'Bold' }}>@Emma</Text>
                <Text>{temp[1]}</Text>
            </Text>
        );
    } else {
        message = (
            <Text style={[messagesStyles.text, { marginTop: -1 }]}>
                {message}
            </Text>
        );
    }
    let MessageObj = (
        <View style={[messagesStyles.chatContainer]}>
            <View
                style={[
                    { paddingLeft: 6, flexDirection: 'row' },
                    shadowStyles.shadowDown
                ]}
            >
                <View style={[messagesStyles.profileImage]}>
                    <ImageBackground
                        source={{ uri: imgURL }}
                        style={{ width: 48, height: 48 }}
                    ></ImageBackground>
                </View>
            </View>
            <View style={{ flex: 1, paddingTop: 8, paddingLeft: 8 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center'
                    }}
                >
                    <Text style={messagesStyles.name}>
                        {name.length >= 28 ? name.slice(0, 27) + '...' : name}
                    </Text>
                    <Text
                        style={[
                            messagesStyles.text,
                            {
                                paddingLeft: 15,
                                color: colorScheme.inactiveButton
                            }
                        ]}
                    >
                        {time}
                    </Text>
                </View>
                {message}
            </View>
        </View>
    );
    return MessageObj;
}
