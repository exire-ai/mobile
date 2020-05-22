import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const navigationStyles = StyleSheet.create({
  icon: {
    paddingRight: 16,
    paddingBottom: 4,
    paddingLeft: 16,
  },
  header: {
    backgroundColor: colorScheme.primary,
  },
  headerTitle: {
    color: colorScheme.primaryText,
    fontFamily: "nunito-semibold",
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
  },
  footer: {
    backgroundColor: colorScheme.footer,
    marginBottom: -5,
  },
});
