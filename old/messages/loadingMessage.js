import React from "react";
import {
  View,
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { messageStyles } from "../../global/messageStyles";

export function LoadingMessage({
  spaceAbove,
  spaceBelow
}) {
  return (
    <View
        style={{
        paddingLeft: 7.5,
        marginBottom: spaceBelow,
        marginTop: spaceAbove,
        }}
    >
        <View
        style={[messageStyles.message, { height: 40, width: 85, marginBottom: 5 }]}
        >
        <View
            style={{
                position: "absolute",
                top: -55,
                left: 6,
                right: 6,
                allowFontScaling: false
            }}
        >
            <AnimatedEllipsis
                numberOfDots={3}
                minOpacity={0.4}
                animationDelay={300}
                style={{
                    color: "#8b8b8b",
                    fontSize: 85,
                    letterSpacing: -15,
                }}
            />
        </View>
        </View>
    </View>
  );
}