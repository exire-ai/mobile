const plans = {
  getAllCategories: function() {
    fetch('https://exire-backend.herokuapp.com/plans/getAllCategories/', {
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

export default plans;
