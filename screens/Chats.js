import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";

import Chat from "../components/Chat";
import { shadowStyles } from "../global/shadowStyles"
import { fromTop } from 'react-navigation-transitions';

const data = [
  {
    name : "Emma (personal assistant)",
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
    time: "5:30 PM",
    message: "Hello Hayden! I can help you create ..."
  },
  {
    name : "Emma (personal assistant)",
    people: [
      {
        name: "Emma",
        imageURL: "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0"
      }
    ],
    time: "5:30 PM",
    message: "Hello Hayden! I can help you create ..."
  }
]

function Search({}) {
  return (
    <View style={[{height: 35, backgroundColor: '#fff', marginHorizontal: 15, marginVertical: 10, borderRadius: 5, flexDirection: 'row'}, shadowStyles.shadowDown]}>
      <Icon
        name="search"
        color="#888"
        size={16}
        style={[shadowStyles.shadowDown, {alignSelf: 'center', paddingHorizontal: 10}]}
      />
      <TextInput style={{color: '#aaa', fontSize: 16}} placeholder={"Search..."}></TextInput>
    </View>
  )
}

export default class Chats extends Component {
  render() {

    return (
      <View style={styles.container}>
        <Search />
        {/* <SearchBar 
          containerStyle={{backgroundColor: "#efefef", borderColor: '#efefef'}}
          inputStyle={{backgroundColor: "#fff"}}
        /> */}
        <FlatList
          style={styles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtratctor={(item, index) => "key" + index + "name" + item.name}
          renderItem={({ item, index}) => (
            <Chat data={item} />
          )}
        />
        <TouchableOpacity
          style={[shadowStyles.shadowDown, {backgroundColor: "#328232", height: 60, width: 60, borderRadius: 30, alignItems: 'center', alignSelf: 'flex-end', marginRight: '2.5%', marginBottom: '2.5%'}]}
          onPress={() => { console.log("New Chat Pressed") }}
        >
          <Text style={{fontFamily: "nunito-bold", color: "#fff", fontSize: 45, marginTop: -2}}>+</Text>
        </TouchableOpacity>
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
