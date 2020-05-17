import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";

// Components Imports 
import Chat from "../components/Chat";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles"
import { chatsStyles } from "../global/chatsStyles";
import { plansStyles } from "../global/plansStyles";

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
    <View style={[chatsStyles.search, shadowStyles.shadowDown]}>
      <Icon
        name="search"
        color="#888"
        size={16}
        style={[shadowStyles.shadowDown, chatsStyles.icon]}
      />
      <TextInput style={chatsStyles.textInput} placeholder={"Search..."}></TextInput>
    </View>
  )
}

export default class Chats extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={chatsStyles.container}>
        <Search />
        <FlatList
          style={chatsStyles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtratctor={(item, index) => "key" + index + "name" + item.name}
          renderItem={({ item, index}) => (
            <Chat 
              data={item} 
              navigate={() => { 
                this.props.navigation.setParams({routeName: 'yooo'})
                console.log(this.props.navigation)
                this.props.navigation.navigate('Chat') 
              }}
            />
          )}
        />
        <TouchableOpacity
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => { console.log('New Chat') }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
