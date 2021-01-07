const notifs = {
    sendNotif: function (time, title, body, tokens, callback) {
        fetch('https://exire-notifications.herokuapp.com/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: 'e7b7f332-228d-499d-9c34-fadf2898efb3'
            },
            body: JSON.stringify({
                time: time,
                title: title,
                body: body,
                tokens: tokens
            })
        })
            .then((response) => response.json())
            .then((json) => {
                callback(json);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                callback(null);
            });
    }
};

export default notifs;
