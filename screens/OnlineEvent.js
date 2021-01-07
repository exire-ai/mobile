import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { textStyles } from '../global/textStyles';
import { shadowStyles } from '../global/shadowStyles';
import { navigationStyles } from '../global/navigationStyles';
import { colorScheme } from '../global/colorScheme';
import DateFormatter from '../global/DateFormatter';

let formatter = new DateFormatter();

export default class OnlineEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venue: this.props.venue
        };
    }

    render() {
        if (this.state.venue.type == 'time-slot') {
            return (
                <View style={styles.container}>
                    <View
                        style={[
                            { flex: 0.35, flexDirection: 'row' },
                            shadowStyles.shadowDown
                        ]}
                    >
                        <ImageBackground
                            source={{ uri: this.state.venue.imgURL }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <SafeAreaView>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => this.props.goBack()}
                                    style={[
                                        navigationStyles.icon,
                                        { padding: 15 }
                                    ]}
                                >
                                    <Icon
                                        name="chevron-left"
                                        color={colorScheme.primaryText}
                                        size={32}
                                        style={shadowStyles.shadowDown}
                                    />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </ImageBackground>
                    </View>
                    <View
                        style={{
                            flex: 0.65,
                            width: '100%',
                            marginHorizontal: 10,
                            marginTop: 15,
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <View
                            style={{
                                borderBottomColor: colorScheme.veryLight,
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                width: '95%'
                            }}
                        >
                            <Text
                                style={[
                                    textStyles.titleText,
                                    { textAlign: 'left' }
                                ]}
                            >
                                {this.state.venue.title}
                            </Text>
                            <Text
                                style={[
                                    textStyles.titleText,
                                    {
                                        textAlign: 'left',
                                        fontSize: 22,
                                        color: colorScheme.lessDarkText
                                    }
                                ]}
                            >
                                {this.state.venue.subtitle}
                            </Text>
                            <Text
                                style={[
                                    textStyles.subBodyText,
                                    { textAlign: 'left', marginTop: 5 }
                                ]}
                            >
                                {this.state.venue.description}
                            </Text>
                            <View
                                style={{ flexDirection: 'row', marginTop: 5 }}
                            >
                                <Image
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginTop: 4,
                                        marginRight: 10
                                    }}
                                    source={require('../assets/clock.png')}
                                />
                                <Text style={textStyles.minorText}>
                                    {this.state.venue.startUNIX + ' hr'}
                                </Text>
                            </View>
                        </View>
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
                            {'From $' + this.state.venue.cost + ' per person'}
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
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        'DateTime',
                                        this.state.venue
                                    );
                                }}
                                style={[
                                    shadowStyles.shadowDown,
                                    {
                                        backgroundColor:
                                            colorScheme.activeButton,
                                        width: '90%',
                                        padding: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 7
                                    }
                                ]}
                            >
                                <Text style={textStyles.buttonText}>
                                    See times
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View
                        style={[
                            { flex: 0.35, flexDirection: 'row' },
                            shadowStyles.shadowDown
                        ]}
                    >
                        <ImageBackground
                            source={{ uri: this.state.venue.imgURL }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <SafeAreaView>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => this.props.goBack()}
                                    style={[
                                        navigationStyles.icon,
                                        { padding: 15 }
                                    ]}
                                >
                                    <Icon
                                        name="chevron-left"
                                        color={colorScheme.primaryText}
                                        size={32}
                                        style={shadowStyles.shadowDown}
                                    />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </ImageBackground>
                    </View>
                    <View
                        style={{
                            flex: 0.65,
                            width: '100%',
                            marginHorizontal: 10,
                            marginTop: 15,
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <View
                            style={{
                                borderBottomColor: colorScheme.veryLight,
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                width: '95%'
                            }}
                        >
                            <Text
                                style={[
                                    textStyles.titleText,
                                    { textAlign: 'left' }
                                ]}
                            >
                                {this.state.venue.title}
                            </Text>
                            <Text
                                style={[
                                    textStyles.titleText,
                                    {
                                        textAlign: 'left',
                                        fontSize: 22,
                                        color: colorScheme.lessDarkText
                                    }
                                ]}
                            >
                                {this.state.venue.subtitle}
                            </Text>
                            <Text
                                style={[
                                    textStyles.subBodyText,
                                    { textAlign: 'left', marginTop: 5 }
                                ]}
                            >
                                {this.state.venue.description}
                            </Text>
                            <View
                                style={{ flexDirection: 'row', marginTop: 5 }}
                            >
                                <Image
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginTop: 4,
                                        marginRight: 10
                                    }}
                                    source={require('../assets/clock.png')}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={textStyles.minorText}>
                                        {formatter.unixToDate(
                                            this.state.venue.startUNIX
                                        ) + ' from'}
                                    </Text>
                                    <Text style={textStyles.minorText}>
                                        {formatter.unixToTime(
                                            this.state.venue.startUNIX
                                        ) +
                                            ' - ' +
                                            formatter.unixToTime(
                                                this.state.venue.startUNIX
                                            )}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            height: 100,
                            bottom: 10,
                            flexDirection: 'column',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={[
                                textStyles.subBodyText,
                                {
                                    width: '90%',
                                    textAlign: 'center',
                                    fontSize: 14
                                }
                            ]}
                        >
                            Planning to attend? Save to a plan and share with a
                            friend!
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.props.sendToChats}
                            style={[
                                shadowStyles.shadowDown,
                                {
                                    height: 50,
                                    marginTop: 10,
                                    backgroundColor: colorScheme.button,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '90%',
                                    borderRadius: 10,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 2 },
                                    marginBottom: 0
                                }
                            ]}
                        >
                            <Text style={textStyles.buttonText}>
                                Send to Chat
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={[
                                shadowStyles.shadowDown,
                                {
                                    height: 50,
                                    marginTop: 10,
                                    backgroundColor: colorScheme.activeButton,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '90%',
                                    borderRadius: 10,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 2 },
                                    marginBottom: 60
                                }
                            ]}
                            onPress={() => {
                                this.props.savePlans();
                            }}
                        >
                            <Text style={textStyles.buttonText}>
                                Save to Experience
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.componentBackground
    }
});
