import { StyleSheet } from "react-native";

export const getStartedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: "center"
  },
  headerText: {
    fontFamily: 'nunito-semibold',
    marginTop: 50,
    fontSize: 60,
    color: "#007aff",
    fontWeight: "600"
  },
  subHeaderText: {
    fontFamily: 'karla-regular',
    fontSize: 24,
    color: "#fff",
    fontWeight: "500"
  },
  getStartedButton: {
    backgroundColor: "#007aff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    fontFamily: 'karla-bold',
    color: "white",
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
