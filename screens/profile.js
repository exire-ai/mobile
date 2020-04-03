import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import plans from '../functions/plans';

export default class Profile extends Component {

  logout = () => {
    AsyncStorage.setItem('userID', '')
    this.props.navigation.navigate('GetStarted')
  }

  updateCategories = () => {
    AsyncStorage.getItem('userID').then((value) => {
      plans.getAllCategories((data) => {
        this.props.navigation.navigate('ActivityPreference', {userID: value, categories: data})
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Log Out'
            onPress={this.logout}
         />
        <Button title='Update Categories'
            onPress={this.updateCategories}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
