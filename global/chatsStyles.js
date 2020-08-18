import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const chatsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colorScheme.background,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  search: {
    height: 35,
    backgroundColor: colorScheme.componentBackground,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  icon: {
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  textInput: {
    color: colorScheme.lessDarkText,
    fontSize: 16,
  },
  chatContainer: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 5,
    paddingLeft: 15
  },
  notification: {
    backgroundColor: colorScheme.button,
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  profileImage: {
    height: 48, 
    width: 48, 
    borderRadius: 24,
    marginTop: 11,
    overflow: "hidden",
    backgroundColor: colorScheme.lessDarkText
  },
  name: {
    fontFamily: "Bold",
    fontSize: 17,
    color: colorScheme.lessDarkText,
  },
  text: {
    fontFamily: "Reg",
    fontSize: 15,
    color: colorScheme.inactiveButton,
  },
});
