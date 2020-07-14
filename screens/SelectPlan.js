import React, { Component } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, Alert } from "react-native";
import DateFormatter from "../global/DateFormatter";
import { colorScheme } from "../global/colorScheme";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import Plan from "../components/Plan";
import users from "../functions/users";

var formatter = new DateFormatter();

export default class SelectPlan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcoming: [],
      data: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    formatter.unixToDate(1590519261);
    AsyncStorage.getItem("userID").then((userID) => {
      users.getPlans(userID, (response) => {
        var now = Math.round(new Date().getTime());
        var upcoming = [];
        for (var i = 0; i < response.length; i++) {
          if (response[i].start_time > now) {
            upcoming.push(response[i]);
          }
        }
        console.log(response)
        this.setState({
          data: response,
          upcoming: upcoming
        });
      });
    });
  };

  planTapped = (item) => {
    console.log('hello')
  };

  render() {
    // switch data to upcmoning
    return (
      <View style={plansStyles.container}>
        <FlatList
          style={plansStyles.list}
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "name" + item.title + item.start_time + index}
          renderItem={({ item, index }) => <Plan data={item}  onTap={this.planTapped.bind(this)}/> }
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.navigation.navigate('CreatePlan', { createPlan: this.props.navigation.state.params.createPlan, venue:  this.props.navigation.state.params.venue })}
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
          <Text style={textStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
