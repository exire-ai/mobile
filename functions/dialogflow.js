const dialogflow = {
    sendMessage: function (userID, sessionID, inputText, users, callback) {
        fetch(
            'https://us-central1-exiretest-kwrrpc.cloudfunctions.net/dialogflowGateway',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: sessionID + '%' + userID,
                    queryInput: {
                        text: {
                            text: inputText,
                            languageCode: 'en-US'
                        },
                        users: users,
                        userID: userID
                    }
                })
            }
        )
            .then((response) => response.text())
            .then((text) => (text.length ? JSON.parse(text) : {}))
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                callback(null);
            });
    }
};

export default dialogflow;
