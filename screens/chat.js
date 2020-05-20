import React, { setState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage } from "react-native";

import { Message } from "../components/message";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import dialogflow from "../functions/dialogflow";

// FIRESTORE
// import firestore from '@react-native-firebase/firestore';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Chat extends React.Component {
  db = firebase.firestore();
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((value) => {
      this.state.userID = value;
    })
    this.getChat()
  }

  state = {
    messages: [],
    text: '',
    inverse: 1,
    chatID : 'Dc0rmQsGtRZevyQeT1kG'
  };

  getChat() {
    this.db.collection('chats')
      .doc(this.state.chatID)
      .get()
      .then(doc => {
        var data = doc.data()
        this.setState({
          messages: data.messages,
          users: data.userData,
          owner: this.state.userID == data.ownerID ? true : false,
          name: data.name
        })
      })
  }

  addMessage(message) {
    this.db.collection('chats')
      .doc(this.state.chatID)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
  }

  sendMessage = () => {
    var messages = this.state.messages
    var message = {
      userID: this.state.userID,
      message: this.state.text,
      time: Math.round(new Date().getTime()),
      special: {}
    }
    if (this.state.inverse == 1) {
      messages.push(message)
    } else {
      messages.unshift(message)
    }
    this.setState({
      messages: messages
    })
    if (this.state.text.includes('@Emma') || this.state.text.includes('@emma')) {
      var temp = this.state.text.replace("@Emma", '')
      temp = temp.replace("@emma", '')
      this.emma(temp)
    }
    this.clearText()
    this.checkSize()
    this.addMessage(message)
  }

  clearText = () => {
    this.setState({
      text: "",
    });
  };

  checkSize = () => {
    if (this.state.inverse == 1 && this.state.messages.length > 5) {
      this.setState({
        inverse: -1,
        messages: this.state.messages.reverse()
      })
    }
  }

  emma = (message) => {
    dialogflow.sendMessage(this.state.userID, message, (data) => {
      var parsedData;
      try {
        parsedData = JSON.parse(data.fulfillmentText);
      } catch (e) {
        parsedData = { text: data.fulfillmentText };
      }
      if (parsedData.text == "" && this.state.recallCounter < 3) {
        this.state.recallCounter += 1;
        this.emma(message)
        return;
      } else if (this.state.recallCounter >= 3 && parsedData.text == "") {
        parsedData.text =
          "Sorry I'm experiencing connectivity issues, please send that again!";
        this.state.recallCounter = 0;
      } else {
        this.state.recallCounter = 0;
      }

      var newMessage = {
        message: parsedData.text,
        userID: "emma",
        special: {},
        time: Math.round(new Date().getTime()),
      };
      var messages = this.state.messages
      if (this.state.inverse == 1) {
        messages.push(newMessage)
      } else {
        messages.unshift(newMessage)
      }
      this.setState({
        messages: messages
      })
      this.checkSize()
      this.addMessage(newMessage)
    })
  }
  
  timeConvert(unix) {
    var now = Math.round(new Date().getTime()/1000)
    var res = new Date(unix * 1000)
    if (unix + 86400 > now) {
      var hours = res.getHours()
      return (hours > 12 ? hours - 12 : hours == 0 ? 12 : hours) + ":" + res.getMinutes() + (hours > 12 ? "pm" : "am") 
    } else if (unix + 518400 > now) {
      return res.getDay()
    } else {
      return res.getMonth() + "/" + res.getDay()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior="padding"
          keyboardVerticalOffset={75}
        >
          <FlatList
            style={styles.list}
            data={this.state.messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index + "time" + item.senderID}
            inverted={this.state.inverse == 1 ? false : -1}
            renderItem={({ item, index }) => (
              <Message
                message={item.message}
                name={this.state.users.find(
                  (o) => o.userID == item.userID
                ).name}
                time={this.timeConvert(item.time)}
                imgURL={this.state.users.find(
                  (o) => o.userID == item.userID
                ).imgURL}
              />
            )}
          />
          <View style={{ margin: 10, marginBottom: 20, backgroundColor: colorScheme.background, borderRadius: 25, alignItems: 'center', flexDirection: 'row' }}>
            <TextInput
              placeholder={"Say something..."}
              style={{ paddingVertical: 15, marginLeft: 20, color: colorScheme.darkText, fontSize: 17, flex: .8 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableOpacity
              style={[shadowStyles.shadowDown, {
                backgroundColor: this.state.text.length > 1 ? colorScheme.button : colorScheme.primary,
                height: 45,
                width: 45,
                borderRadius: 22.5,
                position: 'absolute',
                right: 5,
                flex: .2
              }]}
              onPress={() => {
                if (this.state.text.length > 1) {
                  this.sendMessage()
                }
              }}
            >
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    width: "100%",
    marginBottom: 10
  },
});
