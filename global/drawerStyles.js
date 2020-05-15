import { StyleSheet } from 'react-native';
import { colorScheme } from './colorScheme';

export const drawerStyles = StyleSheet.create({
  container: {
    height: 60, 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    alignItems: 'center', 
    borderBottomColor: colorScheme.veryLight, 
    borderBottomWidth: 1
  },
  icon: { 
    width: 32, 
    height: 32, 
    tintColor: colorScheme.primary 
  },
  profile: {
    height: 130,
    width: 130,
  },
  logoText: {
    color: colorScheme.primary, 
    fontSize: 32, 
    paddingRight: 10, 
    fontFamily: 'nunito-semibold'
  },
  largeText: {
    color: colorScheme.lessDarkText, 
    fontSize: 24, 
    fontFamily: 'nunito-semibold'
  },
  mediumText: {
    color: colorScheme.lessDarkText, 
    fontSize: 16, 
    fontFamily: 'nunito-bold'
  },
  smallText: {
    color: colorScheme.lessDarkText, 
    fontSize: 13, 
    fontFamily: 'nunito-semibold'
  },
  profileInfo: {
    height: 50, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    borderBottomColor: '#ddd', 
    borderBottomWidth: 1, 
    width: '100%'
  },
  bottomButton: {
    width: '100%', 
    backgroundColor: 
    colorScheme.primary, 
    position: 'absolute', 
    bottom: 0, 
    height: 60, 
    alignItems: 'center', 
    flexDirection: 'row', 
    paddingHorizontal: 25
  },
  bottomButtonText: {
    color: colorScheme.primaryText,
    fontFamily: 'nunito-semibold',
    fontSize: 24,
    paddingLeft: 5
  }
});
