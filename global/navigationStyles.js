import { StyleSheet } from "react-native";

export const navigationStyles = StyleSheet.create({
  icon: {
    paddingRight: 16, 
    paddingBottom: 4,
    paddingLeft: 16
  },
  header: {
    backgroundColor: '#007aff',
    shadowOffset: { width: 0, height: .5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontFamily: 'nunito-semibold', 
    fontSize: 28, 
    fontWeight: '500',
    justifyContent: 'center'
  }
});
