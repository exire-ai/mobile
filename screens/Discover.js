import React, { Component, useCallback } from 'react';
import {
    View,
    FlatList,
    AsyncStorage,
    TouchableOpacity,
    Text
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import VenueContent from '../components/VenueContent';
import plans from '../functions/plans';
import users from '../functions/users';
import SearchBar from '../components/SearchBar';
import CategorySelection from '../components/CategorySelection';

// Styles Imports
import { discoverStyles } from '../global/discoverStyles';
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';
import { textStyles } from '../global/textStyles';

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

const nameDict = {
    artmuseums: ['Art', '🎨'],
    museums: ['Museums', '🖼️'],
    wine_bars: ['Wine', '🍷'],
    speakeasies: ['Speakeasies', '🥃'],
    japanese: ['Japanese', '🍱'],
    bars: ['Bars', '🍺'],
    barbeque: ['Barbeque', '🍖'],
    extreme: ['Extreme', '🧨'],
    cafe: ['Cafe', '☕'],
    bakeries: ['Bakeries', '🥖'],
    danceclubs: ['Clubs', '​🍾​'],
    tea: ['Tea', '🍵'],
    chinese: ['Chinese', '🥡'],
    newamerican: ['American', '🥩'],
    poke: ['Poke', '🍚'],
    acaibowl: ['Acai', '🍓'],
    burgers: ['Burgers', '🍔'],
    dancing: ['Dancing', '💃'],
    pizza: ['Pizza', '🍕'],
    yoga: ['Yoga', '🧘'],
    karaoke: ['Karaoke', '🎤'],
    icecream: ['Ice Cream', '🍦'],
    arcades: ['Arcades', '👾'],
    mexican: ['Mexican', '🌮'],
    oriental: ['Indian', '🇮🇳'],
    sushi: ['Sushi', '🍣'],
    markets: ['Markets', '🏬'],
    parks: ['Parks', '🌲'],
    sandwiches: ['Sandwiches', '🥪'],
    artgalleries: ['Galleries', '🖌️'],
    gelato: ['Gelato', '🍨'],
    italian: ['Italian', '🍝'],
    spa: ['Spa', '🧖‍♀️'],
    cocktailbars: ['Cocktails', '🍸'],
    pubs: ['Pubs', '🍻'],
    rockclimbing: ['Rock Climbing', '🧗'],
    comedyclubs: ['Comedy Clubs', '🤣']
};

var format = (categories) => {
    var temp = [
        {
            name: ['All', ''],
            key: 'all',
            selected: true
        },
        {
            name: ['Online', '💻'],
            key: 'online',
            selected: false
        }
    ];
    for (var i in categories) {
        temp.push({
            name: nameDict[categories[i]],
            key: categories[i],
            selected: false
        });
    }
    return temp;
};

export default class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selected: ['all'],
            refreshing: true,
            onboard: 'false',
            validCategories: [],
            query: ''
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('userID').then((userID) => {
            this.setState({ userID });
            this.loadCategories();
            this.loadData();
            AsyncStorage.getItem('onboard').then((onboard) => {
                this.setState({
                    onboard
                });
            });
        });
    }

    formatVenues(data, callback, load = false) {
        var tempDuplicates = [];
        data = data.filter((o) => {
            var id = o.placeID != null ? o.placeID : o.eventID;
            if (tempDuplicates.includes(id)) {
                return false;
            } else {
                tempDuplicates.push(id);
                return true;
            }
        });

        var venues = [];
        var doubleVenue = {};
        var validCategories = [];

        var double = data.length >= 2;
        var doubleRep = false;
        var single = !double;

        for (var i = 0; i < data.length; i++) {
            var id =
                data[i].placeID != null ? data[i].placeID : data[i].eventID;
            if (load && !validCategories.includes(data[i].subcategory)) {
                validCategories.push(data[i].subcategory);
            }
            if (single) {
                venues.push({
                    venue: data[i],
                    key: id,
                    numItems: 1
                });
                if (data.length - i != 2) {
                    double = true;
                    single = false;
                }
            } else if (doubleRep) {
                doubleVenue.venue2 = data[i];
                doubleVenue.key = doubleVenue.key.concat(id);
                doubleRep = false;
                single = true;
                venues.push(doubleVenue);
            } else if (double) {
                doubleVenue = {
                    venue1: data[i],
                    key: id,
                    numItems: 2
                };
                double = false;
                doubleRep = true;
            }
        }
        if (load) {
            this.setState({ validCategories });
        }
        callback(venues);
    }

    loadData = () => {
        this.setState({
            refreshing: true
        });
        AsyncStorage.getItem('userID').then((value) => {
            plans.getRecommended(value, (result1) => {
                plans.getByHierCategory('online-event', (result) => {
                    for (var i = 0; i < result.length; i++) {
                        result[i]['subcategory'] = 'online';
                    }
                    result = result.concat(result1);
                    shuffle(result);
                    this.setState({ rawVenues: result });
                    //Sets data into form so that it alternates between 1 child venue object and 2 child venue objects
                    this.formatVenues(
                        result,
                        (venues) => {
                            this.setState({
                                venues: []
                            });
                            this.setState({
                                allVenues: venues,
                                venues: venues,
                                refreshing: false
                            });
                        },
                        true
                    );
                });
            });
        });
    };

    loadCategories = () => {
        AsyncStorage.getItem('userID').then((value) => {
            users.getCategories(value, (result) => {
                var categories = format(result);
                this.setState({
                    categories: categories
                });
            });
        });
    };

    venueSelected = (venue) => {
        this.props.navigation.navigate('Venue', venue);
    };

    filterCategories = () => {
        var rawVenues = this.state.rawVenues;
        var categories = this.state.categories;
        var selected = [];
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].selected) {
                selected.push(categories[i].key);
            }
        }
        if (selected.length == 1 && selected.includes('all')) {
            this.formatVenues(rawVenues, (venues) => {
                this.setState({
                    venues: venues
                });
            });
        } else {
            var filteredVenues = rawVenues.filter((venue) =>
                selected.includes(venue.subcategory)
            );
            this.formatVenues(filteredVenues, (venues) => {
                this.setState({
                    venues: venues
                });
            });
        }
    };

    setSearch = (query) => {
        let { categories, selected } = this.state;
        if (selected !== ['all']) {
            for (var i in categories) {
                categories[i].selected = categories[i].key === 'all';
            }
            this.setState({ selected, categories });
            this.filterCategories();
        }
        selected = ['all'];
        this.setState({ query });
    };

    render() {
        return (
            <View style={discoverStyles.container}>
                <SearchBar setSearch={this.setSearch} />
                <NavigationEvents
                    onDidFocus={() => {
                        AsyncStorage.getItem('onboard').then((onboard) => {
                            this.setState({
                                onboard: onboard
                            });
                        });
                    }}
                />
                <FlatList
                    horizontal={true}
                    style={{ paddingTop: 3, paddingLeft: 3, height: 60 }}
                    data={
                        this.state.validCategories === []
                            ? this.state.categories
                            : this.state.categories.filter(
                                  (o) =>
                                      o.key === 'all' ||
                                      this.state.validCategories.includes(o.key)
                              )
                    }
                    keyExtractor={(o) => o.key}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={{ height: '100%', paddingLeft: 7 }}
                                onPress={() => {
                                    var temp = this.state.categories;
                                    temp.find(
                                        (o) => o.key === item.key
                                    ).selected = !item.selected;
                                    var noneSelected = true;
                                    for (var i in temp) {
                                        if (
                                            temp[i].selected == true &&
                                            temp[i].key != 'all'
                                        ) {
                                            noneSelected = false;
                                        }
                                    }
                                    if (item.key != 'all') {
                                        temp.find(
                                            (o) => o.key === 'all'
                                        ).selected = noneSelected;
                                    } else {
                                        for (var i in temp) {
                                            if (temp[i].key != 'all') {
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
                                        temp.find(
                                            (o) => o.key === 'all'
                                        ).selected = true;
                                    }
                                    this.setState({ categories: temp });
                                    this.filterCategories();
                                }}
                            >
                                <CategorySelection category={item} />
                            </TouchableOpacity>
                        );
                    }}
                />
                <FlatList
                    style={{
                        width: '100%',
                        marginHorizontal: 10,
                        paddingTop: 10,
                        height: '100%'
                    }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingBottom: 10
                    }}
                    data={
                        this.state.query === ''
                            ? this.state.venues
                            : this.state.venues.filter((o) => {
                                  let query = this.state.query.toLowerCase();
                                  if (o.numItems == 1) {
                                      return (
                                          o.venue.title
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue.description
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue.subcategory
                                              .toLowerCase()
                                              .includes(query)
                                      );
                                  } else {
                                      return (
                                          o.venue1.title
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue1.description
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue1.subcategory
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue2.title
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue2.description
                                              .toLowerCase()
                                              .includes(query) ||
                                          o.venue2.subcategory
                                              .toLowerCase()
                                              .includes(query)
                                      );
                                  }
                              })
                    }
                    onRefresh={() => {
                        this.loadData();
                    }}
                    keyExtractor={(o) => o.key}
                    refreshing={this.state.refreshing}
                    renderItem={({ item }) => {
                        if (item.numItems == 2) {
                            if (
                                item.venue1 == undefined ||
                                item.venue2 == undefined
                            ) {
                                return <View style={{ height: 10 }}></View>;
                            }
                            return (
                                <View
                                    style={[
                                        {
                                            flexDirection: 'row',
                                            marginBottom: 10,
                                            marginHorizontal: 10
                                        },
                                        shadowStyles.shadowDown
                                    ]}
                                >
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                marginRight: 5,
                                                height: 245,
                                                borderRadius: 15,
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <VenueContent
                                                venue={item.venue1}
                                                onTap={this.venueSelected.bind(
                                                    this
                                                )}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                marginLeft: 5,
                                                height: 245,
                                                borderRadius: 15,
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <VenueContent
                                                venue={item.venue2}
                                                onTap={this.venueSelected.bind(
                                                    this
                                                )}
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
                                        shadowStyles.shadowDown
                                    ]}
                                >
                                    <View
                                        style={{
                                            backgroundColor: '#000',
                                            height: 245,
                                            borderRadius: 15,
                                            overflow: 'hidden',
                                            marginHorizontal: 10
                                        }}
                                    >
                                        <VenueContent
                                            venue={item.venue}
                                            onTap={this.venueSelected.bind(
                                                this
                                            )}
                                        />
                                    </View>
                                </View>
                            );
                        }
                    }}
                />
                {this.state.onboard != 'false' ? (
                    <View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,.3)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <View
                            style={[
                                {
                                    width: '88%',
                                    backgroundColor:
                                        colorScheme.componentBackground,
                                    padding: 15,
                                    borderRadius: 15,
                                    marginBottom: 20
                                },
                                shadowStyles.shadowDown
                            ]}
                        >
                            <Text
                                style={[
                                    textStyles.titleText,
                                    { width: '100%', textAlign: 'center' }
                                ]}
                            >
                                Discover Experiences
                            </Text>
                            <Text
                                style={[
                                    textStyles.standardBodyText,
                                    {
                                        width: '100%',
                                        textAlign: 'center',
                                        marginTop: 10
                                    }
                                ]}
                            >
                                Here you'll be able to look through venues and
                                events near you and find something you're
                                interested in.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[
                                    {
                                        width: '100%',
                                        padding: 10,
                                        borderRadius: 10,
                                        backgroundColor: colorScheme.button,
                                        marginTop: 20,
                                        marginBottom: 3
                                    },
                                    shadowStyles.shadowDown
                                ]}
                                onPress={() =>
                                    this.props.navigation.navigate('Chats')
                                }
                            >
                                <Text
                                    style={[
                                        textStyles.standardBodyText,
                                        {
                                            width: '100%',
                                            textAlign: 'center',
                                            color: colorScheme.primaryText
                                        }
                                    ]}
                                >
                                    Next
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }
}
