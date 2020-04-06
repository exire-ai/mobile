const plans = {
  getAllCategories: function(callback) {
    fetch('https://exire-backend.herokuapp.com/plans/getAllCategories/', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseJson => {
        callback(responseJson);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        callback([]);
      });
  },
  getByList: function(venues, callback) {
    fetch('https://exire-backend.herokuapp.com/plans/getByList/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        ids: venues
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
};

export default plans;
