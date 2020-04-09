const chats = {
  getChat: function(chatID, callback) {
    fetch('https://exire-backend.herokuapp.com/chats/get/' + chatID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(false);
    })
  },
  createChat: function(userID, message, callback) {
    fetch('https://exire-backend.herokuapp.com/chats/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userID: userID,
        chat: [{
          senderID: 'bot',
          message: message 
        }],
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(false);
    })
  },
  sendMessage:function(chatID, message, senderID, venues, callback) {
    fetch('https://exire-backend.herokuapp.com/chats/sendMessage/' + chatID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        message: message,
        senderID: senderID,
        venues: venues
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      callback(false);
    })
  },
  getAll: function(callback) {
    fetch('https://exire-backend.herokuapp.com/chats/getAll', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback([]);
    })
  },
}

export default chats;
