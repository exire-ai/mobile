import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const signInStyles = StyleSheet.create({
  textContainer: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontFamily: "Reg",
    fontSize: 30,
    color: colorScheme.lessDarkText,
  },
  subHeaderText: {
    fontFamily: "Reg",
    fontSize: 18,
    color: colorScheme.lesserDarkText,
    padding: "5%",
    textAlign: "center"
  },
  input: {
    width: "85%",
    margin: 8,
    padding: 18,
    borderRadius: 35,
    fontSize: 28,
    color: colorScheme.lessDarkText
  },
  button: {
    backgroundColor: colorScheme.primary,
    width: "45%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontFamily: "SemiBold",
    color: colorScheme.primaryText,
    fontSize: 24,
  }
});
