var uuid = require("uuid");
import * as firebase from "firebase";
import "firebase/firestore";

const chats = {
  createChat: async function (
    chatName,
    name,
    userID,
    number,
    profileImg,
    otherUsers,
    callback
  ) {
    var db = firebase.firestore();
    var users = [];
    var userData = [];
    var chatID = uuid.v4();
    userData.push({
      userID: userID,
      name: name,
      imgURL: profileImg,
      number: number,
    });
    userData.push({
      userID: "emma",
      name: "Emma",
      imgURL:
        "https://exirevideo.s3.us-east-2.amazonaws.com/emma.png",
      number: 1000,
    });
    for (var i = 0; i < otherUsers.length; i++) {
      users.push(otherUsers[i].number);
      userData.push(otherUsers[i]);
    }
    users.push(number);
    users.push(1000);
    var initialChat = {
      chatID: chatID,
      name: chatName,
      messages: [
        {
          message:
            otherUsers.length == 0
              ? "Hello, welcome to Exire. I'm here to help with any concierge needs you might have. Some things I can help with are: finding things to do, booking, and so much more!"
              : "Hello, I will only look at messages where you tag me with @Emma to respect your privacy. In addition to the things I can help you with one-on-one, I can help you come to agreements, find common interests, balance calendars, and more!",
          special: [],
          time: Math.round(new Date().getTime()),
          userID: "emma",
        },
      ],
      users: users,
      userData: userData,
      ownerID: userID,
    };
    const result = await db.collection("chats").add(initialChat);
    callback(result.id, chatID);
  },
};

export default chats;
