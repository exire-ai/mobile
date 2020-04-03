import React, { useState } from 'react';
import {
  View,
  Animated,
  Keyboard,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import dialogflow from '../functions/dialogflow';
import { Message } from '../components/message';
import SendMessage from '../components/sendMessage';

export default class Chat extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        message: 'Human presence detected 🤖. How can I help you?',
        senderID: 'bot',
        venues: [],
        time: Math.round((new Date()).getTime() /1000)
      }],
      ownerID: 'user',
      sessionID: Math.random().toString(36).slice(-5)
    }
    this.keyboardHeight = new Animated.Value(0);
  }

  addMessage = (inputText, user, venues) => {
    const { messages } = this.state;
    messages.unshift({
      message: inputText,
      senderID: user,
      venues: [],
      time: Math.round((new Date()).getTime() /1000),
      loading: false
    });
    this.setState({ messages: messages.slice(0)});
  }

  sendMessage = (inputText) => {
    this.addMessage(inputText, this.state.ownerID, []);
    setTimeout(this.addIndicator, 250)
    console.log('requesting')
    dialogflow.sendMessage(this.state.sessionID, inputText, (data) => {
      var messagesClone = this.state.messages
      messagesClone[0] = {
        message: data.fulfillmentText,
        senderID: 'bot',
        venues: [],
        time: Math.round((new Date()).getTime())
      }
      this.setState({messages: messagesClone, loading: false})
      if(data.hasOwnProperty('venues')) {
        setTimeout(() => {
          this.addMessage('', 'bot', data.venues)
        }, 400)
      }
    })
  }

  addIndicator = () => {
    if (!this.state.loading) {
      const { messages } = this.state;
      messages.unshift({
        message: 'Hayden is typing...',
        senderID: 'bot',
        venues: [],
        time: Math.round((new Date()).getTime()),
        loading: true
      });
      this.setState({ messages: messages.slice(0), loading: true});
    }
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

  makeProfileVisible = () => {
    this.setState({ isProfileVisible: true });
  };

  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        <FlatList
          style={styles.list}
          data={this.state.messages}
          inverted={-1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index + 'time' + item.time}
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
            <SendMessage
              width={Dimensions.get('screen').width}
              height={Dimensions.get('screen').height}
              sendMessage={this.sendMessage}
            />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    width: '100%'
  }
});