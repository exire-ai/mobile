import { StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const shadowStyles = StyleSheet.create({
  shadowDown: {
    shadowColor: colorScheme.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2.5
  },
  shadowUp: {
    shadowColor: colorScheme.shadowColor,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2.5
  },
  shadowRight: {
    shadowColor: colorScheme.shadowColor,
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2.5
  },
  shadowLeft: {
    shadowColor: colorScheme.shadowColor,
    shadowOffset: { width: -1, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2.5
  }
});
