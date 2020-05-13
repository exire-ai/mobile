import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { shadowStyles } from "../global/shadowStyles";

export default function Chat({
  data
}) {
  var chat = (
    <TouchableOpacity style={{alignItems: 'center'}}>
      <View style={[{height: 65, width: '100%', flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 10}]}>
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <View style={{backgroundColor: "#328232", height: 10, width: 10, borderRadius: 5}}></View>
        </View>
        <View style={{paddingLeft: 6, flexDirection: 'row', alignSelf: 'center'}}>
          <View style={{backgroundColor: "#007aff", height: 48, width: 48, borderRadius: 24, ...shadowStyles.shadowDown}}></View>
        </View>
        <View style={{flex: 1, paddingTop: 8, paddingLeft: 8}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{fontFamily: "nunito-bold", fontSize: 19, color: '#444'}}>{data.name}</Text>
            <Text style={{fontFamily: "nunito-regular", fontSize: 16, color: '#AAA', paddingTop: 1.5, paddingLeft: 27}}>{data.time}</Text>
          </View>
          <Text style={{fontFamily: "nunito-regular", fontSize: 16, color: '#AAA', marginTop: -1}}>{data.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  return chat;
}
