import { StyleSheet } from "react-native";

export const signInStyles = StyleSheet.create({
  textContainer: {
    flex: .45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 40,
    color: '#143e60',
    fontWeight: '600'
  },
  subHeaderText: {
    fontSize: 20,
    color: '#143e60',
    padding: '5%',
    fontWeight: '400',
    textAlign: 'center'
  },
  input: {
    width: '60%',
    borderWidth: 1.5,
    borderColor: '#143e60',
    margin: 8,
    padding: 18,
    borderRadius: 8,
    fontSize: 24
  },
  button: {
    backgroundColor: "#007aff",
    width: '85%',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "500"
  }
});
