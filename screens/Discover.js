import React, { Component, useCallback } from "react";
import {
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Modal,
} from "react-native";
import VenueContent from "../components/VenueContent";
import plans from "../functions/plans";
import users from "../functions/users";
import Search from "../components/SearchBar";
import CategorySelection from "../components/CategorySelection";

// Styles Imports
import { discoverStyles } from "../global/discoverStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import Venue from "./venue";

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

var format = (categories) => {
  var temp = [
    {
      name: ["All", ""],
      key: "all",
      selected: true,
    },
  ];
  for (var i in categories) {
    temp.push({
      name: nameDict[categories[i]],
      key: categories[i],
      selected: false,
    });
  }
  return temp;
};

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: ["all"],
      refreshing: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then(userID => {
      this.setState({userID: userID})
      this.loadCategories();
      this.loadData();
    })
  }

  formatVenues = (result, callback) => {
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
    // var test_onlineevent = {
    //   numItems: 1,
    //   key: "exiretestevent",
    //   venue: {
    //     category: "activity",
    //     closed_days: [],
    //     cost: 15,
    //     description:
    //       "Participants will learn that yoga is not only a stress reduction technique, but the path to attaining ultimate freedom of mind by strengthening and empowering the mind.",
    //     imgURL:
    //       "https://dailyburn.com/life/wp-content/uploads/2017/10/Yoga-Class-Mistakes-Main-Image.jpg",
    //     placeID: "testonlineevent",
    //     rank: 92.6,
    //     subcategory: "yoga",
    //     title: "Open Soul",
    //     subtitle: "Live Yoga Class",
    //     type: "online-event",
    //     subtype: "class",
    //     duration: "1",
    //   },
    // };
    // venues.push(test_onlineevent);
    venues.reverse();
    callback(venues);
  };

  loadData = () => {
    this.setState({
      refreshing: true,
    });
    AsyncStorage.getItem("userID").then((value) => {
      // orginallly getRecommend(value
      plans.getByHierCategory("activity", (result) => {
        this.setState({ rawVenues: result})
        //Sets data into form so that it alternates between 1 child venue object and 2 child venue objects
        this.formatVenues(result, (venues) => {
          this.setState({
            venues: [],
          });
          this.setState({
            allVenues: venues,
            venues: venues,
            refreshing: false,
          });
        });
      });
    });
  };

  loadCategories = () => {
    AsyncStorage.getItem("userID").then((value) => {
      users.getCategories(value, (result) => {
        var categories = format(result);
        this.setState({
          categories: categories,
        });
      });
    });
  };

  venueSelected = (venue) => {
    this.props.navigation.navigate("Venue", venue);
  };

  filterCategories = () => {
    var rawVenues = this.state.rawVenues
    var categories = this.state.categories
    var selected = []
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].selected) {
        selected.push(categories[i].key)
      }
    }
    console.log(selected)
    if (selected.length == 1 && selected.includes("all")) {
      this.formatVenues(rawVenues, (venues) => {
        this.setState({
          venues: venues,
        });
      });
    } else {
      var filteredVenues = rawVenues.filter(venue => selected.includes(venue.subcategory))
      this.formatVenues(filteredVenues, (venues) => {
        this.setState({
          venues: venues,
        });
      });
    }
  }

  render() {
    return (
      <View style={discoverStyles.container}>
        {/*<Search />
        <FlatList
          horizontal={true}
          style={{ paddingTop: 3, paddingLeft: 3, height: 60 }}
          data={this.state.categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ height: "100%", paddingLeft: 7 }}
                onPress={() => {
                  var temp = this.state.categories;
                  temp.find(
                    (o) => o.key === item.key
                  ).selected = !item.selected;
                  var noneSelected = true;
                  for (var i in temp) {
                    if (temp[i].selected == true && temp[i].key != "all") {
                      noneSelected = false;
                    }
                  }
                  if (item.key != "all") {
                    temp.find((o) => o.key === "all").selected = noneSelected;
                  } else {
                    for (var i in temp) {
                      if (temp[i].key != "all") {
                        temp[i].selected = false;
                      }
                    }
                  }
                  var noneSelected = true;
                  for (var i in temp) {
                    if (temp[i].selected == true) {
                      noneSelected = false;
                    }
                  }
                  if (noneSelected) {
                    temp.find((o) => o.key === "all").selected = true;
                  }
                  this.setState({ categories: temp });
                  this.filterCategories()
                }}
              >
                <CategorySelection category={item} />
              </TouchableOpacity>
            );
          }}
        />*/}
        <FlatList
          style={{ width: "100%", marginHorizontal: 10, paddingTop: 10 }}
          contentContainerStyle={{justifyContent: 'flex-start'}}
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
                  style={[
                    {
                      flexDirection: "row",
                      marginBottom: 10,
                      marginHorizontal: 10,
                    },
                    shadowStyles.shadowDown,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        marginRight: 5,
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
                        marginLeft: 5,
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
              return (
                <View
                  style={[
                    { flex: 1, marginBottom: 10 },
                    shadowStyles.shadowDown,
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: "#000",
                      height: 245,
                      borderRadius: 15,
                      overflow: "hidden",
                      marginHorizontal: 10,
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
