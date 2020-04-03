import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    setTimeout( () => {
      AsyncStorage.getItem('userID').then((value) => {
        console.log(value)
        if (value != null && value != '') {
          this.props.navigation.navigate('ChatStack');
        } else {
          this.props.navigation.navigate('SignInStack');
        }
      })
    }, 300)
  };

  render() {
    return <View style={styles.container}>
      <Text style={{fontSize: 64, color: '#fff', fontFamily: 'nunito-semibold'}}>exire</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF'
  }
});
