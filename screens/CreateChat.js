import React, { useCallback } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    TextInput,
    FlatList,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import chats from '../functions/chats';
import { colorScheme } from '../global/colorScheme';
import { shadowStyles } from '../global/shadowStyles';
import { textStyles } from '../global/textStyles';
import { signInStyles } from '../global/signInStyles';
import { chatsStyles } from '../global/chatsStyles';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import users from '../functions/users';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { analytics } from '../functions/mixpanel';

import ContactList from '../components/ContactList';

export default class CreateChat extends React.Component {
    db = firebase.firestore();

    constructor(props) {
        super(props);
    }

    state = {
        chatName: '',
        otherUsers: [],
        number: '',
        contacts: [],
        contactPermission: true,
        search: [],
        contactListOpen: false,
        added: []
    };

    componentDidMount() {
        AsyncStorage.getItem('name').then((name) => {
            this.setState({ name: name });
        });
        this.getContacts();
    }

    async getContacts() {
        const permission = await Permissions.askAsync(Permissions.CONTACTS);

        if (permission.status !== 'granted') {
            this.setState({ contactPermission: false });
            return;
        }
        const size = await Contacts.getContactsAsync({
            pageSize: 1,
            pageOffset: 0
        });
        const contacts = await Contacts.getContactsAsync({
            fields: [Contacts.PHONE_NUMBERS],
            pageSize: size.total,
            pageOffset: 0
        });
        if (contacts.total > 0) {
            let newContacts = contacts.data
                .filter((o) => {
                    if ('phoneNumbers' in o && 'name' in o) {
                        if (o.phoneNumbers.length != 0) {
                            return true;
                        }
                    }
                    return false;
                })
                .map((o) => {
                    let num = o.phoneNumbers[0].digits;
                    num =
                        num.length <= 10 ? num : num.substring(num.length - 10);
                    return {
                        name: o.name,
                        number: num
                    };
                });
            this.setState({ contacts: newContacts });
            this.addContact('');
        }
    }

