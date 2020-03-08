module.exports = {
  getAll : function() {
    fetch('https://exire-backend.herokuapp.com/chats/getAll', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var num = 0;
      console.log("1", responseJson)
      return(responseJson);
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      return([{'chatID' : 'null', id: 1}]);
    })
  },
}
