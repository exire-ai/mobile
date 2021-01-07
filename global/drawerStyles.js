import { StyleSheet } from 'react-native';

import { colorScheme } from './colorScheme';

export const drawerStyles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomColor: colorScheme.veryLight,
        borderBottomWidth: 1
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: colorScheme.logo
    },
    profile: {
        height: 130,
        width: 130
    },
    logoText: {
        color: colorScheme.logo,
        fontSize: 32,
        paddingRight: 10,
        fontFamily: 'SemiBold'
    },
    largeText: {
        color: colorScheme.lessDarkText,
        fontSize: 24,
        fontFamily: 'SemiBold'
    },
    mediumText: {
        color: colorScheme.lessDarkText,
        fontSize: 16,
        fontFamily: 'SemiBold'
    },
    smallText: {
        color: colorScheme.lessDarkText,
        fontSize: 13,
        fontFamily: 'SemiBold'
    },
    profileInfo: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        width: '100%'
    },
    bottomButton: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25
    },
    bottomButtonText: {
        color: 'red',
        fontFamily: 'Reg',
        fontSize: 18,
        paddingLeft: 5
    }
});
