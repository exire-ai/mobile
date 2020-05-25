var uuid = require("uuid");
import * as firebase from "firebase";
import "firebase/firestore";
import { useCallback } from "react";

const chats = {
  // THIS CODE SUCKS LMAO
  // getChat: function(chatID, callback) {
  //   fetch("https://exire-backend.herokuapp.com/chats/get/" + chatID, {
  //     method: "GET"
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     callback(responseJson);
  //   })
  //   .catch((error) => {
  //     console.log(JSON.stringify(error));
  //     callback(false);
  //   })
  // },
  // createChat: function(userID, message, callback) {
  //   fetch("https://exire-backend.herokuapp.com/chats/create", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify({
  //       userID: userID,
  //       chat: [{
  //         senderID: "bot",
  //         message: message
  //       }],
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     callback(responseJson);
  //   })
  //   .catch((error) => {
  //     console.log(JSON.stringify(error));
  //     callback(false);
  //   })
  // },
  // sendMessage:function(chatID, message, senderID, venues, callback) {
  //   fetch("https://exire-backend.herokuapp.com/chats/sendMessage/" + chatID, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type" : "application/json"
  //     },
  //     body: JSON.stringify({
  //       message: message,
  //       senderID: senderID,
  //       venues: venues
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     callback(responseJson);
  //   })
  //   .catch((error) => {
  //     callback(false);
  //   })
  // },
  // getAll: function(callback) {
  //   fetch("https://exire-backend.herokuapp.com/chats/getAll", {
  //     method: "GET"
  //   })
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     callback(responseJson);
  //   })
  //   .catch((error) => {
  //     console.log(JSON.stringify(error));
  //     callback([]);
  //   })
  // },
  createChat: async function(chatName, name, userID, number, profileImg, otherUsers, callback) {
    var db = firebase.firestore()
    var users = []
    var userData = []
    var chatID = uuid.v4()
    userData.push({
      userID: userID,
      name: name,
      imgURL: profileImg,
      number: number
    })
    userData.push({
      userID: "emma",
      name: "Emma",
      imgURL: "https://media-exp1.licdn.com/dms/image/C4E0BAQHKdLhy4JqozQ/company-logo_200_200/0?e=1597881600&v=beta&t=nWOnYXsKZ3kzwrD64MiZs34E2afLwgjLIj1zytRrpnc",
      number: 1000
    })
    for (var i = 0; i < otherUsers.length; i++) {
      users.push(otherUsers[i].number)
      userData.push(otherUsers[i])
    }
    users.push(number)
    users.push(1000)
    var initialChat = {
      chatID: chatID,
      name: chatName,
      messages: [{
        message: otherUsers.length == 0 ? "Hello, welcome to Exire. I'm here to help with any concierge needs you might have. Some things I can help with are: finding things to do, booking, and so much more!" : "Hello, I will only look at messages where you tag me with @Emma to respect your privacy. In addition to the things I can help you with one-on-one, I can help you come to agreements, find common interests, balance calendars, and more!",
        special: [],
        time: Math.round(new Date().getTime()),
        userID: "emma"
      }],
      users: users,
      userData: userData,
      ownerID: userID
    }
    const result = await db.collection("chats").add(initialChat);
    callback(result.id, chatID)
  }
}

export default chats;
