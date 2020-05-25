import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const getStartedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center"
  },
  headerText: {
    fontFamily: "nunito-semibold",
    marginTop: 50,
    fontSize: 60,
    color: colorScheme.primary,
    fontWeight: "600"
  },
  subHeaderText: {
    fontFamily: "karla-regular",
    fontSize: 24,
    color: colorScheme.primaryText,
    fontWeight: "500"
  },
  getStartedButton: {
    backgroundColor: colorScheme.primary,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  buttonText: {
    fontFamily: "karla-bold",
    color: colorScheme.primaryText,
    fontSize: 24,
    fontWeight: "500"
  },
  bottom: {
    flex: 1,
    width: "85%",
    justifyContent: "flex-end",
    marginBottom: 46
  }
});
