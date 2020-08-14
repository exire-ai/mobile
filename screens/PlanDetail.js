import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { colorScheme } from "../global/colorScheme";
import DateFormatter from "../global/DateFormatter";
import VenueContent from "../components/VenueContent";

import users from "../functions/users";
import plans from "../functions/plans";

let formatter = new DateFormatter();

export default class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: this.props.navigation.state.params.plan,
      user: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((userID) => {
      this.setState({
        user: userID,
      });
    });
  }

  joinPlan() {
    users.addPlan(this.state.user, this.state.plan.planID, (res) => {
      plans.addUser(this.state.plan.planID, this.state.user, (resp) => {
        console.log(res);
        console.log(resp);
        this.props.navigation.pop();
      });
    });
  }

  isUserOnPlan() {
    var elem;
    for(elem in this.state.plan.users) {
      if (this.state.user === this.state.plan.users[elem]["userID"]) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <View style={{ marginTop: 25, marginHorizontal: 20 }}>
          <Text
            style={[textStyles.subTitle, { fontSize: 24, marginBottom: 5 }]}
          >
            {this.state.plan.title}
          </Text>
          <Text style={[textStyles.subBodyText, { marginBottom: 5 }]}>
            {this.state.plan.description}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Image
              style={{ width: 16, height: 16, marginRight: 7.5, marginTop: 3 }}
              source={require("../assets/clock.png")}
            />
            <Text style={textStyles.minorText}>
              {formatter.unixToDate(this.state.plan.startUNIX)} at{" "}
              {formatter.unixToTime(this.state.plan.startUNIX)}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginBottom: 25}}>
          <FlatList
            horizontal={true}
            data={this.state.plan.ids}
            style={{ paddingLeft: 20, width: "100%" }}
            keyExtractor={(item, index) => "name" + item.title}
            renderItem={({ item, index }) => (
              <View
                style={[
                  shadowStyles.shadowDown,
                  {
                    height: 125,
                    width: 115,
                    overflow: "hidden",
                    borderRadius: 10,
                    marginRight: 10,
                  },
                ]}
              >
                <VenueContent
                  hideRank={true}
                  venue={item}
                  onTap={(data) => {
                    this.props.navigation.navigate("Venue", data);
                  }}
                />
              </View>
            )}
          />
        </View>
        <View style={{ width: "100%", paddingLeft: 20 }}>
          <Text style={[textStyles.subTitle, { marginBottom: 5 }]}>Who's Going</Text>
          <FlatList 
            horizontal={true}
            data={this.state.plan.users}
            style={{ width: "100%" }}
            renderItem={({ item }) => (
              <View style={{alignItems: "center"}}>
                <View style={[shadowStyles.shadowDown, {width: 45, height: 45, backgroundColor: "gray", borderRadius: 24, overflow: "hidden"}]}>
                  <Image  style={{width: "100%", height: "100%"}} source={{uri: item.profileImg}}/>
                </View>
                <Text style={textStyles.minorText}>{item.name}</Text>
              </View>
            )}
            />
        </View>
        <View style={{position: "absolute", width: "100%", bottom: 0}}>
        {!this.isUserOnPlan() ? (
          <View
            style={{ marginBottom: 20, width: "100%", alignItems: "center" }}
          >
            <TouchableOpacity
              style={[
                shadowStyles.shadowDown,
                {
                  paddingVertical: 10,
                  backgroundColor: colorScheme.activeButton,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 10,
                },
              ]}
              onPress={() => {
                this.joinPlan();
              }}
            >
              <Text style={textStyles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.props.navigation.state.params.sendToChats ? (
          <View
            style={{  marginBottom: 25, alignItems: "center", width: "100%" }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this.props.navigation.state.params.sendToChats(
                  this.state.plan.planID,
                  this.state.plan.title
                )
              }
              style={[
                shadowStyles.shadowDown,
                {
                  height: 50,
                  backgroundColor: colorScheme.button,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  borderRadius: 10,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 2 },
                },
              ]}
            >
              <Text style={textStyles.buttonText}>Share in Chat</Text>
            </TouchableOpacity>
          </View>
        ) : (
          false
        )}
        </View>
        
      </View>
    );
  }
}
