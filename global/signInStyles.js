import { StyleSheet } from 'react-native';
import { colorScheme } from './colorScheme';

export const signInStyles = StyleSheet.create({
  textContainer: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontFamily: 'karla-regular',
    fontSize: 30,
    color: colorScheme.darkText,
    fontWeight: '600'
  },
  subHeaderText: {
    fontFamily: 'karla-regular',
    fontSize: 18,
    color: colorScheme.lessDarkText,
    padding: '5%',
    fontWeight: '400',
    textAlign: 'center'
  },
  input: {
    width: '85%',
    borderWidth: 1,
    borderColor: colorScheme.lessDarkText,
    margin: 8,
    padding: 18,
    borderRadius: 35,
    fontSize: 24,
  },
  button: {
    backgroundColor: colorScheme.primary,
    width: '45%',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontFamily: 'karla-bold',
    color: colorScheme.primaryText,
    fontSize: 24,
    fontWeight: '500'
  }
});
