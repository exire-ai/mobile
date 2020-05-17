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
import Search from "../components/SearchBar";
import CategorySelection from "../components/CategorySelection";

// Styles Imports
import { discoverStyles } from "../global/discoverStyles";
import { signInStyles } from "../global/signInStyles";
import { ThemeConsumer } from "react-native-elements";
import { shadowStyles } from "../global/shadowStyles";
import { chatsStyles } from "../global/chatsStyles";
import { colorScheme } from "../global/colorScheme";

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [
        {
          venue1: { title: "sushi damo", type: "venue" },
          venue2: { title: "maru karaoke", type: "venue" },
          numItems: 2,
          key: "1",
        },
      ],
      categories: [
        { name: "all", selected: true },
        { name: "sushi", selected: false },
        { name: "pubs", selected: false },
        { name: "spa", selected: false },
      ],
      selected: ["all"],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
    this.loadCategories();
  }

  loadData = () => {
    this.setState({
      refreshing: true,
    });
    console.log("refreshing");
    AsyncStorage.getItem("userID").then((value) => {
      plans.getRecommended(value, (result) => {
        //Sets data into form so that it alternates between 1 child venue object and 2 child venue objects
        var venues = [];
        var doubleVenue = {};
        var current = 0;
        for (var i = 0; i < result.length; i++) {
          if (current == 2) {
            var singleVenue = {};
            singleVenue.venue = result[i];
            singleVenue.key = i.toString();
            singleVenue.numItems = 1;
            venues.push(singleVenue);

            current = 0;
          } else if (current == 1) {
            doubleVenue.venue2 = result[i];

            current++;
          } else {
            doubleVenue.venue1 = result[i];
            doubleVenue.key = i.toString();
            doubleVenue.numItems = 2;
            venues.push(doubleVenue);
            doubleVenue = {};
            current++;
          }
        }
        venues.reverse();
        this.setState({
          venues: [],
        });
        this.setState({
          venues: venues,
          refreshing: false,
        });
      });
    });
  };

  loadCategories = () => {
    AsyncStorage.getItem("userID").then((value) => {
      users.getCategories(value, (result) => {
        var categories = [];
        for (var i = 0; i < result.length; i++) {
          categories.push({ name: result[i], selected: false });
        }
        categories.push({ name: "all", selected: true });

        categories.reverse();
        this.setState({
          categories: categories,
        });
      });
    });
  };

  venueSelected = (venue) => {
    console.log(venue.title);
  };

  render() {
    return (
      <View style={discoverStyles.container}>
        {/* <Categories categories={this.state.categories} /> */}
        <Search />
        <FlatList
          horizontal={true}
          style={{ paddingTop: 5, paddingLeft: 5, paddingBottom: 10 }}
          data={this.state.categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CategorySelection category={item} />;
          }}
        />
        <FlatList
          style={{ marginTop: 5, width: "95%" }}
          data={this.state.venues}
          onRefresh={() => {
            this.loadData();
          }}
          refreshing={this.state.refreshing}
          renderItem={({ item }) => {
            if (item.numItems == 2) {
              if (item.venue1 == undefined || item.venue2 == undefined) {
                return <View></View>;
              }

              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        marginRight: 7.5,
                        height: 245,
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                    >
                      <VenueContent
                        venue={item.venue1}
                        onTap={this.venueSelected.bind(this)}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        marginLeft: 7.5,
                        height: 245,
                        borderRadius: 15,
                        overflow: "hidden",
                      }}
                    >
                      <VenueContent
                        venue={item.venue2}
                        onTap={this.venueSelected.bind(this)}
                      />
                    </View>
                  </View>
                </View>
              );
            } else {
              // console.log(item);
              return (
                <View style={{ flex: 1, marginBottom: 10 }}>
                  <View
                    style={{
                      backgroundColor: "#000",
                      height: 245,
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  >
                    <VenueContent
                      venue={item.venue}
                      onTap={this.venueSelected.bind(this)}
                    />
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
    );
  }
}
