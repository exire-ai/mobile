import React from "react";
import {
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
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
      inputActivated: false,
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
      text: "",
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
          <Image
            style={{
              height: 24,
              width: 24,
              alignSelf: "center",
            }}
            source={require("../assets/sendArrow.png")}
          />
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
            placeholder="How can I help?"
            maxLength={144}
            numberOfLines={2}
            textAlign={"left"}
            multiline
            onChangeText={(text) => this.setState({ text })}
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
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  message: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#dddddd",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  sendMessage: {
    flex: -1,
    textAlign: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 16,
    backgroundColor: "#007aff",
    borderRadius: 50 / 2,
  },
  messageInput: {
    fontFamily: "karla-regular",
    fontSize: 20,
    textAlign: "left",
    flex: 1,
    marginLeft: 10,
  },
  sendMessageText: {
    fontFamily: "karla-bold",
    fontSize: 20,
    color: "#007aff",
  },
});
