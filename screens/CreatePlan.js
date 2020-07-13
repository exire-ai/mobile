import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { colorScheme } from "../global/colorScheme";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";

export default function CreatePlan({ navigation, createPlan, venue }) {
  console.log(navigation)
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Create Plan</Text>
      <TextInput />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => createPlan(venue)}
        style={[
          shadowStyles.shadowDown,
          {
            height: 50,
            marginTop: 10,
            backgroundColor: colorScheme.activeButton,
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            borderRadius: 10,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
            marginBottom: 10,
          },
        ]}
      >
        <Text style={textStyles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}
