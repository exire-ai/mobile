const plans = {
  getAllCategories: function(callback) {
    fetch('https://exire-backend.herokuapp.com/plans/getAllCategories/', {
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
}

export default plans;
