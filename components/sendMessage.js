import React from "react";
import {
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import chats from "../functions/chats";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputLength: new Animated.Value(this.props.width * 0.9),
      // sendPosition: new Animated.Value(0),
      opacity: new Animated.Value(0),
      messageBarFocused: false,
      text: "",
      inputActivated: false
    };
  }

  onFocus = () => {
    this.setState({ inputActivated: true });
  };

  onBlur = () => {
    this.setState({ inputActivated: false });
  };

  clearText = () => {
    this.setState({
      text: ""
    });
  };

  sendMessage = () => {
    if (this.state.text.length > 0) {
      this.props.sendMessage(this.state.text);
      this.clearText();
    }
  };

  renderSend = () => {
    if (this.state.inputActivated) {
      return (
        <AnimatedTouchable
          style={styles.sendMessage}
          onPress={this.sendMessage}
        >
          <Animated.Text style={[styles.sendMessageText, { opacity: 1.0 }]}>
            Send
          </Animated.Text>
        </AnimatedTouchable>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={styles.messageContainer}>
        <Animated.View style={styles.message}>
          <TextInput
            style={styles.messageInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            autoFocus={true}
            placeholder="Say something..."
            maxLength={144}
            numberOfLines={2}
            textAlign={"left"}
            multiline
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </Animated.View>
        {this.renderSend()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    borderBottomColor: "#00000033",
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    marginHorizontal: 10
    // height: 100
  },
  message: {
    flex: 1,
    // flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ddd"
  },
  sendMessage: {
    flex: -1,
    textAlign: "center",
    width: 65,
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 16
  },
  messageInput: {
    fontFamily: "karla-regular",
    fontSize: 22,
    textAlign: "left",
    flex: 1,
    marginLeft: 10
  },
  sendMessageText: {
    fontFamily: "karla-bold",
    fontSize: 22,
    color: "#007aff"
  }
});
