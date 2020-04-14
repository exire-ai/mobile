import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';
var uuid = require('uuid');
import users from '../functions/users';
import { signInStyles } from '../global/signInStyles';

export default function TextVerification({ navigation }) {
  const data = navigation.getParam('data').data;
  const userExist = navigation.getParam('userExist');

  const [value, changeText] = React.useState('');
  const [errorMsg, changeErrorMsg] = React.useState('#fff')

  var userID = uuid.v4();

  function onChangeText(text) {
    changeText(text);
    if (text == data.code) {
      if (!userExist) {
        users.createUser(userID, '', data.number, (result) => {
          navigation.navigate('ActivityPreference', {userID: userID, categories: navigation.getParam('categories'), userCategories: []});
        })
      } else {
        users.getByNumber(data.number, (result) => {
          AsyncStorage.setItem('userID', result.userID)
          AsyncStorage.setItem('name', result.name)
          navigation.navigate('Chat');
        })
      }
    } else {
      changeErrorMsg(text.length > 5 ? '#8b0000' : '#fff')
    }
  }

  return (
    <View style={styles.container}>
      <View style={signInStyles.textContainer}>
        <Text style={signInStyles.headerText}>What's your code?</Text>
        <Text style={signInStyles.subHeaderText}>You should receive an SMS verification code shortly.</Text>
      </View>
      <TextInput style={signInStyles.input}
        keyboardType={'phone-pad'}
        placeholder='123456'
        textAlign={'center'}
        autoFocus={true}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <View>
        <Text style={{color: errorMsg}}>Invalid Input, Please Try Again</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
