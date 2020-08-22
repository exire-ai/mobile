"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var firebase = _interopRequireWildcard(require("firebase"));

require("firebase/firestore");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var uuid = require("uuid");

var chats = {
  createChat: function createChat(chatName, name, userID, number, profileImg, otherUsers, callback) {
    var db, users, userData, chatID, i, initialChat, result;
    return regeneratorRuntime.async(function createChat$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            db = firebase.firestore();
            users = [];
            userData = [];
            chatID = uuid.v4();
            userData.push({
              userID: userID,
              name: name,
              imgURL: profileImg,
              number: number
            });
            userData.push({
              userID: "emma",
              name: "Emma",
              imgURL: "https://exirevideo.s3.us-east-2.amazonaws.com/emma.png",
              number: 1000
            });

            for (i = 0; i < otherUsers.length; i++) {
              users.push(otherUsers[i].number);
              userData.push(otherUsers[i]);
            }

            users.push(number);
            users.push(1000);
            initialChat = {
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
            };
            _context.next = 12;
            return regeneratorRuntime.awrap(db.collection("chats").add(initialChat));

          case 12:
            result = _context.sent;
            callback(result.id, chatID);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var _default = chats;
exports["default"] = _default;