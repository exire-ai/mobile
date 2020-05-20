import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import Plan from "../components/Plan";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";

const data = [
  {
    name: "Anniversary Night",
    people: [
      {
        name: "Elayna",
        imageURL:
          "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0",
      },
      {
        name: "Riley",
        imageURL:
          "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0",
      },
    ],
    date: "May 24th, 2020",

    time: "5:00 PM",
    venues: [
      {
        name: "The Met",
        price: "$",
        imageURL:
          "https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/fifth-avenue/fifthave_1520x1520.jpg?la=en&hash=1FE6007EA93F1EEE1B8F176E930D6751",
      },
    ],
    type: "online-event",
    description:
      "We're going to explore the city, returning to places we went to on our first couple of dates",
  },
  {
    name: "Girl's Night",
    type: "group",
    people: [
      {
        name: "Elayna",
        imageURL:
          "https://www.rsaconference.com/-/media/rsac/import/expertimages/2019/12/17/20/40/ian-goodfellow.jpg?mw=300&mh=300&hash=DD20512641B958BF015B012AB1E1C754A34345E0",
      },
    ],
    date: "May 24th, 2020",
    time: "7:00 PM",
    venues: [
      {
        name: "The Met",
        price: "$",
        imageURL:
          "https://www.metmuseum.org/-/media/images/visit/plan-your-visit/individual-locations/fifth-avenue/fifthave_1520x1520.jpg?la=en&hash=1FE6007EA93F1EEE1B8F176E930D6751",
      },
    ],
    description:
      "We're going to explore the city, returning to places we went to on our first couple of dates",
  },
  {
    name: "The Sun Still Sets",
    description: "Live show featuring Rufs, Du Sol, Bob Moses, and more!",
    type: "online-event",
    date: "May 24th, 2020",
    time: "6:30 PM",
    watchURL:
      "https://governorsballmusicfestival.us2.list-manage.com/track/click?u=fa43dd2eeb9d9a18f4f710ca8&id=260428d4a1&e=b5add99525",
    imageURL:
      "https://2ab9pu2w8o9xpg6w26xnz04d-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/the-sun-still-sets-stream-1200x675.jpg",
    venues: [
      {
        name: "The Sun Still Sets",
        imageURL:
          "https://2ab9pu2w8o9xpg6w26xnz04d-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/the-sun-still-sets-stream-1200x675.jpg",
      },
    ],
  },
];

export default class Plans extends Component {
  state = {
    data: data,
    refreshing: false,
  };

  loadData = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 300);
  };

  planTapped = (item) => {
    console.log(item);
    this.props.navigation.navigate("PlanDetail", item);
  };

  render() {
    return (
      <View style={plansStyles.container}>
        <FlatList
          style={plansStyles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            this.loadData();
          }}
          refreshing={this.state.refreshing}
          keyExtratctor={(item, index) => "key" + index + "name" + item.name}
          renderItem={({ item, index }) => (
            <Plan data={item} onTap={this.planTapped.bind(this)} />
          )}
        />
        <TouchableOpacity
          style={[shadowStyles.shadowDown, plansStyles.newPlan]}
          onPress={() => {
            this.props.navigation.navigate("CreatePlan");
          }}
        >
          <Text style={plansStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
