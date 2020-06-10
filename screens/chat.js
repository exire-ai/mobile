import React, { setState, useCallback, useEffect } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import { Message } from "../components/message";
import { MessageClass } from "../components/messageClass";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import dialogflow from "../functions/dialogflow";

// FIRESTORE
import * as firebase from "firebase";
import "firebase/firestore";
import { textStyles } from "../global/textStyles";

export default class Chat extends React.Component {
  db = firebase.firestore();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // not using observer bc can"t get return / callback / promise / state update working
    AsyncStorage.multiGet(["userID", "name", "profileImg", "number"]).then((value) => {
      this.setState({
        userID: value[0][1],
        name: value[1][1],
        profileImg: value[2][1],
        number: value[3][1],
        loading: false
      })
      this.getChat()
      this.updateUserData()
    })
    this._interval = setInterval(() => {
      this.getChat()
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }


  state = {
    messages: [],
    text: "",
    inverse: 1,
    chatID: this.props.navigation.state.params.chatID,
    userID: this.props.navigation.state.params.userID
  };

  getChat() {
    this.db.collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          var temp = doc.data()
          return temp
        })[0];
        this.setState({
          messages: data.messages,
          users: data.userData,
          owner: this.props.navigation.state.params.userID == data.ownerID ? true : false,
          name: data.name,
          data: data
        })
        this.checkSize(true)
      })
  }

  addMessage(message) {
    this.db.collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.db.collection("chats").doc(doc.id).update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
          })
        })
      })
  }

  updateUserData() {
    var userData = {
      userID: this.state.userID,
      number: this.state.number,
      name: this.state.name,
      imgURL: this.state.profileImg
    }
    this.db.collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data().userData;
          console.log()
          data = data.filter(function(o) { return o.number != userData.number });
          data.push(userData)
          this.db.collection("chats").doc(doc.id).update({
            userData: data
          })
        })
      })
  }

  onListen(doc) {
    var data = doc.data()
    console.log("message added:", data.messages[data.messages.length - 1])
  }

  // won"t work at all rn bc changed the chatID querying technique
  listenChat() {
    const subscriber = this.db.collection("chats")
      .doc(this.state.chatID)
      .onSnapshot(this.onListen);
  }

  sendMessage = () => {
    var messages = this.state.messages
    var message = {
      userID: this.props.navigation.state.params.userID,
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
    if (this.state.text.includes("@Emma") || this.state.text.includes("@emma") || this.state.users.length == 2) {
      var temp = this.state.text.replace("@Emma", "")
      temp = temp.replace("@emma", "")
      this.emma(temp)
    }
    this.clearText()
    this.addMessage(message)
    this.checkSize(false)
  }

  clearText = () => {
    this.setState({
      text: "",
    });
  };

  checkSize = (getAll) => {
    if ((this.state.inverse == 1 && this.state.messages.length > 5) || (getAll && this.state.messages.length > 5)) {
      this.setState({
        inverse: -1,
        messages: this.state.messages.reverse()
      })
    }
  }

  emma = (message) => {
    this.setState({
      loading: true
    })
    dialogflow.sendMessage(this.state.chatID, message, this.state.users.map(o => o.userID) ,(data) => {
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
        special: parsedData.hasOwnProperty("venues") ? { venues: parsedData.venues } : {},
        time: Math.round(new Date().getTime()),
      };
      var messages = this.state.messages
      if (this.state.inverse == 1) {
        messages.push(newMessage)
      } else {
        messages.unshift(newMessage)
      }
      this.addMessage(newMessage)
      this.setState({
        messages: messages,
        loading: false
      })
      this.checkSize()
    })
  }

  timeConvert(unix) {
    var now = Math.round(new Date().getTime() / 1000)
    var res = new Date(unix)
    if (unix + 86400 > now) {
      var hours = res.getHours()
      var minutes = res.getMinutes()
      return (hours > 12 ? hours - 12 : hours == 0 ? 12 : hours) + ":" + (minutes < 10 ? "0" : "") + minutes + (hours > 12 ? "pm" : "am")
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
            style={[styles.list, {flex: 1}]}
            data={this.state.messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "time" + item.time}
            inverted={this.state.inverse == 1 ? false : -1}
            renderItem={({ item, index }) => {
              if (item.special.hasOwnProperty("venues")) {
                return (
                  <MessageClass
                    message={item.message}
                    name={item.userID == this.props.navigation.state.params.userID ? "You" : this.state.users.find(
                      (o) => o.userID == item.userID
                    ).name}
                    time={this.timeConvert(item.time)}
                    imgURL={this.state.users.find(
                      (o) => o.userID == item.userID
                    ).imgURL}
                    special={item.special}
                    navigation={this.props.navigation}
                  />
                )
              } else {
                return (
                  <Message
                    message={item.message}
                    name={item.userID == this.props.navigation.state.params.userID ? "You" : this.state.users.find(
                      (o) => o.userID == item.userID
                    ).name}
                    time={this.timeConvert(item.time)}
                    imgURL={this.state.users.find(
                      (o) => o.userID == item.userID
                    ).imgURL}
                    special={item.special}
                  />
                )
              }
            }}
          />
          { this.state.loading ? (
            <View style={{paddingVertical: 10, paddingLeft: 16, marginBottom: 0, flexDirection: 'row'}}>
              <Text style={[textStyles.subBodyText, {fontSize: 16}]}>
                Emma is typing
              </Text>
              <AnimatedEllipsis numberOfDots={3} letterSpacing={0} animationDelay={300} style={[textStyles.subBodyText, {fontSize: 16}]}/>
            </View>
          ) : null }
          <View style={{ margin: 10, marginBottom: 20, backgroundColor: colorScheme.background, borderRadius: 25, alignItems: "center", flexDirection: "row" }}>
            <TextInput
              placeholder={"Say something..."}
              style={{ paddingVertical: 15, marginLeft: 20, color: colorScheme.darkText, fontSize: 17, flex: .8 }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableOpacity activeOpacity={.5}
              style={[shadowStyles.shadowDown, {
                backgroundColor: this.state.text.length > 1 ? colorScheme.button : colorScheme.primary,
                height: 45,
                width: 45,
                borderRadius: 22.5,
                position: "absolute",
                right: 5,
                flex: .2,
                alignItems: "center",
                justifyContent: "center"
              }]}
              onPress={() => {
                if (this.state.text.length > 1) {
                  this.sendMessage()
                }
              }}
            >
              <Icon
                name="chevron-right"
                color="#FFF"
                size={28}
                style={[shadowStyles.shadowDown, {paddingLeft: 3, paddingTop: 3}]}
              />
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
    width: "100%",
    marginBottom: 10
  },
});
