import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { messageStyles } from '../../global/messageStyles';
import venues from '../../functions/venues';
import { navigationStyles } from '../../global/navigationStyles';

export function VenuesMessage({
  venueData,
  spaceAbove,
  spaceBelow,
  navigation
}) {
  return (
    <View
        style={{
        marginBottom: spaceBelow,
        marginTop: spaceAbove,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        }}
    >
        <FlatList
        horizontal={true}
        data={venueData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
            <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity
                onPress={() => { 
                  venues.get(item.placeID, (venue) => {
                    navigation.navigate('Venue', venue)
                  })
                }}
                style={messageStyles.venueContainer}
            >
              <ImageBackground
                source={{ uri: item.imgURL }}
                style={messageStyles.venueImage}
              >
              <View style={messageStyles.venueContent}>
                  <Text style={messageStyles.venueText}>
                  {item.title + '\n'}
                  {item.cost > 15
                      ? item.cost > 30
                      ? item.cost > 60
                          ? '$$$$'
                          : '$$$'
                      : '$$'
                      : '$'}
                  </Text>
              </View>
              </ImageBackground>
            </TouchableOpacity>
            </View>
        )}
        />
    </View>
  );
}