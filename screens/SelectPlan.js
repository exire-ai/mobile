import React, { Component } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, Alert, TextInput } from "react-native";
import DateFormatter from "../global/DateFormatter";
import _ from "lodash";
import { colorScheme } from "../global/colorScheme";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import Plan from "../components/Plan";
import users from "../functions/users";
import plans from "../functions/plans";
import { ContactTypes } from "expo-contacts";

var formatter = new DateFormatter();

export default class SelectPlan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcoming: [],
      data: [],
      selected: '',
      selectedData: {},
      create: false
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
        for (var i = 0; i < _.get(response, 'length', 0); i++) {
          if (response[i] !== null && response[i].start_time > now) {
            upcoming.push(response[i]);
          }
        }
        this.setState({
          data: response,
          upcoming: upcoming
        });
      });
    });
  };

  planTapped = (item) => {
    if (this.state.selected === item.index) {
      this.setState({ selected: '', selectedData: {} });
    } else {
      this.setState({ selected: item.planID, selectedData: item });
    }
  };

  addToPlan = () => {
    const plan = this.state.selectedData;
    var tempIDs = plan.ids.map(o => _.get(o, 'eventID', _.get(o, 'placeID', '')));
    const id = _.get(this.props.navigation.state.params.venue, 'eventID', _.get(this.props.navigation.state.params.venue, 'placeID', ''));
    if (id !== '' && !tempIDs.includes(id)) {
      tempIDs.push(id);
      plans.update(plan.planID, { ...plan, ids: tempIDs }, res => {
        this.props.navigation.pop();
        this.props.navigation.navigate('Plans', { update: true });
      });
    } else {
      Alert.alert(
        "Already Included In Plan",
        "Would You Like To Proceed?",
        [
          {
            text: "Cancel",
            onPress: () => this.setState({ selected: '', selectedData: {} })
          },
          {
            text: "Continue",
            onPress: () => {
              tempIDs.push(id);
              plans.update(plan.planID, { ...plan, ids: tempIDs }, res => {
                this.props.navigation.pop();
                this.props.navigation.navigate('Plans', { update: true });
              });
            }
          }
        ]
      )
    }
  }

  render() {
    // switch data to upcmoning
    if (this.state.data.length === 0 || this.state.create) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Create Plan</Text>
          <TextInput />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.state.params.createPlan(this.props.navigation.state.params.venue)}
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
      )
    } else {
      return (
        <View style={plansStyles.container}>
          <FlatList
            style={plansStyles.list}
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "name" + item.title + item.start_time + index}
            renderItem={({ item, index }) =>
              <Plan data={item} onTap={this.planTapped} extraStyle={this.state.selected === item.planID} />
            }
          />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                if (this.state.selected === '') {
                  this.setState({ create: true });
                } else {
                  this.addToPlan();
                }
              }}
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
                  marginBottom: 30,
                },
              ]}
            >
              <Text style={textStyles.buttonText}>{this.state.selected !== '' ? "Add to Plan" : "Or Create Plan"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
