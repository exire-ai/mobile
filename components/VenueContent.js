import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { shadowStyles } from "../global/shadowStyles";

export default class VenueContent extends Component {
  constructor(props) {
    super(props);
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
          activeOpacity={0.5}
          onPress={() => {
            this.props.onTap(this.state.venue);
          }}
        >
          <Text
            style={[{
              color: "#86f231",
              position: 'absolute',
              top: 10,
              right: 10,
              fontFamily: "nunito-bold",
              fontSize: 15
            }, shadowStyles.shadowDown]}
          >
            {Math.ceil(this.state.venue.rank)}% Match
          </Text>
          <Text
            style={[{
              color: "#fff",
              marginBottom: 10,
              marginLeft: 10,
              fontFamily: "nunito-semibold",
              fontSize: 19
            }, shadowStyles.shadowDown]}
          >
            {this.state.venue.title}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
