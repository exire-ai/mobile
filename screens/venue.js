import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  AsyncStorage,
  Linking,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import InAppBrowser from "react-native-inappbrowser-reborn";
import _ from "lodash";
import { signInStyles } from "../global/signInStyles";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { navigationStyles } from "../global/navigationStyles";
import { colorScheme } from "../global/colorScheme";

import plans from "../functions/plans";
import users from "../functions/users";

import OnlineEvent from "./OnlineEvent";

async function openLink(url) {
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "cancel",
        preferredBarTintColor: "gray",
        preferredControlTintColor: "white",
        // Android Properties
        showTitle: true,
        toolbarColor: "#6200EE",
        secondaryToolbarColor: "black",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      }).then((result) => {
        // console.log(JSON.stringify(result))
      });
    } else Linking.openURL(url);
  } catch (error) {
    console.log(error.message);
  }
}

function linkOpen(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("error");
    }
  });
}

function MoreInfo({ url }) {
  if (url != "" && url != null) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          signInStyles.button,
          { position: "absolute", bottom: "5%", width: "85%", left: "7.5%" },
          shadowStyles.shadowDown,
        ]}
        onPress={() => {
          linkOpen(url);
        }}
      >
        <Text style={signInStyles.buttonText}>More Info</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const nameDict = {
  artmuseums: ["Art", "🎨"],
  museums: ["Museums", "🖼️"],
  wine_bars: ["Wine", "🍷"],
  speakeasies: ["Speakeasies", "🥃"],
  japanese: ["Japanese", "🍱"],
  bars: ["Bars", "🍺"],
  barbeque: ["Barbeque", "🍖"],
  extreme: ["Extreme", "🧨"],
  cafe: ["Cafe", "☕"],
  bakeries: ["Bakeries", "🥖"],
  danceclubs: ["Clubs", "​🍾​"],
  tea: ["Tea", "🍵"],
  chinese: ["Chinese", "🥡"],
  newamerican: ["American", "🥩"],
  poke: ["Poke", "🍚"],
  acaibowl: ["Acai", "🍓"],
  burgers: ["Burgers", "🍔"],
  dancing: ["Dancing", "💃"],
  pizza: ["Pizza", "🍕"],
  yoga: ["Yoga", "🧘"],
  karaoke: ["Karaoke", "🎤"],
  icecream: ["Ice Cream", "🍦"],
  arcades: ["Arcades", "👾"],
  mexican: ["Mexican", "🌮"],
  oriental: ["Indian", "🇮🇳"],
  sushi: ["Sushi", "🍣"],
  markets: ["Markets", "🏬"],
  parks: ["Parks", "🌲"],
  sandwiches: ["Sandwiches", "🥪"],
  artgalleries: ["Galleries", "🖌️"],
  gelato: ["Gelato", "🍨"],
  italian: ["Italian", "🍝"],
  spa: ["Spa", "🧖‍♀️"],
  cocktailbars: ["Cocktails", "🍸"],
  pubs: ["Pubs", "🍻"],
  rockclimbing: ["Rock Climbing", "🧗"],
  comedyclubs: ["Comedy Clubs", "🤣"],
  online: ["Online", "💻"],
};

