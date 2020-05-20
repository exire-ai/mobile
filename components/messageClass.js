import React from 'react';
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme'
import { messagesStyles } from '../global/messagesStyles';
import venues from '../functions/venues';
import plans from '../functions/plans';

function Venues({ special, navigation }) {
  if (special.hasOwnProperty("venues")) {
      return (
        <View
          style={{
            marginBottom: 10,
            marginTop: 5,
          }}
        >
          <FlatList
            horizontal={true}
            data={special.venues}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 15}}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
              <View style={[{ paddingRight: 5 }, shadowStyles.shadowDown]}>
                <TouchableOpacity
                  onPress={() => {
                    venues.get(item.placeID, (venue) => {
                      navigation.navigate('Venue', venue)
                    })
                  }}
                  style={messagesStyles.venueContainer}
                >
                  <ImageBackground
                    source={{ uri: item.imgURL }}
                    style={messagesStyles.venueImage}
                  >
                    <View style={messagesStyles.venueContent}>
                      <Text style={messagesStyles.venueText}>
                        {item.title + '\n'}
                        {item.cost > 15
                          ? item.cost > 30
                            ? item.cost > 60
                              ? '$$$$'
                              : '$$$'
                            : '$$'
                          : '$'}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )
  } else {
    return (
      <View />
    )
  }
}



export class MessageClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      message: this.props.message,
      time: this.props.time,
      imgURL: this.props.imgURL,
      special: {},
    }
  }

  componentDidMount() {
    plans.getByList(this.props.special.venues, venues => {
      this.setState({
        special: {
          venues: venues
        }
      })
    }) 
  }

  render() {
    if (this.state.message.includes('@Emma')) {
      var temp = this.state.message.split("@Emma")
    } else {
      var temp = this.state.message.split("@emma")
    }

    var message;

    if (temp.length == 2) {
      message = (
        <Text style={[messagesStyles.text, { marginTop: -1 }]}>
          <Text>{temp[0]}</Text>
          <Text style={{ fontFamily: 'nunito-bold' }}>@Emma</Text>
          <Text>{temp[1]}</Text>
        </Text>
      )
    } else {
      message = (
        <Text style={[messagesStyles.text, { marginTop: -1 }]}>{this.state.message}</Text>
      )
    }
    var MessageObj = (
      <View style={{ width: '100%' }}>
        <View style={[messagesStyles.chatContainer]}>
          <View style={{ paddingLeft: 6, flexDirection: 'row' }}>
            <View style={[messagesStyles.profileImage, shadowStyles.shadowDown]}>
              <ImageBackground source={{ uri: this.state.imgURL }} style={{ width: 48, height: 48 }}>
              </ImageBackground>
            </View>
          </View>
          <View style={{ flex: 1, paddingTop: 8, paddingLeft: 8 }}>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
              <Text style={messagesStyles.name}>{this.state.name}</Text>
              <Text style={[messagesStyles.text, { paddingLeft: 15, color: colorScheme.inactiveButton }]}>{this.state.time}</Text>
            </View>
            {message}
          </View>
        </View>
        <Venues special={this.state.special} navigation={this.props.navigation}/>
      </View>
    )
    return MessageObj
  }
}
