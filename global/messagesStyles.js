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
    }
})