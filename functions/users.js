const users = {
  get: function (userID, callback) {
    fetch("http://api.exire.ai/users/get/" + userID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        return false;
      });
  },
  createUser: function (userID, name, number, profileImg, callback) {
    fetch("http://api.exire.ai/users/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
      body: JSON.stringify({
        userID: userID,
        name: name,
        number: number,
        profileImg: profileImg
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
  doesExist: function (userID, callback) {
    fetch("http://api.exire.ai/users/doesExist/" + userID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
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
  addCategories: function (userID, categories, callback) {
    fetch("http://api.exire.ai/users/addCategories" + userID, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
      body: JSON.stringify(categories),
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
  updateName: function (userID, name, callback) {
    fetch(
      "http://api.exire.ai/users/updateName/" +
      userID +
      "/" +
      name,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  updateCategories: function (userID, categories, callback) {
    fetch(
      "http://api.exire.ai/users/updateCategories/" + userID,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
        body: JSON.stringify(categories),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  getChatUser: function (userID, callback) {
    fetch("http://api.exire.ai/users/getChat/" + userID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
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
  updateChat: function (userID, chatID, callback) {
    fetch(
      "http://api.exire.ai/users/updateChat/" +
      userID +
      "/" +
      chatID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  updateToken: function (userID, newToken, callback) {
    fetch(
      "http://api.exire.ai/users/updateToken/" +
      userID +
      "/" +
      newToken,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  phoneAuth: function (number, callback) {
    fetch("http://api.exire.ai/external/phoneAuth/" + number, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (typeof responseJson["code"] == "number") {
          callback(responseJson);
        } else {
          callback(false);
        }
      })
      .catch((error) => {
        callback(false);
      });
  },
  doesNumberExist: function (number, callback) {
    fetch(
      "http://api.exire.ai/users/doesNumberExist/" + number,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  getByNumber: function (number, callback) {
    fetch("http://api.exire.ai/users/getByNumber/" + number, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
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
  getCategories: function (userID, callback) {
    fetch("http://api.exire.ai/users/getCategories/" + userID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
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
  getWelcomeMessage: function (userID, callback) {
    fetch(
      "http://api.exire.ai/users/getWelcomeMessage/" + userID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  updateLocation: function (userID, lat, lon, callback) {
    fetch(
      "http://api.exire.ai/users/updateLocation/" +
      userID +
      "/" +
      lat +
      "/" +
      lon,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  sendTextMsg: function (number, message, callback) {
    fetch(
      "http://api.exire.ai/external/sendTextMsg/" + number,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
        body: JSON.stringify({ message: message }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  getFriends: function (userID, callback) {
    fetch("http://api.exire.ai/users/getFriends/" + userID, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
      },
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
  deleteFriend: function (userID, otherUserID, callback) {
    fetch(
      "http://api.exire.ai/users/deleteFriend/" +
      userID +
      "/" +
      otherUserID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  addFriend: function (userID, otherUserID, callback) {
    fetch(
      "http://api.exire.ai/users/addFriend/" +
      userID +
      "/" +
      otherUserID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
  addPlan: function (userID, planID, callback) {
    fetch(
      "http://api.exire.ai/users/addPlan/" +
      userID +
      "/" +
      planID,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token": "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(null);
      });
  },
  getPlans: function (userID, callback) {
    fetch(
      "http://api.exire.ai/users/getPlans/" +
      userID +
      "?populate=true",
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
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(null);
      });
  },
  updateExpoPushToken: function (userID, expoPushToken, callback) {
    fetch(
      "http://api.exire.ai/users/updateExpoPushToken/" +
      userID +
      "/" +
      expoPushToken,
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
      .then((json) => {
        callback(json);
      })
      .catch((error) => {
        console.log(JSON, stringify(error));
        callback(false);
      });
  },
  updateProfileImg: function (userID, profileImg, callback) {
    fetch(
      "http://api.exire.ai/users/updateProfileImg/" + userID,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "token" : "e7b7f332-228d-499d-9c34-fadf2898efb3"
        },
        body: JSON.stringify({ profileImg: profileImg }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(false);
      });
  },
};

export default users;
