import { StyleSheet } from "react-native";

export const miniVenueStyles = StyleSheet.create({
  venueContainer: {
    flex: 1,
    flexDirection: "column",
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
  },
  venueImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  venueContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.35)",
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 5,
    paddingBottom: 5
  },
  venueText: {
    fontFamily: "karla-regular",
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
});
