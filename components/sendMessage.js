import React from "react";
import {
  Dimensions,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import chats from '../functions/chats'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLength: new Animated.Value(this.props.width *.9),
      sendPosition: new Animated.Value(0),
      opacity: new Animated.Value(0),
      messageBarFocused: false,
      text: ''
    };
  }

  onFocus = () => {
    Animated.parallel([
      Animated.timing(this.state.inputLength, {
        toValue: this.props.width*.8,
        duration: 250
      }),
      Animated.timing(this.state.sendPosition, {
        toValue: 16,
        duration: 400
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 250
      })
    ]).start();
  };

  onBlur = () => {
    Animated.parallel([
      Animated.timing(this.state.inputLength, {
        toValue: this.props.width*.9,
        duration: 250
      }),
      Animated.timing(this.state.sendPosition, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 250
      })
    ]).start();
  };

  clearText = () => {
      this.setState({
          text : ''
      })
  }

  render() {
    const { messageBarFocused } = this.state;

    return (
      <View style={styles.messageContainer}>
        <Animated.View
          style={[
            styles.message,
            {
              width: this.state.inputLength,
              position: "absolute",
              left: 16,
              alignSelf: "center"
            },
            messageBarFocused === true ? undefined : { justifyContent: "center" }
          ]}
        >
          <TextInput
            style={styles.messageInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            autoFocus={true}
            placeholder="Say something..."
            maxLength={144}
            numberOfLines={2}
            textAlign={'left'}
            multiline
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </Animated.View>

        <AnimatedTouchable
          style={[styles.sendMessage, { right: this.state.sendPosition }]}
          onPress={() => {
              var input = this.state.text
              this.clearText()
              chats.sendMessage(this.props.chatID, input, this.props.senderID, [], function(data) {
                console.log(data)
              })
          }}
        >
          <Animated.Text
            style={[styles.sendMessageText, { opacity: this.state.opacity }]}
          >
            Send
          </Animated.Text>
        </AnimatedTouchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    borderBottomColor: "#00000033",
    paddingTop: 100
  },
  message: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ccc"
  },
  sendMessage: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  messageInput: {
    fontSize: 24,
    textAlign: 'left'
  },
  sendMessageText: {
      fontSize: 24
  }
});