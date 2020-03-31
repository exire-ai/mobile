import React, { useState } from "react";
import {
  Text,
  View,
  Animated,
  Keyboard,
  StyleSheet,
  FlatList,
  PixelRatio,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import chats from "../functions/chats";
import { Message } from "../components/message";
import Search from '../components/sendMessage';

export default class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    chats.getChat('062j0jglunxt', (data) => {
      var ownerID = data.userID
      var messages = data.chat.reverse()
      this.setState({
        messages: messages,
        ownerID : ownerID
      })
    })
    this.keyboardHeight = new Animated.Value(0);
  }

  componentDidMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
  };

  sendMessage() {
    const {messages} = this.state;
    messages.unshift({
        message: data.chat[i].message
    });
    this.setState({ comments: comments.slice(0)});
  }

  render() {
    return (
        <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        <FlatList
          style={styles.list}
          data={this.state.messages}
          inverted={-1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({ item, index }) => (
            <Message
                message={item.message}
                overMin={index > 0 ? this.state.messages[index - 1].time - item.time > 60: false}
                sameAsNext={index > 0 ? this.state.messages[index - 1].senderID == item.senderID ? true : false : false}
                owner={this.state.ownerID == item.senderID ? true : false}
                venues={item.venues}
                first={index == 0}
            />
          )}
        />
        <View style={{width: '100%'}}>
            <Search width={Dimensions.get('screen').width} height={Dimensions.get('screen').height} chatID={'062j0jglunxt'} senderID={this.state.ownerID}/>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  list: {
    flex: 1,
    width: "100%"
  }
});
