import { StyleSheet } from 'react-native';
import { colorScheme } from './colorScheme';

export const messagesStyles = StyleSheet.create({
    textInput: {
        color: colorScheme.inactiveButton, 
        fontSize: 16
    },
    chatContainer: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        paddingLeft: 10,
        paddingRight: 13
    },
    profileImage: {
        marginTop: 15,
        height: 48, 
        width: 48, 
        borderRadius: 24,
        overflow: 'hidden'
    },
    name: {
        fontFamily: "nunito-bold", 
        fontSize: 19, 
        color: colorScheme.darkText
    },
    text: {
        fontFamily: "nunito-regular", 
        fontSize: 17, 
        color: colorScheme.lessDarkText
    },
    venueContainer: {
        flex: 1,
        flexDirection: "column",
        height: 150,
        width: 145,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: colorScheme.background,
      },
      venueImage: {
        width: "100%",
        height: "100%",
        borderRadius: 16,
      },
      venueContent: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.35)",
      },
      venueText: {
        fontFamily: "nunito-semibold",
        fontSize: 19,
        color: colorScheme.primaryText,
        fontWeight: "600",
        position: "absolute",
        marginHorizontal: 5,
        bottom: 5,
      },
})