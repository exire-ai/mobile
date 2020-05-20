import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  SafeAreaView
} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import InAppBrowser from "react-native-inappbrowser-reborn";
import { signInStyles } from "../global/signInStyles";
import { navigationStyles } from "../global/navigationStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";

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
          { position: "absolute", bottom: "2.5%", width: "85%", left: "7.5%", height: 50, borderRadius: 10, backgroundColor: colorScheme.activeButton, alignItems: 'center', justifyContent: 'center' },
          shadowStyles.shadowDown
        ]}
        onPress={() => {
          linkOpen(url);
        }}
      >
        <Text style={{ fontSize: 22, fontFamily: 'nunito-bold', color: colorScheme.primaryText }}>Add to Plan</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

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
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.35, flexDirection: "row" }}>
          <ImageBackground
            source={{ uri: this.state.venue.imgURL }}
            style={{ width: "100%", height: "100%" }}
          >
            <SafeAreaView>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[navigationStyles.icon]}>
                <Icon
                  name='chevron-left'
                  color='#FFF'
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
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <View style={{ paddingBottom: 10, borderBottomColor: colorScheme.veryLight, borderBottomWidth: 1, width: '100%' }}>
            <Text
              style={[
                { textAlign: "left", width: "95%", fontSize: 28, marginHorizontal: 10, marginTop: 10, fontFamily: 'nunito-bold', color: colorScheme.lessDarkText },
              ]}
            >
              {this.state.venue.title}
            </Text>
            <Text
              style={[
                { textAlign: "left", width: "95%", fontSize: 17, marginHorizontal: 10, marginTop: 5, fontFamily: 'nunito-semibold', color: colorScheme.lessDarkText }
              ]}
            >
              {nameDict[this.state.venue.subcategory][0]}   {this.state.venue.cost > 15
                ? this.state.venue.cost > 30
                  ? this.state.venue.cost > 60
                    ? "$$$$"
                    : "$$$"
                  : "$$"
                : "$"}
            </Text>
            <Text
              style={[
                { textAlign: "left", width: "95%", fontSize: 17, marginHorizontal: 10, marginTop: 5, fontFamily: 'nunito-semibold', color: colorScheme.lessDarkText }
              ]}
            >
              Open Today {this.state.venue.open > 24 ? this.state.venue.open - 24 + ' AM ' : this.state.venue.open > 12 ? this.state.venue.open - 12 + ' PM ' : this.state.venue.open + ' AM '}
           - {this.state.venue.closed > 24 ? this.state.venue.closed - 24 + ' AM' : this.state.venue.closed > 12 ? this.state.venue.closed - 12 + ' PM' : this.state.venue.closed + ' AM'}
            </Text>
            <Text
              style={[
                { textAlign: "left", width: "95%", fontSize: 19, marginHorizontal: 10, marginTop: 5, fontFamily: 'nunito-regular', color: colorScheme.lesserDarkText }
              ]}
            >
              {this.state.venue.description}
            </Text>
          </View>
          <MoreInfo url={this.state.venue.accessURL} />
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
    height: '100%'
  },
});
