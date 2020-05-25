const venues = {
  get: function(placeID, callback) {
    fetch("https://exire-backend.herokuapp.com/venues/get/" + placeID, {
      method: "GET"
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
};

export default venues;
