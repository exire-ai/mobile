import React, { useState } from "react";
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import dialogflow from "../functions/dialogflow";
import { Message } from "../components/Message";
import SendMessage from "../components/sendMessage";
import chats from "../functions/chats";
import users from "../functions/users";
import plans from "../functions/plans";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      ownerID: "user",
      recallCounter: 0,
    };
    AsyncStorage.getItem("userID").then((value) => {
      this.setState({
        userID: value,
        sessionID: value,
      });
      this.addIndicator();
      users.getWelcomeMessage(value, (data) => {
        // Ternary for if issue in get request
        var messageClone = this.state.messages;
        messageClone[0] = {
          message: data.text
            ? data.text
            : "Welcome to Exire! I can help you find activites and restaurants based on your preferences.",
          senderID: "bot",
          venues: [],
          time: Math.round(new Date().getTime()),
          loading: false,
          form: "",
        };
        this.setState({ messages: messageClone, loading: false });
      });
      chats.createChat(value, this.state.messages[0].message, (bool) => {
        users.getChatUser(value, (data) => {
          this.setState({ sessionID: data.chatID });
        });
        console.log("success: " + bool);
      });
    });
    this.keyboardHeight = new Animated.Value(0);
  }

  addMessage = (inputText, user, venues, form) => {
    const { messages } = this.state;
    messages.unshift({
      message: inputText,
      senderID: user,
      venues: venues,
      time: Math.round(new Date().getTime() / 1000),
      loading: false,
      form: form,
      location: "",
    });
    this.setState({ messages: messages.slice(0) });
    chats.sendMessage(
      this.state.sessionID,
      inputText,
      this.state.userID,
      [],
      (data) => {
        console.log(data);
        console.log("Message added to: " + this.state.sessionID);
      }
    );
  };

  sendMessage = (inputText) => {
    if (!this.state.recallCounter > 0) {
      this.addMessage(inputText, this.state.ownerID, [], "");
      setTimeout(this.addIndicator, 250);
    }
    dialogflow.sendMessage(this.state.userID, inputText, (data) => {
      var messagesClone = this.state.messages;
      var parsedData;
      try {
        parsedData = JSON.parse(data.fulfillmentText);
      } catch (e) {
        parsedData = { text: data.fulfillmentText };
      }
      if (parsedData.text == "" && this.state.recallCounter < 3) {
        this.state.recallCounter += 1;
        this.sendMessage(inputText);
        return;
      } else if (this.state.recallCounter >= 3 && parsedData.text == "") {
        parsedData.text =
          "Sorry I"m experiencing connectivity issues, please send that again!";
        this.state.recallCounter = 0;
      } else {
        this.state.recallCounter = 0;
      }

      messagesClone[0] = {
        message: parsedData.text,
        senderID: "bot",
        venues: [],
        time: Math.round(new Date().getTime()),
        loading: false,
        form: "",
      };
      this.setState({ messages: messagesClone, loading: false });
      chats.sendMessage(
        this.state.sessionID,
        parsedData.text,
        "bot",
        [],
        (data) => {
          console.log("Message added to chat: " + this.state.sessionID);
        }
      );
      if (parsedData.hasOwnProperty("venues")) {
        // console.log("Has venues");
        plans.getByList(parsedData.venues, (venues) => {
          if (venues.length != 0) {
            var showVenues = venues;
            if (showVenues.length > 4) {
              showVenues = showVenues.slice(0, 4);
            }
            this.addMessage("", "bot", showVenues, "");
          }
        });
      } else if (parsedData.hasOwnProperty("form")) {
        setTimeout(() => {
          this.addMessage("", "bot", [], "");
        }, 300);
      }
    });
  };

  addIndicator = () => {
    if (!this.state.loading) {
      const { messages } = this.state;
      messages.unshift({
        message: "loadingloadingloading",
        senderID: "bot",
        venues: [],
        time: Math.round(new Date().getTime()),
        loading: true,
        form: "",
      });
      this.setState({ messages: messages.slice(0), loading: true });
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location,
      });
      users.updateLocation(this.state.userID, location.coords.latitude, location.coords.longitude, (bool) => {
        console.log("Location Updated: " + bool)
      })
    })();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  makeProfileVisible = () => {
    this.setState({ isProfileVisible: true });
  };

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
            inverted={-1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index + "time" + item.time}
            renderItem={({ item, index }) => (
              <Message
                message={item.message}
                overMin={
                  index > 0
                    ? this.state.messages[index - 1].time - item.time > 60
                    : false
                }
                sameAsNext={
                  index > 0
                    ? this.state.messages[index - 1].senderID == item.senderID
                      ? true
                      : false
                    : false
                }
                owner={this.state.ownerID == item.senderID ? true : false}
                venues={item.venues}
                first={index == 0}
                form={item.form}
                navigation={this.props.navigation}
              />
            )}
          />
          <SendMessage sendMessage={this.sendMessage} />
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
  },
});
