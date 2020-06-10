import React, { useCallback } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import chats from "../functions/chats"
import { colorScheme } from "../global/colorScheme"
import { shadowStyles } from "../global/shadowStyles"
import { textStyles } from "../global/textStyles"
import { signInStyles } from "../global/signInStyles"
import { chatsStyles } from "../global/chatsStyles";
import { FlatList } from "react-native-gesture-handler";
import * as Contacts from 'expo-contacts';
import * as Permissions from "expo-permissions";
import users from "../functions/users";
import * as firebase from "firebase";
import "firebase/firestore";

const cuteDogs = [
  "https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp",
  "https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
  "https://cdn.sanity.io/images/0vv8moc6/dvm360/81e9bbc1fe445afd4c888497d6e8e4d8abcd9029-450x274.jpg",
  "https://t2.ea.ltmcdn.com/en/images/5/1/4/types_and_breeds_of_husky_dogs_1415_orig.jpg",
  "https://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogelog.jpg"
]

export default class CreateChat extends React.Component {
  db = firebase.firestore();

  constructor(props) {
    super(props)
  }

  state = {
    chatName: "",
    otherUsers: [],
    number: "",
    contacts: [],
    contactPermission: true,
    search: []
  }

  componentDidMount() {
    AsyncStorage.getItem("name").then(name => {
      this.setState({ "name": name })
    })
    this.getContacts()
  }

