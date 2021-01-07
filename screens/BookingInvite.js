import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { textStyles } from '../global/textStyles';
import { shadowStyles } from '../global/shadowStyles';
import { colorScheme } from '../global/colorScheme';

export default class BookingInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: this.props.navigation.state.params.booking,
            venue: this.props.navigation.state.params.venue,
            numAttendees: 1
        };
    }

    addAttendee = () => {
        let current = this.state.numAttendees;
        this.setState({
            numAttendees: current + 1
        });
    };

    removeAttendee = () => {
        let current = this.state.numAttendees;
        this.setState({
            numAttendees: current - 1
        });
    };

    minusButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={{ padding: 5 }}
                onPress={this.removeAttendee}
            >
                <Image
                    source={require('../assets/minus.png')}
                    style={{ width: 24, height: 24 }}
                />
            </TouchableOpacity>
        );
    };

    continue = () => {
        let order = {};
        order.numAttendees = this.state.numAttendees;
        order.booking = this.state.booking;
        order.venue = this.state.venue;
        this.props.navigation.navigate('ReviewPurchase', order);
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '90%',
                        marginTop: 25
                    }}
                >
                    <View
                        style={{
                            height: 45,
                            width: 45,
                            backgroundColor: 'gray',
                            borderRadius: 22.5,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{
                                uri:
                                    'https://cdn.shopify.com/s/files/1/1004/0728/products/riley-wanderer1_grande.jpg?v=1562023680'
                            }}
                        />
                    </View>
                    <Text style={[textStyles.simpleText, { marginLeft: 10 }]}>
                        Riley Whitelum
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginTop: 15
                    }}
                >
                    <Text
                        style={[
                            textStyles.simpleText,
                            { width: '90%', marginTop: 20 }
                        ]}
                    >
                        {'+ ' + (this.state.numAttendees - 1) + ' others'}
                    </Text>
                    {this.state.numAttendees > 1 ? this.minusButton() : null}
                </View>

                <View
                    style={{
                        width: '90%',
                        height: 0.5,
                        backgroundColor: '#DDD',
                        marginTop: 15
                    }}
                ></View>
                <View
                    style={{
                        width: '90%',
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={[textStyles.simpleText]}>
                        Add another friend
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ padding: 5 }}
                        onPress={this.addAttendee}
                    >
                        <Image
                            source={require('../assets/plus.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: '100%',
                        position: 'absolute',
                        height: 100,
                        bottom: 10,
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={[
                            textStyles.minorText,
                            {
                                flex: 0.5,
                                textAlign: 'center',
                                fontFamily: 'Bold'
                            }
                        ]}
                    >
                        {'From $' + this.state.booking.cost + ' per person'}
                    </Text>
                    <View
                        style={{
                            flex: 0.5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.continue}
                            style={[
                                shadowStyles.shadowDown,
                                {
                                    backgroundColor: colorScheme.activeButton,
                                    width: '90%',
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 7
                                }
                            ]}
                        >
                            <Text style={textStyles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colorScheme.componentBackground
    }
});
