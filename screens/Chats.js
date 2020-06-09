import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    AsyncStorage.getItem("userID").then(userID => {
      AsyncStorage.getItem("number").then(number => {
        this.setState({
          userID: userID,
          number: number
        })
        this.loadData(false)
      })
    })
    AsyncStorage.getItem("onboard").then(onboard => {
      this.setState({
        onboard: onboard
      })
    })
  }

  state = {
    data: [],
    refreshing: false,
    onboard: 'false'
  }

  componentDidMount() {
    // not using observer bc can"t get return / callback / promise / state update working
    this._interval = setInterval(() => {
      this.loadData(false)
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this._interval)
  }

  loadData = (refresh) => {
    if (refresh) {
      this.setState({
        refreshing: true
      })
    }
    this.db.collection("chats")
    .where("users", "array-contains", this.state.number)
    .get()
    .then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        var temp = doc.data()
        return temp
      });
      this.setState({
        refreshing: false,
        data: data
      })
    })
  }

  timeConvert(unix) {
    var now = Math.round(new Date().getTime()/1000)
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
      <View style={chatsStyles.container}>
        <SearchBar />
        <FlatList
          style={chatsStyles.list}
          data={this.state.data.sort((a, b) => b.messages[b.messages.length-1].time - a.messages[a.messages.length-1].time)}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.loadData(true);
          }}
          refreshing={this.state.refreshing}
          keyExtratctor={(item, index) => "key" + item.name}
          renderItem={({ item, index }) => (
            <Chat
              name={item.name}
              time={item.messages.length > 0 ? this.timeConvert(item.messages[item.messages.length - 1].time) : ""}
              message={item.messages.length > 0 ? item.messages[item.messages.length - 1].message : "Send your first message!"}
              navigate={() => {
                this.props.navigation.navigate("Chat", {chatID: item.chatID, userID: this.state.userID, name: item.name, data: item});
              }}
              imgURL={item.userData.find(
                (o) => o.userID == ( item.userData.length == 2 ? "emma" : item.messages[item.messages.length - 1].userID )
              ).imgURL}
            />
          )}
        />
        <TouchableOpacity activeOpacity={.5}
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => {
            this.props.navigation.navigate("CreateChat");
          }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity>
        { this.state.onboard != "false" ? (
          <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,.3)', alignItems: 'center', justifyContent : 'center'}}>
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
              This is where you can talk to friends or your concierge, Emma, to create plans. Get started by entering a conversation or find something on discover!
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
                this.setState({onboard : "false"})
                AsyncStorage.setItem("onboard", "false")
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
        ) : null }
      </View>
    );
  }
}
