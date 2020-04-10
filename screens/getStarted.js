import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { getStartedStyles } from '../global/getStartedStyles';

export default class GetStarted extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imageHolder: [require('../assets/getStarted0.jpg'), require('../assets/getStarted1.jpg')],
      currentIndex: 0
    }
    setInterval(() => {
      this.setState({currentIndex: this.state.currentIndex == this.state.imageHolder.length - 1 ? 0 : this.state.currentIndex + 1 })
    }, 5000)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
      return true;
  }

  render() {
    return (
      <ImageBackground source={this.state.imageHolder[this.state.currentIndex]} style={{width: '100%', height: '100%'}}>
      <View style={getStartedStyles.container}>
        <Text style={getStartedStyles.headerText}>exire</Text>
        <Text style={getStartedStyles.subHeaderText}>Going out made simple</Text>
        <View style={getStartedStyles.bottom}>
          <TouchableOpacity
            style={getStartedStyles.getStartedButton}
            activeOpacity={0.75}
            onPress={() => { this.props.navigation.navigate('PhoneInput')}}
          >
            <Text style={getStartedStyles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
  }
}
