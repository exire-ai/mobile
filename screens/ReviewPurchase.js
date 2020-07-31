import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import DateFormatter from "../global/DateFormatter";

var formatter = new DateFormatter();

export default class ReviewPurchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booking: this.props.navigation.state.params.booking,
      numAttendees: this.props.navigation.state.params.numAttendees,
      venue: this.props.navigation.state.params.venue,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          {/*---- Name, Time, Image Details Box ----*/}
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <Text style={textStyles.subTitle}>{this.state.venue.title}</Text>
            <Text
              style={[textStyles.subTitle, { marginTop: 0, marginBottom: 10 }]}
            >
              {this.state.venue.subtitle}
            </Text>
            <Text style={([textStyles.minorText], { fontSize: 14 })}>
              {formatter.formattedDate(this.state.booking.date)}
            </Text>
            <Text style={([textStyles.minorText], { fontSize: 14 })}>
              {formatter.formattedHour(this.state.booking.startTime)} -{" "}
              {formatter.formattedHour(this.state.booking.endTime)}
            </Text>
          </View>
          <View style={{ flex: 0.4, padding: 10, margin: 5 }}>
            <Image
              style={{ width: 120, height: 80 }}
              source={{ uri: this.state.venue.imgURL }}
            />
          </View>
        </View>

        <View
          style={{
            width: "90%",
            height: 0.5,
            backgroundColor: "#ddd",
            marginTop: 5,
          }}
        ></View>
        {/*---- Cost, # Attendees Box ----*/}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 5,
            padding: 15,
          }}
        >
          <Text style={[textStyles.subBodyText, { color: "#444" }]}>
            {"$15.00 x " + this.state.numAttendees + " guests"}
          </Text>
          <Text style={[textStyles.subBodyText, { color: "#444" }]}>
            {"$" + this.state.numAttendees * this.state.booking.cost}
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            height: 0.5,
            backgroundColor: "#ddd",
            marginTop: 5,
          }}
        ></View>
        {/*----- Total Cost Box -----*/}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            marginTop: 5,
            padding: 15,
          }}
        >
          <Text style={[textStyles.subTitle]}>Total (USD)</Text>
          <Text style={[textStyles.subTitle]}>
            {"$" + this.state.numAttendees * this.state.booking.cost}
          </Text>
        </View>

        {/*----- Floating Action Button -----*/}
        <View
          style={{
            width: "100%",
            position: "absolute",
            height: 100,
            bottom: 10,
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity activeOpacity={.5}
              onPress={() => {
                // this.props.navigation.navigate("DateTime");
                console.log("NAVIGATE NOW");
              }}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: colorScheme.activeButton,
                  width: "90%",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                },
              ]}
            >
              <Text style={textStyles.buttonText}>Add Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colorScheme.componentBackground,
  },
});
