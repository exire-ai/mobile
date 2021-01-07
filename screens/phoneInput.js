import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import users from '../functions/users';
import { signInStyles } from '../global/signInStyles';
import { navigationStyles } from '../global/navigationStyles';
import { shadowStyles } from '../global/shadowStyles';
import plans from '../functions/plans';
import Modal from 'react-native-modal';
import { colorScheme } from '../global/colorScheme';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafeAreaView from 'react-native-safe-area-view';

export default function PhoneInput({ navigation }) {
    const [number, setNumber] = React.useState('');
    const [backspace, setBackSpace] = React.useState(false);
    const [formatNumber, setFormatNumber] = React.useState('');
    const [errorMsg, changeErrorMsg] = React.useState('#fff');
    const [loadingVisible, setLoadingVisible] = React.useState(false);

    const nextTapped = () => {
        Keyboard.dismiss();
        let text = number;
        if (text.length == 10) {
            Keyboard.dismiss();
            setLoadingVisible(true);
            users.phoneAuth(text, (data) => {
                setLoadingVisible(false);
                if (data) {
                    users.doesNumberExist(text, (userExist) => {
                        var newData = {
                            data: {
                                code: data.code,
                                number: text
                            }
                        };
                        if (!userExist) {
                            plans.getAllCategories((categories) => {
                                navigation.navigate('TextVerification', {
                                    data: newData,
                                    userExist: userExist,
                                    categories: categories
                                });
                            });
                        } else {
                            navigation.navigate('TextVerification', {
                                data: newData,
                                userExist: userExist
                            });
                        }
                    });
                } else {
                    changeErrorMsg('#8b0000');
                }
            });
        } else {
            changeErrorMsg(text.length > 10 ? '#8b0000' : '#fff');
        }
    };

    const formatNumberFunc = (input) => {
        setNumber(input);
        if (input.length == 0) {
            setFormatNumber('');
        } else if (input.length < 3) {
            setFormatNumber('(' + input.substr(0, 3));
        } else if (input.length > 2 && input.length < 7) {
            setFormatNumber(
                '(' + input.substr(0, 3) + ')-' + input.substr(3, 3)
            );
        } else if (input.length > 6 && input.length < 11) {
            setFormatNumber(
                '(' +
                    input.substr(0, 3) +
                    ')-' +
                    input.substr(3, 3) +
                    '-' +
                    input.substr(6, 4)
            );
        } else if (input.length == 11) {
            formatNumberFunc(input.substr(1, 10));
        } else {
            setFormatNumber(input);
        }
    };

    return (
        <View
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: colorScheme.footer
            }}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                    style={[
                        navigationStyles.icon,
                        { width: '100%', padding: 25 }
                    ]}
                >
                    <Icon
                        name="chevron-left"
                        color={colorScheme.lessDarkText}
                        size={32}
                        style={shadowStyles.shadowDown}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        height: 500,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Modal
                        isVisible={loadingVisible}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 200,
                                height: 45,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={signInStyles.subHeaderText}>
                                Loading
                            </Text>
                            <ActivityIndicator size="small" color="black" />
                        </View>
                    </Modal>
                    <View style={signInStyles.textContainer}>
                        <Text style={signInStyles.headerText}>
                            What's your number?
                        </Text>
                        <Text style={signInStyles.subHeaderText}>
                            We just need your number for verification and won't
                            spam you or sell your data.
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            style={[signInStyles.input, { width: 243 }]}
                            keyboardType={'phone-pad'}
                            placeholder="(123)-456-7890"
                            value={formatNumber}
                            textAlign={'left'}
                            autoCompleteType={'tel'}
                            selectionColor={colorScheme.button}
                            placeholderTextColor={colorScheme.veryLight}
                            onChangeText={(text) => {
                                if (backspace) {
                                    //Do Nothing
                                    setBackSpace(false);
                                } else {
                                    formatNumberFunc(
                                        number +
                                            (!isNaN(text[text.length - 1])
                                                ? text[text.length - 1]
                                                : '')
                                    );
                                }
                                console.log(text[text.length - 1]);
                            }}
                            onKeyPress={(event) => {
                                event.persist();
                                if (event.nativeEvent.key === 'Backspace') {
                                    formatNumberFunc(
                                        number.substr(0, number.length - 1)
                                    );
                                    setBackSpace(true);
                                }
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    width: '100%',
                    backgroundColor: colorScheme.footer
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        shadowStyles.shadowDown,
                        {
                            backgroundColor:
                                number.length > 9
                                    ? colorScheme.button
                                    : colorScheme.activeButton,
                            height: 55,
                            width: 55,
                            borderRadius: 27.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '82%',
                            marginBottom: 20
                        }
                    ]}
                    onPress={nextTapped}
                >
                    <Icon
                        name="chevron-right"
                        color="#FFF"
                        size={33}
                        style={[
                            shadowStyles.shadowDown,
                            { paddingLeft: 3, paddingTop: 3 }
                        ]}
                    />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.footer,
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
});
