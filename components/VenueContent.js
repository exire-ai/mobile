import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

const VenueContent = ({ hideRank, venue, onTap }) => {
    const titleTextView = (title, subtitle) => {
        if (subtitle) {
            return (
                <Text
                    style={[
                        {
                            color: '#fff',
                            fontFamily: 'Bold',
                            fontSize: 24
                        },
                        shadowStyles.shadowDown
                    ]}
                >
                    {venue.title}
                </Text>
            );
        } else {
            return (
                <Text
                    style={[
                        {
                            color: '#fff',
                            fontFamily: 'Bold',
                            fontSize: 18
                        },
                        shadowStyles.shadowDown
                    ]}
                >
                    {venue.title}
                </Text>
            );
        }
    };

    const subTextView = (subtitle) => {
        return (
            <Text
                style={[
                    {
                        color: '#fff',
                        fontFamily: 'Bold',
                        fontSize: 18
                    },
                    shadowStyles.shadowDown
                ]}
            >
                {subtitle}
            </Text>
        );
    };

    const rankView = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    position: 'absolute',
                    top: 10
                }}
            >
                <Text
                    style={[
                        {
                            color: '#86f231',
                            position: 'absolute',
                            right: 10,
                            fontFamily: 'Bold',
                            fontSize: 15
                        },
                        shadowStyles.shadowDown
                    ]}
                >
                    {Math.ceil(venue.rank)}% Match
                </Text>
            </View>
        );
    };

    return (
        <ImageBackground
            source={{ uri: venue.imgURL }}
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <TouchableOpacity
                activeOpacity={0.5}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end'
                }}
                activeOpacity={0.5}
                onPress={() => {
                    onTap(venue);
                }}
            >
                {!hideRank ? rankView() : null}

                <View
                    style={{
                        flexDirection: 'column',
                        marginBottom: 8,
                        marginLeft: 10
                    }}
                >
                    {venue.category == 'online-event' ? (
                        <View
                            style={{
                                borderRadius: 5,
                                overflow: 'hidden',
                                paddingVertical: 4,
                                paddingHorizontal: 5,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                alignItems: 'center',
                                width: 60
                            }}
                        >
                            <Text
                                style={[
                                    {
                                        fontFamily: 'Bold',
                                        fontSize: 14,
                                        color: colorScheme.primaryText
                                    }
                                ]}
                            >
                                Online
                            </Text>
                        </View>
                    ) : null}
                    {titleTextView(venue.title, venue.subtitle != null)}
                    {venue.subtitle != null
                        ? subTextView(venue.subtitle)
                        : null}
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export default VenueContent;
