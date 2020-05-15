import React, { Component } from 'react';
import { View, Text } from 'react-native';

// Styles Imports
import { discoverStyles } from '../global/discoverStyles';

export default class Discover extends Component {
  render() {
    return <View style={discoverStyles.container}>
      <Text style={{fontSize: 64, color: '#fff', fontFamily: 'nunito-semibold'}}>Discover</Text>
    </View>;
  }
}
