import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

export default class VenueContent extends Component {
  constructor(props) {
    super(props);
    // console.log(props.venue);
    this.state = {
      venue: this.props.venue,
    };
  }
  render() {
    return (
      <ImageBackground
        source={{ uri: this.state.venue.imgURL }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
          activeOpacity={1.0}
          onPress={() => {
            this.props.onTap(this.state.venue);
          }}
        >
          <Text
            style={{
              color: "white",
              marginBottom: 15,
              marginLeft: 10,
            }}
          >
            {this.state.venue.title}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
