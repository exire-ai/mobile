const events = {
    get: function (eventID, callback) {
        fetch('https://exire-backend.herokuapp.com/events/get/' + eventID, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                callback(responseJson);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                callback([]);
            });
    }
};

export default events;
