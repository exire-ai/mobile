import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

export default class CategorySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category
        };
    }

    render() {
        const item = this.state.category;
        return (
            <View
                style={[
                    {
                        borderRadius: 5,
                        backgroundColor: item.selected
                            ? colorScheme.primary
                            : colorScheme.componentBackground,
                        paddingHorizontal: 15,
                        paddingVertical: 9,
                        alignItems: 'center',
                        flexDirection: 'row'
                    },
                    shadowStyles.shadowDown
                ]}
            >
                <Text
                    style={{
                        marginTop: -1,
                        fontFamily: 'Bold',
                        color: item.selected
                            ? colorScheme.primaryText
                            : colorScheme.darkText,
                        fontSize: 17
                    }}
                >
                    {item.name[0]}{' '}
                </Text>
                <Text style={{ marginTop: -1, fontSize: 19 }}>
                    {item.name[1]}
                </Text>
            </View>
        );
    }
}
