import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
import firebase from 'firebase';
import * as UserProperties from '../global/userProperties';

export default class SignIn extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = googleUser => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
          );
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }.bind(this));
}


  signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      // androidClientId: "",
      behavior: 'web',
      iosClientId: "617027033557-rcftv3fnrsphov5kb35scmohheddmvf9.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });

    if (result.type == 'success') {
      this.onSignIn(result);
      console.log(result);
      UserProperties.accessToken = result.accessToken;
      return result.accessToken;
    } else {
      return { cancelled: true };
    }

  } catch (e) {
    console.log(e)
    return { error: true };
  }
}

//   componentDidMount() {
//     this.initAsync();
//   }
//
//
//   initAsync = async () => {
//     await GoogleSignIn.initAsync({
//
//     });
//     this._syncUserWithStateAsync();
//   };
//
//   _syncUserWithStateAsync = async () => {
//   const user = await GoogleSignIn.signInSilentlyAsync();
//   this.setState({ user });
// };

  render(){
    return (
      <View style={styles.container}>
        <Button title="Sign In With Google"
                onPress={() => this.signInWithGoogleAsync()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  }
});
