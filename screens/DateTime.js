import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { textStyles } from "../global/textStyles";
import { colorScheme } from "../global/colorScheme";

//Example Test Dictionary of available bookings for a selected event
//For Production, assign object id for each individual booking
const availableBookings = [
  {
    date: "2020-05-23",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-25",
    bookings: [
      { startTime: 9, endTime: 10, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-26",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-27",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-28",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-29",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
  {
    date: "2020-05-30",
    bookings: [
      { startTime: 10, endTime: 11, cost: 22, openSpots: 5 },
      { startTime: 18, endTime: 19, cost: 22, openSpots: 7 },
      { startTime: 19, endTime: 20, cost: 25, openSpots: 3 },
    ],
  },
];

const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export default class DateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null,
      venue: this.props.navigation.state.params,
    };
  }

  getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    return today;
  };

  componentDidMount() {
    this.markedDates();
  }

  selectedDate = (day) => {
    // const selectedDate = { [day.dateString]: { selected: true } };
    var obj = null;
    for (var i = 0; i < availableBookings.length; i++) {
      if (availableBookings[i].date == day.dateString) {
        obj = availableBookings[i];
      }
    }
    this.setState(
      {
        selectedDate: obj,
      },
      this.markedDates
    );
  };

  selectedSlot = (slot) => {
    var order = {};
    order.booking = slot;
    order.booking.date = this.state.selectedDate.date;
    order.venue = this.state.venue;
    this.props.navigation.navigate("BookingInvite", order);
  };

  enabledDates = () => {
    var obj = {};
    for (var i = 0; i < availableBookings.length; i++) {
      var curr = availableBookings[i].date;
      obj[availableBookings[i].date] = {
        disabled: false,
        disableTouchEvent: false,
      };
    }
    return obj;
  };

  markedDates = () => {
    var obj = this.enabledDates();
    if (this.state.selectedDate != null) {
      obj[this.state.selectedDate.date].selected = true;
      obj[this.state.selectedDate.date].selectedColor = colorScheme.button;
    }
    this.setState({
      markedDates: obj,
    });
  };

  formattedHour = (hour) => {
    //TODO Generate This based on Locale in future
    var timezone = "(EDT)";
    var suffix = "AM";
    if (hour >= 12) {
      suffix = "PM";
      if (hour != 12) {
        hour -= 12;
      }
    }
    return hour + " " + suffix + " " + timezone;
  };

  formattedDate = (dateString) => {
    var day = this.getDayOfWeek(dateString);
    var month = months[dateString.substring(5, 7)];
    var year = dateString.substring(0, 4);
    return day + " " + month + " " + year;
  };

  // Accepts a Date object or date string that is recognized by the Date.parse() method
  getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  };

  availableTimes = () => {
    return (
      <View>
        {/* <View style={{ width: "90%", backgroundColor: "clear", marginTop: 10 }}> */}
        <Text style={[textStyles.subTitle, { marginBottom: 10 }]}>
          {this.formattedDate(this.state.selectedDate.date)}
        </Text>
        <View
          style={{ width: "100%", height: 0.5, backgroundColor: "#DDD" }}
        ></View>
        {/* </View> */}
        <FlatList
          data={this.state.selectedDate.bookings}
          keyExtractor={(item) => item.openTime}
          renderItem={({ item }) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <View style={{}}>
                    <Text style={textStyles.smallSubTitleText}>
                      {this.formattedHour(item.startTime) +
                        " - " +
                        this.formattedHour(item.endTime)}
                    </Text>
                    <Text
                      style={[textStyles.smallSubTitleText, { color: "#888" }]}
                    >
                      {"$" + item.cost + " per person"}
                    </Text>
                  </View>
                  <TouchableOpacity activeOpacity={.5}
                    style={{
                      backgroundColor: colorScheme.activeButton,
                      paddingVertical: 7.5,
                      paddingHorizontal: 15,
                      alignItems: "center",
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      this.selectedSlot(item);
                    }}
                  >
                    <Text style={textStyles.buttonText}>Choose</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 0.5,
                    backgroundColor: "#DDD",
                  }}
                ></View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#FAFAFA" }]}>
        <View style={{ flex: 0.65 }}>
          <CalendarList
            disabledByDefault={true}
            style={{ flex: 0.5, width: "100%" }}
            hideExtraDays={true}
            onDayPress={(day) => {
              this.selectedDate(day);
            }}
            minDate={() => {
              return this.getCurrentDate();
            }}
            selected={this.state.selectedDate}
            pastScrollRange={0}
            futureScrollRange={1}
            markedDates={this.state.markedDates}
          />
        </View>

        <View
          style={{
            flex: 0.35,
            width: "100%",
            alignItems: "center",
            backgroundColor: "#FAFAFA",
          }}
        >
          <View
            style={{ width: "90%", backgroundColor: "clear", marginTop: 10 }}
          >
            {this.state.selectedDate != null ? this.availableTimes() : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