export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: this.props.navigation.state.params,
    };
  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  exit = () => {
    // this.props.navigation.navigate("Plans", { update: true });
    this.props.navigation.pop();
  };

  exitToPlans = () => {
    this.props.navigation.pop();
    this.props.navigation.navigate("Plans", { update: true });
  };

  savePlans = () => {
    this.props.navigation.pop();
    this.props.navigation.pop();
    this.props.navigation.navigate("SelectPlan", { createPlan: this.createPlan, venue: this.state.venue });
  };

  savePlan = () => {
    this.props.navigation.pop();
    this.props.navigation.navigate("SelectPlan", { createPlan: this.createPlan, venue: this.state.venue });
  };

  createPlan = (venue, start=Math.round(new Date().getTime())) => {
    //Only called on one-time free online events

    AsyncStorage.getItem("userID").then((value) => {
      //Create plan object
      var booking = {
        type: "one-time",
        slot: null,
      };

      var plan = {
        bookings: [],
        users: [],
        ids: [],
        title: venue.title,
        description: venue.description,
        startUNIX: _.has(venue, 'startUNIX') ? venue.startUNIX : start
      };

      if (venue.category == "event" || venue.category == "online-event") {
        booking.eventID = venue.eventID;
        plan.bookings.push(booking);
      } else {
        booking.eventID = venue.placeID;
      };

      plan.users.push(value);
      plan.ids.push(booking.eventID)

      // Add Plan to plans collection
      plans.create(plan, (planID) => {
        if (planID != false && planID != null) {
          //Add PlanID to user list
          users.addPlan(value, planID, (res) => {
            // console.log(res);
            this.exitToPlans();
          });
        } else {
          console.log(planID);
        }
      });
    });
  };

  sendToChats = () => {
    this.props.navigation.pop();
    console.log(this.state.venue)
    this.props.navigation.navigate('Chats', {
      object: {
        type: "online-event",
        placeID: this.state.venue.eventID,
        title: this.state.venue.title
      }
    })
  };

  render() {
    if (this.state.venue.category == "online-event") {
      return (
        <OnlineEvent
          venue={this.state.venue}
          goBack={this.exit}
          addToPlan={(venue) => {
            this.createPlan(venue);
          }}
          savePlans={this.savePlans}
          sendToChats={this.sendToChats}
        />
      );
    } else {
      if (
        this.state.venue.latitude != 0 &&
        this.state.venue.latitude != null &&
        this.state.venue.longitude != 0 &&
        this.state.venue.longitude != null
      ) {
        var navigationButton = (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: colorScheme.button,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                },
              ]}
              onPress={() => {
                Linking.openURL(
                  Platform.select({
                    ios:
                      "http://maps.apple.com/maps/?q=" +
                      this.state.venue.latitude +
                      "," +
                      this.state.venue.longitude,
                    android:
                      "http://maps.google.com/maps/search/query=" +
                      this.state.venue.latitude +
                      "," +
                      this.state.venue.longitude,
                  })
                );
              }}
            >
              <Icon
                name="map-pin"
                color={colorScheme.primaryText}
                size={28}
                style={[
                  shadowStyles.shadowDown,
                  { paddingLeft: 1, paddingTop: 1 },
                ]}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colorScheme.darkText,
                fontFamily: "Reg",
              }}
            >
              Directions
            </Text>
          </View>
        );
      } else {
        var navigationButton = null;
      }
      if (
        this.state.venue.latitude != 0 &&
        this.state.venue.latitude != null &&
        this.state.venue.longitude != 0 &&
        this.state.venue.longitude != null
      ) {
        var uberButton = (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: "#111",
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                },
              ]}
              onPress={() => {
                Linking.openURL(
                  "https://m.uber.com/ul/?client_id=exire&action=setPickup&dropoff[latitude]=" +
                  this.state.venue.latitude +
                  "&dropoff[longitude]=" +
                  this.state.venue.longitude
                );
              }}
            >
              <Image
                style={[
                  { width: 32, height: 32, tintColor: colorScheme.primaryText },
                  shadowStyles.shadowDown,
                ]}
                source={require("../assets/icons/uber.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colorScheme.darkText,
                fontFamily: "Reg",
              }}
            >
              Uber
            </Text>
          </View>
        );
      } else {
        var uberButton = null;
      }
      if (
        this.state.venue.latitude != 0 &&
        this.state.venue.latitude != null &&
        this.state.venue.longitude != 0 &&
        this.state.venue.longitude != null
      ) {
        var lyftButton = (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: "#FF1493",
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                },
              ]}
              onPress={() => {
                Linking.openURL(
                  "lyft://ridetype?id=lyft&destination[latitude]=" +
                  this.state.venue.latitude +
                  "&destination[longitude]=" +
                  this.state.venue.longitude
                );
              }}
            >
              <Image
                style={[
                  {
                    width: 34,
                    height: 24,
                    tintColor: colorScheme.primaryText,
                    marginTop: 4,
                  },
                  shadowStyles.shadowDown,
                ]}
                source={require("../assets/icons/lyft.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colorScheme.darkText,
                fontFamily: "Reg",
              }}
            >
              Lyft
            </Text>
          </View>
        );
      } else {
        var lyftButton = null;
      }
      if (
        this.state.venue.accessURL != null &&
        this.state.venue.accessURL != ""
      ) {
        var infoButton = (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  backgroundColor: colorScheme.primary,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                },
              ]}
              onPress={() => {
                Linking.openURL(this.state.venue.accessURL);
              }}
            >
              <Icon
                name="info"
                color={colorScheme.primaryText}
                size={32}
                style={[shadowStyles.shadowDown, { paddingTop: 2 }]}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colorScheme.darkText,
                fontFamily: "Reg",
              }}
            >
              More Info
            </Text>
          </View>
        );
      } else {
        var infoButton = null;
      }
      return (
        <View style={styles.container}>
          <View
            style={[
              { flex: 0.35, flexDirection: "row" },
              shadowStyles.shadowDown,
            ]}
          >
            <ImageBackground
              source={{ uri: this.state.venue.imgURL }}
              style={{ width: "100%", height: "100%" }}
            >
              <SafeAreaView>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.goBack()}
                  style={[navigationStyles.icon, { padding: 15 }]}
                >
                  <Icon
                    name="chevron-left"
                    color={colorScheme.primaryText}
                    size={32}
                    style={shadowStyles.shadowDown}
                  />
                </TouchableOpacity>
              </SafeAreaView>
            </ImageBackground>
          </View>
          <View
            style={{
              flex: 0.65,
              width: "100%",
              marginHorizontal: 10,
              marginTop: 15,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderBottomColor: colorScheme.veryLight,
                borderBottomWidth: 1,
                paddingBottom: 10,
                width: "95%",
              }}
            >
              <Text style={[textStyles.titleText, { textAlign: "left" }]}>
                {this.state.venue.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    textStyles.minorText,
                    { textAlign: "left", marginRight: 10, marginTop: 4 },
                  ]}
                >
                  {nameDict[this.state.venue.subcategory][0]}
                </Text>
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: colorScheme.darkText,
                    marginTop: 4,
                    borderRadius: 2,
                    marginRight: 10,
                  }}
                ></View>
                <Text
                  style={[
                    textStyles.minorText,
                    { textAlign: "left", marginTop: 5 },
                  ]}
                >
                  {this.state.venue.cost != 0
                    ? this.state.venue.cost > 15
                      ? this.state.venue.cost > 30
                        ? this.state.venue.cost > 60
                          ? "$$$$"
                          : "$$$"
                        : "$$"
                      : "$"
                    : "Free"}
                </Text>
              </View>
              <Text
                style={[
                  textStyles.minorText,
                  {
                    textAlign: "left",
                    marginTop: 5,
                  },
                ]}
              >
                Open Today{" "}
                {this.state.venue.open > 24
                  ? this.state.venue.open - 24 + " AM "
                  : this.state.venue.open > 12
                    ? this.state.venue.open - 12 + " PM "
                    : this.state.venue.open + " AM "}
                -{" "}
                {this.state.venue.closed > 24
                  ? this.state.venue.closed - 24 + " AM"
                  : this.state.venue.closed > 12
                    ? this.state.venue.closed - 12 + " PM"
                    : this.state.venue.closed + " AM"}
              </Text>

              <Text
                style={[
                  textStyles.subBodyText,
                  { textAlign: "left", marginTop: 5 },
                ]}
              >
                {this.state.venue.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "100%",
                marginVertical: 10,
              }}
            >
              {navigationButton}
              {uberButton}
              {lyftButton}
              {infoButton}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              height: 100,
              bottom: 10,
              flexDirection: "column",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                textStyles.subBodyText,
                { width: "90%", textAlign: "center", fontSize: 14 },
              ]}
            >
              Want to go? Save to a plan and share with a friend!
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.sendToChats}
              style={[
                shadowStyles.shadowDown,
                {
                  height: 50,
                  marginTop: 10,
                  backgroundColor: colorScheme.button,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 10,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 2 },
                  marginBottom: 0,
                },
              ]}
            >
              <Text style={textStyles.buttonText}>Send to Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                shadowStyles.shadowDown,
                {
                  height: 50,
                  marginTop: 10,
                  backgroundColor: colorScheme.activeButton,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 10,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 2 },
                  marginBottom: 60,
                },
              ]}
              onPress={() => {
                this.savePlan();
              }}
            >
              <Text style={textStyles.buttonText}>Save to Experience</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