  async getContacts() {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      this.setState({ contactPermission: false })
      return;
    }
    const size = await Contacts.getContactsAsync({
      pageSize: 1,
      pageOffset: 0,
    });
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
      ],
      pageSize: size.total,
      pageOffset: 0,
    });
    if (contacts.total > 0) {
      var newContacts = contacts.data.filter(o => {
        if ("phoneNumbers" in o && "name" in o) {
          if (o.phoneNumbers.length != 0) {
            return true
          }
        }
        return false
      }).map(o => {
        var num = o.phoneNumbers[0].digits
        num = num.length <= 10 ? num : num.substring(num.length - 10)
        return {
          name: o.name,
          number: num
        }
      })
      this.setState({ contacts: newContacts })
      this.addContact("")
    }
  }

  getChat(chatID, callback) {
    this.db.collection("chats")
      .where("chatID", "==", chatID)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          var temp = doc.data()
          return temp
        })[0];
        callback(data)
      })
  }

  createGroup = () => {
    if (this.state.chatName.length > 3) {
      AsyncStorage.getItem("name").then(name => {
        AsyncStorage.getItem("userID").then(userID => {
          AsyncStorage.getItem("profileImg").then(profileImg => {
            AsyncStorage.getItem("number").then(number => {
              chats.createChat(this.state.chatName, name, userID, number, profileImg, this.state.otherUsers, (docID, chatID) => {
                this.getChat(chatID, data => {
                  this.props.navigation.navigate("Chat", { chatID: chatID, userID: userID, name: this.state.chatName, data: data });
                })
              })
            })
          })
        })
      })
    }
  }

  addContact = (text) => {
    this.setState({ number: text })
    if (text.match(/^[0-9]+$/) != null && text.length == 10) {
      this.addNumber(text)
    } else {
        var data = this.state.contacts.filter(o => o.name.toLowerCase().includes(text.toLowerCase()))
        this.setState({ search: data })
    }
  }

  addNumber = (text) => {
    // need to add check that they don"t add self
    this.setState({ number: text })
    if (text.length > 9) {
      var temp = this.state.otherUsers
      temp.push({
        name: "",
        number: text,
        userID: "",
        imgURL: ""
      })
      this.setState({ otherUsers: temp })
      this.setState({ number: "" })
      users.getByNumber(text, (result) => {
        if (result) {
          var temp = this.state.otherUsers
          temp = temp.filter(function (o) { return o.number != text });
          temp.push({
            name: result.name,
            number: text,
            userID: result.userID,
            imgURL: cuteDogs[Math.floor(Math.random() * cuteDogs.length)]
          })
          this.setState({ otherUsers: temp })
        } else {
          users.sendTextMsg(text, this.state.name + " invited you to join the Exire group " + this.state.chatName + ". Download the app now at https://exire.ai to join!", (result) => {
            console.log(result)
          })
        }
      })
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center", height: "100%", width: "100%", backgroundColor: colorScheme.footer }}>
        <TextInput
          style={[signInStyles.input, { marginTop: 20 }]}
          keyboardType={"default"}
          placeholder="Name Group"
          textAlign={"center"}
          autoFocus={true}
          onChangeText={(text) => { this.setState({ chatName: text }) }}
          value={this.state.chatName}
          selectionColor={colorScheme.button}
          placeholderTextColor={colorScheme.veryLight}
        />
        <View style={{ height: 10 + 44 * Math.ceil(this.state.otherUsers.length / 2), width: '100%' }}>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
            data={this.state.otherUsers}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "number" + item.number}
            renderItem={({ item, index }) => (
              <View style={{ paddingVertical: 7, marginBottom: 5, paddingHorizontal: 10, marginHorizontal: 5, backgroundColor: item.name == "" ? colorScheme.background : colorScheme.primary, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Bold", color: item.name == "" ? colorScheme.lessDarkText : colorScheme.primaryText, fontSize: 17 }}>{
                  item.name == "" ?
                    ("(" + item.number.substring(0, 3) + ") " + item.number.substring(3, 6) + "-" + item.number.substring(6, 10))
                    : item.name
                }</Text>
                <TouchableOpacity activeOpacity={.5}
                  style={{ height: 25, width: 25, borderRadius: 12.5, backgroundColor: item.name == "" ? "#ffcccb" : "#fff", marginLeft: 10, alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    var temp = this.state.otherUsers
                    temp = temp.filter(function (o) { return o.number != item.number });

                    this.setState({ otherUsers: temp.length > 5 ? temp.slice(0, 5) : temp })
                  }}
                >
                  <Icon
                    name="minus"
                    color={item.name == "" ? colorScheme.primaryText : colorScheme.lesserDarkText}
                    size={20}
                    style={[shadowStyles.shadowDown, { paddingTop: 2 }]}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View
          style={[{
            width: "90%",
            height: 45,
            backgroundColor: colorScheme.veryLight,
            top: 10,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }, shadowStyles.shadowDown]}
        >
          <Icon
            name="plus"
            color={colorScheme.lesserDarkText}
            size={20}
            style={[shadowStyles.shadowDown, chatsStyles.icon, { paddingLeft: 20 }]}
          />
          <TextInput
            style={[{ width: "90%", color: colorScheme.lessDarkText, fontFamily: "Reg", fontSize: 17 }]}
            placeholder={this.state.contactPermission ? "Add by number or contacts by name" : "Add friends by phone number"}
            keyboardType={this.state.contactPermission ? "ascii-capable" : "number-pad"}
            placeholderTextColor={colorScheme.lesserDarkText}
            onChangeText={(text) => { if (this.state.contactPermission) { this.addContact(text) } else { this.addNumber(text) } }}
            value={this.state.number}
          ></TextInput>
        </View>
        <View style={{ height: this.state.search.length > 7 ? 10 + 44*7 : 10 + this.state.search.length * 44, width: '100%', marginTop: 10 }}>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center", marginTop: 10 }}
            data={this.state.search}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "number" + item.number + "name" + item.name}
            renderItem={({ item, index }) => (
                            <View style={{ paddingVertical: 7, marginBottom: 5, paddingHorizontal: 10, marginHorizontal: 5, backgroundColor: colorScheme.background, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Bold", color: colorScheme.lessDarkText, fontSize: 17 }}>{
                  item.name
                }</Text>
                <TouchableOpacity activeOpacity={.5}
                  style={{ height: 25, width: 25, borderRadius: 12.5, backgroundColor: "#ffcccb", marginLeft: 10, alignItems: "center", justifyContent: "center" }}
                  onPress={() => {
                    var temp = this.state.otherUsers
                    temp = temp.filter(function (o) { return o.number != item.number });
                    temp.push({
                      name: item.name,
                      number: item.number,
                      userID: '',
                      imgURL: ''
                    })
                    this.setState({ otherUsers: temp })
                    users.getByNumber(item.number, (result) => {
                      if (result) {
                        var temp = this.state.otherUsers
                        temp = temp.filter(function (o) { return o.number != item.number });
                        temp.push({
                          name: result.name,
                          number: result.number,
                          userID: result.userID,
                          imgURL: result.includes('profileImg') ? result.profileImg : cuteDogs[Math.floor(Math.random() * cuteDogs.length)]
                        })
                        this.setState({ otherUsers: temp })
                      } else {
                        users.sendTextMsg(item.number, this.state.name + " invited you to join the Exire group " + this.state.chatName + ". Download the app now at https://exire.ai to join!", (result) => {
                          console.log(result)
                        })
                      }
                    })
                    this.setState({text: "", search: []})
                  }}
                >
                  <Icon
                    name="plus"
                    color={colorScheme.lesserDarkText}
                    size={20}
                    style={[shadowStyles.shadowDown, { paddingTop: 2 }]}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <KeyboardAvoidingView behavior={"padding"} style={{ width: "100%", alignItems: "flex-end", justifyContent: "center", flexDirection: "row", position: 'absolute', bottom: 40 }}>
          <TouchableOpacity activeOpacity={.5}
            onPress={this.createGroup}
            style={[
              shadowStyles.shadowDown,
              {
                height: 50,
                backgroundColor: this.state.chatName.length > 3 && this.state.otherUsers.length > 0 ? colorScheme.button : colorScheme.activeButton,
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                borderRadius: 10,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 2 },
              },
            ]}
          >
            <Text style={textStyles.buttonText}>Create Group</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
