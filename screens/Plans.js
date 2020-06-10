import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";
import { useNavigationFocus, NavigationEvents } from "react-navigation";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Notifications } from "expo";

import Plan from "../components/Plan";

import users from "../functions/users";
import venues from "../functions/venues";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import { colorScheme } from "../global/colorScheme";

import DateFormatter from "../global/DateFormatter";

var formatter = new DateFormatter();

export default class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      refreshing: false,
      expoPushToken: "",
      onboard: 'false'
    };
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      console.log(finalStatus);
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      AsyncStorage.getItem("userID").then((userID) => {
        users.updateExpoPushToken(userID, token, (res) => {
          console.log(res);
        });
      });

      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", this.loadData);
    this.registerForPushNotificationsAsync();
    this.loadData();
    AsyncStorage.getItem("onboard").then(onboard => {
      this.setState({
        onboard: onboard
      })
    })
  }

  loadData = () => {
    formatter.unixToDate(1590519261);
    this.setState({
      refreshing: true,
    });
    AsyncStorage.getItem("userID").then((userID) => {
      users.getPlans(userID, (response) => {
        var now = Math.round(new Date().getTime());
        var upcoming = [];
        var previous = [];
        for (var i = 0; i < response.length; i++) {
          if (response[i].start_time > now) {
            upcoming.push(response[i]);
          } else {
            previous.push(response[i]);
          }
        }
        this.setState({
          data: response,
          upcoming: upcoming,
          previous: previous,
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
    if (
      this.state.data == null ||
      this.state.data.length == 0 ||
      this.state.data === false
    ) {
      return (
        <View style={[plansStyles.container, { alignItems: "flex-start" }]}>
          <NavigationEvents
            onDidFocus={() => {
              AsyncStorage.getItem("onboard").then(onboard => {
                this.setState({
                  onboard: onboard
                })
              })
            }}
          />
          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              backgroundColor: this.state.onboard != 'false' ? "rgba(0,0,0,.3)" : "rgba(0,0,0,0)"
            }}
          >
            <View
              style={[
                {
                  width: "88%",
                  backgroundColor: colorScheme.componentBackground,
                  padding: 15,
                  borderRadius: 15,
                  marginBottom: 20,
                },
                shadowStyles.shadowDown,
              ]}
            >
              <Text
                style={[
                  textStyles.titleText,
                  { width: "100%", textAlign: "center" },
                ]}
              >
                { this.state.onboard != 'false' ? "Welcome to Exire" : "Create A Plan" }
              </Text>
              <Text
                style={[
                  textStyles.standardBodyText,
                  { width: "100%", textAlign: "center", marginTop: 10 },
                ]}
              >
                { this.state.onboard != 'false' ? "Let's take a tour of the app to get you familiar with how it works!" : "Create your first plan through the discover on the left or through conversation on the right."}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  {
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colorScheme.button,
                    marginTop: 20,
                    marginBottom: 3,
                  },
                  shadowStyles.shadowDown,
                ]}
                onPress={() => this.props.navigation.navigate("Discover")}
              >
                <Text
                  style={[
                    textStyles.standardBodyText,
                    {
                      width: "100%",
                      textAlign: "center",
                      color: colorScheme.primaryText,
                    },
                  ]}
                >
                  { this.state.onboard != 'false' ? "Let's Go!" : "Explore Experiences" }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={plansStyles.container}>
          {this.state.upcoming.length > 0 ? (
            <Text style={plansStyles.sectionText}>Upcoming</Text>
          ) : null}
          {this.state.upcoming.length > 0 ? (
            <FlatList
              style={plansStyles.list}
              data={this.state.upcoming}
              showsVerticalScrollIndicator={false}
              onRefresh={() => {
                this.loadData();
              }}
              refreshing={this.state.refreshing}
              keyExtratctor={(item) => "name" + item.title + item.start_time}
              renderItem={({ item, index }) => (
                <Plan data={item} onTap={this.planTapped.bind(this)} />
              )}
            />
          ) : null}
          {this.state.previous.length > 0 ? (
            <Text style={plansStyles.sectionText}>Previous</Text>
          ) : null}
          {this.state.previous.length > 0 ? (
            <FlatList
              style={plansStyles.list}
              data={this.state.previous}
              showsVerticalScrollIndicator={false}
              onRefresh={() => {
                this.loadData();
              }}
              refreshing={this.state.refreshing}
              keyExtratctor={(item) => "name" + item.title + item.start_time}
              renderItem={({ item, index }) => (
                <Plan data={item} onTap={this.planTapped.bind(this)} />
              )}
            />
          ) : null}
        </View>
      );
    }
  }
}
