import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

export default class ReviewPurchase extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params);
    this.state = {
      booking: this.props.navigation.state.params,
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
            <Text style={textStyles.subTitle}>Open Soul</Text>
            <Text style={textStyles.subTitle}>Live Yoga Class</Text>
            <Text style={([textStyles.minorText], { fontSize: 14 })}>
              Wednesday May 10th
            </Text>
            <Text style={([textStyles.minorText], { fontSize: 14 })}>
              10:00 AM - 11:00 AM (EDT)
            </Text>
          </View>
          <View style={{ flex: 0.4, padding: 10, margin: 5 }}>
            <Image
              style={{ width: 120, height: 80 }}
              source={require("../assets/getStarted0.jpg")}
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
            $15.00 x 3 guests
          </Text>
          <Text style={[textStyles.subBodyText, { color: "#444" }]}>
            $45.00
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
          <Text style={[textStyles.subTitle]}>$15.00 x 3 guests</Text>
          <Text style={[textStyles.subTitle]}>$45.00</Text>
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
            <TouchableOpacity
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
