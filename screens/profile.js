import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { userProperties } from '../global/userProperties';

// import firebase from 'firebase';

export default class Profile extends Component {

  // logOut = async () => {
  //   try {
  //     await firebase.auth().signOut();
  //   } catch (e) {
  //     console.log(e);
  //   }

    logout = () => {
      AsyncStorage.setItem('userID', '')
      this.props.navigation.navigate('GetStarted')
    }


    // try {
    //   const { type, accessToken } = await Google.logInAsync({
    //     behavior: 'web',
    //     iosClientId: "617027033557-rcftv3fnrsphov5kb35scmohheddmvf9.apps.googleusercontent.com",
    //     scopes: ['profile', 'email'],
    //   });
    //
    //   if (type == 'success') {
    //     userProperties.accessToken = accessToken;
    //     console.log(userProperties);
    //
    //
    //     if (result.type == 'success') {
    //       console.log(result);
    //       return result.accessToken;
    //     } else {
    //       return { cancelled: true };
    //     }
    //
    //   }
    //   } catch (e) {
    //     console.log(e)
    //     return { error: true };
    //   }
      //
      // const result = await Google.logOutAsync({
      //   // androidClientId: "",
      //   accessToken: 'ya29.a0Ae4lvC0sDFXbMMtk5Jk0eZq7UhbFccmt7va2STC1np3KlQmsBsEGhhlFcPTSpkhKJSs7Ev_HnD4X0IGukTo1nYz7F_OMowxgW-rQrx-oDeaBO19uJQ4wmNP387FESHlWRcTLtRKAhmMnMEExMWOG8xNwEOTpzZ_0zvs',
      //   iosClientId: "617027033557-rcftv3fnrsphov5kb35scmohheddmvf9.apps.googleusercontent.com",
      //   scopes: ['profile', 'email'],
      // });

  render() {
    return (
      <View style={styles.container}>
        <Button title="Log Out"
            onPress={this.logout}
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
    backgroundColor: "#fff"
  }
});
