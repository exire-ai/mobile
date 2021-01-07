import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Styles Imports
import { shadowStyles } from '../global/shadowStyles';
import { chatsStyles } from '../global/chatsStyles';
import { colorScheme } from '../global/colorScheme';

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
    rockclimbing: ['Rock Climbing', '🧗']
};

var format = (categories) => {
    var temp = [
        {
            name: ['All', ''],
            key: 'all',
            selected: true
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

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        categories: format(this.props.categories)
    };

    render() {
        return (
            <FlatList
                style={{ width: '100%', paddingLeft: 7, paddingTop: 3 }}
                data={this.state.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={[{ padding: 5 }, shadowStyles.shadowDown]}
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
                            this.setState({ categories: temp });
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 5,
                                backgroundColor: item.selected
                                    ? colorScheme.primary
                                    : colorScheme.componentBackground,
                                paddingHorizontal: 15,
                                paddingVertical: 9,
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: -1,
                                    fontFamily: 'Bold',
                                    color: item.selected
                                        ? colorScheme.primaryText
                                        : colorScheme.darkText,
                                    fontSize: 17
                                }}
                            >
                                {item.name[0]}{' '}
                            </Text>
                            <Text style={{ marginTop: -1, fontSize: 19 }}>
                                {item.name[1]}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
}
