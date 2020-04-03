const users = {
  getUser: function(userID, callback) {
    fetch('https://exire-backend.herokuapp.com/users/get/' + userID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return(null);
    })
  },
  createUser: function(userID, name, number, callback) {
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
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  doesExist: function(userID, callback) {
    fetch('https://exire-backend.herokuapp.com/users/doesExist/' + userID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  addCategories: function(userID, categories, callback) {
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
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  updateCategories: function(userID, categories, callback) {
    fetch('https://exire-backend.herokuapp.com/users/updateCategories/' + userID, {
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
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  getChatUser: function(userID, callback) {
    fetch('https://exire-backend.herokuapp.com/users/getChat/' + userID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  updateChat: function(userID, chatID, callback) {
    fetch('https://exire-backend.herokuapp.com/users/updateChat/' + userID + '/' + chatID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  updateToken: function(userID, newToken, callback) {
    fetch('https://exire-backend.herokuapp.com/users/updateToken/' + userID + '/' + newToken, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      callback(null);
    })
  },
  phoneAuth: function(number, callback) {
    fetch('https://exire-backend.herokuapp.com/external/phoneAuth/' + number, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (typeof responseJson['code'] == "number") {
        callback(responseJson);
      } else {
        callback(false)
      }
    })
    .catch((error) => {
      callback(false);
    })
  },
  doesNumberExist: function(number, callback) {
    fetch('https://exire-backend.herokuapp.com/users/doesNumberExist/' + number, {
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
  getByNumber: function(number, callback) {
    fetch('https://exire-backend.herokuapp.com/users/getByNumber/' + number, {
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
  }
}

export default users;
