import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { miniVenueStyles } from "../global/miniVenueStyles";
import { plansStyles } from "../global/plansStyles";
import DateFormatter from "../global/DateFormatter";

let formatter = new DateFormatter();

function Venue({ plan }) {
  return (
    <View style={plansStyles.venue}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // venues.get(item.placeID, (venue) => {
          //   navigation.navigate("Venue", venue)
          // })
        }}
        style={[shadowStyles.shadowDown, miniVenueStyles.venueContainer]}
      >
        <ImageBackground
          source={{ uri: plan.bookings[0].venue.imgURL }}
          style={miniVenueStyles.venueImage}
        >
          <View style={miniVenueStyles.venueContent}>
            <View style={{ flexDirection: "column" }}>
              <Text style={miniVenueStyles.venueText}>
                {plan.bookings[0].venue.title}
              </Text>
              <Text style={miniVenueStyles.venueText}>
                {plan.bookings[0].venue.price}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

export default class Plan extends Component {
  render() {
    let data = this.props.data;
    var plan = (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ alignItems: "center", paddingTop: 10 }}
        onPress={() => {
          this.props.onTap(data);
        }}
      >
        <View style={[plansStyles.component, shadowStyles.shadowDown]}>
          <View style={plansStyles.textContainer}>
            <Text style={plansStyles.name}>{data.title}</Text>
            <Text style={plansStyles.time}>
              {formatter.unixToDate(data.start_time) +
                " at " +
                formatter.unixToTime(data.start_time)}
            </Text>
          </View>
          <View style={plansStyles.venueContainer}>
            <Venue plan={data} />
          </View>
        </View>
      </TouchableOpacity>
    );
    return plan;
  }
}
