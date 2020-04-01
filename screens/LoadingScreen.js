import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import firebase from 'firebase';

export default class LoadingScreen extends Component {
  componentDidMount(){
    this.checkIfLoggedIn()
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) =>
    {
      console.log(user);
      if (user)
      {
        //TODO: Get User from database, check if exists
        if (true) {
          console.log("Category");
          this.props.navigation.navigate('CategoryPreference');
        } else {
          this.props.navigation.navigate('ChatStack');
        }
      }
      else {
        this.props.navigation.navigate('GetStarted');
      }
    }
  );
};

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#007AFF"
  }
});
