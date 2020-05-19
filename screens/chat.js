import React, { setState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage } from "react-native";

import { Message } from "../components/message";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import dialogflow from "../functions/dialogflow";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((value) => {
      this.state.userID = value;
    })
  }

  state = {
    messages: [
      {
        name: "Emma",
        message:
          "Hello! I’m here to help creating plans. To ask me questions, just tag me with @Emma and I can help you: discover things to do, find when everyone is free, create a plan, and much more!",
        time: "5:31pm",
      },
    ],
    text: '',
    inverse: 1
  };

  sendMessage = () => {
    var messages = this.state.messages
    var message = {
      name: 'You',
      message: this.state.text,
      time: '6:51pm'
    }
    console.log(this.state.inverse)
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
    console.log(this.state.userID, message)
    dialogflow.sendMessage(this.state.userID, message, (data) => {
      var parsedData;
      console.log(data)
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
        name: "Emma",
        venues: [],
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
    })
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
            keyExtractor={(item, index) => "key" + index + "time" + item.name}
            inverted={this.state.inverse == 1 ? false : -1}
            renderItem={({ item, index }) => (
              <Message
                message={item.message}
                name={item.name}
                time={item.time}
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
