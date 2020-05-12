import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';

export default class Chats extends Component {
  render() {
    return <View style={styles.container}>
      <Text style={{fontSize: 64, color: '#fff', fontFamily: 'nunito-semibold'}}>Chats</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef'
  }
});