    getChat(chatID, callback) {
        this.db
            .collection('chats')
            .where('chatID', '==', chatID)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => {
                    let temp = doc.data();
                    return temp;
                })[0];
                callback(data);
            });
    }

    createGroup = () => {
        if (this.state.chatName.length > 3) {
            let data = [];
            let fetches = [];

            for (let contact of this.state.added) {
                fetches.push(
                    new Promise(function (resolve, reject) {
                        users.getByNumber(contact.number, (res) => {
                            if (res) {
                                resolve(res);
                            } else {
                                reject(contact);
                            }
                        });
                    })
                        .then((result) => {
                            data.push({
                                name: result.name,
                                number: contact.number,
                                userID: result.userID,
                                imgURL: result.hasOwnProperty('profileImg')
                                    ? result.profileImg
                                    : 'https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png'
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            data.push({
                                name: err.name,
                                number: err.number,
                                userID: '',
                                imgURL:
                                    'https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png'
                            });
                            users.sendTextMsg(
                                err.number,
                                this.state.name +
                                    ' invited you to join the Exire group ' +
                                    this.state.chatName +
                                    '. Download the app now at https://exire.ai to join!',
                                (result) => {
                                    console.log(result);
                                }
                            );
                        })
                );
            }

            Promise.all(fetches).then(
                function () {
                    AsyncStorage.getItem('name').then((name) => {
                        AsyncStorage.getItem('userID').then((userID) => {
                            AsyncStorage.getItem('profileImg').then(
                                (profileImg) => {
                                    AsyncStorage.getItem('number').then(
                                        (number) => {
                                            chats.createChat(
                                                this.state.chatName,
                                                name,
                                                userID,
                                                number,
                                                profileImg,
                                                data,
                                                (docID, chatID) => {
                                                    this.getChat(
                                                        chatID,
                                                        (res) => {
                                                            analytics.track(
                                                                'Create Group',
                                                                {
                                                                    chat: this
                                                                        .state
                                                                        .chatName,
                                                                    chatID: chatID
                                                                }
                                                            );
                                                            this.props.navigation.navigate(
                                                                'Chat',
                                                                {
                                                                    chatID: chatID,
                                                                    userID: userID,
                                                                    name: this
                                                                        .state
                                                                        .chatName,
                                                                    data: res
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        });
                    });
                }.bind(this)
            );
        }
    };

    addContact = (text) => {
        this.setState({ number: text });
        if (text.match(/^[0-9]+$/) != null && text.length == 10) {
            this.addNumber(text);
        } else {
            let data = this.state.contacts.filter((o) =>
                o.name.toLowerCase().includes(text.toLowerCase())
            );
            this.setState({ search: data });
        }
    };

    addNumber = (text) => {
        this.setState({ number: text });
        if (text.length > 9) {
            let temp = this.state.added;
            temp.push({
                name: '',
                number: text,
                userID: '',
                imgURL: ''
            });
            this.setState({ added: temp });
            this.setState({ number: '' });
        }
    };

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: colorScheme.footer
                }}
            >
                <TextInput
                    style={[signInStyles.input, { marginTop: 20 }]}
                    keyboardType={'default'}
                    placeholder="Name Group"
                    textAlign={'center'}
                    autoFocus={true}
                    onChangeText={(text) => {
                        this.setState({ chatName: text });
                    }}
                    value={this.state.chatName}
                    selectionColor={colorScheme.button}
                    placeholderTextColor={colorScheme.veryLight}
                />
                <View
                    style={{
                        height:
                            10 + 44 * Math.ceil(this.state.added.length / 2),
                        width: '100%'
                    }}
                >
                    <FlatList
                        style={{ width: '100%' }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            marginTop: 10
                        }}
                        data={this.state.added}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => 'number' + item.number}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    paddingVertical: 7,
                                    marginBottom: 5,
                                    paddingHorizontal: 10,
                                    marginHorizontal: 5,
                                    backgroundColor:
                                        item.name == ''
                                            ? colorScheme.background
                                            : colorScheme.primary,
                                    borderRadius: 15,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Bold',
                                        color:
                                            item.name == ''
                                                ? colorScheme.lessDarkText
                                                : colorScheme.primaryText,
                                        fontSize: 17
                                    }}
                                >
                                    {item.name == ''
                                        ? '(' +
                                          item.number.substring(0, 3) +
                                          ') ' +
                                          item.number.substring(3, 6) +
                                          '-' +
                                          item.number.substring(6, 10)
                                        : item.name}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    style={[
                                        shadowStyles.shadowDown,
                                        {
                                            height: 25,
                                            width: 25,
                                            borderRadius: 12.5,
                                            backgroundColor:
                                                item.name == ''
                                                    ? '#ffcccb'
                                                    : '#fff',
                                            marginLeft: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }
                                    ]}
                                    onPress={() => {
                                        let tempAdded = this.state.added;

                                        tempAdded = tempAdded.filter(
                                            (u) => u.number != item.number
                                        );

                                        this.setState({
                                            added: tempAdded
                                        });
                                    }}
                                >
                                    <Icon
                                        name="minus"
                                        color={
                                            item.name == ''
                                                ? colorScheme.primaryText
                                                : colorScheme.lesserDarkText
                                        }
                                        size={20}
                                        style={[
                                            shadowStyles.shadowDown,
                                            { paddingTop: 2, paddingLeft: 1 }
                                        ]}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                <View
                    style={[
                        {
                            width: '90%',
                            height: 45,
                            backgroundColor: colorScheme.veryLight,
                            top: 10,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        shadowStyles.shadowDown
                    ]}
                >
                    <Icon
                        name="plus"
                        color={colorScheme.lesserDarkText}
                        size={20}
                        style={[
                            shadowStyles.shadowDown,
                            chatsStyles.icon,
                            { paddingLeft: 20 }
                        ]}
                    />
                    <TextInput
                        style={[
                            {
                                width: '90%',
                                color: colorScheme.lessDarkText,
                                fontFamily: 'Reg',
                                fontSize: 17
                            }
                        ]}
                        placeholder={
                            this.state.contactPermission
                                ? 'Add by number or search contacts'
                                : 'Add friends by phone number'
                        }
                        keyboardType={
                            this.state.contactPermission
                                ? 'ascii-capable'
                                : 'number-pad'
                        }
                        placeholderTextColor={colorScheme.lesserDarkText}
                        onChangeText={(text) => {
                            if (this.state.contactPermission) {
                                this.addContact(text);
                            } else {
                                this.addNumber(text);
                            }
                        }}
                        value={this.state.number}
                    ></TextInput>
                </View>
                {this.state.search.length > 0 ? (
                    <ContactList
                        search={this.state.search}
                        otherUsers={this.state.otherUsers}
                        addContact={(contact) => {
                            let temp = this.state.added;
                            if (temp.indexOf(contact) === -1) {
                                temp.push(contact);
                            }
                            this.setState({
                                added: temp
                            });
                        }}
                    />
                ) : null}
                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={{
                        width: '100%',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 40
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.createGroup}
                        style={[
                            shadowStyles.shadowDown,
                            {
                                height: 50,
                                backgroundColor:
                                    this.state.chatName.length > 3 &&
                                    this.state.otherUsers.length > 0
                                        ? colorScheme.button
                                        : colorScheme.activeButton,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                borderRadius: 10,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 2 }
                            }
                        ]}
                    >
                        <Text style={textStyles.buttonText}>Create Group</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
