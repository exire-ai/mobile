import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const plansStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colorScheme.background
  },
  list: {
    flex: 1,
    width: "100%",
  },
  newPlan: {
    backgroundColor: colorScheme.button, 
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    alignItems: "center", 
    alignSelf: "flex-end", 
    marginRight: "2.5%", 
    marginBottom: "2.5%"
  },
  buttonText: {
    fontFamily: "nunito-bold", 
    color: colorScheme.primaryText, 
    fontSize: 45, 
    marginTop: -2
  },
  venue: {
    height: 115, 
    width: "100%", 
    justifyContent: "center", 
    paddingRight: 10
  },
  component: {
    height: 130.39, 
    width: "95%", 
    backgroundColor: colorScheme.componentBackground, 
    flexDirection: "row", 
    alignItems: "flex-start", 
    borderRadius: 13.29
  },
  name: {
    fontFamily: "nunito-bold", 
    fontSize: 19, 
    color: colorScheme.darkText
  },
  time: {
    fontFamily: "nunito-regular", 
    fontSize: 16, 
    color: colorScheme.lessDarkText
  },
  textContainer: {
    flex: .7, 
    paddingLeft: 10, 
    paddingTop: 7.5,
  },
  venueContainer: {
    flex: .3, 
    justifyContent: "flex-end", 
    paddingVertical: 7.5
  }
});
