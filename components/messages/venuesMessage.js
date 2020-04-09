import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { messageStyles } from '../../global/messageStyles';

export function VenuesMessage({
  venues,
  spaceAbove,
  spaceBelow
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
        data={venues}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => (
            <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity
                onPress={() => console.log("Clicked")}
                style={messageStyles.venueContainer}
            >
                <ImageBackground
                source={{ uri: item.imgURL }}
                style={messageStyles.venueImage}
                >
                <View style={messageStyles.venueContent}>
                    <Text style={messageStyles.venueText}>
                    {item.title + "\n"}
                    {item.cost > 15
                        ? item.cost > 30
                        ? item.cost > 60
                            ? "$$$$"
                            : "$$$"
                        : "$$"
                        : "$"}
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