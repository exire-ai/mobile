import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";
import { useNavigationFocus } from "react-navigation";
import Plan from "../components/Plan";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import users from "../functions/users";
import venues from "../functions/venues";
import { textStyles } from "../global/textStyles";

import DateFormatter from "../global/DateFormatter";

var formatter = new DateFormatter();

export default class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      refreshing: false,
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isFocused !== this.props.isFocused) {
  //     // Use the `this.props.isFocused` boolean
  //     // Call any action
  //     console.log("Hello");
  //   }
  // }

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.loadData);

    this.loadData();
  }

  // componentDidUpdate() {
  //   this.loadData();
  // }

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
    this.props.navigation.navigate("PlanDetail", item["bookings"][0].venue);
  };

  render() {
    if (this.state.data == null || this.state.data.length == 0) {
      return (
        <View style={[plansStyles.container, { alignItems: "flex-start" }]}>
          {/* <View
            style={{
              marginLeft: 25,
              width: 195,
              marginTop: 15,
            }}
          > */}
          {/* <Text
              style={[textStyles.standardBodyText, { textAlign: "center" }]}
            >
              Begin planning your first experience on Exire
            </Text> */}
          {/* <Text
              style={[
                textStyles.standardBodyText,
                { width: "100%", textAlign: "center" },
              ]}
            >
              by
            </Text> */}
          {/* </View> */}
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                textStyles.titleText,
                {
                  // marginLeft: 25,
                  marginTop: 5,
                  fontSize: "20",
                  width: "100%",
                  textAlign: "center",
                  padding: 20,
                },
              ]}
            >
              To Plan your first experience with Exire
            </Text>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Text
                style={[
                  textStyles.standardBodyText,
                  { width: "65%", textAlign: "center" },
                ]}
              >
                Talk to Emma(your personal assistant) on the Chats tab, for a
                personalized experience
              </Text>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: "contain",
                  tintColor: "#444",
                }}
                source={require("../assets/icons/chat.png")}
              />
            </View>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <Image
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: "contain",
                  tintColor: "#444",
                  transform: [{ rotate: "180deg" }],
                }}
                source={require("../assets/icons/compass.png")}
              />
              <Text
                style={[
                  textStyles.standardBodyText,
                  { width: "65%", textAlign: "center" },
                ]}
              >
                Head over to the Discover tab to browse recommendations
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
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
              <Plan data={item} onTap={this.planTapped.bind(this)} />
            )}
          />
          {/* <TouchableOpacity
          activeOpacity={0.5}
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => {
            this.props.navigation.navigate("CreatePlan");
          }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity> */}
        </View>
      );
    }
  }
}
