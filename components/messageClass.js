import React from "react";
import { View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import _ from "lodash";

// Styles Imports
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme"
import { messagesStyles } from "../global/messagesStyles";
import venues from "../functions/venues";
import events from "../functions/events";
import plans from "../functions/plans";

function Venues({ special, navigation }) {
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
        scrollEnabled={special.venues.length > 2}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 15 }}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => (
          <View style={[{ paddingRight: 5 }, shadowStyles.shadowDown]}>
            <TouchableOpacity activeOpacity={.5}
              onPress={() => {
                if (item.placeID != null) {
                  venues.get(item.placeID, (venue) => {
                    console.log(venue)
                    navigation.navigate("Venue", venue)
                  })
                } else if (item.eventID != null) {
                  events.get(item.eventID, (venue) => {
                    navigation.navigate("Venue", venue)
                  })
                }
              }}
              style={messagesStyles.venueContainer}
            >
              <ImageBackground
                source={{ uri: item.imgURL }}
                style={messagesStyles.venueImage}
              >
                <View style={messagesStyles.venueContent}>
                  <Text style={messagesStyles.venueText}>
                    {item.title + "\n"}
                    <Text style={{ fontFamily: 'Bold', fontSize: 15 }}>{item.cost > 15
                      ? item.cost > 30
                        ? item.cost > 60
                          ? "$$$$"
                          : "$$$"
                        : "$$"
                      : "$"}
                    </Text>
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
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
      navigation: this.props.navigation
    }
    if (_.has(this.props.special, 'venues')) {
      this.setState({
        special: {
          venues: this.props.special.venues.map(x => {
            return {
              cost: 0,
              imgURL: "https://www.cabinetmakerwarehouse.com/wp-content/uploads/9242-gull-grey.jpg",
              title: "",
              placeID: x
            }
          })
        }
      })
    } else if (_.has(this.props.special, 'plan')) {
      this.setState({
        special: { plan: {} }
      })
    }
  }

  planTapped = (item) => {
    if (item.ids.length !== 0) {
      this.props.navigation.navigate("PlanDetail", { plan: item, sendToChats: false });
    }
  };

  componentDidMount() {
    if (_.has(this.props.special, 'venues')) {
      plans.getByList(this.props.special.venues, venues => {
        this.setState({
          special: {
            venues: venues
          }
        })
      })
    } else if (_.has(this.props.special, "plan")) {
      plans.get(this.props.special.plan, data => {
        this.setState({
          plan: data
        })
      })
    }
  }

  render() {
    const temp = this.state.message.includes("@Emma") ? this.state.message.split("@Emma") : this.state.message.split("@emma");

    let message;
    if (temp.length == 2) {
      message = (
        <Text style={[messagesStyles.text, { marginTop: -1 }]}>
          <Text>{temp[0]}</Text>
          <Text style={{ fontFamily: "Bold" }}>@Emma</Text>
          <Text>{temp[1]}</Text>
        </Text>
      )
    } else {
      message = (
        <Text style={[messagesStyles.text, { marginTop: -1 }]}>{this.state.message}</Text>
      )
    }
    var MessageObj = (
      <View style={{ width: "100%" }}>
        <View style={[messagesStyles.chatContainer]}>
          <View style={[{ paddingLeft: 6, flexDirection: "row" }, shadowStyles.shadowDown]}>
            <View style={[messagesStyles.profileImage]}>
              <ImageBackground source={{ uri: this.state.imgURL }} style={{ width: 48, height: 48 }}>
              </ImageBackground>
            </View>
          </View>
          <View style={{ flex: 1, paddingTop: 8, paddingLeft: 8 }}>
            <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
              <Text style={messagesStyles.name}>{this.state.name}</Text>
              <Text style={[messagesStyles.text, { paddingLeft: 15, color: colorScheme.inactiveButton }]}>{this.state.time}</Text>
            </View>
            {message}
          </View>
        </View>
        {_.has(this.state.special, "venues") ?
          <Venues special={this.state.special} navigation={this.props.navigation} />
          : false
        }
        {_.has(this.state.special, "plan") && typeof this.state.special.plan !== 'string' ?
            <Plan data={this.state.plan} onTap={this.planTapped.bind(this)} sendToChats={false} />
          : false
        }
      </View>
    )
    return MessageObj
  }
}
