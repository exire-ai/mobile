import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import VenueContent from "../components/VenueContent";
import plans from "../functions/plans";

// Styles Imports
import { discoverStyles } from "../global/discoverStyles";
import { signInStyles } from "../global/signInStyles";

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
    };
  }
  // const [people, setPeople] = useState([
  //   // {
  //   //   venue1: { title: "sushi damo", type: "venue", key: "1" },
  //   //   venue2: { title: "maru karaoke", type: "venue", key: "2" },
  //   //   numItems: 2,
  //   //   key: "1",
  //   // },
  //   // {
  //   //   venue1: { title: "sushi damo", type: "venue", key: "1" },
  //   //   venue2: { title: "maru karaoke", type: "venue", key: "2" },
  //   //   numItems: 2,
  //   //   key: "4",
  //   // },
  // ]);

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
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
        for (var i = 0; i < venues.length; i++) {
          // console.log(venues[i].key);
        }
        // console.log(venues.length);
        venues.reverse();
        this.setState({
          venues: venues,
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
        <FlatList
          style={{ flex: 1, marginTop: 10, width: "95%" }}
          data={this.state.venues}
          renderItem={({ item }) => {
            if (item.numItems == 2) {
              // console.log(item);
              // console.log(item.venue1);
              // console.log(item.venue2);
              if (item.venue1 == undefined || item.venue2 == undefined) {
                // console.log(item);
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
                        marginRight: 7.5,
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
