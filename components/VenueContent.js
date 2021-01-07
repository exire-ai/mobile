import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

export default class VenueContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: this.props.venue
        };
        if (this.props.hideRank == undefined) {
            this.state.hideRank = false;
        } else {
            this.state.hideRank = this.props.hideRank;
        }
    }

    titleTextView = (title, subtitle) => {
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
                    {this.state.venue.title}
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
                    {this.state.venue.title}
                </Text>
            );
        }
    };

    subTextView = (subtitle) => {
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

    rankView = () => {
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
                    {Math.ceil(this.state.venue.rank)}% Match
                </Text>
            </View>
        );
    };
    render() {
        return (
            <ImageBackground
                source={{ uri: this.state.venue.imgURL }}
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
                        this.props.onTap(this.state.venue);
                    }}
                >
                    {!this.state.hideRank ? this.rankView() : null}

                    <View
                        style={{
                            flexDirection: 'column',
                            marginBottom: 8,
                            marginLeft: 10
                        }}
                    >
                        {this.state.venue.category == 'online-event' ? (
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
                        {this.titleTextView(
                            this.state.venue.title,
                            this.state.venue.subtitle != null
                        )}
                        {this.state.venue.subtitle != null
                            ? this.subTextView(this.state.venue.subtitle)
                            : null}
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}
