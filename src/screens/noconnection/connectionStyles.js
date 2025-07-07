import { StyleSheet } from "react-native";

const connectionStyles = StyleSheet.create({
    blackScreen: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 999,
    },
    connectionStatusText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reconnectMessage: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    lagIcon: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    retryIcon: {
        width: 50,
        height: 50,
        tintColor: 'white',
    },
});

export default connectionStyles;