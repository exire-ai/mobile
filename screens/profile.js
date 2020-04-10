import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import plans from '../functions/plans';
import users from '../functions/users'

export default class Profile extends Component {

  logout = () => {
    AsyncStorage.setItem('userID', '')
    this.props.navigation.navigate('GetStarted')
  }

  updateCategories = () => {
    AsyncStorage.getItem('userID').then((value) => {
      plans.getAllCategories(categories => {
        users.getCategories(value, userCategories => {
          this.props.navigation.navigate('ActivityPreference', {userID: value, categories: categories, userCategories: userCategories})
        })
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
