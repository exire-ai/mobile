import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Components Imports
import Chat from "../components/Chat";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";
import { plansStyles } from "../global/plansStyles";
import SearchBar from "../components/SearchBar";

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Chats extends Component {
  db = firebase.firestore();
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userID").then((value) => {
      this.setState({
        userID: value
      })
      this.loadData(false)
    })
  }

  state = {
    data: [],
    refreshing: false
  }

  componentDidMount() {
    // not using observer bc can't get return / callback / promise / state update working
    this._interval = setInterval(() => {
      this.loadData(false)
    }, 3000);
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
    this.db.collection('chats')
    .where("users", "array-contains", this.state.userID)
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
      return (hours > 12 ? hours - 12 : hours == 0 ? 12 : hours) + ":" + (minutes < 10 ? '0' : '') + minutes + (hours > 12 ? "pm" : "am") 
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
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.loadData(true);
          }}
          refreshing={this.state.refreshing}
          keyExtratctor={(item, index) => "key" + item.name}
          renderItem={({ item, index }) => (
            <Chat
              name={item.name}
              time={item.messages.length > 0 ? this.timeConvert(item.messages[item.messages.length - 1].time) : ''}
              message={item.messages.length > 0 ? item.messages[item.messages.length - 1].message : "Send your first message!"}
              navigate={() => {
                this.props.navigation.navigate("Chat", {chatID: item.chatID, userID: this.state.userID, name: item.name});
              }}
            />
          )}
        />
        <TouchableOpacity
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => {
            console.log("New Chat");
          }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
