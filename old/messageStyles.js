import { StyleSheet } from "react-native";

export const messageStyles = StyleSheet.create({
  messsageText: {
    fontFamily: "karla-regular",
    fontSize: 20,
  },
  message: {
    backgroundColor: "#dddddd",
    paddingTop: 5,
    paddingBottom: 5.5,
    paddingHorizontal: 10,
    borderRadius: 16,
    maxWidth: "65%",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  botMessage: {
    paddingLeft: 7.5,
    alignItems: "flex-start",
  },
  ownerMessage: {
    paddingRight: 7.5,
    alignItems: "flex-end",
  },
  venueContainer: {
    flex: 1,
    flexDirection: "column",
    height: 200,
    width: 150,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "black",
  },
  venueImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  venueContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.35)",
  },
  venueText: {
    fontFamily: "karla-regular",
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    position: "absolute",
    marginHorizontal: 5,
    bottom: 5,
  },
});
