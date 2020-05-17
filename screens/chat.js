import React, { setState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from "react-native";

import { Message } from "../components/message";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    messages: [
      {
        name: "Emma",
        message:
          "Hello! I’m here to help creating plans. To ask me questions, just tag me with @Emma and I can help you: discover things to do, find when everyone is free, create a plan, and much more!",
        time: "5:31pm",
      },
      {
        name: "Elayna",
        message:
          "Hey everyone! I’m thinking of doing a city trip some point this weekend.",
        time: "5:31pm",
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingContainer}
          behavior="padding"
          keyboardVerticalOffset={75}
        >
          <FlatList
            style={styles.list}
            data={this.state.messages}
            // inverted={-1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index + "time" + item.name}
            renderItem={({ item, index }) => (
              <Message
                message={item.message}
                name={item.name}
                time={item.time}
              />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
