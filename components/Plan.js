import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

// Style Imports
import { shadowStyles } from "../global/shadowStyles";
import { miniVenueStyles } from "../global/miniVenueStyles";
import { plansStyles } from "../global/plansStyles";

function Venue({
  venues
}) {
  return (
    <View style={plansStyles.venue}>
    <TouchableOpacity
        onPress={() => {
          // venues.get(item.placeID, (venue) => {
          //   navigation.navigate('Venue', venue)
          // })
         }}
        style={[shadowStyles.shadowDown, miniVenueStyles.venueContainer]}
    >
      <ImageBackground
        source={{ uri: venues[0].imageURL }}
        style={miniVenueStyles.venueImage}
      >
      <View style={miniVenueStyles.venueContent}>
        <View style={{flexDirection: 'column'}}>
          <Text style={miniVenueStyles.venueText}>{venues[0].name}</Text>
          <Text style={miniVenueStyles.venueText}>{venues[0].price}</Text>
        </View>
      </View>
      </ImageBackground>
    </TouchableOpacity>
    </View>
  )
}

export default function Plan({
  data
}) {
  var plan = (
    <TouchableOpacity style={{alignItems: 'center', paddingTop: 10}}>
      <View style={[plansStyles.component, shadowStyles.shadowDown]}>
        <View style={plansStyles.textContainer}>
          <Text style={plansStyles.name}>{data.name}</Text>
          <Text style={plansStyles.time}>{data.time}</Text>
        </View>
        <View style={plansStyles.venueContainer}>
          <Venue venues={data.venues} />
        </View>
      </View>
    </TouchableOpacity>
  )
  return plan;
}
