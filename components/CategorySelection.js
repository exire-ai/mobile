import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import VenueContent from "../components/VenueContent";
import plans from "../functions/plans";
import users from "../functions/users";
import Categories from "../components/Categories";
import Search from "../components/SearchBar";

// Styles Imports
import { discoverStyles } from "../global/discoverStyles";
import { signInStyles } from "../global/signInStyles";
import { ThemeConsumer } from "react-native-elements";
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";
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

export default class CategorySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
    };
  }

  render() {
    const item = this.state.category;
    return (
      <View style={[{borderRadius: 5, backgroundColor: item.selected ? colorScheme.primary : colorScheme.componentBackground, paddingHorizontal: 15, paddingVertical: 9, alignItems: "center", flexDirection: "row"}, shadowStyles.shadowDown]}>
        <Text style={{marginTop: -1, fontFamily: "nunito-bold", color: item.selected ? colorScheme.primaryText : colorScheme.darkText, fontSize: 17}}>{item.name[0]} </Text>
        <Text style={{marginTop: -1, fontSize: 19}}>{item.name[1]}</Text>
      </View>
    )
  }
}
