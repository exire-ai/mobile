const plans = {
  getAllCategories: function (callback) {
    fetch("http://api.exire.ai/plans/getAllCategories/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback([]);
      });
  },
  getByList: function (venues, callback) {
    fetch("http://api.exire.ai/plans/getByList/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
      body: JSON.stringify({
        ids: venues,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  getRecommended: function (userID, callback) {
    fetch(
      "http://api.exire.ai/plans/getRecommended/" + userID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback([]);
      });
  },
  getByHierCategory: function (category, callback) {
    fetch(
      "http://api.exire.ai/plans/getByHierCategory/" + category,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback([]);
      });
  },
  create: function (body, callback) {
    fetch("http://api.exire.ai/plans/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
    })
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(null);
      });
  },
  getRecommendedGroup: function (users, callback) {
    console.log(users)
    fetch("http://api.exire.ai/plans/getRecommendedGroup/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
      body: JSON.stringify({
        users: users,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
};

export default plans;
