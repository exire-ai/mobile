import { Platform, StyleSheet } from "react-native";
import { colorScheme } from "./colorScheme";

export const shadowStyles = StyleSheet.create({
  shadowDown: {
    ...Platform.select({
      ios: {
        shadowColor: colorScheme.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2.5
      }
    })
  },
  shadowUp: {
    ...Platform.select({
      ios: {
        shadowColor: colorScheme.shadowColor,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2.5
      }
    })
  },
  shadowRight: {
    ...Platform.select({
      ios: {
        shadowColor: colorScheme.shadowColor,
        shadowOffset: { width: 1, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2.5
      }
    })
  },
  shadowLeft: {
    ...Platform.select({
      ios: {
        shadowColor: colorScheme.shadowColor,
        shadowOffset: { width: -1, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      android: {
        elevation: 2.5
      }
    })
  }
});
