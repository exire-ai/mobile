const chats = {
  getChat: function(chatID) {
    fetch('https://exire-backend.herokuapp.com/chats/get/' + chatID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return(null);
    })
  },
  createChat: function(userID) {
    fetch('https://exire-backend.herokuapp.com/chats/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userID: userID
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      return(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return(null);
    })
  },
  sendMessage:function(chatID, message, senderID, venues) {
    fetch('https://exire-backend.herokuapp.com/chats/sendMessage/' + chatID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        chatID: chatID,
        message: message,
        senderID: senderID,
        venues: venues
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return(null);
    })
  },
  getAll: function() {
    fetch('https://exire-backend.herokuapp.com/chats/getAll', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return([]);
    })
  },
}

export default chats;
