import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

export function Message({ message, overMin, sameAsNext, owner, venues, first }) {
    var spaceBelow = sameAsNext ? 1 : 5
    spaceBelow = overMin ? spaceBelow : 5
    var spaceAbove = first ? 0 : 5
    var messageJSX = (
        <View style={{paddingLeft: 7.5, marginBottom: spaceBelow, marginTop: spaceAbove}}>
            <View style={styles.message}>
                <Text style={styles.messsageText}>{message}</Text>
            </View>
        </View>
    )
    if (venues.length > 0) {
        messageJSX = (
        <View style={{marginBottom: spaceBelow, marginTop: spaceAbove}}>
            <FlatList
            horizontal={true}
            data={venues}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <View style={{paddingLeft: 10}}>
                    <TouchableOpacity
                        onPress={() => console.log("Clicked")}
                        style={styles.venueContainer}
                    >
                        <ImageBackground source={{ uri: item.imgURL}} style={styles.venueImage}>
                            <View style={styles.venueContent}>
                                <Text style={styles.venueText}>
                                    {item.title + '\n'}
                                    {item.cost > 15 ? item.cost > 30 ? item.cost > 60 ? '$$$$' : '$$$' : '$$' : '$' }
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            )}
          />
        </View>
        );
    } else if (owner) {
        messageJSX = (
        <View style={[styles.ownerMessage, {marginBottom: spaceBelow, marginTop: spaceAbove}]}>
            <View style={[styles.message, { backgroundColor: "#007aff" }]}>
                <Text style={[styles.messsageText, {color: "#fff"}]}>{message}</Text>
            </View>
        </View>
        )
    }
    return messageJSX
}

const styles = StyleSheet.create({
  messsageText: {
    fontFamily: 'karla-regular',
    fontSize: 18
  },
  message: {
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    width: '65%'
  },
  ownerMessage: {
    paddingRight: 7.5,
    alignItems: 'flex-end',
  },
  venueContainer: {
    flex: 1,
    flexDirection: "column",
    height: 185,
    width: 140,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: 'black'
  },
  venueImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    // opacity: 0.75
  },
  venueContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.35)',
  },
  venueText: {
    fontFamily: 'karla-regular',
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    position: 'absolute',
    marginHorizontal: 5,
    bottom: 5,
    // opacity: 1.0
  }
});
