import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import _ from 'lodash';

// Style Imports
import { shadowStyles } from '../global/shadowStyles';
import { miniVenueStyles } from '../global/miniVenueStyles';
import { plansStyles } from '../global/plansStyles';
import { colorScheme } from '../global/colorScheme';
import DateFormatter from '../global/DateFormatter';

let formatter = new DateFormatter();

const selectedStyle = {
    borderColor: colorScheme.primary,
    borderWidth: 4
};

function Venue({ image, selected }) {
    return (
        <View style={plansStyles.venue}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    // venues.get(item.placeID, (venue) => {
                    //   navigation.navigate("Venue", venue)
                    // })
                }}
                style={[
                    shadowStyles.shadowDown,
                    miniVenueStyles.venueContainer,
                    selected ? { height: 130, marginTop: 5 } : {}
                ]}
            >
                <ImageBackground
                    source={{ uri: image }}
                    style={miniVenueStyles.venueImage}
                >
                    <View style={miniVenueStyles.venueContent}>
                        <View style={{ flexDirection: 'column' }}></View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}

export default function Plan(props) {
    let [image, setImage] = useState(
        'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'
    );
    let [images, setImages] = useState([
        'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif'
    ]);

    const data = props.data;
    const extraStyle = _.get(props, 'extraStyle', false);

    useEffect(() => {
        const images = data.ids.map((o) => o.imgURL);
        setImages(images);
        setImage(images[0]);
        let _interval = setInterval(() => {
            const start = images.shift();
            images.push(start);
            setImage(images[0]);
        }, 7000);

        return () => {
            clearInterval(_interval);
        };
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{ alignItems: 'center', paddingTop: 10 }}
            onPress={() => {
                props.onTap(data);
            }}
        >
            <View
                style={[
                    plansStyles.component,
                    shadowStyles.shadowDown,
                    extraStyle ? selectedStyle : {}
                ]}
            >
                <View style={plansStyles.textContainer}>
                    <Text style={plansStyles.name}>{data.title}</Text>
                    <Text style={plansStyles.time}>
                        {formatter.unixToDate(_.get(data, 'startUNIX')) +
                            ' at ' +
                            formatter.unixToTime(_.get(data, 'startUNIX'))}
                    </Text>
                </View>
                <View style={plansStyles.venueContainer}>
                    <Venue plan={data} selected={extraStyle} image={image} />
                </View>
            </View>
        </TouchableOpacity>
    );
}
