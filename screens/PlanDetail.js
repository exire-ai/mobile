import React, { useState, Component } from "react";
import {
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  Linking,
} from "react-native";
import { textStyles } from "../global/textStyles";
import { TextInput } from "react-native-paper";
import DateFormatter from "../global/DateFormatter";

let formatter = new DateFormatter();

export default class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: this.props.navigation.state.params,
    };
  }

  render() {
    const watchButton = (
      <Button
        title="WATCH HERE"
        onPress={() => {
          console.log(this.state.booking);
          Linking.canOpenURL(this.state.booking.ticketURL).then((supported) => {
            if (supported) {
              Linking.openURL(this.state.booking.ticketURL);
            } else {
              console.log(
                "Don't know how to open URI: " + this.state.booking.ticketURL
              );
            }
          });
        }}
      />
    );
    if (this.state.booking.category == "online-event") {
      console.log(this.state.booking);
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 0.35, flexDirection: "row" }}>
            <ImageBackground
              source={{
                uri: this.state.booking.imgURL,
              }}
              style={{ width: "100%", height: "100%" }}
            ></ImageBackground>
          </View>
          <View
            style={{
              flex: 0.65,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 5,
              width: "90%",
            }}
          >
            <Text
              style={[
                { textAlign: "left", marginTop: 15 },
                textStyles.titleText,
              ]}
            >
              {this.state.booking.title}
            </Text>
            <Text
              style={[
                {
                  textAlign: "left",
                  marginTop: 10,
                  width: "80%",
                },
                textStyles.subBodyText,
              ]}
            >
              {this.state.booking.description}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Image
                source={require("../assets/clock.png")}
                style={{ width: 16, height: 16, marginTop: 3 }}
              />
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                {/* <Text style={textStyles.minorText}>
                  {this.state.booking.venue}
                </Text> */}
                <Text style={textStyles.minorText}>
                  {formatter.unixToDate(this.state.booking.startUNIX) +
                    " at " +
                    formatter.unixToTime(this.state.booking.startUNIX)}
                </Text>
              </View>
            </View>
            {this.state.booking.ticketURL != null ? watchButton : null}
            {/* <View style={{ marginTop: 10 }}>
            <Text style={textStyles.subTitle}>Who"s Attending</Text>

          </View> */}
          </View>
        </View>
      );
    }
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={textStyles.subTitle}>Plan Detail</Text>
      </View>
    );
  }
}
