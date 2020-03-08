module.export = {
  get: function(chatID) {
    fetch('https://exire-backend.herokuapp.com/chats/get/' + chatID, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(response)
      return(responseJson);
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      return(null);
    })
  },
  getAll : function() {
    fetch('https://exire-backend.herokuapp.com/chats/getAll', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      return(responseJson);
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      return([]);
    })
  },
}
