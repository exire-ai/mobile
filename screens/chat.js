import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Text,
} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { Message } from "../components/message";
import { MessageClass } from "../components/messageClass";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import dialogflow from "../functions/dialogflow";
import plans from "../functions/plans";
import chats from "../functions/chats";
import notifs from "../functions/notifications";
import { textStyles } from "../global/textStyles";
import { analytics } from "../functions/mixpanel";

// FIRESTORE
import * as firebase from "firebase";
import "firebase/firestore";

export default class Chat extends React.Component {
  db = firebase.firestore();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // not using observer bc can"t get return / callback / promise / state update working
    AsyncStorage.multiGet([
      "userID",
      "name",
      "profileImg",
      "number",
      "token",
    ]).then((value) => {
      var token = value[4][1] !== null ? value[4][1] : "";
      this.setState({
        userID: value[0][1],
        name: value[1][1],
        profileImg: value[2][1],
        number: value[3][1],
        token: token,
        loading: false,
      });
      this.initChat();
      this.updateUserData();
    });
    this._interval = setInterval(() => {
      this.getChat();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  state = {
    messages: [],
    text: "",
    inverse: 1,
    chatID: this.props.navigation.state.params.chatID,
    userID: this.props.navigation.state.params.userID,
  };

  getChat = () => {
    this.db
      .collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          var temp = doc.data();
          return temp;
        })[0];
        this.setState({
          messages: data.messages,
          users: data.userData,
          owner:
            this.props.navigation.state.params.userID == data.ownerID
              ? true
              : false,
          name: data.name,
          data: data,
        });
        this.checkSize(true);
      });
  };

  initChat = () => {
    this.db
      .collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          var temp = doc.data();
          return temp;
        })[0];
        this.setState({
          messages: data.messages,
          users: data.userData,
          owner:
            this.props.navigation.state.params.userID == data.ownerID
              ? true
              : false,
          name: data.name,
          data: data,
        });
        this.checkSize(true);
        if (this.props.navigation.state.params.attachment != null) {
          var attachment = this.props.navigation.state.params.attachment;
          var special = {};
          if (attachment.type === "plan") {
            special = { plan: attachment.planID }
          } else if (attachment.type === "online-event") {
            special = { venues: [attachment.eventID] }
          } else if (_.has(attachment, "venue")) {
            special = { venues: [attachment.venue] }
          };
          if (special !== {}) {
            var message = {
              userID: this.state.userID,
              message: "Sent ".concat(
                attachment.title
              ),
              time: Math.round(new Date().getTime()),
              special
            };
            this.addMessage(message);
            var messages = this.state.messages;
            if (this.state.inverse == 1) {
              messages.push(message);
            } else {
              messages.unshift(message);
            }
            this.setState({
              messages: messages,
            });

                // Send Notification
            let user = this.state.users.find((o) => o.userID == message.userID);
            var tokens = this.state.users
              .filter((o) => "token" in o)
              .filter((o) => o.userID !== message.userID)
              .map((o) => o.token);

            notifs.sendNotif(
              1000,
              this.state.name,
              user.name + ": " + message.message,
              tokens,
              (res) => {
                console.log(res);
              }
            );
          }
        }
      });
  };

  addMessage(message) {
    this.db
      .collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.db
            .collection("chats")
            .doc(doc.id)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion(message),
            });
        });
      });
  }

  updateUserData() {
    var userData = {
      userID: this.state.userID,
      number: this.state.number,
      name: this.state.name,
      imgURL: this.state.profileImg,
      token: this.state.token,
    };
    this.db
      .collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data().userData;
          data = data.filter(function (o) {
            return o.number != userData.number;
          });
          data.push(userData);
          this.db.collection("chats").doc(doc.id).update({
            userData: data,
          });
        });
      });
  }

  onListen(doc) {
    var data = doc.data();
    console.log("message added:", data.messages[data.messages.length - 1]);
  }

  // won"t work at all rn bc changed the chatID querying technique
  listenChat() {
    const subscriber = this.db
      .collection("chats")
      .doc(this.state.chatID)
      .onSnapshot(this.onListen);
  }

  sendMessage = () => {
    var messages = this.state.messages;
    var message = {
      userID: this.props.navigation.state.params.userID,
      message: this.state.text,
      time: Math.round(new Date().getTime()),
      special: {},
    };
    if (this.state.inverse == 1) {
      messages.push(message);
    } else {
      messages.unshift(message);
    }
    this.setState({
      messages: messages,
    });
    if (
      this.state.text.includes("@Emma") ||
      this.state.text.includes("@emma") ||
      this.state.users.length == 2
    ) {
      var temp = this.state.text.replace("@Emma", "");
      temp = temp.replace("@emma", "");
      analytics.track("Emma Message", { text: this.state.text });
      this.emma(temp);
    }
    // Send Notification
    let user = this.state.users.find((o) => o.userID == message.userID);
    var tokens = this.state.users
      .filter((o) => "token" in o)
      .filter((o) => o.userID !== message.userID)
      .map((o) => o.token);

    notifs.sendNotif(
      1000,
      this.state.name,
      user.name + ": " + message.message,
      tokens,
      (res) => {
        console.log(res);
      }
    );

    this.clearText();
    this.addMessage(message);
    this.checkSize(false);
  };

  clearText = () => {
    this.setState({
      text: "",
    });
  };

  checkSize = (getAll) => {
    if (
      (this.state.inverse == 1 && this.state.messages.length > 5) ||
      (getAll && this.state.messages.length > 5)
    ) {
      this.setState({
        inverse: -1,
        messages: this.state.messages.reverse(),
      });
    }
  };

  emma = (message) => {
    this.setState({
      loading: true,
    });
    dialogflow.sendMessage(
      this.state.userID,
      this.state.chatID,
      message,
      this.state.users.map((o) => o.userID),
      (data) => {
        var parsedData;
        try {
          parsedData = JSON.parse(data.fulfillmentText);
        } catch (e) {
          parsedData = { text: data.fulfillmentText };
        }
        if (parsedData.text == "" && this.state.recallCounter < 3) {
          this.state.recallCounter += 1;
          this.emma(message);
          return;
        } else if (this.state.recallCounter >= 3 && parsedData.text == "") {
          parsedData.text =
            "Sorry I'm experiencing connectivity issues, please send that again!";
          this.state.recallCounter = 0;
        } else {
          this.state.recallCounter = 0;
        }
        if (data.intent.displayName == "GroupRecommendations") {
          plans.getRecommendedGroup(
            this.state.users.map((o) => o.userID),
            (venues) => {
              var newMessage = {
                message: parsedData.text,
                userID: "emma",
                special: { venues: venues.recommended.map((o) => o.placeID) },
                time: Math.round(new Date().getTime()),
              };
              var messages = this.state.messages;
              if (this.state.inverse == 1) {
                messages.push(newMessage);
              } else {
                messages.unshift(newMessage);
              }
              this.addMessage(newMessage);
              this.setState({
                messages: messages,
                loading: false,
              });
              this.checkSize();
            }
          );
        } else {
          var newMessage = {
            message: parsedData.text,
            userID: "emma",
            special: parsedData.hasOwnProperty("venues")
              ? { venues: parsedData.venues }
              : {},
            time: Math.round(new Date().getTime()),
          };
          var messages = this.state.messages;
          if (this.state.inverse == 1) {
            messages.push(newMessage);
          } else {
            messages.unshift(newMessage);
          }
          this.addMessage(newMessage);
          this.setState({
            messages: messages,
            loading: false,
          });
          this.checkSize();
        }
        // Send Notification
        let user = this.state.users.find((o) => o.userID == message.userID);
        var tokens = this.state.users
          .filter((o) => "token" in o)
          .filter((o) => o.userID !== message.userID)
          .map((o) => o.token);
        notifs.sendNotif(
          1000,
          this.state.name,
          user.name + ": " + newMessage.message,
          tokens,
          (res) => {
            console.log(res);
          }
        );
      }
    );
  };

  timeConvert(unix) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const now = Math.round(new Date().getTime());
    const res = new Date(unix);
    var time = "";
    var hours = res.getHours();
    var minutes = res.getMinutes();
    if (unix + 86400000 > now) {
    } else if (unix + 518400000 > now) {
      time += days[res.getDay()] + " ";
    } else {
      time += res.getMonth() + "/" + res.getDay() + " ";
    }
    return time + (
      (hours > 12 ? hours - 12 : hours == 0 ? 12 : hours) +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      (hours > 12 ? "pm" : "am")
    );
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
            style={[styles.list, { flex: 1 }]}
            data={this.state.messages}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "time" + item.time}
            inverted={this.state.inverse == 1 ? false : -1}
            renderItem={({ item, index }) => {
              if (item.special.hasOwnProperty("venues") || item.special.hasOwnProperty("plan") ) {
                return (
                  <MessageClass
                    message={item.message}
                    name={
                      item.userID == this.props.navigation.state.params.userID
                        ? "You"
                        : this.state.users.find((o) => o.userID == item.userID)
                            .name
                    }
                    time={this.timeConvert(item.time)}
                    imgURL={
                      this.state.users.find((o) => o.userID == item.userID)
                        .imgURL
                    }
                    special={item.special}
                    navigation={this.props.navigation}
                  />
                );
              } else {
                return (
                  <Message
                    message={item.message}
                    name={
                      item.userID == this.props.navigation.state.params.userID
                        ? "You"
                        : this.state.users.find((o) => o.userID == item.userID)
                            .name
                    }
                    time={this.timeConvert(item.time)}
                    imgURL={
                      this.state.users.find((o) => o.userID == item.userID)
                        .imgURL
                    }
                    special={item.special}
                  />
                );
              }
            }}
          />
          {this.state.loading ? (
            <View
              style={{
                paddingVertical: 10,
                paddingLeft: 16,
                marginBottom: 0,
                flexDirection: "row",
              }}
            >
              <Text style={[textStyles.subBodyText, { fontSize: 16 }]}>
                Emma is typing
              </Text>
              <AnimatedEllipsis
                numberOfDots={3}
                letterSpacing={0}
                animationDelay={300}
                style={[textStyles.subBodyText, { fontSize: 16 }]}
              />
            </View>
          ) : null}
          <View
            style={{
              margin: 10,
              marginBottom: 20,
              backgroundColor: colorScheme.background,
              borderRadius: 25,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              placeholder={"Say something..."}
              style={{
                paddingVertical: 15,
                marginLeft: 20,
                color: colorScheme.darkText,
                fontSize: 17,
                flex: 0.8,
              }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor:
                    this.state.text.length > 1
                      ? colorScheme.button
                      : colorScheme.primary,
                  height: 45,
                  width: 45,
                  borderRadius: 22.5,
                  position: "absolute",
                  right: 5,
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
              onPress={() => {
                if (this.state.text.length > 1) {
                  this.sendMessage();
                }
              }}
            >
              <Icon
                name="chevron-right"
                color="#FFF"
                size={28}
                style={[
                  shadowStyles.shadowDown,
                  { paddingLeft: 3, paddingTop: 3 },
                ]}
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
    paddingBottom: 20,
  },
});
