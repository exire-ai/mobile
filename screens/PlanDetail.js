import React, { Component } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import DateFormatter from "../global/DateFormatter";
import VenueContent from "../components/VenueContent";

let formatter = new DateFormatter();

export default class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: this.props.navigation.state.params.plan,
    };
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <View style={{ marginTop: 25, marginHorizontal: 20 }}>
          <Text
            style={[textStyles.subTitle, { fontSize: 24, marginBottom: 5 }]}
          >
            {this.state.plan.title}
          </Text>
          <Text style={[textStyles.subBodyText, { marginBottom: 5 }]}>
            {this.state.plan.description}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 7.5, marginTop: 3 }}
              source={require("../assets/clock.png")}
            />
            <Text style={textStyles.minorText}>
              {formatter.unixToDate(this.state.plan.startUNIX)} at{" "}
              {formatter.unixToTime(this.state.plan.startUNIX)}
            </Text>
          </View>
        </View>
        <FlatList
          horizontal={true}
          data={this.state.plan.ids}
          style={{ paddingLeft: 20, width: '100%' }}
          renderItem={({ item, index }) => (
            <View
              style={[shadowStyles.shadowDown, {
                height: 125,
                width: 115,
                backgroundColor: "grey",
                overflow: "hidden",
                borderRadius: 10,
                marginRight: 10,
              }]}
            >
              <VenueContent
                hideRank={true}
                venue={item}
                onTap={(data) => {
                  this.props.navigation.navigate("Venue", data);
                }}
              />
            </View>
          )}
        />
        { this.props.navigation.state.params.sendToChats ? (
          <View
            style={{ marginBottom: 20, alignItems: 'center', width: '100%' }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.state.params.sendToChats(this.state.plan.planID, this.state.plan.title)}
              style={[
                shadowStyles.shadowDown,
                {
                  height: 50,
                  backgroundColor: colorScheme.button,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 10,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 2 },
                },
              ]}
            >
              <Text style={textStyles.buttonText}>Send to Chat</Text>
            </TouchableOpacity>
          </View>
        ) : false}
      </View>
    );
  }
}
