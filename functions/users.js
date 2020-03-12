const users = {
  getUser: function(userID) {
    fetch('https://exire-backend.herokuapp.com/users/get/' + userID, {
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
  createUser: function(userID, name, number, deviceID) {
    fetch('https://exire-backend.herokuapp.com/users/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userID: userID,
        name: name,
        number: number,
        deviceID: deviceID
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
  doesExist: function(userID) {
    fetch('https://exire-backend.herokuapp.com/users/doesExist/' + userID, {
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
  addCategories: function(userID, categories) {
    fetch('https://exire-backend.herokuapp.com/users/addCategories' + userID, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        categories
      )
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
  getChatUser: function(userID) {
    fetch('https://exire-backend.herokuapp.com/users/getChat'/ + userID, {
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
  updateChat: function(userID, chatID) {
    fetch('https://exire-backend.herokuapp.com/users/updateChat/' + userID + '/' + chatID, {
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
  updateToken: function(userID, newToken) {
    fetch('https://exire-backend.herokuapp.com/users/updateToken/' + userID + '/' + newToken, {
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
}

export default users;
