import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  YellowBox,
} from "react-native";
import { textStyles } from "../global/textStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateFormatter from "../global/DateFormatter";

const formatter = new DateFormatter();
YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.", // TODO: Remove when fixed
]);

export default function CreatePlan({ navigation }) {
  const [detailText, setDetailText] = useState("");
  const [detailHeight, setDetailHeight] = useState(0);

  //Date Time State
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //Location Search
  const [location, setLocation] = useState("");

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(selectedDate);
    console.log(selectedDate.getMonth());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const onTextChange = (event) => {
    const { contentSize, text } = event.nativeEvent;
    console.log(contentSize);

    setDetailText(text);
    setDetailHeight(contentSize.height > 100 ? 100 : contentSize.height);
  };

  //Meetup Location
  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="123 Address"
        // fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data);
        }}
        query={{
          key: "AIzaSyCG5qmZR3FDGWkTP2n13bzDjQo4Ht5tfE8",
          language: "en",
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
          },
          textInput: [
            textStyles.subBodyText,
            {
              marginBottom: 7.5,
              color: "#444",
              backgroundColor: "rgba(0,0,0,0)",
              marginLeft: -5,
            },
          ],
        }}
      />
    );
  };

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      keyboardShouldPersistTaps={"always"}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.EditField}>
          <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>Name</Text>
          <TextInput
            placeholderTextColor={"#AAA"}
            placeholder={"eg. Riley's birthday"}
            style={[
              textStyles.subBodyText,
              { marginBottom: 7.5, color: "#444" },
            ]}
          ></TextInput>
          <View
            style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
          ></View>
        </View>
        <View style={styles.EditField}>
          <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>
            Details
          </Text>
          <TextInput
            multiline={true}
            blurOnSubmit={true}
            placeholderTextColor={"#AAA"}
            placeholder={"Plan Description for friends to see"}
            // onChange={() => onTextChange()}
            onChangeText={(text) => setDetailText(text)}
            onContentSizeChange={(event) => {
              setDetailHeight(
                event.nativeEvent.contentSize.height > 100
                  ? 100
                  : event.nativeEvent.contentSize.height
              );
            }}
            style={[
              textStyles.subBodyText,
              { marginBottom: 7.5, color: "#444", height: detailHeight },
            ]}
          ></TextInput>
          <View
            style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
          ></View>
        </View>
        {/* <View style={styles.EditField}>
          <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>
            Events
          </Text>

          <View
            style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
          ></View>
        </View> */}
        <View style={styles.EditField}>
          <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>
            Meetup Location
          </Text>
          {GooglePlacesInput()}
        </View>
        <View style={styles.EditField}>
          <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>
            Meetup Time
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginRight: 10, padding: 5 }}
              onPress={() => {
                showDatepicker();
              }}
            >
              <Text
                style={[
                  textStyles.subBodyText,
                  { marginBottom: 7.5, color: "#444" },
                ]}
              >
                {formatter.unixToDate(date.getTime() / 1000)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                showTimepicker();
              }}
            >
              <Text
                style={[
                  textStyles.subBodyText,
                  { marginBottom: 7.5, color: "#444" },
                ]}
              >
                {formatter.unixToTime(date.getTime() / 1000)}
              </Text>
            </TouchableOpacity>
            {show ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 5 }}
                  onPress={() => {
                    setShow(false);
                  }}
                >
                  <Text style={[textStyles.simpleText, { color: "#007aff" }]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {show ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          ) : null}

          <View
            style={{ width: "100%", height: 1, backgroundColor: "#DDD" }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  EditField: {
    width: "90%",
    padding: 5,
    marginTop: 15,
  },
});
