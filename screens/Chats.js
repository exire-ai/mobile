import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationEvents } from "react-navigation";
import _ from 'lodash';

// Components Imports
import Chat from "../components/Chat";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";
import { plansStyles } from "../global/plansStyles";
import { colorScheme } from "../global/colorScheme";
import { textStyles } from "../global/textStyles";
import SearchBar from "../components/SearchBar";

import * as firebase from "firebase";
import "firebase/firestore";

export default class Chats extends Component {
  db = firebase.firestore();
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((userID) => {
      AsyncStorage.getItem("number").then((number) => {
        this.setState({
          userID: userID,
          number: number,
        });
        this.loadData(false);
      });
    });
    AsyncStorage.getItem("onboard").then((onboard) => {
      this.setState({
        onboard: onboard,
      });
    });
  }

  state = {
    data: [],
    refreshing: false,
    onboard: "false",
    selected: null,
    query: ''
  };

  componentDidMount() {
    // not using observer bc can"t get return / callback / promise / state update working
    this._interval = setInterval(() => {
      this.loadData(false);
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.navigation.state.params !== this.props.navigation.state.params
    ) {
      if (this.props.navigation.state.params != undefined) {
        //Open this ChatID if it exists in user's chats list
        const chatID = this.props.navigation.state.params.toOpen;
        if (this.state.data === []) {
          //Load Data first
        } else {
          const data = this.state.data;
          if (data.some((e) => e.chatID === chatID)) {
            //Value exists, navigate into chat
            // this.props.navigation.navigate("Chat", {
            //   chatID: data.chatID,
            //   userID: this.state.userID,
            //   name: data.name,
            //   data: data,
            //   attachment: null,
            // });
          } else {
            //Chat Doesn't Exist
          }
        }
      }
    }
  }

  checkAttachment = (props) => {
    if ("action" in props) {
      if ("params" in props.action) {
        if ("object" in props.action.params) {
          this.setState({ attachment: props.action.params.object });
        }
      }
    }
  };

  loadData = (refresh) => {
    if (refresh) {
      this.setState({
        refreshing: true,
      });
    }
    this.db
      .collection("chats")
      .where("users", "array-contains", this.state.number)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          var temp = doc.data();
          return temp;
        });
        this.setState({
          refreshing: false,
          data: data,
        });
      });
  };

  timeConvert(unix) {
    var now = Math.round(new Date().getTime() / 1000);
    var res = new Date(unix);
    if (unix + 86400 > now) {
      var hours = res.getHours();
      var minutes = res.getMinutes();
      return (
        (hours > 12 ? hours - 12 : hours == 0 ? 12 : hours) +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes +
        (hours > 12 ? "pm" : "am")
      );
    } else if (unix + 518400 > now) {
      return res.getDay();
    } else {
      time += (res.getMonth() + 1) + "/" + res.getDate() + " ";
    }
  }

  setSearch = query => {
    this.setState({ query })
  }

  render() {
    return (
      <View style={chatsStyles.container}>
        <NavigationEvents onDidFocus={this.checkAttachment} />
        <SearchBar setSearch={this.setSearch} />
        <FlatList
          style={chatsStyles.list}
          data={this.state.data.sort(
            (a, b) =>
              b.messages[b.messages.length - 1].time -
              a.messages[a.messages.length - 1].time
          ).filter(o => {
            const query = this.state.query.toLowerCase();
            if (this.state.query !== '') {
              if (o.name.toLowerCase().includes(query)) {
                return true
              } else {
                return o.userData.filter(o => o.name.toLowerCase().includes(query)).length > 0
              }
            } else {
              return true
            }
          })}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.loadData(true);
          }}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => "key" + item.name}
          renderItem={({ item, index }) => (
            <Chat
              name={item.name}
              time={
                item.messages.length > 0
                  ? this.timeConvert(
                    item.messages[item.messages.length - 1].time
                  )
                  : ""
              }
              message={
                item.messages.length > 0
                  ? item.messages[item.messages.length - 1].message
                  : "Send your first message!"
              }
              select={() => {
                var selected = this.state.selected;
                console.log(selected)
                this.setState({
                  selected: _.get(this.state.selected, 'chatID') !== item.chatID && item
                })
              }}
              imgURL={
                item.userData.find(
                  (o) =>
                    o.userID ==
                    (item.userData.length == 2
                      ? "emma"
                      : item.messages[item.messages.length - 1].userID)
                ).imgURL
              }
              attachment={this.state.attachment != null}
              selected={
                _.get(this.state.selected, 'chatID') === item.chatID
              }
              navigate={() => {
                this.setState({ attachment: null });
                this.props.navigation.navigate("Chat", {
                  chatID: item.chatID,
                  userID: this.state.userID,
                  name: item.name,
                  data: item,
                  attachment: null
                });
              }}
            />
          )}
        />
        <View
          style={{
            position: "absolute",
            bottom: "2%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {this.state.attachment && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: 'red',
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  position: "absolute",
                  left: "2.5%",
                  bottom: 0,
                  alignItems: "center",
                },
              ]}
              onPress={() => {
                this.setState({ attachment: null });
              }}
            >
              <Text style={[plansStyles.smallButtonText, { fontSize: 35, marginTop: -1.5, marginLeft: 1 }]}>x</Text>
            </TouchableOpacity>
          )}
          {this.state.attachment ? (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: this.state.selected ? colorScheme.button : colorScheme.activeButton,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  position: "absolute",
                  right: "2.5%",
                  bottom: 0,
                  alignItems: "center",
                },
              ]}
              onPress={() => {
                if (this.state.selected) {
                  var attachment = "attachment" in this.state && this.state.attachment;
                  this.setState({ attachment: null });
                  this.props.navigation.navigate("Chat", {
                    chatID: this.state.selected.chatID,
                    userID: this.state.userID,
                    name: this.state.selected.name,
                    data: this.state.selected,
                    attachment: attachment,
                  });
                }
              }}
            >
              <Icon
                name="chevron-right"
                color="#FFF"
                size={28}
                style={[shadowStyles.shadowDown, { marginTop: 13, marginLeft: 3.5 }]}
              />
            </TouchableOpacity>
          ) :
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: colorScheme.button,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  position: "absolute",
                  right: "2.5%",
                  bottom: 0,
                  alignItems: "center",
                },
              ]}
              onPress={() => {
                this.props.navigation.navigate("CreateChat");
              }}
            >
              <Text style={plansStyles.buttonText}>+</Text>
            </TouchableOpacity>
          }
        </View>
        {this.state.onboard != "false" ? (
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,.3)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={[
                {
                  width: "88%",
                  backgroundColor: colorScheme.componentBackground,
                  padding: 15,
                  borderRadius: 15,
                  marginBottom: 20,
                },
                shadowStyles.shadowDown,
              ]}
            >
              <Text
                style={[
                  textStyles.titleText,
                  { width: "100%", textAlign: "center" },
                ]}
              >
                Have A Conversation
              </Text>
              <Text
                style={[
                  textStyles.standardBodyText,
                  { width: "100%", textAlign: "center", marginTop: 10 },
                ]}
              >
                This is where you can talk to friends or your concierge, Emma,
                to create plans. Get started by entering a conversation or find
                something on discover!
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  {
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colorScheme.button,
                    marginTop: 20,
                    marginBottom: 3,
                  },
                  shadowStyles.shadowDown,
                ]}
                onPress={() => {
                  this.setState({ onboard: "false" });
                  AsyncStorage.setItem("onboard", "false");
                }}
              >
                <Text
                  style={[
                    textStyles.standardBodyText,
                    {
                      width: "100%",
                      textAlign: "center",
                      color: colorScheme.primaryText,
                    },
                  ]}
                >
                  I'm Ready
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
