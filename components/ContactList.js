import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import { textStyles } from '../global/textStyles';
import { colorScheme } from '../global/colorScheme';

export default class ContactList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            otherUsers: props.otherUsers ? props.otherUsers: [],
            name: props.name ? props.name : ''
        }
    }

    addContact = (contact) => {
        this.props.addContact(contact);
    }

    render() {
        return(
        <View style={{ flex: 1, width: '100%', marginTop: 10, marginBottom: 100 }}>
          <Text style={[textStyles.titleText, {marginLeft: 15, marginTop: 10, fontSize: 20}]}>Contact List</Text>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
            data={this.props.search}
            numColumns={1}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => "number" + item.number + "name" + item.name}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
              style={{ width: Dimensions.get('screen').width * 0.9, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5, padding: 10 }}
              onPress={() => {
                  this.addContact(item);
                // var temp = this.state.otherUsers
                // temp = temp.filter(function (o) { return o.number != item.number });
                // temp.push({
                //   name: item.name,
                //   number: item.number,
                //   userID: '',
                //   imgURL: ''
                // })
                // this.setState({ otherUsers: temp })
                // users.getByNumber(item.number, (result) => {
                //   if (result) {
                //     var temp = this.state.otherUsers
                //     temp = temp.filter(function (o) { return o.number != item.number });
                //     temp.push({
                //       name: result.name,
                //       number: result.number,
                //       userID: result.userID,
                //       imgURL: result.includes('profileImg') ? result.profileImg : "https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png"
                //     })
                //     this.setState({ otherUsers: temp })
                //   } else {
                //     users.sendTextMsg(item.number, this.state.name + " invited you to join the Exire group " + this.state.chatName + ". Download the app now at https://exire.ai to join!", (result) => {
                //       console.log(result)
                //     })
                //   }
                // })
                // this.setState({text: ""})
                // this.addContact("")
              }}
              >
                <Text style={{ fontFamily: "Bold", color: colorScheme.lessDarkText, fontSize: 17 }}>{
                  item.name
                }</Text>
                <Text style={[{ fontFamily: "SemiBold", fontSize: 17, color: "#007AFF"}]}>Invite</Text>

              </TouchableOpacity>
            )}
          />
        </View>
        )
    }
}

