import React from "react";
import { Text, View, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, TextInput, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import chats from "../functions/chats"
import { colorScheme } from "../global/colorScheme"
import { shadowStyles } from "../global/shadowStyles"
import { textStyles } from "../global/textStyles"
import { signInStyles } from "../global/signInStyles"
import { chatsStyles } from "../global/chatsStyles";
import { FlatList } from "react-native-gesture-handler";
import users from "../functions/users";

const cuteDogs = [
  'https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp',
  'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg',
  'https://cdn.sanity.io/images/0vv8moc6/dvm360/81e9bbc1fe445afd4c888497d6e8e4d8abcd9029-450x274.jpg',
  'https://t2.ea.ltmcdn.com/en/images/5/1/4/types_and_breeds_of_husky_dogs_1415_orig.jpg',
  'https://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogelog.jpg'
]

export default class CreateChat extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    chatName: "",
    otherUsers: [],
    number: "",
  }

  componentDidMount() {
    AsyncStorage.getItem("name").then(name => {
      this.setState({"name" : name})
    })
  }

  createGroup = () => {
    if (this.state.chatName.length > 3) {
      AsyncStorage.getItem("name").then(name => {
        AsyncStorage.getItem("userID").then(userID => {
          AsyncStorage.getItem("profileImg").then(profileImg => {
            AsyncStorage.getItem("number").then(number => {
              chats.createChat(this.state.chatName, name, userID, number, profileImg, this.state.otherUsers, (docID, chatID) => {
                this.props.navigation.navigate("Chat", {chatID: chatID, userID: userID, name: this.state.chatName});
              })
            })
          })
        })
      })
    }
  }

  addNumber = (text) => {
    // need to add check that they don't add self
    this.setState({ number: text })
    if (text.length > 9) {
      var temp = this.state.otherUsers
      temp.push({
        name: "",
        number: text,
        userID: "",
        profileImg: ""
      })
      this.setState({ otherUsers: temp })
      this.setState({ number: "" })
      users.getByNumber(text, (result) => {
        console.log(result)
        if (result) {
          var temp = this.state.otherUsers
          temp = temp.filter(function(o) { return o.number != text });
          temp.push({
            name: result.name,
            number: text,
            userID: result.userID,
            profileImg: cuteDogs[Math.floor(Math.random() * cuteDogs.length)]
          })
          this.setState({otherUsers: temp})
        } else {
          users.sendTextMsg(text, this.state.name + " added you to the group " + this.state.chatName + " on Exire, download the app now at https://exire.ai to join!", (result) => {
            console.log(result)
          })
        }
      })
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center', height: '100%', width: '100%', backgroundColor: colorScheme.footer }}>
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
        <View
          style={[{
            width: "90%",
            height: 45,
            backgroundColor: colorScheme.veryLight,
            marginVertical: 10,
            borderRadius: 15,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center'
          }, shadowStyles.shadowDown]}
        >
          <Icon
            name="plus"
            color={colorScheme.lesserDarkText}
            size={20}
            style={[shadowStyles.shadowDown, chatsStyles.icon, { paddingLeft: 20 }]}
          />
          <TextInput
            style={[{ width: '90%', color: colorScheme.lessDarkText, fontFamily: 'nunito-regular', fontSize: 17 }]}
            placeholder={"Add friends by phone number"}
            keyboardType={"phone-pad"}
            placeholderTextColor={colorScheme.lesserDarkText}
            onChangeText={(text) => { this.addNumber(text) }}
            value={this.state.number}
          ></TextInput>
        </View>
        <FlatList
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', marginTop: 10 }}
          data={this.state.otherUsers}
          showsVerticalScrollIndicator={false}
          keyExtratctor={(item, index) => "number" + item.number}
          renderItem={({ item, index }) => (
            <View style={{ paddingVertical: 7, marginBottom: 5, paddingHorizontal: 10, backgroundColor: item.name == '' ? colorScheme.background : colorScheme.primary, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'nunito-bold', color: item.name == '' ? colorScheme.lessDarkText : colorScheme.primaryText, fontSize: 17 }}>{
                item.name == "" ?
                  ("(" + item.number.substring(0, 3) + ") " + item.number.substring(3, 6) + "-" + item.number.substring(6, 10))
                : item.name
              }</Text>
              <TouchableOpacity
                style={{ height: 25, width: 25, borderRadius: 12.5, backgroundColor: item.name == '' ? '#ffcccb' : '#fff', marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                  var temp = this.state.otherUsers
                  temp = temp.filter(function(o) { return o.number != item.number }); 
                  this.setState({otherUsers: temp})
                }}
              >
                <Icon
                  name="minus"
                  color={item.name == '' ? colorScheme.primaryText : colorScheme.lesserDarkText}
                  size={20}
                  style={[shadowStyles.shadowDown, {paddingTop: 2}]}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <KeyboardAvoidingView behavior={'padding'} style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
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
                marginBottom: 30
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
