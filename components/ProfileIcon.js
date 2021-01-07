import { Component } from 'react';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Style Imports
import { navigationStyles } from '../global/navigationStyles';
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

export default class ProfileIcon extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    this.props.navigation.toggleDrawer();
                }}
                style={navigationStyles.icon}
            >
                <Icon
                    name="user-circle"
                    color={colorScheme.primaryText}
                    size={32}
                    style={shadowStyles.shadowDown}
                />
            </TouchableOpacity>
        );
    }
}
