import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import Plan from "../components/Plan";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import users from "../functions/users";
import venues from "../functions/venues";

import DateFormatter from "../global/DateFormatter";

var formatter = new DateFormatter();

export default class Plans extends Component {
  state = {
    data: null,
    refreshing: false,
  };

  componentDidMount() {
    this.loadData();
  }

  // getVenues = async (venueIDs, callback) => {
  //   venueIDs.forEach(async (venueID) => {
  //     const response = await fetch(
  //       `https://exire-backend.herokuapp.com/venues/get/${venueID}`
  //     );
  //     const venue = await response.json();
  //     console.log("hello");
  //     console.log(venue);
  //   });
  // };

  loadData = () => {
    formatter.unixToDate(1590519261);
    this.setState({
      refreshing: true,
    });
    AsyncStorage.getItem("userID").then((userID) => {
      users.getPlans(userID, (response) => {
        this.setState({
          data: response,
        });

        this.setState({
          refreshing: false,
        });
      });
    });
  };

  planTapped = (item) => {
    console.log(item.bookings[0].venue);
    this.props.navigation.navigate("PlanDetail", item["bookings"][0].venue);
  };

  render() {
    return (
      <View style={plansStyles.container}>
        <FlatList
          style={plansStyles.list}
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.loadData();
          }}
          refreshing={this.state.refreshing}
          keyExtratctor={(item, index) => "key" + index + "name" + item.title}
          renderItem={({ item, index }) => (
            console.log(item),
            (<Plan data={item} onTap={this.planTapped.bind(this)} />)
          )}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => {
            this.props.navigation.navigate("CreatePlan");
          }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
