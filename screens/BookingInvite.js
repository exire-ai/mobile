import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

export default class BookingInvite extends Component {
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
        <Text style={textStyles.subTitle}>Invite Friends</Text>
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
          <Text
            style={[
              textStyles.minorText,
              { flex: 0.5, textAlign: "center", fontFamily: "nunito-bold" },
            ]}
          >
            {"From $" + this.state.booking.cost + " per person"}
          </Text>
          <View
            style={{
              flex: 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ReviewPurchase");
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
              <Text style={textStyles.buttonText}>Continue</Text>
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
    justifyContent: "center",
    backgroundColor: colorScheme.componentBackground,
  },
});
