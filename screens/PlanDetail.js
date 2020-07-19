import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { textStyles } from "../global/textStyles";
import DateFormatter from "../global/DateFormatter";
import VenueContent from "../components/VenueContent";

let formatter = new DateFormatter();

export default class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: this.props.navigation.state.params,
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
        <View style={{ marginVertical: 25, marginHorizontal: 20 }}>
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
          <FlatList
            horizontal={true}
            data={this.state.plan.ids}
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: 125,
                  width: 115,
                  backgroundColor: "grey",
                  overflow: "hidden",
                  borderRadius: 10,
                  marginRight: 10,
                }}
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
        </View>
      </View>
    );
  }
}
