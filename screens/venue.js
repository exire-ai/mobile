import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  Linking,
  Button,
  Image,
} from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { signInStyles } from "../global/signInStyles";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { shadow } from "react-native-paper";
// import { Button } from "react-native-paper";

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
        style={[
          signInStyles.button,
          { position: "absolute", bottom: "5%", width: "85%", left: "7.5%" },
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

  render() {
    console.log(this.state.venue.type);
    if (this.state.venue.type == "online-event") {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.35, flexDirection: "row" }}>
            <ImageBackground
              source={{ uri: this.state.venue.imgURL }}
              style={{ width: "100%", height: "100%" }}
            >
              <SafeAreaView>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={[navigationStyles.icon, { padding: 15 }]}
                >
                  <Icon
                    name="chevron-left"
                    color="#FFF"
                    size={32}
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.3,
                      shadowRadius: 1,
                    }}
                  />
                </TouchableOpacity>
              </SafeAreaView>
            </ImageBackground>
          </View>
          <View
            style={{
              flex: 0.65,
              width: "90%",
              marginLeft: 5,
              marginTop: 15,
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={[textStyles.titleText, { textAlign: "left" }]}>
              {this.state.venue.title}
            </Text>
            <Text style={[textStyles.titleText, { textAlign: "left" }]}>
              {this.state.venue.subtitle}
            </Text>
            <Text
              style={[
                textStyles.subBodyText,
                { textAlign: "left", marginTop: 5 },
              ]}
            >
              {this.state.venue.description}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                style={{ width: 16, height: 16, marginTop: 4, marginRight: 10 }}
                source={require("../assets/clock.png")}
              />
              <Text style={textStyles.minorText}>
                {this.state.venue.duration + " hr"}
              </Text>
            </View>
            {/* ----Line Separator---- */}
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#DDD",
                marginTop: 15,
              }}
            ></View>
          </View>
          <View
            style={{
              width: "100%",
              position: "absolute",
              height: 100,
              bottom: 0,
              flexDirection: "row",
              flex: 1,
            }}
          >
            <Text
              style={[{ flex: 0.5, textAlign: "center" }, textStyles.minorText]}
            >
              {"From $" + this.state.venue.cost + " per person"}
            </Text>
            <View
              style={{
                flex: 0.5,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("DateTime");
                }}
                style={[
                  shadowStyles.shadowDown,
                  {
                    backgroundColor: "#007aff",
                    width: "90%",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 7,
                  },
                ]}
              >
                <Text style={textStyles.buttonText}>See times</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.35, flexDirection: "row" }}>
          <ImageBackground
            source={{ uri: this.state.venue.imgURL }}
            style={{ width: "100%", height: "100%" }}
          >
            <TouchableOpacity
              style={{ padding: 15, marginLeft: 15, marginTop: 40 }}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 32,
                  shadowColor: "black",
                  shadowRadius: 5,
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 0.65,
            width: "90%",
            marginLeft: 5,
            marginTop: 15,
            alignItems: "flex-start",
            flexDirection: "column",
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
                backgroundColor: "#444",
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
              {this.state.venue.cost > 15
                ? this.state.venue.cost > 30
                  ? this.state.venue.cost > 60
                    ? "$$$$"
                    : "$$$"
                  : "$$"
                : "$"}
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
          {/* <MoreInfo url={this.state.venue.accessURL} /> */}
          {/* ----Line Separator---- */}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#DDD",
              marginTop: 15,
            }}
          ></View>
          {/* ----Direction Bubble, png has clipping issue-----

          <TouchableOpacity style={{ padding: 10 }}>
            <Image
              style={{ height: 42, width: 42, marginTop: 15 }}
              source={require("../assets/directions.png")}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            width: "100%",
            position: "absolute",
            // height: 100,
            bottom: 0,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Text
            style={[
              textStyles.subBodyText,
              { width: "70%", textAlign: "center", fontSize: 14 },
            ]}
          >
            We can't book this for you, but you can add it to a plan!
          </Text>
          <TouchableOpacity
            style={[
              shadowStyles.shadowDown,
              {
                height: 50,
                marginTop: 10,
                backgroundColor: "#007aff",
                justifyContent: "center",
                alignItems: "center",
                width: "85%",
                borderRadius: 10,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 2 },
              },
            ]}
          >
            <Text style={textStyles.buttonText}>Planning a visit?</Text>
          </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
});
