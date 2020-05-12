import { StyleSheet } from 'react-native';

export const shadowStyles = StyleSheet.create({
  shadowDown: {
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  shadowUp: {
    shadowColor: '#444',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  }
});
