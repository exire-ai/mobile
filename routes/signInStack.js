import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
// import ReviewDetails from "../screens/reviewDetails";
// import Header from "../shared/header";
import React from "react";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetStarted from "../screens/getStarted";
import PhoneInput from "../screens/phoneInput";
import TextVerification from "../screens/textVerification";
import CategoryPreference from "../screens/categoryPreference";
import SignIn from "../screens/signIn"

const screens = {
  GetStarted: {
    screen: GetStarted,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: () => {
      return {
        headerShown: true,
      };
    }
  },
  // PhoneInput: {
  //   screen: PhoneInput,
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       headerShown: true,
  //       title: 'Phone Number',
  //       headerStyle: { backgroundColor: '#007aff' },
  //       headerTitleStyle: { color: '#FFF',fontFamily: 'nunito-semibold', fontSize: 24, fontWeight: '500'},
  //       headerLeft: () => (
  //         <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={{paddingLeft: 8}}>
  //           <Icon
  //             name='chevron-left'
  //             color='#FFF'
  //             size={32}
  //           />
  //         </TouchableOpacity>
  //       ),
  //     }
  //   }
  // },
  // TextVerification: {
  //   screen: TextVerification,
  //   navigationOptions: ({ navigation }) => {
  //     return {
  //       headerShown: true,
  //       title: 'Verification',
  //       headerStyle: { backgroundColor: '#007aff' },
  //       headerTitleStyle: { color: '#FFF', fontSize: 24, fontWeight: '500'},
  //       headerLeft: () => (
  //         <TouchableOpacity onPress={() => navigation.navigate('PhoneInput')} style={{paddingLeft: 8}}>
  //           <Icon
  //             name='chevron-left'
  //             color='#FFF'
  //             size={32}
  //           />
  //         </TouchableOpacity>
  //         ),
  //     }
  //   }
  // },
  CategoryPreference: {
    screen: CategoryPreference,
    navigationOptions: ({ navigation }) => {
      return {
        headerShown: true,
        title: 'Category Preference',
        headerStyle: { backgroundColor: '#007aff' },
        headerTitleStyle: { color: '#FFF', fontSize: 24, fontWeight: '500'},
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.navigate('TextVerification')} style={{paddingLeft: 8}}>
        //     <Icon
        //       name='chevron-left'
        //       color='#FFF'
        //       size={32}
        //     />
        //   </TouchableOpacity>
        //   ),
      }
    }
  }

};

const SignInStack = createStackNavigator(screens);

export default createAppContainer(SignInStack);
