import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { shadowStyles } from "../global/shadowStyles";
import { miniVenueStyles } from "../global/miniVenueStyles";

function Venue({
  venues
}) {
  return (
    <View style={{height: 115, width: '100%', justifyContent: 'center', paddingRight: 10}}>
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
      <View style={[{height: 130.39, width: '95%', backgroundColor: "#fff", flexDirection: 'row', alignItems: 'flex-start', borderRadius: 13.29}, shadowStyles.shadowDown]}>
        <View style={{flex: .7, paddingLeft: 10, paddingTop: 7.5,}}>
          <Text style={{fontFamily: "nunito-bold", fontSize: 19, color: '#333333'}}>{data.name}</Text>
          <Text style={{fontFamily: "nunito-regular", fontSize: 16, color: '#444444'}}>{data.time}</Text>
        </View>
        <View style={{flex: .3, justifyContent: 'flex-end', paddingVertical: 7.5}}>
          <Venue venues={data.venues} />
        </View>
      </View>
    </TouchableOpacity>
  )
  return plan;
}
