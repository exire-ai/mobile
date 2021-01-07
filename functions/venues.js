const venues = {
    get: function (placeID, callback) {
        fetch('http://api.exire.ai/venues/get/' + placeID, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: 'e7b7f332-228d-499d-9c34-fadf2898efb3'
            }
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

export default venues;
