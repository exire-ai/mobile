import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';

import Plan from "../components/Plan"
import { shadowStyles } from "../global/shadowStyles"

const data = [
  {
    name : "Anniversary Night",
    people: [
      {
        name: "Elayna",
        imageURL: "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0"
      },
      {
        name: "Riley",
        imageURL: "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0"
      }
    ],
    time: "Friday, May 1st at 5pm",
    venues: [
      {
        name: "The Met",
        price: "$",
        imageURL: "https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/fifth-avenue/fifthave_1520x1520.jpg?la=en&hash=1FE6007EA93F1EEE1B8F176E930D6751"
      }
    ]
  },
  {
    name : "Girl's Night",
    people: [
      {
        name: "Elayna",
        imageURL: "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0"
      }
    ],
    time: "Monday, May 11th at 7pm",
    venues: [
      {
        name: "The Met",
        price: "$",
        imageURL: "https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/fifth-avenue/fifthave_1520x1520.jpg?la=en&hash=1FE6007EA93F1EEE1B8F176E930D6751"
      }
    ],
  }
]

export default class Plans extends Component {
  render() {

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtratctor={(item, index) => "key" + index + "name" + item.name}
          renderItem={({ item, index}) => (
            <Plan data={item} />
          )}
        />
        <View style={{alignItems: 'flex-end', paddingRight: '2.5%', paddingBottom: '2.5%'}}>
        <TouchableOpacity
          style={[shadowStyles.shadowDown, {backgroundColor: "#328232", height: 60, width: 60, borderRadius: 30, alignItems: 'center'}]}
          onPress={() => { console.log("New Plan Pressed") }}
        >
          <Text style={{fontFamily: "nunito-semibold", color: "#fff", fontSize: 45, marginTop: -2}}>+</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#efefef'
  },
  list: {
    flex: 1,
    width: '100%',
  }
});
