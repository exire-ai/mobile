import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Keyboard, TouchableOpacity, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { signInStyles } from '../global/signInStyles';

async function openLink(url) {
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: 'gray',
        preferredControlTintColor: 'white',
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      }).then((result) => {
        console.log(JSON.stringify(result))
      })
    } else Linking.openURL(url)
  } catch (error) {
    console.log(error.message)
  }
}

function linkOpen(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    } else {
      console.log('error')
    }
  })
}

function MoreInfo({url}) {
  if (url != '' && url != null) {
    return (
      <TouchableOpacity style={[signInStyles.button, {position: 'absolute', bottom: '5%', width: '85%', left: '7.5%'}]} onPress={() => { linkOpen(url)}}>
        <Text style={signInStyles.buttonText}>More Info</Text>
      </TouchableOpacity>
    )
  } else {
    return null
  }

}

export default class Venue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venue: this.props.navigation.state.params
    } 
  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: .35, flexDirection: 'row'}}>
          <ImageBackground
            source={{ uri: this.state.venue.imgURL }}
            style={{width: '100%', height: '100%'}}
          >
          </ImageBackground>
        </View>
        <View style={{flex: .65, width: '94%', alignItems: 'flex-start', flexDirection: 'column'}}>
            <Text style={[signInStyles.headerText, {textAlign: 'left', width: '100%', fontSize: 36}]}>{this.state.venue.title}</Text>
            <Text style={[signInStyles.subHeaderText, {textAlign: 'left', width: '100%', fontSize: 24, padding: 0}]}>{
              this.state.venue.cost > 15
              ? this.state.venue.cost > 30
              ? this.state.venue.cost > 60
                  ? '$$$$'
                  : '$$$'
              : '$$'
              : '$'}
            </Text>
            <Text style={[signInStyles.subHeaderText, {textAlign: 'left', width: '100%', padding: 0}]}>{this.state.venue.description}</Text>
          <MoreInfo url={this.state.venue.accessURL} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
