const dialogflow = {
  sendMessage: function (sessionID, inputText, callback) {
    fetch(
      "https://us-central1-exiretest-kwrrpc.cloudfunctions.net/dialogflowGateway",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionID,
          queryInput: {
            text: {
              text: inputText,
              languageCode: "en-US",
            },
          },
        }),
      }
    )
      .then((response) => response.text())
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((responseJson) => {
        // console.log(responseJson);
        callback(responseJson);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        callback(null);
      });
  },
};

export default dialogflow;
