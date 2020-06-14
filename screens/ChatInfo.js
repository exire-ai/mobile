import React from "react";
import { Text, View, FlatList, TouchableOpacity, Dimensions, ImageBackground, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colorScheme } from "../global/colorScheme";
import { shadowStyles } from "../global/shadowStyles";
import { messagesStyles } from "../global/messagesStyles";
import users from "../functions/users";

// Firestore connection
import * as firebase from "firebase";
import "firebase/firestore";

export default class ChatInfo extends React.Component {
  db = firebase.firestore();

  constructor(props) {
    super(props)
    this.state = props.navigation.state.params.data
    this.state.friends = []
    AsyncStorage.getItem("userID").then(userID => {
      this.setState({ "userID": userID })
      this.getFriends()
    })
  }

  getFriends() {
    users.getFriends(this.state.userID, friends => {
      this.setState({ friends: friends.map(o => o.userID) })
    })
  }

  toggleFriend(userID) {
    var friends = this.state.friends
    if (friends.includes(userID)) {
      users.deleteFriend(this.state.userID, userID, (data) => {
        for (var i = 0; i < friends.length; i++) {
          if (friends[i] === userID) {
            friends.splice(i, 1);
          }
        }
        this.setState({ friends: friends })
      })
    } else {
      users.addFriend(this.state.userID, userID, (data) => {
        friends.push(userID)
        this.setState({ friends: friends })
      })
    }
  }

  leave() {
    var userData = {
      userID: this.state.userID,
      number: 'gone',
      name: this.state.userData.find(o => o.userID == this.state.userID).name,
      imgURL: this.state.userData.find(o => o.userID == this.state.userID).imgURL
    }
    var oldNumber = this.state.userData.find(o => o.userID == this.state.userID).number
    var oldUserData = this.state.userData
    this.db.collection("chats")
      .where("chatID", "==", this.state.chatID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data().userData;
          var users = doc.data().users;
          data = data.filter(function(o) { return o.number != oldNumber });
          users = users.filter(function(o) { return o != oldNumber});
          data.push(userData)
          console.log(data, users)
          this.db.collection("chats").doc(doc.id).update({
            userData: data,
            users: users
          })
          this.setState({
            userData: data,
            users: users
          })
          this.props.navigation.navigate('Chats')
        })
      })
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: '100%' }}>
        <Text style={{ marginTop: 10, fontSize: 24, fontFamily: "SemiBold", color: colorScheme.lessDarkText }}>Members</Text>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
          data={this.state.userData.filter(o => o.number != 'gone')}
          showsVerticalScrollIndicator={false}
          keyExtratctor={(item, index) => "number" + item.number}
          renderItem={({ item, index }) => {
            if (true /*temp*/) {
              return (<View style={[{ width: Dimensions.get("screen").width * .9, height: 70, marginBottom: 5, paddingHorizontal: 10, backgroundColor: colorScheme.componentBackground, borderRadius: 15, flexDirection: "row", justifyContent: "flex-start" }, shadowStyles.shadowDown]}>
                <View style={[{ flexDirection: "row" }, shadowStyles.shadowDown]}>
                  <View style={[{ marginTop: 0, height: 50, width: 50, borderRadius: 25, overflow: "hidden", marginTop: 10 }, shadowStyles.shadowDown]}>
                    <ImageBackground source={{ uri: item.imgURL != "" ? item.imgURL : "https://cas.umw.edu/sociologyanthropology/files/2018/11/blank-person-1.png" }} style={{ width: 50, height: 50 }}>
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={{ fontFamily: "Bold", color: colorScheme.lessDarkText, fontSize: 19 }}>{
                    item.name == "" ?
                      "Pending"
                      : item.userID == this.state.userID ? "You" : item.name
                  }</Text>
                  <Text style={{ fontFamily: "SemiBold", color: colorScheme.lessDarkText, fontSize: 17, paddingTop: -3 }}>
                    {item.number != 1000 ?
                      ("(" + item.number.substring(0, 3) + ") " + item.number.substring(3, 6) + "-" + item.number.substring(6, 10))
                      : ""
                    }</Text>
                </View>
                {item.userID != this.state.userID && item.number != 1000 && item.userID != "" ? (<TouchableOpacity activeOpacity={.5}
                  style={{ top: 15, position: "absolute", right: 10, height: 40, paddingHorizontal: 10, backgroundColor: this.state.friends.includes(item.userID) ? colorScheme.button : colorScheme.veryLight, alignItems: "center", justifyContent: "center", borderRadius: 15 }}
                  onPress={() => this.toggleFriend(item.userID)}
                >
                  <Text style={{ color: this.state.friends.includes(item.userID) ? colorScheme.primaryText : colorScheme.darkText, fontFamily: "Bold", fontSize: 16 }}>{this.state.friends.includes(item.userID) ? "Friends" : "Add Friend"}</Text>
                </TouchableOpacity>) : null}
              </View>)
            } else {
              return null
            }
          }
          }
        />
        <TouchableOpacity activeOpacity={.5}
          style={[{ bottom: 30, position: "absolute", width: '85%', height: 50, paddingHorizontal: 10, backgroundColor: colorScheme.activeButton, alignItems: "center", justifyContent: "center", borderRadius: 15 }, shadowStyles.shadowDown]}
          onPress={() => this.leave()}
        >
          <Text style={{ color: colorScheme.primaryText, fontFamily: "Bold", fontSize: 20 }}>Leave Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
