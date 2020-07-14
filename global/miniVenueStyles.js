import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const miniVenueStyles = StyleSheet.create({
  venueContainer: {
    flex: 1,
    flexDirection: "column",
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colorScheme.inactiveButton,
  },
  venueImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  venueContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.15)",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 5,
    paddingBottom: 5
  },
  venueText: {
    fontFamily: "karla-regular",
    fontSize: 18,
    color: colorScheme.primaryText,
    fontWeight: "600",
  },
});
