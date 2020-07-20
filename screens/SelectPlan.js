import React, { Component } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, Alert, TextInput } from "react-native";
import { DateTimePicker } from 'react-native-propel-kit';
import _ from "lodash";
import { colorScheme } from "../global/colorScheme";
import { textStyles } from "../global/textStyles";
import { shadowStyles } from "../global/shadowStyles";
import { plansStyles } from "../global/plansStyles";
import { signInStyles } from "../global/signInStyles";
import Plan from "../components/Plan";
import users from "../functions/users";
import plans from "../functions/plans";

const nameDict = {
  artmuseums: ["Art", "🎨"],
  museums: ["Museums", "🖼️"],
  wine_bars: ["Wine", "🍷"],
  speakeasies: ["Speakeasies", "🥃"],
  japanese: ["Japanese", "🍱"],
  bars: ["Bars", "🍺"],
  barbeque: ["Barbeque", "🍖"],
  extreme: ["Extreme", "🧨"],
  cafe: ["Cafe", "☕"],
  bakeries: ["Bakeries", "🥖"],
  danceclubs: ["Clubs", "​🍾​"],
  tea: ["Tea", "🍵"],
  chinese: ["Chinese", "🥡"],
  newamerican: ["American", "🥩"],
  poke: ["Poke", "🍚"],
  acaibowl: ["Acai", "🍓"],
  burgers: ["Burgers", "🍔"],
  dancing: ["Dancing", "💃"],
  pizza: ["Pizza", "🍕"],
  yoga: ["Yoga", "🧘"],
  karaoke: ["Karaoke", "🎤"],
  icecream: ["Ice Cream", "🍦"],
  arcades: ["Arcades", "👾"],
  mexican: ["Mexican", "🌮"],
  oriental: ["Indian", "🇮🇳"],
  sushi: ["Sushi", "🍣"],
  markets: ["Markets", "🏬"],
  parks: ["Parks", "🌲"],
  sandwiches: ["Sandwiches", "🥪"],
  artgalleries: ["Galleries", "🖌️"],
  gelato: ["Gelato", "🍨"],
  italian: ["Italian", "🍝"],
  spa: ["Spa", "🧖‍♀️"],
  cocktailbars: ["Cocktails", "🍸"],
  pubs: ["Pubs", "🍻"],
  rockclimbing: ["Rock Climbing", "🧗"],
  comedyclubs: ["Comedy Clubs", "🤣"],
};

export default class SelectPlan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcoming: [],
      data: [],
      selected: '',
      selectedData: {},
      create: false,
      planName: '',
      planDescription: '',
      placeholder: 'Name Plan',
      descPlaceholder: '',
      date: new Date()
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const category = this.props.navigation.state.params.venue.subcategory;
    const placeholder = Object.keys(nameDict).includes(category) ? nameDict[category][0] : 'Name Plan';
    var descPlaceholder = this.props.navigation.state.params.venue.description;
    descPlaceholder = descPlaceholder !== '' ? descPlaceholder : 'Enter Description'
    this.setState({ placeholder, descPlaceholder });

    AsyncStorage.getItem("userID").then((userID) => {
      users.getPlans(userID, (response) => {
        var now = Math.round(new Date().getTime() * 1000);
        var upcoming = [];
        for (var i = 0; i < _.get(response, 'length', 0); i++) {
          if (response[i] !== null && response[i].startUNIX > now) {
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
    if (this.state.data.length === 0 || this.state.create) {
      return (
        <View style={[plansStyles.container, { alignItems: 'center' }]}>
            <TextInput
              style={[signInStyles.input, { marginTop: 20 }]}
              keyboardType={"default"}
              placeholder={this.state.placeholder}
              textAlign={"center"}
              onChangeText={(text) => { this.setState({ planName: text }) }}
              value={this.state.planName}
              selectionColor={colorScheme.button}
              placeholderTextColor={colorScheme.lesserDarkText}
            />
            <TextInput
              style={[signInStyles.input, { marginTop: 0, fontSize: 14 }]}
              keyboardType={"default"}
              placeholder={this.state.descPlaceholder}
              textAlign={"center"}
              onChangeText={(text) => { this.setState({ planDescription: text }) }}
              value={this.state.planDescription}
              selectionColor={colorScheme.button}
              placeholderTextColor={colorScheme.lesserDarkText}
              multiline
            />
            <View>
              <DateTimePicker 
                title="Pick a date" 
                value={this.state.date} 
                onChange={date => this.setState({ date })} 
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.state.params.createPlan({ 
                ...this.props.navigation.state.params.venue,
                startUNIX: this.state.date.getTime(),
                title: this.state.planName !== '' ? this.state.planName : this.state.placeholder,
                description: this.state.planDescription !== '' ? this.state.planDescription : this.state.descPlaceholder
              })}
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
                  position: 'absolute',
                  bottom: 30
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
