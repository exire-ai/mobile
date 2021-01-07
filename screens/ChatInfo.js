import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    AsyncStorage,
    Alert,
    TextInput
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from '../global/colorScheme';
import { shadowStyles } from '../global/shadowStyles';
import { chatsStyles } from '../global/chatsStyles';
import users from '../functions/users';
import ContactList from '../components/ContactList';

// Firestore connection
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class ChatInfo extends React.Component {
    db = firebase.firestore();

    state = {
        search: []
    };

    constructor(props) {
        super(props);
        console.log(props.navigation.state);
        let temp = props.navigation.state.params.data;
        temp.search = [];
        this.state = temp;
        AsyncStorage.getItem('userID').then((userID) => {
            this.setState({
                userID: userID,
                contactPermission: true,
                search: [],
                contacts: [],
                number: '',
                friends: []
            });
            this.getFriends();
            this.getChat();
        });
        AsyncStorage.getItem('name').then((name) => {
            this.setState({ name: name });
        });
    }

    componentDidMount() {
        this.getContacts();
        this.getFriends();
    }

    getChat() {
        this.db
            .collection('chats')
            .where('chatID', '==', this.state.chatID)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => {
                    var temp = doc.data();
                    return temp;
                })[0];
                this.setState({
                    userData: data.userData,
                    users: data.users,
                    chatName: data.name
                });
            });
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
            var newContacts = contacts.data
                .filter((o) => {
                    if ('phoneNumbers' in o && 'name' in o) {
                        if (o.phoneNumbers.length != 0) {
                            return true;
                        }
                    }
                    return false;
                })
                .map((o) => {
                    var num = o.phoneNumbers[0].digits;
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

    getFriends() {
        users.getFriends(this.state.userID, (friends) => {
            friends = friends ? friends : [];
            this.setState({ friends: friends.map((o) => o.userID) });
        });
    }

    toggleFriend(userID) {
        var friends = this.state.friends;
        if (friends.includes(userID)) {
            users.deleteFriend(this.state.userID, userID, (data) => {
                for (var i = 0; i < friends.length; i++) {
                    if (friends[i] === userID) {
                        friends.splice(i, 1);
                    }
                }
                this.setState({ friends: friends });
            });
        } else {
            users.addFriend(this.state.userID, userID, (data) => {
                friends.push(userID);
                this.setState({ friends: friends });
            });
        }
    }

    addContact = (text) => {
        this.setState({ number: text });
        if (text.match(/^[0-9]+$/) != null && text.length == 10) {
            this.addNumber(text);
        } else {
            var data = this.state.contacts.filter((o) =>
                o.name.toLowerCase().includes(text.toLowerCase())
            );
            this.setState({ search: data });
        }
    };

    addNumber = (text) => {
        // need to add check that they don"t add self
        this.setState({ number: text });
        if (text.length > 9) {
            var temp = this.state.userData;
            temp.push({
                name: '',
                number: text,
                userID: '',
                imgURL: ''
            });
            this.setState({ userData: temp });
            this.setState({ number: '' });
            users.getByNumber(text, (result) => {
                if (result) {
                    var temp = this.state.userData;
                    temp = temp.filter(function (o) {
                        return o.number != text;
                    });
                    temp.push({
                        name: result.name,
                        number: text,
                        userID: result.userID,
                        imgURL:
                            'https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder.png'
                    });
                    this.setState({ userData: temp });
                } else {
                    users.sendTextMsg(
                        text,
                        this.state.name +
                            ' invited you to join the Exire group ' +
                            this.state.chatName +
                            '. Download the app now at https://exire.ai to join!',
                        (result) => {}
                    );
                }
            });
        }
    };

    leave() {
        var userData = {
            userID: this.state.userID,
            number: 'gone',
            name: this.state.userData.find((o) => o.userID == this.state.userID)
                .name,
            imgURL: this.state.userData.find(
                (o) => o.userID == this.state.userID
            ).imgURL
        };
        var oldNumber = this.state.userData.find(
            (o) => o.userID == this.state.userID
        ).number;
        var oldUserData = this.state.userData;
        this.db
            .collection('chats')
            .where('chatID', '==', this.state.chatID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var data = doc.data().userData;
                    var users = doc.data().users;
                    data = data.filter(function (o) {
                        return o.number != oldNumber;
                    });
                    users = users.filter(function (o) {
                        return o != oldNumber;
                    });
                    data.push(userData);
                    this.db.collection('chats').doc(doc.id).update({
                        userData: data,
                        users: users
                    });
                    this.setState({
                        userData: data,
                        users: users
                    });
                    this.props.navigation.navigate('Chats');
                });
            });
    }

    addData = () => {
        this.db
            .collection('chats')
            .where('chatID', '==', this.state.chatID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var users = doc.data().users;
                    users.push(this.state.tempNum);
                    this.db.collection('chats').doc(doc.id).update({
                        userData: this.state.userData,
                        users: users
                    });
                    this.setState({
                        users: users,
                        tempNum: ''
                    });
                });
            });
    };

    render() {
        return (
            <View
                style={{ alignItems: 'center', width: '100%', height: '100%' }}
            >
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 24,
                        fontFamily: 'SemiBold',
                        color: colorScheme.lessDarkText
                    }}
                >
                    Members
                </Text>
                <View
                    style={{
                        width: '100%',
                        height:
                            this.state.userData.length < 4
                                ? 10 + 75 * this.state.userData.length
                                : 300
                    }}
                >
                    <FlatList
                        style={{ width: '100%' }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            marginTop: 10
                        }}
                        data={this.state.userData}
                        extraData={this.state.friends}
                        showsVerticalScrollIndicator={
                            this.state.userData.length > 3
                        }
                        keyExtractor={(item, index) => 'number' + item.number}
                        renderItem={({ item, index }) => {
                            var friends =
                                this.state.friends instanceof Array
                                    ? this.state.friends
                                    : [];
                            if (item.number != 'gone') {
                                return (
                                    <View
                                        style={[
                                            {
                                                width:
                                                    Dimensions.get('screen')
                                                        .width * 0.9,
                                                height: 70,
                                                marginBottom: 5,
                                                paddingHorizontal: 10,
                                                backgroundColor:
                                                    colorScheme.componentBackground,
                                                borderRadius: 15,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start'
                                            },
                                            shadowStyles.shadowDown
                                        ]}
                                    >
                                        <View
                                            style={[
                                                { flexDirection: 'row' },
                                                shadowStyles.shadowDown
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        marginTop: 0,
                                                        height: 50,
                                                        width: 50,
                                                        borderRadius: 25,
                                                        overflow: 'hidden',
                                                        marginTop: 10
                                                    },
                                                    shadowStyles.shadowDown
                                                ]}
                                            >
                                                <ImageBackground
                                                    source={{
                                                        uri:
                                                            item.imgURL != ''
                                                                ? item.imgURL
                                                                : 'https://cas.umw.edu/sociologyanthropology/files/2018/11/blank-person-1.png'
                                                    }}
                                                    style={{
                                                        width: 50,
                                                        height: 50
                                                    }}
                                                ></ImageBackground>
                                            </View>
                                        </View>
                                        <View style={{ padding: 10 }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Bold',
                                                    color:
                                                        colorScheme.lessDarkText,
                                                    fontSize: 19
                                                }}
                                            >
                                                {item.name == ''
                                                    ? 'Pending'
                                                    : item.userID ==
                                                      this.state.userID
                                                    ? 'You'
                                                    : item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'SemiBold',
                                                    color:
                                                        colorScheme.lessDarkText,
                                                    fontSize: 17,
                                                    paddingTop: -3
                                                }}
                                            >
                                                {item.number != 1000
                                                    ? '(' +
                                                      item.number.substring(
                                                          0,
                                                          3
                                                      ) +
                                                      ') ' +
                                                      item.number.substring(
                                                          3,
                                                          6
                                                      ) +
                                                      '-' +
                                                      item.number.substring(
                                                          6,
                                                          10
                                                      )
                                                    : ''}
                                            </Text>
                                        </View>
                                        {item.userID != this.state.userID &&
                                        item.number != 1000 &&
                                        item.userID != '' ? (
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                style={{
                                                    top: 15,
                                                    position: 'absolute',
                                                    right: 10,
                                                    height: 40,
                                                    paddingHorizontal: 10,
                                                    backgroundColor: friends.includes(
                                                        item.userID
                                                    )
                                                        ? colorScheme.button
                                                        : colorScheme.veryLight,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 15
                                                }}
                                                onPress={() =>
                                                    this.toggleFriend(
                                                        item.userID
                                                    )
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        color: friends.includes(
                                                            item.userID
                                                        )
                                                            ? colorScheme.primaryText
                                                            : colorScheme.darkText,
                                                        fontFamily: 'Bold',
                                                        fontSize: 16
                                                    }}
                                                >
                                                    {friends.includes(
                                                        item.userID
                                                    )
                                                        ? 'Friends'
                                                        : 'Add Friend'}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        }}
                    />
                </View>
                <Text
                    style={{
                        marginTop: 20,
                        fontSize: 24,
                        fontFamily: 'SemiBold',
                        color: colorScheme.lessDarkText
                    }}
                >
                    {' '}
                    Add Members
                </Text>
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
                                ? 'Add by number or contacts by name'
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
                            console.log(contact);
                            //Must add Number
                            this.addNumber(contact.number);
                        }}
                    />
                ) : null}
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        {
                            bottom: 25,
                            position: 'absolute',
                            width: '85%',
                            height: 50,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15
                        },
                        shadowStyles.shadowDown
                    ]}
                    onPress={() => {
                        Alert.alert(
                            'Leave Group',
                            "You won't be able to rejoin this group unless invited!",
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel'
                                },
                                {
                                    text: "I'm sure",
                                    onPress: () => this.leave(),
                                    style: 'destructive'
                                }
                            ],
                            {
                                cancelable: true
                            }
                        );
                    }}
                >
                    <Text
                        style={{
                            color: 'red',
                            fontFamily: 'Reg',
                            fontSize: 18
                        }}
                    >
                        Leave Chat
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
