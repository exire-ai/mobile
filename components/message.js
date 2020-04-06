import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
import AnimatedEllipsis from "react-native-animated-ellipsis";
import { ExireForm } from "../components/ExireForm";

export function Message({
  message,
  overMin,
  sameAsNext,
  owner,
  venues,
  first,
  form
}) {
  var spaceBelow = sameAsNext ? 1 : 5;
  spaceBelow = overMin ? spaceBelow : 5;
  var spaceAbove = first ? 0 : 5;
  var messageJSX = (
    <View
      style={{
        paddingLeft: 7.5,
        marginBottom: spaceBelow,
        marginTop: spaceAbove,
      }}
    >
      <View style={styles.message}>
        <Text style={[styles.messsageText, { alignSelf: "flex-start" }]}>
          {message}
        </Text>
      </View>
    </View>
  );
  if (venues.length > 0) {
    messageJSX = (
      <View style={{ marginBottom: spaceBelow, marginTop: spaceAbove,     shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 1, }}>
        <FlatList
          horizontal={true}
          data={venues}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <View style={{ paddingLeft: 10 }}>
              <TouchableOpacity
                onPress={() => console.log("Clicked")}
                style={styles.venueContainer}
              >
                <ImageBackground
                  source={{ uri: item.imgURL }}
                  style={styles.venueImage}
                >
                  <View style={styles.venueContent}>
                    <Text style={styles.venueText}>
                      {item.title + "\n"}
                      {item.cost > 15
                        ? item.cost > 30
                          ? item.cost > 60
                            ? "$$$$"
                            : "$$$"
                          : "$$"
                        : "$"}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  } else if (owner) {
    messageJSX = (
      <View
        style={[
          styles.ownerMessage,
          { marginBottom: spaceBelow, marginTop: spaceAbove },
        ]}
      >
        <View style={[styles.message, { backgroundColor: "#007aff" }]}>
          <Text
            style={[
              styles.messsageText,
              { color: "#fff", alignSelf: "flex-end" },
            ]}
          >
            {message}
          </Text>
        </View>
      </View>
    );
  } else if (message == "loadingloadingloading" && !owner) {
    messageJSX = (
      <View
        style={{
          paddingLeft: 7.5,
          marginBottom: spaceBelow,
          marginTop: spaceAbove,
        }}
      >
        <View
          style={[styles.message, { height: 40, width: 85, marginBottom: 5 }]}
        >
          <View
            style={{
              position: "absolute",
              top: -55,
              left: 6,
              right: 6,
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
  } else if (form == 'form') {
    messageJSX = (
      <ExireForm
        form={form}
        spaceBelow={spaceBelow}
        spaceAbove={spaceAbove}
      />
    )
  }
  return messageJSX;
}

const styles = StyleSheet.create({
  messsageText: {
    fontFamily: "karla-regular",
    fontSize: 22,
  },
  message: {
    backgroundColor: "#dddddd",
    paddingTop: 5,
    paddingBottom: 5.5,
    paddingHorizontal: 10,
    borderRadius: 16,
    maxWidth: "65%",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  ownerMessage: {
    paddingRight: 7.5,
    alignItems: "flex-end",
  },
  venueContainer: {
    flex: 1,
    flexDirection: "column",
    height: 185,
    width: 140,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "black",
  },
  venueImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  venueContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.35)",
  },
  venueText: {
    fontFamily: "karla-regular",
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
    position: "absolute",
    marginHorizontal: 5,
    bottom: 5,
  },
});
