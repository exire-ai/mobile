import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import _ from "lodash";

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { miniVenueStyles } from "../global/miniVenueStyles";
import { plansStyles } from "../global/plansStyles";
import { colorScheme } from "../global/colorScheme";
import DateFormatter from "../global/DateFormatter";

let formatter = new DateFormatter();

const selectedStyle = {
  borderColor: colorScheme.primary,
  borderWidth: 4,
}

function Venue({ plan, image, selected }) {

  return (
    <View style={plansStyles.venue}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // venues.get(item.placeID, (venue) => {
          //   navigation.navigate("Venue", venue)
          // })
        }}
        style={[shadowStyles.shadowDown, miniVenueStyles.venueContainer, selected ? { height: 130, marginTop: 5 } : {}]}
      >
        <ImageBackground
          source={{ uri: image }}
          style={miniVenueStyles.venueImage}
        >
          <View style={miniVenueStyles.venueContent}>
            <View style={{ flexDirection: "column" }}>
              {/* <Text style={miniVenueStyles.venueText}>
                {plan.bookings[0].venue.title}
              </Text>
              <Text style={miniVenueStyles.venueText}>
                {plan.bookings[0].venue.price}
              </Text> */}
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

export default class Plan extends Component {

  state = {
    image: 'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif',
    images: ['https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif']
  }

  componentDidMount() {
    const data = this.props.data;
    const images = data.ids.map(o => o.imgURL);
    if (!this.props.sendToChats) {
      console.log("chat", this.props.data)
    } else {
      console.log("plans", this.props.data)
    }
    this.setState({
      images: images,
      image: images[0]
    });
    this._interval = setInterval(this.cycleImages.bind(this), 7000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  cycleImages() {
    let images = this.state.images;
    const start = images.shift();
    images.push(start);
    this.setState({ images, image: images[0]})
  }

  render() {
    var data = this.props.data;
    var extraStyle = _.get(this.props, 'extraStyle', false);
    var plan = (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ alignItems: "center", paddingTop: 10 }}
        onPress={() => {
          this.props.onTap(data);
        }}
      >
        <View style={[plansStyles.component, shadowStyles.shadowDown, extraStyle ? selectedStyle : {}]}>
          <View style={plansStyles.textContainer}>
            <Text style={plansStyles.name}>{data.title}</Text>
            <Text style={plansStyles.time}>
              {formatter.unixToDate(_.get(data, 'startUNIX')) +
                " at " +
                formatter.unixToTime(_.get(data, 'startUNIX'))}
            </Text>
          </View>
          <View style={plansStyles.venueContainer}>
            <Venue plan={data} selected={extraStyle} image={this.state.image} />
          </View>
        </View>
      </TouchableOpacity>
    );
    return plan;
  }
}
