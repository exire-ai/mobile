import { StyleSheet } from 'react-native';
import { colorScheme } from './colorScheme';

export const chatsStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: colorScheme.backgroundColor
    },
    list: {
        flex: 1,
        width: '100%'
    },
    search: {
        height: 35, 
        backgroundColor: colorScheme.componentBackground, 
        marginHorizontal: 15, 
        marginVertical: 10, 
        borderRadius: 5, 
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'center', 
        paddingHorizontal: 10
    },
    textInput: {
        color: colorScheme.inactiveButton, 
        fontSize: 16
    },
    chatContainer: {
        height: 65, 
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        paddingHorizontal: 10
    },
    notification: {
        backgroundColor: colorScheme.button, 
        height: 10, 
        width: 10, 
        borderRadius: 5
    },
    profileImage: {
        backgroundColor: colorScheme.primary, 
        height: 48, 
        width: 48, 
        borderRadius: 24
    },
    name: {
        fontFamily: "nunito-bold", 
        fontSize: 19, 
        color: colorScheme.lessDarkText
    },
    text: {
        fontFamily: "nunito-regular", 
        fontSize: 16, 
        color: colorScheme.inactiveButton
    }
})